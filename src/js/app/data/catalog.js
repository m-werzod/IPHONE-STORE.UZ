"use strict";

/**
 * =========================================================
 * CATEGORIES (Phones, chargers, naushnik simli/simsiz, AirPods, etc.)
 * =========================================================
 */
const CATEGORIES = [
  { id: "all", label: { en: "All", ru: "Р вЂ™РЎРѓР Вµ", uz: "Barchasi" } },
  { id: "phones", label: { en: "Phones", ru: "Р СћР ВµР В»Р ВµРЎвЂћР С•Р Р…РЎвЂ№", uz: "Telefonlar" } },
  { id: "airpods", label: { en: "AirPods", ru: "AirPods", uz: "AirPods" } },
  { id: "wired", label: { en: "Wired earphones", ru: "Р СџРЎР‚Р С•Р Р†Р С•Р Т‘Р Р…РЎвЂ№Р Вµ", uz: "Simli quloqchin" } },
  { id: "chargers", label: { en: "Chargers", ru: "Р вЂ”Р В°РЎР‚РЎРЏР Т‘Р С”Р С‘", uz: "Zaryadlovchi" } },
  { id: "cables", label: { en: "Cables", ru: "Р С™Р В°Р В±Р ВµР В»Р С‘", uz: "Kabellar" } },
  { id: "cases", label: { en: "Cases", ru: "Р В§Р ВµРЎвЂ¦Р В»РЎвЂ№", uz: "GРІР‚Вiloflar" } },
  { id: "power", label: { en: "Power & MagSafe", ru: "Р СџР С‘РЎвЂљР В°Р Р…Р С‘Р Вµ/MagSafe", uz: "Quvvat/MagSafe" } },
  { id: "sim", label: { en: "SIM & extras", ru: "SIM Р С‘ Р Т‘РЎР‚.", uz: "SIM va boshqa" } },
];

/**
 * =========================================================
 * PRODUCTS РІР‚вЂќ РІР‚Сљready to sellРІР‚Сњ demo catalog.
 * Replace prices/images with your real inventory (easy).
 *
 * Price is stored in UZS by default; USD view uses STORE.usdToUzs.
 * =========================================================
 */
function svgPlaceholder(title, subtitle = "") {
  const safeT = encodeURIComponent(title);
  const safeS = encodeURIComponent(subtitle);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0a0a0f"/>
          <stop offset="1" stop-color="#e5e7eb"/>
        </linearGradient>
        <filter id="b" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="30"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <circle cx="260" cy="230" r="180" fill="#ffffff" opacity="0.10" filter="url(#b)"/>
      <circle cx="980" cy="640" r="260" fill="#000000" opacity="0.12" filter="url(#b)"/>
      <rect x="80" y="80" width="1040" height="640" rx="60" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)"/>
      <text x="140" y="240" fill="#ffffff" font-size="64" font-family="ui-sans-serif, system-ui" font-weight="700">${decodeURIComponent(safeT)}</text>
      <text x="140" y="310" fill="rgba(255,255,255,0.8)" font-size="30" font-family="ui-sans-serif, system-ui" font-weight="500">${decodeURIComponent(safeS)}</text>
      <text x="140" y="660" fill="rgba(255,255,255,0.65)" font-size="22" font-family="ui-sans-serif, system-ui">Replace this photo with your real product image</text>
    </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const PRODUCTS = [
  // Phones
  {
    id: "ip17pro",
    category: "phones",
    name: { en: "iPhone 17 Pro", ru: "iPhone 17 Pro", uz: "iPhone 17 Pro" },
    desc: {
      en: "Flagship performance, Pro camera features, premium build. (Set your real storage/variant pricing.)",
      ru: "Р В¤Р В»Р В°Р С–Р СР В°Р Р…, Pro-Р С”Р В°Р СР ВµРЎР‚Р В°, Р С—РЎР‚Р ВµР СР С‘Р В°Р В»РЎРЉР Р…Р В°РЎРЏ РЎРѓР В±Р С•РЎР‚Р С”Р В°. (Р СџР С•РЎРѓРЎвЂљР В°Р Р†РЎРЉРЎвЂљР Вµ РЎвЂ Р ВµР Р…РЎвЂ№ Р С—Р С• Р С—Р В°Р СРЎРЏРЎвЂљР С‘/Р Р†Р В°РЎР‚Р С‘Р В°Р Р…РЎвЂљРЎС“.)",
      uz: "Flagman, Pro kamera, premium dizayn. (Xotira/variant boРІР‚Вyicha narx qoРІР‚Вying.)",
    },
    priceUZS: 15999000,
    oldPriceUZS: 16999000,
    tags: ["iphone", "pro", "new", "flagship"],
    stock: 6,
    badge: "NEW",
    featured: 1,
    isNew: true,
    image: "https://assets.asaxiy.uz/product/items/desktop/1679091c5a880faf6fb5e6087eb1b2dc2025092015425123382OPhwE1M1AP.jpg",
  },
  {
    id: "ip17",
    category: "phones",
    name: { en: "iPhone 17", ru: "iPhone 17", uz: "iPhone 17" },
    desc: {
      en: "Best balance for most people. Great camera, battery, display.",
      ru: "Р вЂєРЎС“РЎвЂЎРЎв‚¬Р С‘Р в„– Р В±Р В°Р В»Р В°Р Р…РЎРѓ. Р С™Р В°Р СР ВµРЎР‚Р В°, Р В±Р В°РЎвЂљР В°РЎР‚Р ВµРЎРЏ, Р Т‘Р С‘РЎРѓР С—Р В»Р ВµР в„–.",
      uz: "Eng yaxshi balans. Kamera, batareya, ekran.",
    },
    priceUZS: 12999000,
    oldPriceUZS: 13499000,
    tags: ["iphone", "new"],
    stock: 10,
    badge: "TOP",
    featured: 1,
    isNew: true,
    image: "https://avatars.mds.yandex.net/i?id=a8d6ce5c960eebb94ca7e22d6c722ebff2e7402b-5513333-images-thumbs&n=13",
  },
  {
    id: "ipair",
    category: "phones",
    name: { en: "iPhone Air", ru: "iPhone Air", uz: "iPhone Air" },
    desc: {
      en: "Lightweight design focus. Ideal for comfort and style.",
      ru: "Р вЂєРЎвЂР С–Р С”Р С‘Р в„– Р С”Р С•РЎР‚Р С—РЎС“РЎРѓ. Р С™Р С•Р СРЎвЂћР С•РЎР‚РЎвЂљ Р С‘ РЎРѓРЎвЂљР С‘Р В»РЎРЉ.",
      uz: "Yengil dizayn. Qulay va chiroyli.",
    },
    priceUZS: 13999000,
    oldPriceUZS: 14999000,
    tags: ["iphone", "air", "thin"],
    stock: 4,
    badge: "HOT",
    featured: 1,
    isNew: true,
    image: "https://avatars.mds.yandex.net/i?id=f011c84694ba93bae5d275318f81d560e7fb3c98-5582331-images-thumbs&n=13",
  },
  {
    id: "ip16",
    category: "phones",
    name: { en: "iPhone 16", ru: "iPhone 16", uz: "iPhone 16" },
    desc: {
      en: "Reliable choice with great value. Perfect upgrade path.",
      ru: "Р СњР В°Р Т‘РЎвЂР В¶Р Р…РЎвЂ№Р в„– Р Р†РЎвЂ№Р В±Р С•РЎР‚ Р С‘ РЎвЂ¦Р С•РЎР‚Р С•РЎв‚¬Р В°РЎРЏ РЎвЂ Р ВµР Р…Р В°.",
      uz: "Ishonchli tanlov va yaxshi narx.",
    },
    priceUZS: 10999000,
    oldPriceUZS: 11999000,
    tags: ["iphone", "value"],
    stock: 12,
    badge: "SALE",
    featured: 1,
    isNew: false,
    image: "https://avatars.mds.yandex.net/i?id=2c829d3f21f1f20d626a00ea6809d2e0c99b2311-8311401-images-thumbs&n=13",
  },
  {
    id: "ip16e",
    category: "phones",
    name: { en: "iPhone 16e", ru: "iPhone 16e", uz: "iPhone 16e" },
    desc: {
      en: "Budget-friendly Apple experience. Great for gifts and first iPhone.",
      ru: "Р вЂќР С•РЎРѓРЎвЂљРЎС“Р С—Р Р…РЎвЂ№Р в„– iPhone. Р С›РЎвЂљР В»Р С‘РЎвЂЎР Р…Р С• Р Т‘Р В»РЎРЏ Р С—Р С•Р Т‘Р В°РЎР‚Р С”Р В°.",
      uz: "Hamyonbop iPhone. SovgРІР‚Вa uchun zoРІР‚Вr.",
    },
    priceUZS: 8999000,
    oldPriceUZS: 9499000,
    tags: ["iphone", "budget"],
    stock: 15,
    badge: "VALUE",
    featured: 1,
    isNew: false,
    image: "https://avatars.mds.yandex.net/i?id=d351bf82507ca874c4f9e4e11e2d4ec6d6593f0d-3070965-images-thumbs&n=13",
  },
  // AirPods / Wireless
  {
    id: "airpodspro3",
    category: "airpods",
    name: { en: "AirPods Pro (3rd gen)", ru: "AirPods Pro (3-Р Вµ)", uz: "AirPods Pro (3-avlod)" },
    desc: {
      en: "Premium ANC, adaptive audio, comfortable fit. Great for calls.",
      ru: "Р СџРЎР‚Р ВµР СР С‘РЎС“Р С ANC, Р В°Р Т‘Р В°Р С—РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р в„– Р В·Р Р†РЎС“Р С”, РЎС“Р Т‘Р С•Р В±Р Р…Р С•. Р С›РЎвЂљР В»Р С‘РЎвЂЎР Р…Р С• Р Т‘Р В»РЎРЏ Р В·Р Р†Р С•Р Р…Р С”Р С•Р Р†.",
      uz: "Premium ANC, moslashuvchan audio, qulay. QoРІР‚ВngРІР‚Вiroq uchun zoРІР‚Вr.",
    },
    priceUZS: 3399000,
    oldPriceUZS: 3699000,
    tags: ["airpods", "anc", "wireless"],
    stock: 8,
    badge: "TOP",
    featured: 1,
    isNew: true,
    image: "https://avatars.mds.yandex.net/i?id=292cd77f06d3979fc7a57612dd8a267c5bc852fe-12423254-images-thumbs&n=13",
  },
  {
    id: "airpods4",
    category: "airpods",
    name: { en: "AirPods 4", ru: "AirPods 4", uz: "AirPods 4" },
    desc: {
      en: "Everyday wireless with great sound. Perfect for iPhone pairing.",
      ru: "Р СњР В° Р С”Р В°Р В¶Р Т‘РЎвЂ№Р в„– Р Т‘Р ВµР Р…РЎРЉ. Р С›РЎвЂљР В»Р С‘РЎвЂЎР Р…Р В°РЎРЏ РЎРѓР Р†РЎРЏР В·Р С”Р В° РЎРѓ iPhone.",
      uz: "Har kuni uchun. iPhone bilan zoРІР‚Вr ishlaydi.",
    },
    priceUZS: 2399000,
    oldPriceUZS: 2599000,
    tags: ["airpods", "wireless"],
    stock: 9,
    badge: "",
    featured: 1,
    isNew: true,
    image: "https://avatars.mds.yandex.net/i?id=79a07e09170ddcf450294fa7b52c7dd2f6d361c7-16349630-images-thumbs&n=13",
  },
  {
    id: "airpodsmax",
    category: "airpods",
    name: { en: "AirPods Max", ru: "AirPods Max", uz: "AirPods Max" },
    desc: {
      en: "Over-ear premium sound + noise cancellation. Luxury listening.",
      ru: "Р СџРЎР‚Р ВµР СР С‘Р В°Р В»РЎРЉР Р…РЎвЂ№Р Вµ Р С—Р С•Р В»Р Р…Р С•РЎР‚Р В°Р В·Р СР ВµРЎР‚Р Р…РЎвЂ№Р Вµ РЎРѓ РЎв‚¬РЎС“Р СР С•Р С—Р С•Р Т‘Р В°Р Р†Р В»Р ВµР Р…Р С‘Р ВµР С.",
      uz: "Katta quloqchin, premium tovush + ANC.",
    },
    priceUZS: 7999000,
    oldPriceUZS: 8499000,
    tags: ["airpods", "max", "anc"],
    stock: 2,
    badge: "PREMIUM",
    featured: 0,
    isNew: false,
    image: "https://avatars.mds.yandex.net/i?id=ab896b2528b947aa1a42c82d782f9a0830bab475-6953466-images-thumbs&n=13",
  },

  // Wired earphones (naushnik simli)
  {
    id: "earpods-usbc",
    category: "wired",
    name: { en: "EarPods (USB-C)", ru: "EarPods (USB-C)", uz: "EarPods (USB-C)" },
    desc: {
      en: "Wired, stable mic quality. Great for calls and lectures.",
      ru: "Р СџРЎР‚Р С•Р Р†Р С•Р Т‘Р Р…РЎвЂ№Р Вµ, РЎРѓРЎвЂљР В°Р В±Р С‘Р В»РЎРЉР Р…РЎвЂ№Р в„– Р СР С‘Р С”РЎР‚Р С•РЎвЂћР С•Р Р…. Р вЂќР В»РЎРЏ Р В·Р Р†Р С•Р Р…Р С”Р С•Р Р†/РЎС“РЎР‚Р С•Р С”Р С•Р Р†.",
      uz: "Simli, mikrofon barqaror. QoРІР‚ВngРІР‚Вiroq/dars uchun.",
    },
    priceUZS: 249000,
    oldPriceUZS: 299000,
    tags: ["wired", "earpods", "usb-c"],
    stock: 30,
    badge: "BEST",
    featured: 0,
    isNew: false,
    image: "https://avatars.mds.yandex.net/i?id=1ec0f2539ba0baa34835331bde245b4ca7c57e96-13215483-images-thumbs&n=13",
  },
  {
    id: "earpods-lightning",
    category: "wired",
    name: { en: "EarPods (Lightning)", ru: "EarPods (Lightning)", uz: "EarPods (Lightning)" },
    desc: {
      en: "For Lightning iPhones. Clean sound, easy plug & play.",
      ru: "Р вЂќР В»РЎРЏ Lightning iPhone. Р В§Р С‘РЎРѓРЎвЂљРЎвЂ№Р в„– Р В·Р Р†РЎС“Р С”, Р С—РЎР‚Р С•РЎРѓРЎвЂљР С•.",
      uz: "Lightning iPhone uchun. Tovush toza, oson.",
    },
    priceUZS: 249000,
    oldPriceUZS: 299000,
    tags: ["wired", "earpods", "lightning"],
    stock: 14,
    badge: "",
    featured: 0,
    isNew: false,
    image: "https://avatars.mds.yandex.net/i?id=ac0bc4a9747e8d8a573f4bdfaf10952b15be26c2-9065817-images-thumbs&n=13",
  },

  // Chargers (chargers)
  {
    id: "apple-20w",
    category: "chargers",
    name: { en: "Apple 20W USB-C Power Adapter", ru: "Apple Р В°Р Т‘Р В°Р С—РЎвЂљР ВµРЎР‚ 20W USB-C", uz: "Apple 20W USB-C adapter" },
    desc: {
      en: "Fast and safe charging for iPhone. Recommended base adapter.",
      ru: "Р вЂРЎвЂ№РЎРѓРЎвЂљРЎР‚Р В°РЎРЏ Р С‘ Р В±Р ВµР В·Р С•Р С—Р В°РЎРѓР Р…Р В°РЎРЏ Р В·Р В°РЎР‚РЎРЏР Т‘Р С”Р В° iPhone. Р вЂР В°Р В·Р В°.",
      uz: "Tez va xavfsiz zaryad. Asosiy adapter.",
    },
    priceUZS: 399000,
    oldPriceUZS: 449000,
    tags: ["charger", "20w", "usb-c"],
    stock: 40,
    badge: "FAST",
    featured: 1,
    isNew: false,
    image: "https://avatars.mds.yandex.net/i?id=1ccc91beb9960499f219c78148cecc9abd3f3c98-5849895-images-thumbs&n=13",
  },
  {
    id: "apple-35w-dual",
    category: "chargers",
    name: { en: "Apple 35W Dual USB-C", ru: "Apple 35W Dual USB-C", uz: "Apple 35W Dual USB-C" },
    desc: {
      en: "Charge two devices at once. Great for iPhone + AirPods.",
      ru: "Р вЂќР Р†Р В° РЎС“РЎРѓРЎвЂљРЎР‚Р С•Р в„–РЎРѓРЎвЂљР Р†Р В° Р С•Р Т‘Р Р…Р С•Р Р†РЎР‚Р ВµР СР ВµР Р…Р Р…Р С•. Р Р€Р Т‘Р С•Р В±Р Р…Р С•.",
      uz: "Bir vaqtda 2 ta qurilma. Qulay.",
    },
    priceUZS: 899000,
    oldPriceUZS: 999000,
    tags: ["charger", "dual", "usb-c"],
    stock: 10,
    badge: "",
    featured: 0,
    isNew: false,
    image: "https://avatars.mds.yandex.net/get-marketpic/11535831/pic7af58c3f88c48bb182151529f7329a0a/orig",
  },
  {
    id: "anker-gan-65",
    category: "chargers",
    name: { en: "Anker GaN 65W (2РІР‚вЂњ3 ports)", ru: "Anker GaN 65W (2РІР‚вЂњ3 Р С—Р С•РЎР‚РЎвЂљР В°)", uz: "Anker GaN 65W (2РІР‚вЂњ3 port)" },
    desc: {
      en: "Compact power for iPhone, iPad, MacBook Air. Top seller.",
      ru: "Р С™Р С•Р СР С—Р В°Р С”РЎвЂљР Р…Р С•: iPhone/iPad/MacBook Air. Р ТђР С‘РЎвЂљ.",
      uz: "Ixcham: iPhone/iPad/MacBook Air. Top.",
    },
    priceUZS: 649000,
    oldPriceUZS: 749000,
    tags: ["charger", "gan", "anker"],
    stock: 7,
    badge: "TOP",
    featured: 1,
    isNew: true,
    image: "https://avatars.mds.yandex.net/i?id=af5cd2d1555e5a9b769cff63ba53035fbbb16cd3-4281133-images-thumbs&n=13",
  },

  // Cables
  {
    id: "cable-usbc-lightning",
    category: "cables",
    name: { en: "USB-C РІвЂ вЂќ Lightning cable (1m)", ru: "USB-C РІвЂ вЂќ Lightning (1Р С)", uz: "USB-C РІвЂ вЂќ Lightning (1m)" },
    desc: {
      en: "For Lightning iPhones. Fast charging with 20W adapter.",
      ru: "Р вЂќР В»РЎРЏ Lightning iPhone. Р вЂРЎвЂ№РЎРѓРЎвЂљРЎР‚Р В°РЎРЏ Р В·Р В°РЎР‚РЎРЏР Т‘Р С”Р В° РЎРѓ 20W.",
      uz: "Lightning iPhone uchun. 20W bilan tez.",
    },
    priceUZS: 199000,
    oldPriceUZS: 249000,
    tags: ["cable", "lightning", "usb-c"],
    stock: 22,
    badge: "",
    featured: 0,
    isNew: false,
    image: "https://avatars.mds.yandex.net/i?id=0257cb47412dd9a302e52e3fd878346c3afff22e-11003961-images-thumbs&n=13",
  },
  {
    id: "cable-usbc-usbc",
    category: "cables",
    name: { en: "USB-C РІвЂ вЂќ USB-C cable (2m)", ru: "USB-C РІвЂ вЂќ USB-C (2Р С)", uz: "USB-C РІвЂ вЂќ USB-C (2m)" },
    desc: {
      en: "For iPhone (USB-C), iPad, power banks, laptop charging.",
      ru: "Р вЂќР В»РЎРЏ iPhone (USB-C), iPad, Р С—Р В°Р Р†Р ВµРЎР‚Р В±Р В°Р Р…Р С”Р С•Р Р†, Р Р…Р С•РЎС“РЎвЂљР В±РЎС“Р С”Р С•Р Р†.",
      uz: "iPhone (USB-C), iPad, powerbank, noutbuk uchun.",
    },
    priceUZS: 189000,
    oldPriceUZS: 229000,
    tags: ["cable", "usb-c"],
    stock: 30,
    badge: "BEST",
    featured: 0,
    isNew: false,
    image: "https://avatars.mds.yandex.net/i?id=9cfc4c665e876297c202fe68331f692bd1ae5090-10311550-images-thumbs&n=13",
  },

  // Cases
  {
    id: "case-17pro-silicone",
    category: "cases",
    name: { en: "Silicone case РІР‚вЂќ iPhone 17 Pro", ru: "Р РЋР С‘Р В»Р С‘Р С”Р С•Р Р…Р С•Р Р†РЎвЂ№Р в„– РЎвЂЎР ВµРЎвЂ¦Р С•Р В» РІР‚вЂќ iPhone 17 Pro", uz: "Silikon gРІР‚Вilof РІР‚вЂќ iPhone 17 Pro" },
    desc: { en: "Soft touch, camera protection, slim fit.", ru: "Р СљРЎРЏР С–Р С”Р С‘Р в„–, Р В·Р В°РЎвЂ°Р С‘РЎвЂљР В° Р С”Р В°Р СР ВµРЎР‚РЎвЂ№, РЎвЂљР С•Р Р…Р С”Р С‘Р в„–.", uz: "Yumshoq, kamera himoyasi, yupqa." },
    priceUZS: 249000,
    oldPriceUZS: 299000,
    tags: ["case", "silicone"],
    stock: 18,
    badge: "",
    featured: 0,
    isNew: true,
    image: "https://avatars.mds.yandex.net/i?id=69292d922b38ce2ed28d746559c218ef13ab7e06-4599759-images-thumbs&n=13",
  },
  {
    id: "case-16-clear",
    category: "cases",
    name: { en: "Clear case РІР‚вЂќ iPhone 16", ru: "Р СџРЎР‚Р С•Р В·РЎР‚Р В°РЎвЂЎР Р…РЎвЂ№Р в„– РЎвЂЎР ВµРЎвЂ¦Р С•Р В» РІР‚вЂќ iPhone 16", uz: "Shaffof gРІР‚Вilof РІР‚вЂќ iPhone 16" },
    desc: { en: "Minimal look, scratch resistant.", ru: "Р СљР С‘Р Р…Р С‘Р СР В°Р В»Р С‘Р В·Р С, Р В·Р В°РЎвЂ°Р С‘РЎвЂљР В° Р С•РЎвЂљ РЎвЂ Р В°РЎР‚Р В°Р С—Р С‘Р Р….", uz: "Minimal, tirnalishga chidamli." },
    priceUZS: 219000,
    oldPriceUZS: 269000,
    tags: ["case", "clear"],
    stock: 25,
    badge: "SALE",
    featured: 0,
    isNew: false,
    image: "https://avatars.mds.yandex.net/i?id=8bb1d9ed61e2181d722e29d43c37c4b4741b1aeb-5254684-images-thumbs&n=13",
  },

  // Power & MagSafe
  {
    id: "magsafe-charger",
    category: "power",
    name: { en: "MagSafe Charger", ru: "MagSafe Р В·Р В°РЎР‚РЎРЏР Т‘Р С”Р В°", uz: "MagSafe zaryadlovchi" },
    desc: { en: "Magnetic wireless charging. Perfect for MagSafe cases.", ru: "Р СљР В°Р С–Р Р…Р С‘РЎвЂљР Р…Р В°РЎРЏ Р В±Р ВµРЎРѓР С—РЎР‚Р С•Р Р†Р С•Р Т‘Р Р…Р В°РЎРЏ Р В·Р В°РЎР‚РЎРЏР Т‘Р С”Р В°.", uz: "Magnitli simsiz zaryad." },
    priceUZS: 499000,
    oldPriceUZS: 549000,
    tags: ["magsafe", "wireless", "charger"],
    stock: 11,
    badge: "",
    featured: 1,
    isNew: false,
    image: "https://avatars.mds.yandex.net/i?id=f66f8385ebed5217c10b52cac9440a57f54515b1-5905783-images-thumbs&n=13",
  },
  {
    id: "magsafe-powerbank",
    category: "power",
    name: { en: "MagSafe power bank 10,000mAh", ru: "MagSafe power bank 10,000mAh", uz: "MagSafe powerbank 10,000mAh" },
    desc: {
      en: "Snap-on battery for travel. Strong magnets + USB-C input/output.",
      ru: "Р Р€Р Т‘Р С•Р В±Р Р…Р С• Р Р† Р Т‘Р С•РЎР‚Р С•Р С–Р Вµ. Р СљР В°Р С–Р Р…Р С‘РЎвЂљРЎвЂ№ + USB-C Р Р†РЎвЂ¦Р С•Р Т‘/Р Р†РЎвЂ№РЎвЂ¦Р С•Р Т‘.",
      uz: "Sayohat uchun qulay. Magnit + USB-C kirish/chiqish.",
    },
    priceUZS: 699000,
    oldPriceUZS: 799000,
    tags: ["powerbank", "magsafe", "travel"],
    stock: 5,
    badge: "TOP",
    featured: 1,
    isNew: true,
    image: "https://avatars.mds.yandex.net/i?id=283a4ccd298f4c52ac2ecc6d5f273b70f5a646a2-12923554-images-thumbs&n=13",
  },

  // SIM & extras
  {
    id: "esim-setup",
    category: "sim",
    name: { en: "eSIM setup service", ru: "Р Р€РЎРѓР В»РЎС“Р С–Р В°: Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р В° eSIM", uz: "Xizmat: eSIM sozlash" },
    desc: {
      en: "We help activate, transfer, and configure eSIM on your iPhone.",
      ru: "Р СџР С•Р СР С•Р В¶Р ВµР С Р В°Р С”РЎвЂљР С‘Р Р†Р С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ/Р С—Р ВµРЎР‚Р ВµР Р…Р ВµРЎРѓРЎвЂљР С‘ Р С‘ Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р С•Р С‘РЎвЂљРЎРЉ eSIM.",
      uz: "eSIMni yoqish/koРІР‚Вchirish va sozlashga yordam beramiz.",
    },
    priceUZS: 99000,
    oldPriceUZS: 129000,
    tags: ["service", "esim", "setup"],
    stock: 999,
    badge: "SERVICE",
    featured: 0,
    isNew: true,
    image: "https://i.ytimg.com/vi/4xqa_8L6q68/maxresdefault.jpg",
  },
  {
    id: "screen-protector",
    category: "sim",
    name: { en: "Tempered glass (premium)", ru: "Р РЋРЎвЂљР ВµР С”Р В»Р С• (Р С—РЎР‚Р ВµР СР С‘РЎС“Р С)", uz: "Himoya oynasi (premium)" },
    desc: { en: "Anti-scratch, smooth touch, high clarity.", ru: "Р С›РЎвЂљ РЎвЂ Р В°РЎР‚Р В°Р С—Р С‘Р Р…, Р С—Р В»Р В°Р Р†Р Р…Р С•Р Вµ Р С”Р В°РЎРѓР В°Р Р…Р С‘Р Вµ.", uz: "Tirnalishga qarshi, silliq." },
    priceUZS: 99000,
    oldPriceUZS: 129000,
    tags: ["glass", "protector"],
    stock: 60,
    badge: "BEST",
    featured: 0,
    isNew: false,
    image: "https://avatars.mds.yandex.net/i?id=59886d400f666257b1eeae159c237c8aeee9540d-4697805-images-thumbs&n=13",
  },
];
