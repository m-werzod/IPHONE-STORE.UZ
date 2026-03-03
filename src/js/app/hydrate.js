"use strict";

/**
 * =========================================================
 * TEXT HYDRATION
 * =========================================================
 */
function hydrateText() {
  // Banner + nav
  $("#bannerText").textContent = t("banner");
  $("#bannerLocation").textContent = STORE.locationName[state.lang] || STORE.locationName.en;
  $("#navProducts").textContent = t("products");
  $("#navServices").textContent = t("services");
  $("#navLocation").textContent = t("location");
  $("#navFAQ").textContent = t("faq");

  // Header / store
  $("#storeName").textContent = STORE.name;
  $("#storeTagline").textContent = STORE.tagline[state.lang] || STORE.tagline.en;

  // Hero
  $("#heroPill").textContent = t("heroPill");
  $("#heroTitle").textContent = t("heroTitle");
  $("#heroSubtitle").textContent = t("heroSubtitle");
  $("#heroShopBtn").textContent = t("shopNow");
  $("#heroQuickOrder").textContent = t("quickOrder");
  $("#heroCall").textContent = t("callNow");
  $("#heroCallBtn").href = `tel:${STORE.phoneE164}`;
  $("#trust1Title").textContent = t("trust1Title");
  $("#trust1Desc").textContent = t("trust1Desc");
  $("#trust2Title").textContent = t("trust2Title");
  $("#trust2Desc").textContent = t("trust2Desc");
  $("#trust3Title").textContent = t("trust3Title");
  $("#trust3Desc").textContent = t("trust3Desc");
  $("#trust4Title").textContent = t("trust4Title");
  $("#trust4Desc").textContent = t("trust4Desc");

  $("#heroCardKicker").textContent = t("heroCardKicker");
  $("#heroCardTitle").textContent = t("heroCardTitle");
  $("#heroStat1Label").textContent = t("heroStat1Label");
  $("#heroStat2Label").textContent = t("heroStat2Label");
  $("#heroStat1Value").textContent = String(PRODUCTS.length);
  $("#heroStat2Value").textContent = String(CATEGORIES.length - 1);
  $("#heroDealTitle").textContent = t("heroDealTitle");
  $("#heroDealBadge").textContent = t("heroDealBadge");
  $("#heroDealDesc").textContent = t("heroDealDesc");
  $("#heroDealBtn").textContent = t("heroDealBtn");
  $("#heroFootnote").textContent = t("heroFootnote");

  // Products
  $("#productsTitle").textContent = t("productsTitle");
  $("#productsSubtitle").textContent = t("productsSubtitle");
  $("#sortLabel").textContent = t("sort");
  $("#sortFeatured").textContent = t("featured");
  $("#sortNew").textContent = t("newest");
  $("#sortPriceAsc").textContent = t("priceAsc");
  $("#sortPriceDesc").textContent = t("priceDesc");
  $("#resetLabel").textContent = t("reset");
  $("#emptyTitle").textContent = t("emptyTitle");
  $("#emptyDesc").textContent = t("emptyDesc");

  // Services
  $("#servicesTitle").textContent = t("servicesTitle");
  $("#servicesSubtitle").textContent = t("servicesSubtitle");

  // Brands
  $("#brandsTitle").textContent = t("brandsTitle");
  $("#brandsSubtitle").textContent = t("brandsSubtitle");

  // Location
  $("#locationTitle").textContent = t("locationTitle");
  $("#locationSubtitle").textContent = t("locationSubtitle");
  $("#locationName").textContent = STORE.locationName[state.lang] || STORE.locationName.en;
  $("#locationAddress").textContent = STORE.address[state.lang] || STORE.address.en;
  $("#locationHoursTitle").textContent = { en: "Hours", ru: "Р§Р°СЃС‹", uz: "Vaqt" }[state.lang] || "Hours";
  $("#locationHours").textContent = STORE.hours[state.lang] || STORE.hours.en;
  $("#openMapsLabel").textContent = t("openMaps");
  $("#telegramLabel").textContent = t("telegram");
  $("#instagramLabel").textContent = t("instagram");
  $("#phoneLabel").textContent = t("phone");
  $("#mapFootnote").textContent = t("mapFootnote");

  // FAQ
  $("#faqTitle").textContent = t("faqTitle");
  $("#faqSubtitle").textContent = t("faqSubtitle");

  // Footer
  $("#footerName").textContent = STORE.name;
  $("#footerTagline").textContent = STORE.tagline[state.lang] || STORE.tagline.en;
  $("#footerDesc").textContent = t("footerDesc");
  $("#footerLinksTitle").textContent = t("footerLinks");
  $("#footerLinkProducts").textContent = t("products");
  $("#footerLinkServices").textContent = t("services");
  $("#footerLinkLocation").textContent = t("location");
  $("#footerLinkFAQ").textContent = t("faq");
  $("#footerContactTitle").textContent = t("footerContact");
  $("#footerTelegramLabel").textContent = t("telegram");
  $("#footerInstagramLabel").textContent = t("instagram");
  $("#footerPhoneLabel").textContent = t("phone");
  $("#legalNote").textContent = t("legal");

  // Cart
  $("#cartTitle").textContent = t("cartTitle");
  $("#cartSubtitle").textContent = t("cartSubtitle");
  $("#checkoutTelegram").textContent = t("checkoutTelegram");
  $("#checkoutInstagram").textContent = t("checkoutInstagram");
  $("#checkoutPhone").textContent = t("checkoutPhone");
  $("#checkoutHint").textContent = t("checkoutHint");

  // Links
  $("#btnOpenMaps").href = STORE.mapsUrl;
  $("#btnTelegram").href = `https://t.me/${encodeURIComponent(STORE.telegramUsername)}`;
  $("#btnInstagram").href = STORE.instagramUrl;
  $("#btnPhone").href = `tel:${STORE.phoneE164}`;
  $("#footerTelegram").href = `https://t.me/${encodeURIComponent(STORE.telegramUsername)}`;
  $("#footerInstagram").href = STORE.instagramUrl;
  $("#footerPhone").href = `tel:${STORE.phoneE164}`;

  // Search placeholders
  $("#searchInput").placeholder = state.lang === "ru" ? "РџРѕРёСЃРє С‚РѕРІР°СЂРѕРІвЂ¦" : state.lang === "uz" ? "Mahsulot qidirishвЂ¦" : "Search productsвЂ¦";
  $("#searchInputMobile").placeholder = $("#searchInput").placeholder;

  // Icons
  $("#iconMenu").innerHTML = ICONS.menu;
  $("#iconSearch").innerHTML = ICONS.search;
  $("#iconSearchMobile").innerHTML = ICONS.search;
  $("#iconCart").innerHTML = ICONS.cart;
  $("#iconHeart").innerHTML = ICONS.heart;
  $("#iconBolt").innerHTML = ICONS.bolt;
  $("#iconPhone").innerHTML = ICONS.phone;
  $("#iconPhone2").innerHTML = ICONS.phone;
  $("#iconPhone3").innerHTML = ICONS.phone;
  $("#iconPhone4").innerHTML = ICONS.phone;
  $("#iconPhone5").innerHTML = ICONS.phone;
  $("#iconMap").innerHTML = ICONS.map;
  $("#iconArrowDown").innerHTML = ICONS.arrowDown;
  $("#iconClose").innerHTML = ICONS.close;
  $("#iconClose2").innerHTML = ICONS.close;
  $("#iconPlus").innerHTML = ICONS.plus;
  $("#iconHeart2").innerHTML = ICONS.heart;
  $("#iconTelegram").innerHTML = ICONS.telegram;
  $("#iconTelegram2").innerHTML = ICONS.telegram;
  $("#iconTelegram3").innerHTML = ICONS.telegram;
  $("#iconTelegram4").innerHTML = ICONS.telegram;
  $("#iconInstagram").innerHTML = ICONS.instagram;
  $("#iconInstagram2").innerHTML = ICONS.instagram;
  $("#iconInstagram3").innerHTML = ICONS.instagram;
  $("#iconInstagram4").innerHTML = ICONS.instagram;

  // Theme icon refresh
  $("#iconTheme").innerHTML = ICONS.sunMoon(state.theme === "dark");
}
