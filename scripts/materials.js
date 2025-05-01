const materialData = {
    "蒙德": {
        "周一/周四": { "天赋书": ["自由的哲学","自由的指引","自由的教导"], "武器材料": ["高塔孤王的碎梦","高塔孤王的断片","高塔孤王的残垣","高塔孤王的破瓦"] },
        "周二/周五": { "天赋书": ["抗争的哲学","抗争的指引","抗争的教导"], "武器材料": ["凛风奔狼的怀乡","凛风奔狼的断牙","凛风奔狼的裂齿","凛风奔狼的始龀"] },
        "周三/周六": { "天赋书": ["诗文的哲学","诗文的指引","诗文的教导"], "武器材料": ["狮牙斗士的理想","狮牙斗士的镣铐","狮牙斗士的铁链","狮牙斗士的枷锁"] },
    },
    "璃月": {
        "周一/周四": { "天赋书": ["繁荣的哲学","繁荣的指引","繁荣的教导"], "武器材料": ["孤云寒林的神体","孤云寒林的圣骸","孤云寒林的辉岩","孤云寒林的光砂"] },
        "周二/周五": { "天赋书": ["勤劳的哲学","勤劳的指引","勤劳的教导"], "武器材料": ["雾海云间的转还","雾海云间的金丹","雾海云间的汞丹","雾海云间的铅丹"] },
        "周三/周六": { "天赋书": ["黄金的哲学","黄金的指引","黄金的教导"], "武器材料": ["漆黑陨铁的一块","漆黑陨铁的一角","漆黑陨铁的一片","漆黑陨铁的一粒"] },
    },
    "稻妻": {
        "周一/周四": { "天赋书": ["浮世的哲学","浮世的指引","浮世的教导"], "武器材料": ["远海夷地的金枝","远海夷地的琼枝","远海夷地的玉枝","远海夷地的瑚枝"] },
        "周二/周五": { "天赋书": ["风雅的哲学","风雅的指引","风雅的教导"], "武器材料": ["鸣神御灵的勇武","鸣神御灵的亲爱","鸣神御灵的欢喜","鸣神御灵的明慧"] },
        "周三/周六": { "天赋书": ["天光的哲学","天光的指引","天光的教导"], "武器材料": ["今昔剧画之鬼人","今昔剧画之一角","今昔剧画之虎啮","今昔剧画之恶尉"] },
    },
    "须弥": {
        "周一/周四": { "天赋书": ["诤言的哲学","诤言的指引","诤言的教导"], "武器材料": ["谧林涓露的金符","谧林涓露的银符","谧林涓露的铁符","谧林涓露的铜符"] },
        "周二/周五": { "天赋书": ["巧思的哲学","巧思的指引","巧思的教导"], "武器材料": ["绿洲花园的真谛","绿洲花园的哀思","绿洲花园的恩惠","绿洲花园的追忆"] },
        "周三/周六": { "天赋书": ["笃行的哲学","笃行的指引","笃行的教导"], "武器材料": ["烈日威权的旧日","烈日威权的梦想","烈日威权的余光","烈日威权的残响"] },
    },
    "枫丹": {
        "周一/周四": { "天赋书": ["公平的哲学","公平的指引","公平的教导"], "武器材料": ["悠古弦音的回响","悠古弦音的乐章","悠古弦音的断章","悠古弦音的残章"] },
        "周二/周五": { "天赋书": ["正义的哲学","正义的指引","正义的教导"], "武器材料": ["纯圣露滴的真粹","纯圣露滴的醴泉","纯圣露滴的凝华","纯圣露滴的滤渣"] },
        "周三/周六": { "天赋书": ["秩序的哲学","秩序的指引","秩序的教导"], "武器材料": ["无垢之海的金杯","无垢之海的银杯","无垢之海的酒盏","无垢之海的苦盏"] },
    },
    "纳塔": {
        "周一/周四": { "天赋书": ["角逐的哲学","角逐的指引","角逐的教导"], "武器材料": ["贡祭炽心的荣膺","贡祭炽心的决绝","贡祭炽心的踌躇","贡祭炽心的惶恐"] },
        "周二/周五": { "天赋书": ["焚燔的哲学","焚燔的指引","焚燔的教导"], "武器材料": ["谵妄圣主的神面","谵妄圣主的容光","谵妄圣主的余哀","谵妄圣主的朽败"] },
        "周三/周六": { "天赋书": ["纷争的哲学","纷争的指引","纷争的教导"], "武器材料": ["神合秘烟的启示","神合秘烟的征兆","神合秘烟的预感","神合秘烟的思绪"] },
    }
};

const materialImages = {
    //周一周四
    "自由的哲学": "https://patchwiki.biligame.com/images/ys/3/33/92r9uxu7qup2h9l1agm9kpd29ezja6u.png",
    "自由的指引": "https://patchwiki.biligame.com/images/ys/a/ac/kd1jm721wxpr28xc3zjwdcx1tmjq24p.png",
    "自由的教导": "https://patchwiki.biligame.com/images/ys/4/44/1sqwo81lurozcfbp8qphoa2penb07ar.png",
    "高塔孤王的碎梦": "https://patchwiki.biligame.com/images/ys/a/ae/ril3957ally2n06x63okj5u4xlgxkat.png",
    "高塔孤王的断片": "https://patchwiki.biligame.com/images/ys/5/51/nq6khcizclr0enm9s6jipnvtux751mv.png",
    "高塔孤王的残垣": "https://patchwiki.biligame.com/images/ys/0/08/kgvi54kad9igv0wl44bmu9e59rklwg0.png",
    "高塔孤王的破瓦": "https://patchwiki.biligame.com/images/ys/a/a9/eosyer2jo85oalk2xwbmusleynvc7np.png",
    "繁荣的哲学": "https://patchwiki.biligame.com/images/ys/2/20/55a8guat2ploi8fyk7pt2cn9vabrvdi.png",
    "繁荣的指引": "https://patchwiki.biligame.com/images/ys/3/31/lcuokq6rht82ueto8edggz6cko056ir.png",
    "繁荣的教导": "https://patchwiki.biligame.com/images/ys/9/9d/d8s3c0jmziudqwm8dktkloojqnvliga.png",
    "孤云寒林的神体": "https://patchwiki.biligame.com/images/ys/a/a3/1tu23zexvw3rzspu1srih6obhzvis7n.png",
    "孤云寒林的圣骸": "https://patchwiki.biligame.com/images/ys/e/e2/9jbal6ir2puop2chw33k43qgeiceku3.png",
    "孤云寒林的辉岩": "https://patchwiki.biligame.com/images/ys/2/2a/7rv6kofn50azy97wgtj8lsmvfepagbr.png",
    "孤云寒林的光砂": "https://patchwiki.biligame.com/images/ys/3/3e/ldrz1mgww29l6p7au214qhnya91mg0f.png",
    "浮世的哲学": "https://patchwiki.biligame.com/images/ys/d/d0/5deu25hsm08muvz4406uedrddkxvwlr.png",
    "浮世的指引": "https://patchwiki.biligame.com/images/ys/a/a7/adrxvuc8d9zlbi7kmedpirue9r9yu5w.png",
    "浮世的教导": "https://patchwiki.biligame.com/images/ys/b/ba/dc3lrkvsftlzec4ckoge95m8yq8rztp.png",
    "远海夷地的金枝": "https://patchwiki.biligame.com/images/ys/e/ee/sb5eljgxovf5ai76kdiky1nc8sofixq.png",
    "远海夷地的琼枝": "https://patchwiki.biligame.com/images/ys/c/c0/4xs90zh1tl3qfksx81vdhwjmfuwrtkl.png",
    "远海夷地的玉枝": "https://patchwiki.biligame.com/images/ys/6/64/k7npwch3og2aety4cn4q5c618ws4kob.png",
    "远海夷地的瑚枝": "https://patchwiki.biligame.com/images/ys/e/eb/ckpztw9wk23mfhn2z2g75d4c8zpgy1q.png",
    "诤言的哲学": "https://patchwiki.biligame.com/images/ys/4/42/05cbevt0wzs6tp0nlbfzhhfclxhqhmo.png",
    "诤言的指引": "https://patchwiki.biligame.com/images/ys/c/c6/6c7qp261fsmf683v4k1x6za935df47e.png",
    "诤言的教导": "https://patchwiki.biligame.com/images/ys/4/4f/bqvztyp8r5iwdjr21056xqgeqnovz85.png",
    "谧林涓露的金符":"https://patchwiki.biligame.com/images/ys/6/6e/2koigau65rcsv1cpdy0a6wuvs9iig26.png",
    "谧林涓露的银符":"https://patchwiki.biligame.com/images/ys/2/29/hjxvqc23de0kx1yumu4mld7sxejasmn.png",
    "谧林涓露的铁符":"https://patchwiki.biligame.com/images/ys/c/c1/g1dzj001554rmko5db1871tb5k03l18.png",
    "谧林涓露的铜符":"https://patchwiki.biligame.com/images/ys/6/62/mv0b2qyv681sb1afdsk0s6jfuhij4of.png",
    "公平的哲学":"https://patchwiki.biligame.com/images/ys/8/88/njtumsbyz3e70zheygxzagihja8rplc.png",
    "公平的指引":"https://patchwiki.biligame.com/images/ys/0/06/pc3thh54hng7fhijmfmsepto6sumet5.png",
    "公平的教导":"https://patchwiki.biligame.com/images/ys/6/64/jwfi44du7tqggoy0dofnd0jw8bcz40k.png",
    "悠古弦音的回响":"https://patchwiki.biligame.com/images/ys/4/45/3q2mirog6yf59cabz4q210ovlbj3e0o.png",
    "悠古弦音的乐章":"https://patchwiki.biligame.com/images/ys/0/01/ogl4j2ri93jw4kdby4ri1ogyumm3qbx.png",
    "悠古弦音的断章":"https://patchwiki.biligame.com/images/ys/8/80/k57vd683tn9hljf8zmr2a97mpoe4r26.png",
    "悠古弦音的残章":"https://patchwiki.biligame.com/images/ys/b/be/5jta0alfbj5337q9foyxh906n9eo6k2.png",
    "角逐的哲学":"https://patchwiki.biligame.com/images/ys/4/4d/erjs5cbtdg32vwozdl1rhv7pmxuyj8u.png",
    "角逐的指引":"https://patchwiki.biligame.com/images/ys/4/41/3h6h51tve7736aei5tjj25rw679k40q.png",
    "角逐的教导":"https://patchwiki.biligame.com/images/ys/f/fd/jfcbfzakfttiv23muywffxn0dbg9yuw.png",
    "贡祭炽心的荣膺":"https://patchwiki.biligame.com/images/ys/e/ef/am7t0os5z5dh5gzcany79a928etkxt6.png",
    "贡祭炽心的决绝":"https://patchwiki.biligame.com/images/ys/b/b2/smbre4tybal8u2leqgelcjsbyb8gyx3.png",
    "贡祭炽心的踌躇":"https://patchwiki.biligame.com/images/ys/6/68/k95709ak9kkushgy4zmmp03ye6dq99v.png",
    "贡祭炽心的惶恐":"https://patchwiki.biligame.com/images/ys/a/a2/ec2iweg768emb33f78tdzbyfoilezk0.png",

    //周二周五
    "抗争的哲学": "https://patchwiki.biligame.com/images/ys/7/72/0ent5h3ihuhwxd1s931as2io2tp56y7.png",
    "抗争的指引": "https://patchwiki.biligame.com/images/ys/5/5c/7g79n8we6f0hkyf7qs6domm25x2nmq5.png",
    "抗争的教导": "https://patchwiki.biligame.com/images/ys/0/0f/e63gxc1xlbuzoh2foi4nbuhpwwqv6lb.png",
    "凛风奔狼的怀乡": "https://patchwiki.biligame.com/images/ys/8/87/9pms7n56y93l3pubhkf50f0ve26xeay.png",
    "凛风奔狼的断牙": "https://patchwiki.biligame.com/images/ys/1/1e/gl9qedw9bsxorpphnut3xyt7w9u7nwo.png",
    "凛风奔狼的裂齿": "https://patchwiki.biligame.com/images/ys/f/f0/jdjzx2juz4m1fpbhy5oe2sqmotcjurc.png",
    "凛风奔狼的始龀": "https://patchwiki.biligame.com/images/ys/9/9c/3cjd5viydeejq74csrc8rt3h9i83nhj.png",
    "勤劳的哲学": "https://patchwiki.biligame.com/images/ys/8/88/cthf8i45kleres4039zefoigzlalaiq.png",
    "勤劳的指引": "https://patchwiki.biligame.com/images/ys/5/5e/o83nqhp34plrpdc33re1wa9t4ez72cc.png",
    "勤劳的教导": "https://patchwiki.biligame.com/images/ys/b/bf/5smyx10d90l15aijbfaq37z67bx8bq7.png",
    "雾海云间的转还": "https://patchwiki.biligame.com/images/ys/5/50/4pyz2quwtyekg7q9nz7uwvvk8u0lp1r.png",
    "雾海云间的金丹": "https://patchwiki.biligame.com/images/ys/4/47/t19nyez7qx03killvwk97adqvxd7okl.png",
    "雾海云间的汞丹": "https://patchwiki.biligame.com/images/ys/7/74/mdrhomvc1v23ji1yizj1mivam2jkc74.png",
    "雾海云间的铅丹": "https://patchwiki.biligame.com/images/ys/b/b3/eei37uorheomuwkro68mxikq9b3bzoz.png",
    "风雅的哲学":"https://patchwiki.biligame.com/images/ys/7/72/2saqeynx81s40yggo7o33v20jka2w4r.png",
    "风雅的指引":"https://patchwiki.biligame.com/images/ys/4/44/ks0vzcfd9s8zwiyay74z3dggey784vw.png",
    "风雅的教导":"https://patchwiki.biligame.com/images/ys/c/c2/gsq4t4gnn62zk7ned3n8346ab223l0y.png",
    "鸣神御灵的勇武":"https://patchwiki.biligame.com/images/ys/a/a7/8c1i8vpz8xtfkhq2ql02htt2jhqjer8.png",
    "鸣神御灵的亲爱":"https://patchwiki.biligame.com/images/ys/5/54/842fehqcl73ghreu13628p97tvgl2oy.png",
    "鸣神御灵的欢喜":"https://patchwiki.biligame.com/images/ys/c/c5/4wm7ysipvfqs8m8yvb70lmlwbz7t18z.png",
    "鸣神御灵的明慧":"https://patchwiki.biligame.com/images/ys/2/25/5y1wtgrfaq6uxobimi9migsujfrvpu6.png",
    "巧思的哲学":"https://patchwiki.biligame.com/images/ys/7/71/87n73mk55g1defc4jdk8fy64acen4rp.png",
    "巧思的指引":"https://patchwiki.biligame.com/images/ys/b/bc/ku4ocvnrl671d63d91f8fhn2lyuujl2.png",
    "巧思的教导":"https://patchwiki.biligame.com/images/ys/a/ab/cof97zp4s0m8fw7xkwls4rbhlm7k6q6.png",
    "绿洲花园的真谛":"https://patchwiki.biligame.com/images/ys/d/d4/nb0vqiokikoopdpo7x09srcht0y4toc.png",
    "绿洲花园的哀思":"https://patchwiki.biligame.com/images/ys/3/31/3jwqf3n7rq0054loge0o9igmjqlyzaa.png",
    "绿洲花园的恩惠":"https://patchwiki.biligame.com/images/ys/7/7a/lr5fgv07bwlcxxqs3td3xnkbep5mlpa.png",
    "绿洲花园的追忆":"https://patchwiki.biligame.com/images/ys/a/a6/jkl9otmftk74f88wj6qmzy823h9tbfs.png",
    "正义的哲学":"https://patchwiki.biligame.com/images/ys/e/ea/4foesks6e0pnk7lgslalvg1gdoxoqcj.png",
    "正义的指引":"https://patchwiki.biligame.com/images/ys/6/61/gfpifml02pewitdxk0s6us5maxfiuwq.png",
    "正义的教导":"https://patchwiki.biligame.com/images/ys/2/24/7okwf4t06ukgwieysjuavzhogaxeuz9.png",
    "纯圣露滴的真粹":"https://patchwiki.biligame.com/images/ys/a/aa/jeoqm7t6t4ck5nro3qodi2h3otn3t8f.png",
    "纯圣露滴的醴泉":"https://patchwiki.biligame.com/images/ys/6/60/bjn8onk2ifr1uhtpuqjucqgv5jygsrm.png",
    "纯圣露滴的凝华":"https://patchwiki.biligame.com/images/ys/f/fc/itilynrp1u002ajr5r18a7bw8gzybsw.png",
    "纯圣露滴的滤渣":"https://patchwiki.biligame.com/images/ys/f/fd/gk4u2ao991kbl5ggqth0xlydwv6n3hc.png",
    "焚燔的哲学":"https://patchwiki.biligame.com/images/ys/f/f8/i50q7qhimkzy2hsn9gbhsz7ld2c42ym.png",
    "焚燔的指引":"https://patchwiki.biligame.com/images/ys/d/d1/jw6og40u4ock1n8zage7y0nizdb8dsy.png",
    "焚燔的教导":"https://patchwiki.biligame.com/images/ys/4/4f/fbx89ojyq2ap8z3k7wfh94svj9jdvlp.png",
    "谵妄圣主的神面":"https://patchwiki.biligame.com/images/ys/e/e0/8z8i65uioxtcxdtmcn27v1rbavtx0da.png",
    "谵妄圣主的容光":"https://patchwiki.biligame.com/images/ys/0/09/m31tj2jz0u6julxt0hb6aut7e2fguem.png",
    "谵妄圣主的余哀":"https://patchwiki.biligame.com/images/ys/3/31/cw0e5bver01mahyl14rgjv1ricvjr9c.png",
    "谵妄圣主的朽败":"https://patchwiki.biligame.com/images/ys/1/17/t422bypiit5gweavhhfahal59nnimih.png",
    
    //周三周六
    "诗文的哲学":"https://patchwiki.biligame.com/images/ys/4/4e/s9sur7i24x9pey4tbuljh2hc1jc79tw.png",
    "诗文的指引":"https://patchwiki.biligame.com/images/ys/9/9b/rwsv2s1yl6cowlkfy0kq1fgh669biyr.png",
    "诗文的教导":"https://patchwiki.biligame.com/images/ys/4/4e/scd8f07njtgn4pjo3uppabwz5y0al12.png",
    "狮牙斗士的理想":"https://patchwiki.biligame.com/images/ys/3/39/nev6qh0704ntykkzomnpfmy61b8jo6t.png",
    "狮牙斗士的镣铐":"https://patchwiki.biligame.com/images/ys/a/a2/hay6df0dlrp6u2hlfpacy0jkuyxmbpu.png",
    "狮牙斗士的铁链":"https://patchwiki.biligame.com/images/ys/f/f1/8w3m06q3sj55r0zz8hpf0r7n23ppd4c.png",
    "狮牙斗士的枷锁":"https://patchwiki.biligame.com/images/ys/6/65/gmzs76liglqw2dkeahkfosm87x1jid5.png",
    "黄金的哲学":"https://patchwiki.biligame.com/images/ys/6/6d/qzfergmpc2ysgqotzg8h9hogzv1u2l1.png",
    "黄金的指引":"https://patchwiki.biligame.com/images/ys/d/d8/sq18j94cd5l4o2wgiy5qps7qu9nkzrm.png",
    "黄金的教导":"https://patchwiki.biligame.com/images/ys/e/ef/2xsd09kxqbqa7oj0q8yxsun34tie4a8.png",
    "漆黑陨铁的一块":"https://patchwiki.biligame.com/images/ys/a/a5/ondpda6fqcktdngxx59hjx0x86eifeu.png",
    "漆黑陨铁的一角":"https://patchwiki.biligame.com/images/ys/d/db/j2bubyhe5cncqce8hx310agtgvmhz9d.png",
    "漆黑陨铁的一片":"https://patchwiki.biligame.com/images/ys/4/47/exf18vxenbpjz1usbuni4ymcr0wvo7g.png",
    "漆黑陨铁的一粒":"https://patchwiki.biligame.com/images/ys/c/c1/pn3ihrrrlxe68v7gt6bghoba8ml830n.png",
    "天光的哲学":"https://patchwiki.biligame.com/images/ys/0/07/kly37hy0khdjmixbkfy7q97gxb1znrf.png",
    "天光的指引":"https://patchwiki.biligame.com/images/ys/7/79/j4oi63ow7wmmt6dxf9d6rr7j3sazi18.png",
    "天光的教导":"https://patchwiki.biligame.com/images/ys/b/ba/7m2vkwe8qmshessn19mmk9t20u7mrh6.png",
    "今昔剧画之鬼人":"https://patchwiki.biligame.com/images/ys/1/18/2io89qzgybi350jsqrpm0p6efnh16yb.png",
    "今昔剧画之一角":"https://patchwiki.biligame.com/images/ys/7/71/iuu0gxdl4nexwvngsosf1q7to3kgh9x.png",
    "今昔剧画之虎啮":"https://patchwiki.biligame.com/images/ys/c/cb/j0ydsn6v4173xezphip31ev8cfi4io2.png",
    "今昔剧画之恶尉":"https://patchwiki.biligame.com/images/ys/4/45/psfqvfj1g5fbhapbdkcdedf0ee53ysp.png",
    "笃行的哲学":"https://patchwiki.biligame.com/images/ys/e/ea/sl53ctzjjtolffuodrd1afjamfpm1us.png",
    "笃行的指引":"https://patchwiki.biligame.com/images/ys/1/17/6m6apjw3e3a55wwz6lu9mp4uplbvkwl.png",
    "笃行的教导":"https://patchwiki.biligame.com/images/ys/b/b9/0y947ih1hbzobo1otkkucc0b4qcmhes.png",
    "烈日威权的旧日":"https://patchwiki.biligame.com/images/ys/7/70/n17o3iy0o9hd7llbftbebjkoofa9nk4.png",
    "烈日威权的梦想":"https://patchwiki.biligame.com/images/ys/b/b3/slt0azfsfzlohpz0adbdhhaatw3ly4o.png",
    "烈日威权的余光":"https://patchwiki.biligame.com/images/ys/e/e5/n0refdaraykook6buxwebrzwzr5s7it.png",
    "烈日威权的残响":"https://patchwiki.biligame.com/images/ys/2/28/coia8przeghcbdygm0s18821srjmu9o.png",
    "秩序的哲学":"https://patchwiki.biligame.com/images/ys/5/5b/lrzu1kr1ziug7ku4bhep6ku7a0q4ypu.png",
    "秩序的指引":"https://patchwiki.biligame.com/images/ys/6/6d/5aa751d2vnrxn9oqcefne549kemyqn5.png",
    "秩序的教导":"https://patchwiki.biligame.com/images/ys/f/fd/rknnk8ov011o83onn65hvxf9600e0ag.png",
    "无垢之海的金杯":"https://patchwiki.biligame.com/images/ys/d/de/ab54afpbxocu59kjcsjnb1eg6565kxf.png",
    "无垢之海的银杯":"https://patchwiki.biligame.com/images/ys/c/c1/nut1jpuw59ujy4x0ou7i66qpf5ca3ir.png",
    "无垢之海的酒盏":"https://patchwiki.biligame.com/images/ys/0/09/04zded1fhqodlgmvesnuipk45gzuahj.png",
    "无垢之海的苦盏":"https://patchwiki.biligame.com/images/ys/9/96/exys9xut416dm3w1nfi6s48148feeml.png",
    "纷争的哲学":"https://patchwiki.biligame.com/images/ys/d/d6/aplbv3u344glradbpsftvkd5a4ayfnj.png",
    "纷争的指引":"https://patchwiki.biligame.com/images/ys/0/03/lvdn2a5aywxkuaw4sr89azsvx8fprj5.png",
    "纷争的教导":"https://patchwiki.biligame.com/images/ys/8/8b/655y6rluhctizy49tljrsgoe48d6i5l.png",
    "神合秘烟的启示":"https://patchwiki.biligame.com/images/ys/a/ae/897vr0n1uqaufsb8wj93joria3hdt0k.png",
    "神合秘烟的征兆":"https://patchwiki.biligame.com/images/ys/a/af/r9qklzpe1wseqjlyyt7uzadsagj4z0u.png",
    "神合秘烟的预感":"https://patchwiki.biligame.com/images/ys/8/82/csve6kduecti0g3rm3gfzf2bk7vvmya.png",
    "神合秘烟的思绪":"https://patchwiki.biligame.com/images/ys/6/68/r153wy2mf1kfj3hleah9ezsi0fa5z3p.png"

};

function getTodayDay() {
    const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return days[new Date().getDay()];
}

function renderTodayMaterial() {
    const nation = document.getElementById("nation-select").value;
    const container = document.getElementById("today-material");
    container.innerHTML = "";

    if (!nation) {
        container.innerHTML = "<p style='color: gray;'>请选择国家后查看材料。</p>";
        return;
    }

    const today = getTodayDay();
    const title = document.createElement("h3");
    title.textContent = `今天是${today}，国家：${nation}`;
    container.appendChild(title);

    // 如果是周日，合并所有材料并显示在一行
    if (today === "周日") {
        const allDays = ["周一/周四", "周二/周五", "周三/周六"];
        const allTalentBooks = [];
        const allWeaponMaterials = [];

        // 遍历所有日期，合并材料
        allDays.forEach(dayKey => {
            const dayData = materialData[nation]?.[dayKey];
            if (dayData) {
                if (dayData["天赋书"]) allTalentBooks.push(...dayData["天赋书"]);
                if (dayData["武器材料"]) allWeaponMaterials.push(...dayData["武器材料"]);
            }
        });

        // 去重（避免重复显示相同的材料）
        const uniqueTalentBooks = [...new Set(allTalentBooks)];
        const uniqueWeaponMaterials = [...new Set(allWeaponMaterials)];

        // 渲染合并后的材料
        renderMaterialSection("天赋书", uniqueTalentBooks, materialImages, container);
        renderMaterialSection("武器突破材料", uniqueWeaponMaterials, materialImages, container);
    } else {
        // 非周日，正常显示当天材料
        let dayKey = "";
        if (today === "周一" || today === "周四") dayKey = "周一/周四";
        else if (today === "周二" || today === "周五") dayKey = "周二/周五";
        else if (today === "周三" || today === "周六") dayKey = "周三/周六";

        const todayData = materialData[nation]?.[dayKey];

        if (!todayData) {
            container.innerHTML = "<p>暂无数据。</p>";
            return;
        }

        renderMaterialSection("天赋书", todayData["天赋书"], materialImages, container);
        renderMaterialSection("武器突破材料", todayData["武器材料"], materialImages, container);
    }
}

function renderMaterialSection(title, items, images, parent) {
    const section = document.createElement("div");
    section.className = "material-day";

    const subtitle = document.createElement("h4");
    subtitle.textContent = title;
    section.appendChild(subtitle);

    const list = document.createElement("div");
    list.className = "material-list";

    items.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "material-item";

        const img = document.createElement("img");
        img.src = images[item] || "https://via.placeholder.com/50";
        img.alt = item;
        img.className = "material-img";

        const name = document.createElement("p");
        name.textContent = item;

        itemDiv.appendChild(img);
        itemDiv.appendChild(name);
        list.appendChild(itemDiv);
    });

    section.appendChild(list);
    parent.appendChild(section);
}

document.getElementById("nation-select").addEventListener("change", renderTodayMaterial);

window.onload = function() {
    renderTodayMaterial();
};