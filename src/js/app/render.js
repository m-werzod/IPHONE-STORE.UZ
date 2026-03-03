"use strict";

/**
 * =========================================================
 * RENDER
 * =========================================================
 */
function filteredProducts() {
  const q = state.query.trim().toLowerCase();
  const byCat = state.category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === state.category);

  const byQuery = !q
    ? byCat
    : byCat.filter((p) => {
        const name = (getProductName(p) || "").toLowerCase();
        const altEn = (p.name.en || "").toLowerCase();
        const altRu = (p.name.ru || "").toLowerCase();
        const altUz = (p.name.uz || "").toLowerCase();
        const tags = (p.tags || []).join(" ").toLowerCase();
        return [name, altEn, altRu, altUz, tags].some((s) => s.includes(q));
      });

  const sorted = [...byQuery];
  if (state.sort === "priceAsc") sorted.sort((a, b) => a.priceUZS - b.priceUZS);
  if (state.sort === "priceDesc") sorted.sort((a, b) => b.priceUZS - a.priceUZS);
  if (state.sort === "new") sorted.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
  if (state.sort === "featured")
    sorted.sort((a, b) => (Number(!!b.featured) - Number(!!a.featured)) || (Number(!!b.isNew) - Number(!!a.isNew)));

  return sorted;
}

function renderCategories() {
  const row = $("#categoryRow");
  row.innerHTML = "";
  for (const c of CATEGORIES) {
    const active = c.id === state.category;
    const btn = document.createElement("button");
    btn.className =
      "whitespace-nowrap rounded-2xl border px-4 py-2 text-sm font-semibold transition " +
      (active
        ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
        : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800");
    btn.textContent = c.label[state.lang] || c.label.en;
    btn.addEventListener("click", () => {
      state.category = c.id;
      LS.set("category", c.id);
      renderAll();
    });
    row.appendChild(btn);
  }
}

function stockPill(p) {
  if (p.stock <= 0) return { text: t("outOfStock"), cls: "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-200" };
  if (p.stock <= 5) return { text: t("lowStock"), cls: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/60 dark:text-amber-200" };
  return { text: t("inStock"), cls: "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-200" };
}

function renderProducts() {
  const grid = $("#productGrid");
  const empty = $("#emptyState");
  const items = filteredProducts();

  $("#resultsMeta").textContent = t("results", items.length);

  grid.className = state.compact
    ? "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
    : "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

  grid.innerHTML = "";

  if (items.length === 0) {
    empty.classList.remove("hidden");
    $("#btnEmptyReset").textContent = t("emptyReset");
    return;
  }
  empty.classList.add("hidden");

  for (const p of items) {
    const inWish = !!state.wishlist[p.id];
    const qty = state.cart[p.id] || 0;
    const stock = stockPill(p);

    const card = document.createElement("div");
    card.className =
      "group overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900";

    card.innerHTML = `
      <div class="relative">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(getProductName(p))}" class="${state.compact ? "h-44" : "h-52"} w-full object-cover" loading="lazy">
        <div class="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          ${p.badge ? `<span class="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900">${escapeHtml(p.badge)}</span>` : ""}
          <span class="rounded-full border px-3 py-1 text-xs font-semibold ${stock.cls}">${escapeHtml(stock.text)}</span>
        </div>
        <button class="btnWish absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white/90 backdrop-blur hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/80" aria-label="Wishlist" data-id="${escapeHtml(p.id)}">
          <span class="${inWish ? "text-rose-600" : "text-zinc-700 dark:text-zinc-200"}">${ICONS.heart}</span>
        </button>
      </div>

      <div class="${state.compact ? "p-4" : "p-5"}">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="text-xs font-semibold text-zinc-600 dark:text-zinc-400">${escapeHtml(categoryLabel(p.category))}</div>
            <div class="mt-1 text-lg font-semibold tracking-tight">${escapeHtml(getProductName(p))}</div>
          </div>
          <div class="text-right">
            <div class="text-lg font-semibold">${escapeHtml(displayPrice(p.priceUZS))}</div>
            <div class="text-xs text-zinc-500 line-through">${p.oldPriceUZS ? escapeHtml(displayPrice(p.oldPriceUZS)) : ""}</div>
          </div>
        </div>

        <p class="mt-2 line-clamp-2 text-sm text-zinc-700 dark:text-zinc-300">${escapeHtml(getProductDesc(p))}</p>

        <div class="mt-4 flex items-center gap-2">
          <button class="btnAdd inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-zinc-900" data-id="${escapeHtml(p.id)}" ${p.stock <= 0 ? "disabled" : ""}>
            ${ICONS.plus}<span>${escapeHtml(t("add"))}${qty ? ` вЂў ${qty}` : ""}</span>
          </button>
          <button class="btnDetails inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900" data-id="${escapeHtml(p.id)}">
            <span>${escapeHtml(t("details"))}</span>
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  }

  // Bind buttons
  grid.querySelectorAll(".btnAdd").forEach((btn) =>
    btn.addEventListener("click", (e) => addToCart(e.currentTarget.dataset.id))
  );
  grid.querySelectorAll(".btnDetails").forEach((btn) =>
    btn.addEventListener("click", (e) => openProductModal(e.currentTarget.dataset.id))
  );
  grid.querySelectorAll(".btnWish").forEach((btn) =>
    btn.addEventListener("click", (e) => toggleWishlist(e.currentTarget.dataset.id))
  );
}

function renderServices() {
  const services = [
    { icon: "рџљљ", title: { en: "Delivery & pickup", ru: "Р”РѕСЃС‚Р°РІРєР° Рё СЃР°РјРѕРІС‹РІРѕР·", uz: "Yetkazish va olib ketish" }, desc: { en: "Fast options across Tashkent. Pickup in Malika.", ru: "Р‘С‹СЃС‚СЂРѕ РїРѕ РўР°С€РєРµРЅС‚Сѓ. РЎР°РјРѕРІС‹РІРѕР· РЅР° РњР°Р»РёРєР°.", uz: "Toshkent boвЂylab tez. Malikadan olib ketish." } },
    { icon: "рџ› пёЏ", title: { en: "Setup & transfer", ru: "РќР°СЃС‚СЂРѕР№РєР° Рё РїРµСЂРµРЅРѕСЃ", uz: "Sozlash va koвЂchirish" }, desc: { en: "Data transfer, Apple ID help, WhatsApp/Telegram restore.", ru: "РџРµСЂРµРЅРѕСЃ РґР°РЅРЅС‹С…, Apple ID, РІРѕСЃСЃС‚Р°РЅРѕРІР»РµРЅРёРµ С‡Р°С‚РѕРІ.", uz: "MaвЂ™lumot koвЂchirish, Apple ID, chatlarni tiklash." } },
    { icon: "рџ§ѕ", title: { en: "Warranty options", ru: "Р’Р°СЂРёР°РЅС‚С‹ РіР°СЂР°РЅС‚РёРё", uz: "Kafolat variantlari" }, desc: { en: "Discuss warranty and checks in chat before purchase.", ru: "Р“Р°СЂР°РЅС‚РёСЋ Рё РїСЂРѕРІРµСЂРєСѓ СЃРѕРіР»Р°СЃСѓРµРј РІ С‡Р°С‚Рµ.", uz: "Kafolat va tekshiruv chatda kelishiladi." } },
    { icon: "рџ’і", title: { en: "Payments", ru: "РћРїР»Р°С‚Р°", uz: "ToвЂlov" }, desc: { en: "Cash / card / transfer. Installments if available.", ru: "РќР°Р»/РєР°СЂС‚Р°/РїРµСЂРµРІРѕРґ. Р Р°СЃСЃСЂРѕС‡РєР° РїСЂРё РЅР°Р»РёС‡РёРё.", uz: "Naqd/karta/oвЂtkazma. BoвЂlsa boвЂlib toвЂlash." } },
  ];

  const grid = $("#servicesGrid");
  grid.innerHTML = "";
  for (const s of services) {
    const card = document.createElement("div");
    card.className = "rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-soft dark:border-zinc-800 dark:bg-zinc-900";
    card.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="grid h-11 w-11 place-items-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">${s.icon}</div>
        <div>
          <div class="text-sm font-semibold">${escapeHtml(s.title[state.lang] || s.title.en)}</div>
          <div class="mt-1 text-sm text-zinc-700 dark:text-zinc-300">${escapeHtml(s.desc[state.lang] || s.desc.en)}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  }
}

function renderBrands() {
  const brands = [
    { name: "Apple", note: { en: "Devices & originals", ru: "РЈСЃС‚СЂРѕР№СЃС‚РІР° Рё РѕСЂРёРіРёРЅР°Р»С‹", uz: "Qurilmalar va original" } },
    { name: "Anker", note: { en: "GaN chargers", ru: "GaN Р·Р°СЂСЏРґРєРё", uz: "GaN zaryad" } },
    { name: "Belkin", note: { en: "MagSafe accessories", ru: "MagSafe Р°РєСЃРµСЃСЃСѓР°СЂС‹", uz: "MagSafe aksessuar" } },
    { name: "Baseus", note: { en: "Cables & power", ru: "РљР°Р±РµР»Рё Рё РїРёС‚Р°РЅРёРµ", uz: "Kabel va quvvat" } },
  ];

  const grid = $("#brandsGrid");
  grid.innerHTML = "";
  for (const b of brands) {
    const card = document.createElement("div");
    card.className = "rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-soft dark:border-zinc-800 dark:bg-zinc-900";
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <div class="text-lg font-semibold tracking-tight">${escapeHtml(b.name)}</div>
          <div class="mt-1 text-sm text-zinc-700 dark:text-zinc-300">${escapeHtml(b.note[state.lang] || b.note.en)}</div>
        </div>
        <div class="grid h-12 w-12 place-items-center rounded-2xl border border-zinc-200 bg-zinc-50 text-2xl dark:border-zinc-800 dark:bg-zinc-950">рџЏ·пёЏ</div>
      </div>
    `;
    grid.appendChild(card);
  }
}

function renderFAQ() {
  const faqs = [
    { q: { en: "How do I order?", ru: "РљР°Рє Р·Р°РєР°Р·Р°С‚СЊ?", uz: "Qanday buyurtma beraman?" }, a: { en: "Add to cart в†’ open Cart в†’ send order to Telegram. We confirm availability, price, and delivery.", ru: "Р”РѕР±Р°РІСЊС‚Рµ РІ РєРѕСЂР·РёРЅСѓ в†’ РѕС‚РєСЂРѕР№С‚Рµ РљРѕСЂР·РёРЅСѓ в†’ РѕС‚РїСЂР°РІСЊС‚Рµ РІ Telegram. РџРѕРґС‚РІРµСЂРґРёРј РЅР°Р»РёС‡РёРµ, С†РµРЅСѓ Рё РґРѕСЃС‚Р°РІРєСѓ.", uz: "Savatga qoвЂshing в†’ Savatni oching в†’ Telegramga yuboring. Mavjudlik, narx va yetkazishni tasdiqlaymiz." } },
    { q: { en: "Are prices final?", ru: "Р¦РµРЅС‹ РѕРєРѕРЅС‡Р°С‚РµР»СЊРЅС‹Рµ?", uz: "Narxlar yakuniymi?" }, a: { en: "Prices can change by storage/condition and market. We confirm in chat before payment.", ru: "Р¦РµРЅР° Р·Р°РІРёСЃРёС‚ РѕС‚ РїР°РјСЏС‚Рё/СЃРѕСЃС‚РѕСЏРЅРёСЏ Рё СЂС‹РЅРєР°. РџРѕРґС‚РІРµСЂРґРёРј РІ С‡Р°С‚Рµ.", uz: "Narx xotira/holat va bozorga bogвЂliq. Chatda tasdiqlaymiz." } },
    { q: { en: "Do you have delivery in Tashkent?", ru: "Р•СЃС‚СЊ РґРѕСЃС‚Р°РІРєР° РїРѕ РўР°С€РєРµРЅС‚Сѓ?", uz: "Toshkent boвЂylab yetkazish bormi?" }, a: { en: "Yes. Options depend on area and time. Ask in Telegram for the fastest slot.", ru: "Р”Р°. Р—Р°РІРёСЃРёС‚ РѕС‚ СЂР°Р№РѕРЅР° Рё РІСЂРµРјРµРЅРё. РќР°РїРёС€РёС‚Рµ РІ Telegram.", uz: "Ha. Hudud va vaqtga bogвЂliq. Telegramda yozing." } },
    { q: { en: "Can you help with setup and transfer?", ru: "РџРѕРјРѕР¶РµС‚Рµ СЃ РЅР°СЃС‚СЂРѕР№РєРѕР№ Рё РїРµСЂРµРЅРѕСЃРѕРј?", uz: "Sozlash va koвЂchirishga yordam berasizmi?" }, a: { en: "Yes вЂ” Apple ID, data transfer, WhatsApp/Telegram restore, eSIM setup.", ru: "Р”Р° вЂ” Apple ID, РїРµСЂРµРЅРѕСЃ, РІРѕСЃСЃС‚Р°РЅРѕРІР»РµРЅРёРµ С‡Р°С‚РѕРІ, eSIM.", uz: "Ha вЂ” Apple ID, koвЂchirish, chat tiklash, eSIM." } },
  ];

  const grid = $("#faqGrid");
  grid.innerHTML = "";
  for (const f of faqs) {
    const card = document.createElement("div");
    card.className = "rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-soft dark:border-zinc-800 dark:bg-zinc-900";
    card.innerHTML = `
      <div class="text-sm font-semibold">${escapeHtml(f.q[state.lang] || f.q.en)}</div>
      <div class="mt-2 text-sm text-zinc-700 dark:text-zinc-300">${escapeHtml(f.a[state.lang] || f.a.en)}</div>
    `;
    grid.appendChild(card);
  }
}

function renderCart() {
  const host = $("#cartItems");
  host.innerHTML = "";

  const entries = Object.entries(state.cart);
  if (entries.length === 0) {
    host.innerHTML = `
      <div class="grid place-items-center rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <div class="grid h-14 w-14 place-items-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">рџ›’</div>
        <div class="mt-3 text-lg font-semibold">${escapeHtml(t("cartEmpty"))}</div>
        <a href="#products" class="mt-4 rounded-2xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 dark:bg-white dark:text-zinc-900" onclick="document.getElementById('cartOverlay').classList.add('hidden')">${escapeHtml(t("products"))}</a>
      </div>
    `;
  } else {
    for (const [id, qty] of entries) {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) continue;
      const row = document.createElement("div");
      row.className = "mb-3 overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900";
      row.innerHTML = `
        <div class="flex gap-3 p-3">
          <img src="${escapeHtml(p.image)}" class="h-20 w-20 rounded-2xl object-cover" alt="${escapeHtml(getProductName(p))}">
          <div class="flex-1">
            <div class="text-sm font-semibold">${escapeHtml(getProductName(p))}</div>
            <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">${escapeHtml(categoryLabel(p.category))}</div>
            <div class="mt-2 flex items-center justify-between">
              <div class="text-sm font-semibold">${escapeHtml(displayPrice(p.priceUZS))}</div>
              <div class="flex items-center gap-2">
                <button class="btnQty rounded-xl border border-zinc-200 bg-white px-3 py-1 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900" data-id="${escapeHtml(id)}" data-delta="-1" aria-label="Decrease">в€’</button>
                <span class="min-w-[2ch] text-center text-sm font-semibold">${qty}</span>
                <button class="btnQty rounded-xl border border-zinc-200 bg-white px-3 py-1 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900" data-id="${escapeHtml(id)}" data-delta="1" aria-label="Increase">+</button>
                <button class="btnRemove rounded-xl border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-rose-950/40" data-id="${escapeHtml(id)}">${escapeHtml(t("remove"))}</button>
              </div>
            </div>
          </div>
        </div>
      `;
      host.appendChild(row);
    }
  }

  const total = cartTotalUZS();
  $("#cartTotal").textContent = displayPrice(total);
  $("#cartTotalLabel").textContent = t("cartTotal");

  host.querySelectorAll(".btnQty").forEach((b) =>
    b.addEventListener("click", (e) => changeQty(e.currentTarget.dataset.id, Number(e.currentTarget.dataset.delta)))
  );
  host.querySelectorAll(".btnRemove").forEach((b) =>
    b.addEventListener("click", (e) => removeFromCart(e.currentTarget.dataset.id))
  );
}

function renderCounts() {
  const cc = cartCount();
  $("#cartCount").textContent = String(cc);
  $("#topCartCount").textContent = String(cc);
  $("#cartLabel").textContent = t("cart");
  $("#topCartLabel").textContent = t("cart");

  $("#wishCount").textContent = String(wishlistCount());
}

function renderCompactToggle() {
  const btn = $("#btnToggleCompact");
  btn.textContent = state.compact ? t("compactOn") : t("compactOff");
}

function renderAll() {
  renderCounts();
  renderCategories();
  renderCompactToggle();
  renderProducts();
  renderServices();
  renderBrands();
  renderFAQ();
  renderCart();
}
