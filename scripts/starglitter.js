
// 数据配置
const starglitterData = {
    "角色": [
        ["菲谢尔", "香菱"],// 第1月 (1月, 7月, ...)
        ["北斗", "诺艾尔"], // 第2月 (2月, 8月, ...)
        ["凝光", "行秋"], // 第3月 (3月, 9月, ...)
        ["雷泽", "安柏"], // 第4月 (4月, 10月, ...)
        ["班尼特", "丽莎"], // 第5月 (5月, 11月, ...) 
        ["凯亚", "芭芭拉"]  // 第6月 (6月, 12月, ...)
    ],
    "武器": {
        "奇数月": ["黑岩长剑", "黑岩斩刀", "黑岩刺枪", "黑岩绯玉", "黑岩战弓"],
        "偶数月": ["宗室长剑", "宗室大剑", "宗室猎枪", "宗室秘法录", "宗室长弓"]
    },
    "角色图片": {
        "安柏": "https://uploadstatic.mihoyo.com/ys-obc/2022/02/16/6276411/138132721f21bf60c53a8935a8fb0107_8908120754759624960.png",
        "凯亚": "https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/60d8b985eef1e6e0e959410893a75dc0_6659933186171988912.png",
        "雷泽": "https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/24edfa5586de73329a2b2c5c5d4262a3_3505783202009716970.png",
        "香菱": "https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/83a69074378a0837ca65d33e9052d729_6648871595979928785.png",
        "北斗": "https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/0f7406a1ea1b7fb827d7abe14bfe83e8_3108123811393147392.png",
        "诺艾尔": "https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/5cd5b91e504b2466197796cb26fcb7be_508847912159113655.png",
        "班尼特": "https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/498b43ef0d21c4e2c1d7a1dea0deea3f_2145838239611168396.png",
        "丽莎": "https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/014d59ec5b78c3499b90f45fc80c00a4_5392359609224242061.png",
        "菲谢尔": "https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/18a67c8802d7184db1449693908fe6cf_7858478886557060389.png",
        "行秋": "https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/cd48b60376438c60dbaaa8a85e6a480b_2048377578381627282.png",
        "凝光": "https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/e4e41cdfac3bdc225f0b847f2cc2cd72_5640782607282153058.png",
        "芭芭拉": "https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/7f1ac500bafa0526438e4e5b95165991_9116453886373904076.png"
    },
    "武器图片": {
        "黑岩长剑": "https://act-upload.mihoyo.com/wiki-user-upload/2023/12/11/50494840/3cd6aa8a0ce6b8fd1fb58e8d14ab223a_9149080170932661816.png",
        "黑岩刺枪": "https://act-upload.mihoyo.com/wiki-user-upload/2023/12/13/80663279/8c4d3ab52b263f9093ef736978e997a4_8153416802435371648.png",
        "黑岩战弓": "https://act-upload.mihoyo.com/wiki-user-upload/2023/12/14/80663279/684c1d7a2c0f69e8b91e885f467c9b1a_8986567664414596097.png",
        "黑岩绯玉": "https://act-upload.mihoyo.com/wiki-user-upload/2023/11/15/82503813/a7397d47a077ab696d5d021592963f29_4675600674494029872.png",
        "黑岩斩刀": "https://act-upload.mihoyo.com/wiki-user-upload/2023/11/13/82503813/c44d634d48c92c5d3a316267d6166f80_2624361457516551256.png",
        "宗室长弓": "https://act-upload.mihoyo.com/wiki-user-upload/2023/12/12/82503813/a646f69ace55ccfe1a9570642661388f_2354755427934650310.png",
        "宗室秘法录": "https://act-upload.mihoyo.com/wiki-user-upload/2023/11/15/82503813/8f6fa3db4d7639efe9da40ddef160a91_4387242220801809932.png",
        "宗室猎枪": "https://act-upload.mihoyo.com/wiki-user-upload/2023/11/13/82503813/6540e8846b3c63ac77ccde26219561e9_763410390048669426.png",
        "宗室大剑": "https://act-upload.mihoyo.com/wiki-user-upload/2023/12/12/82503813/cc2855afad8efc6495987f401fdc7e27_8204299560019625002.png",
        "宗室长剑": "https://act-upload.mihoyo.com/wiki-user-upload/2023/12/11/50494840/c7ca9652d0d606f9aa64c0c1789ffc18_7743508314165718058.png"

    }
};

function getMonth() {
    return new Date().getMonth() + 1; // 1-12 月
}

function renderThisMonthStarglitter() {
    const container = document.getElementById("this-month-starglitter");
    container.innerHTML = "";

    const month = getMonth();
    const title = document.createElement("h3");
    title.textContent = `今天是：${month} 月`;
    container.appendChild(title);

    // 创建一个 <br> 元素，并复用
    const lineBreak = document.createElement("br");

    // 第一次换行（标题和角色之间）
    container.appendChild(lineBreak.cloneNode());

    // 角色: 6 月循环
    const characterIndex = (month - 1) % 6;
    const characterList = starglitterData["角色"][characterIndex];
    renderMaterialSection("角色", characterList, starglitterData["角色图片"], container);

    // 第二次换行（角色和武器之间）
    container.appendChild(lineBreak.cloneNode());

    // 武器: 奇偶交替
    const weaponKey = month % 2 === 0 ? "偶数月" : "奇数月";
    const weaponList = starglitterData["武器"][weaponKey];
    renderMaterialSection("武器", weaponList, starglitterData["武器图片"], container);
}

function renderMaterialSection(title, items, images, parent) {
    const section = document.createElement("div");
    const subtitle = document.createElement("h4");
    subtitle.textContent = title;
    section.appendChild(subtitle);
    const list = document.createElement("div");
    list.className = "material-list";

    items.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "material-item";

        const img = document.createElement("img");
        img.src = images[item] || "https://via.placeholder.com/80";
        img.alt = item;

        const name = document.createElement("p");
        name.textContent = item;

        itemDiv.appendChild(img);
        itemDiv.appendChild(name);
        list.appendChild(itemDiv);
    });

    section.appendChild(list);
    parent.appendChild(section);
}

window.onload = renderThisMonthStarglitter;

