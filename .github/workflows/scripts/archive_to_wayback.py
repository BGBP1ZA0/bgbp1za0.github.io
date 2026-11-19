#!/usr/bin/env python3
"""
把 GitHub Pages 站點的所有頁面和資源提交到 Internet Archive（Save Page Now）。

流程：
  1. 確定站點 URL（SITE_URL > CNAME > <user>.github.io/<repo>/）
  2. 發現 URL：sitemap / robots.txt + 逐頁爬取（頁面、圖片、視頻、CSS 內 url() 等）
  3. 對比上次記錄（ETag / Last-Modified / 內容哈希），挑出需要提交的
  4. 帶全局限速的併發提交，遇到 429 自動降速
  5. 保存記錄；超出時間預算就提前收工，下次接著做
"""
import gzip
import hashlib
import json
import os
import re
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser

START = time.monotonic()


# ───────────────────────── 配置 ─────────────────────────
def _raw(name):
    return (os.environ.get(name) or "").strip()


def env_int(name, default):
    try:
        return int(_raw(name) or default)
    except ValueError:
        return default


def env_float(name, default):
    try:
        return float(_raw(name) or default)
    except ValueError:
        return default


def env_bool(name, default):
    v = _raw(name).lower()
    return default if not v else v in ("1", "true", "yes", "on")


UA = "Mozilla/5.0 (compatible; pages-wayback-archiver/2.0)"
ACCESS = _raw("IA_ACCESS_KEY")
SECRET = _raw("IA_SECRET_KEY")
AUTH = bool(ACCESS and SECRET)

MAX_URLS = env_int("MAX_URLS", 3000)                   # 頁面 + 資源總上限
FETCH_WORKERS = env_int("FETCH_WORKERS", 8)            # 爬取併發數（抓自己的站，可以高一點）
SUBMIT_WORKERS = env_int("WORKERS", 3 if AUTH else 2)  # 提交併發數
DELAY = env_float("DELAY", 3 if AUTH else 10)          # 全局兩次提交的最小間隔（秒）
PAGE_REFRESH_DAYS = env_float("PAGE_REFRESH_DAYS", 1)  # 頁面最多隔幾天重提交（0=每次）
ASSET_REFRESH_DAYS = env_float("ASSET_REFRESH_DAYS", 30)
MAX_RUNTIME_MIN = env_float("MAX_RUNTIME_MIN", 300)    # 時間預算（分鐘）
INCLUDE_ASSETS = env_bool("INCLUDE_ASSETS", True)
STRIP_QUERY = env_bool("STRIP_QUERY", True)            # 去掉 ?v=123 之類的查詢參數
FORCE = env_bool("FORCE", False)
STATE_FILE = _raw("STATE_FILE") or ".cache/wayback-state.json"

MAX_BODY = 8 * 1024 * 1024
REFRESH_TOLERANCE = 3 * 3600   # cron 會延遲，給 3 小時容差
DEADLINE = START + MAX_RUNTIME_MIN * 60

ASSET_EXT = (
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".bmp", ".svg", ".ico",
    ".tif", ".tiff", ".css", ".js", ".mjs", ".json", ".xml", ".txt", ".csv",
    ".pdf", ".zip", ".gz", ".7z", ".rar", ".tar", ".epub", ".wasm",
    ".mp3", ".ogg", ".wav", ".flac", ".m4a", ".aac",
    ".mp4", ".webm", ".mov", ".mkv", ".avi", ".m4v",
    ".woff", ".woff2", ".ttf", ".otf", ".eot", ".map", ".webmanifest",
)
HTML_TYPES = ("text/html", "application/xhtml+xml")
META_KEYS = {"og:image", "og:image:url", "og:video", "og:audio", "twitter:image"}


# ───────────────────────── 站點與 URL ─────────────────────────
def resolve_site_url():
    url = _raw("SITE_URL")
    if not url:
        for p in ("CNAME", "docs/CNAME", "public/CNAME"):
            if os.path.isfile(p):
                parts = open(p, encoding="utf-8").read().split()
                if parts:
                    url = "https://" + parts[0]
                    break
    if not url:
        owner, repo = os.environ["GITHUB_REPOSITORY"].split("/")
        if repo.lower() == f"{owner.lower()}.github.io":
            url = f"https://{owner}.github.io/"
        else:
            url = f"https://{owner}.github.io/{repo}/"
    if "://" not in url:
        url = "https://" + url
    return url.rstrip("/") + "/"


def normalize(url):
    """統一格式：小寫主機、IDN→punycode、路徑百分號編碼、去 fragment（可選去 query）。"""
    p = urllib.parse.urlsplit(url.strip())
    host = p.netloc.lower()
    try:
        host = host.encode("idna").decode("ascii")
    except UnicodeError:
        pass
    path = urllib.parse.quote(p.path or "/", safe="/%:@!$&'()*+,;=~")
    query = "" if STRIP_QUERY else urllib.parse.quote(p.query, safe="=&%+/:;,@?!$'()*~")
    scheme = p.scheme.lower()
    if host == SITE_HOST:
        scheme = SITE_SCHEME            # 同站的 http/https 統一，避免重複
    return urllib.parse.urlunsplit((scheme, host, path, query, ""))


_sp = urllib.parse.urlsplit(resolve_site_url())
SITE_SCHEME = _sp.scheme
_h = _sp.netloc.lower()
try:
    _h = _h.encode("idna").decode("ascii")
except UnicodeError:
    pass
SITE_HOST = _h
BASE_PATH = _sp.path if _sp.path.endswith("/") else _sp.path + "/"
SITE = f"{SITE_SCHEME}://{SITE_HOST}{BASE_PATH}"


def in_scope(url):
    p = urllib.parse.urlsplit(url)
    return (p.scheme in ("http", "https") and p.netloc == SITE_HOST
            and (p.path.startswith(BASE_PATH) or p.path + "/" == BASE_PATH))


def is_asset_path(url):
    return urllib.parse.urlsplit(url).path.lower().endswith(ASSET_EXT)


def resolve(base, href):
    """相對路徑 → 規範化的絕對 URL；非法或非 http(s) 返回 None。"""
    try:
        href = href.strip()
        if not href or href.startswith(("#", "data:", "javascript:", "mailto:", "tel:", "blob:")):
            return None
        u = normalize(urllib.parse.urljoin(base, href))
        return u if urllib.parse.urlsplit(u).scheme in ("http", "https") else None
    except ValueError:
        return None


# ───────────────────────── HTTP ─────────────────────────
def fetch(url, method="GET", timeout=30, retries=3, max_bytes=MAX_BODY):
    """返回 (status, headers, body)；網絡徹底失敗時 status=0。"""
    for attempt in range(1, retries + 1):
        try:
            req = urllib.request.Request(url, method=method, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                body = r.read(max_bytes) if method == "GET" else b""
                return r.status, r.headers, body
        except urllib.error.HTTPError as e:
            if (e.code == 429 or e.code >= 500) and attempt < retries:
                time.sleep(2 ** attempt)
                continue
            return e.code, e.headers, b""
        except Exception:
            if attempt < retries:
                time.sleep(2 ** attempt)
                continue
    return 0, {}, b""


def ctype(headers):
    return (headers.get("Content-Type") or "").split(";")[0].strip().lower()


def header_sig(headers):
    return "|".join(headers.get(k) or "" for k in ("ETag", "Last-Modified", "Content-Length"))


# ───────────────────────── 解析 ─────────────────────────
CSS_URL_RE = re.compile(r"""url\(\s*(['"]?)(.*?)\1\s*\)""", re.I | re.S)
CSS_IMPORT_RE = re.compile(r"""@import\s+(['"])(.*?)\1""", re.I)


def css_refs(text):
    return [m.group(2) for m in CSS_URL_RE.finditer(text)] + \
           [m.group(2) for m in CSS_IMPORT_RE.finditer(text)]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.pages, self.assets, self.styles = [], [], []
        self.base = None
        self._in_style = False

    def handle_starttag(self, tag, attrs):
        a = {k.lower(): v for k, v in attrs if v}
        if tag == "style":
            self._in_style = True
        if a.get("style"):
            self.styles.append(a["style"])
        if tag == "base":
            if a.get("href") and self.base is None:
                self.base = a["href"]
            return
        if tag in ("a", "area"):
            if a.get("href"):
                self.pages.append(a["href"])
        elif tag == "link" and a.get("href"):
            rel = set(a.get("rel", "").lower().split())
            (self.pages if rel & {"canonical", "next", "prev"} else self.assets).append(a["href"])
        elif tag == "meta":
            key = (a.get("property") or a.get("name") or "").lower()
            if key in META_KEYS and a.get("content"):
                self.assets.append(a["content"])
        for k in ("src", "data-src", "poster", "data"):
            if a.get(k):
                self.assets.append(a[k])
        for k in ("srcset", "data-srcset"):
            if a.get(k):
                for part in a[k].split(","):
                    tok = part.strip().split(" ")[0]
                    if tok:
                        self.assets.append(tok)

    def handle_endtag(self, tag):
        if tag == "style":
            self._in_style = False

    def handle_data(self, data):
        if self._in_style:
            self.styles.append(data)


# ───────────────────────── 發現 URL ─────────────────────────
def read_sitemap(url, seen, depth=0):
    if url in seen or depth > 3:
        return []
    seen.add(url)
    st, _, body = fetch(url, max_bytes=MAX_BODY * 4)
    if st != 200 or not body:
        return []
    try:
        if body[:2] == b"\x1f\x8b":
            body = gzip.decompress(body)
        root = ET.fromstring(body)
    except Exception as e:
        print(f"[sitemap] {url} 解析失敗：{e}")
        return []
    is_index = root.tag.rsplit("}", 1)[-1] == "sitemapindex"
    out = []
    for el in root.iter():
        if el.tag.rsplit("}", 1)[-1] == "loc" and el.text:
            u = el.text.strip()
            out += read_sitemap(u, seen, depth + 1) if is_index else [u]
    return out


def sitemap_urls():
    cands = [SITE + "sitemap.xml"]
    st, _, body = fetch(SITE + "robots.txt")
    if st == 200:
        for line in body.decode("utf-8", "replace").splitlines():
            if line.lower().startswith("sitemap:"):
                cands.append(line.split(":", 1)[1].strip())
    seen, out = set(), []
    for c in cands:
        out += read_sitemap(c, seen)
    return out


def probe(url, hinted_asset):
    """檢查單個 URL，返回 {url, kind, sig, pages, assets}；失效返回 None。"""
    path = urllib.parse.urlsplit(url).path.lower()
    is_css = path.endswith(".css")

    # 已知資源：只發 HEAD，不下載（CSS 例外，需要讀內容找 url()）
    if hinted_asset and not is_css:
        st, h, _ = fetch(url, "HEAD")
        if st in (405, 501):
            return {"url": url, "kind": "asset", "sig": "", "pages": [], "assets": []}
        if st != 200:
            return None
        return {"url": url, "kind": "asset", "sig": header_sig(h), "pages": [], "assets": []}

    st, h, body = fetch(url, "GET")
    if st != 200:
        return None
    ct = ctype(h)

    if ct in HTML_TYPES:
        p = PageParser()
        try:
            p.feed(body.decode("utf-8", "replace"))
            p.close()
        except Exception:
            pass
        base = urllib.parse.urljoin(url, p.base) if p.base else url
        pages = [x for x in (resolve(base, r) for r in p.pages) if x]
        refs = list(p.assets)
        for s in p.styles:
            refs += css_refs(s)
        assets = [x for x in (resolve(base, r) for r in refs) if x] if INCLUDE_ASSETS else []
        return {"url": url, "kind": "page", "sig": hashlib.sha1(body).hexdigest(),
                "pages": pages, "assets": assets}

    if is_css or ct == "text/css":
        assets = []
        if INCLUDE_ASSETS:
            text = body.decode("utf-8", "replace")
            assets = [x for x in (resolve(url, r) for r in css_refs(text)) if x]
        return {"url": url, "kind": "asset", "sig": hashlib.sha1(body).hexdigest(),
                "pages": [], "assets": assets}

    return {"url": url, "kind": "asset", "sig": header_sig(h), "pages": [], "assets": []}


def discover():
    seeds = [SITE]
    for u in sitemap_urls():
        n = resolve(SITE, u)
        if n:
            seeds.append(n)

    info, seen, frontier = {}, set(), []

    def add(u, hinted):
        if not u or u in seen or not in_scope(u):
            return
        hinted = hinted or is_asset_path(u)
        if hinted and not INCLUDE_ASSETS:
            return
        if len(seen) >= MAX_URLS * 2:
            return
        seen.add(u)
        frontier.append((u, hinted))

    for s in seeds:
        add(s, False)

    with ThreadPoolExecutor(FETCH_WORKERS) as ex:
        while frontier:
            batch = list(frontier)
            frontier.clear()
            for r in ex.map(lambda t: probe(*t), batch):
                if not r:
                    continue
                info[r["url"]] = r
                for u in r["pages"]:
                    add(u, False)
                for u in r["assets"]:
                    add(u, True)

    pages = [r for r in info.values() if r["kind"] == "page"]
    assets = [r for r in info.values() if r["kind"] == "asset"]
    print(f"發現 {len(pages)} 個頁面、{len(assets)} 個資源")
    return pages + assets[:max(0, MAX_URLS - len(pages))]


# ───────────────────────── 記錄 ─────────────────────────
def load_state():
    try:
        with open(STATE_FILE, encoding="utf-8") as f:
            d = json.load(f)
        return d if isinstance(d, dict) else {}
    except (OSError, ValueError):
        return {}


def save_state(state):
    os.makedirs(os.path.dirname(STATE_FILE) or ".", exist_ok=True)
    tmp = STATE_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False)
    os.replace(tmp, STATE_FILE)


def make_plan(targets, state):
    now, todo = time.time(), []
    for r in targets:
        old = state.get(r["url"])
        days = PAGE_REFRESH_DAYS if r["kind"] == "page" else ASSET_REFRESH_DAYS
        if FORCE:
            reason = "force"
        elif old is None:
            reason = "new"
        elif r["sig"] != old.get("sig"):
            reason = "changed"
        elif now - old.get("ts", 0) >= days * 86400 - REFRESH_TOLERANCE:
            reason = "due"
        else:
            continue
        todo.append((r, reason, old.get("ts", 0) if old else 0))
    # 頁面優先；同類中最久沒備份的優先（沒備份過的 ts=0 最先）
    todo.sort(key=lambda t: (t[0]["kind"] != "page", t[2]))
    return todo


# ───────────────────────── 提交到 Wayback ─────────────────────────
class Limiter:
    """全局限速：任意兩次提交的起點至少間隔 interval 秒。"""

    def __init__(self, interval):
        self.interval, self.next, self.lock = interval, 0.0, threading.Lock()

    def wait(self):
        with self.lock:
            now = time.monotonic()
            t = max(now, self.next)
            self.next = t + self.interval
        if t > now:
            time.sleep(t - now)

    def penalize(self, seconds):
        with self.lock:
            self.next = max(self.next, time.monotonic() + seconds)


limiter = Limiter(DELAY)


def build_request(url):
    if AUTH:  # SPN2 API
        body = urllib.parse.urlencode({"url": url, "skip_first_archive": "1"}).encode()
        return urllib.request.Request(
            "https://web.archive.org/save", data=body,
            headers={"User-Agent": UA, "Accept": "application/json",
                     "Authorization": f"LOW {ACCESS}:{SECRET}"})
    return urllib.request.Request("https://web.archive.org/save/" + url,
                                  headers={"User-Agent": UA})


def submit(url):
    """返回 (狀態, 說明)，狀態：ok / fail / timeout。"""
    last = "未知錯誤"
    for attempt in range(1, 5):
        if time.monotonic() > DEADLINE:
            return "timeout", "超過時間預算"
        limiter.wait()
        retry_after = None
        try:
            with urllib.request.urlopen(build_request(url), timeout=120) as r:
                status, text = r.status, r.read(65536).decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            status, retry_after = e.code, e.headers.get("Retry-After")
            try:
                text = e.read(65536).decode("utf-8", "replace")
            except Exception:
                text = ""
        except Exception as e:
            status, text = 0, str(e)

        err = ""
        if AUTH and 200 <= status < 300:   # SPN2 可能 200 但內容是 error
            try:
                d = json.loads(text)
            except ValueError:
                d = {}
            if isinstance(d, dict) and d.get("status") == "error":
                err = d.get("message") or d.get("status_ext") or "error"
        if 200 <= status < 300 and not err:
            return "ok", str(status)

        last = f"{status} {err or text[:120]}".strip().replace("\n", " ")
        retriable = status in (0, 429) or status >= 500 or "session-limit" in text
        if not retriable or attempt == 4:
            break
        wait = int(retry_after) if retry_after and retry_after.isdigit() else 30 * attempt
        limiter.penalize(min(wait, 300))
    return "fail", last


# ───────────────────────── 主流程 ─────────────────────────
def write_summary(lines):
    path = os.environ.get("GITHUB_STEP_SUMMARY")
    if path:
        with open(path, "a", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")


def main():
    print(f"站點：{SITE}")
    print(f"模式：{'SPN2 API（已認證）' if AUTH else '匿名模式'}，併發 {SUBMIT_WORKERS}，間隔 {DELAY}s"
          f"{'，強制全部重提交' if FORCE else ''}")

    state = load_state()
    print(f"已有記錄 {len(state)} 條")

    targets = discover()
    if not any(r["kind"] == "page" for r in targets):
        print("::error::沒有發現任何頁面，站點可能暫時無法訪問")
        sys.exit(1)

    todo = make_plan(targets, state)
    reasons = {}
    for _, why, _ in todo:
        reasons[why] = reasons.get(why, 0) + 1
    print(f"本次需提交 {len(todo)} 個，跳過 {len(targets) - len(todo)} 個未變化的；原因分佈：{reasons}\n")

    ok = fail = skipped = 0
    failures = []
    done = 0
    with ThreadPoolExecutor(SUBMIT_WORKERS) as ex:
        futs = {ex.submit(submit, r["url"]): (r, why) for r, why, _ in todo}
        for fut in as_completed(futs):
            r, why = futs[fut]
            status, msg = fut.result()
            done += 1
            if status == "ok":
                ok += 1
                state[r["url"]] = {"sig": r["sig"], "ts": time.time()}
            elif status == "timeout":
                skipped += 1
            else:
                fail += 1
                failures.append((r["url"], msg))
            print(f"[{done}/{len(todo)}] {status.upper():7} ({why}) {r['url']}"
                  f"{'  → ' + msg if status == 'fail' else ''}", flush=True)
            if done % 50 == 0:
                save_state(state)

    # 清理 90 天都沒再出現過的舊記錄
    live = {r["url"] for r in targets}
    cutoff = time.time() - 90 * 86400
    state = {u: v for u, v in state.items() if u in live or v.get("ts", 0) > cutoff}
    save_state(state)

    elapsed = (time.monotonic() - START) / 60
    print(f"\n完成：成功 {ok}，失敗 {fail}，因時間預算未處理 {skipped}，耗時 {elapsed:.1f} 分鐘")
    write_summary([
        "## Wayback 備份結果",
        f"- 站點：`{SITE}`",
        f"- 發現 {len(targets)} 個 URL，本次提交 {len(todo)} 個",
        f"- ✅ 成功 {ok}　❌ 失敗 {fail}　⏳ 未處理 {skipped}　⏱ {elapsed:.1f} 分鐘",
    ] + ([""] + ["### 失敗列表"] + [f"- `{u}` — {m}" for u, m in failures[:50]] if failures else []))
    if fail:
        print(f"::warning::有 {fail} 個 URL 提交失敗，詳見日誌")
    sys.exit(1 if todo and ok == 0 and skipped < len(todo) else 0)


if __name__ == "__main__":
    main()
