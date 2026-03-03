"use strict";
function bindEvents() {
  // Theme
  $("#btnTheme").addEventListener("click", () => setTheme(state.theme === "dark" ? "light" : "dark"));

  // Search (desktop + mobile)
  const onSearch = (value) => {
    state.query = value;
    $("#btnClearSearch").classList.toggle("hidden", !value);
    renderProducts();
  };

  $("#searchInput").addEventListener("input", (e) => onSearch(e.target.value));
  $("#searchInputMobile").addEventListener("input", (e) => onSearch(e.target.value));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!$("#modalOverlay").classList.contains("hidden")) closeProductModal();
      if (!$("#cartOverlay").classList.contains("hidden")) closeCart();
      $("#searchInput").value = "";
      $("#searchInputMobile").value = "";
      state.query = "";
      $("#btnClearSearch").classList.add("hidden");
      renderProducts();
    }
  });

  $("#btnClearSearch").addEventListener("click", () => {
    $("#searchInput").value = "";
    $("#searchInputMobile").value = "";
    state.query = "";
    $("#btnClearSearch").classList.add("hidden");
    renderProducts();
  });

  // Language
  const syncLangSelects = (v) => {
    $("#langSelect").value = v;
    $("#langSelectMobile").value = v;
  };
  $("#langSelect").addEventListener("change", (e) => {
    syncLangSelects(e.target.value);
    setLang(e.target.value);
  });
  $("#langSelectMobile").addEventListener("change", (e) => {
    syncLangSelects(e.target.value);
    setLang(e.target.value);
  });

  // Currency
  const syncCurrencySelects = (v) => {
    $("#currencySelect").value = v;
    $("#currencySelectMobile").value = v;
  };
  $("#currencySelect").addEventListener("change", (e) => {
    syncCurrencySelects(e.target.value);
    setCurrency(e.target.value);
  });
  $("#currencySelectMobile").addEventListener("change", (e) => {
    syncCurrencySelects(e.target.value);
    setCurrency(e.target.value);
  });

  // Sort
  $("#sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    LS.set("sort", state.sort);
    renderProducts();
  });

  // Reset
  const resetAll = () => {
    state.query = "";
    state.category = "all";
    state.sort = "featured";
    LS.set("category", state.category);
    LS.set("sort", state.sort);
    $("#searchInput").value = "";
    $("#searchInputMobile").value = "";
    $("#sortSelect").value = state.sort;
    toast(t("toastCleared"));
    renderAll();
  };
  $("#btnReset").addEventListener("click", resetAll);
  $("#btnEmptyReset").addEventListener("click", resetAll);

  // Compact toggle
  $("#btnToggleCompact").addEventListener("click", () => {
    state.compact = !state.compact;
    LS.set("compact", state.compact);
    renderAll();
  });

  // Modals
  $("#btnCloseModal").addEventListener("click", closeProductModal);
  $("#modalOverlay").addEventListener("click", (e) => {
    if (e.target === $("#modalOverlay")) closeProductModal();
  });

  // Cart open/close
  $("#btnOpenCart").addEventListener("click", openCart);
  $("#btnOpenCartTop").addEventListener("click", openCart);
  $("#btnCloseCart").addEventListener("click", closeCart);
  $("#cartBackdrop").addEventListener("click", closeCart);

  // Checkout actions
  $("#btnCheckoutInstagram").addEventListener("click", () => window.open(STORE.instagramUrl, "_blank", "noreferrer"));
  $("#btnCheckoutPhone").addEventListener("click", () => (window.location.href = `tel:${STORE.phoneE164}`));

  $("#btnCheckoutTelegram").addEventListener("click", () => {
    const items = Object.entries(state.cart)
      .map(([id, qty]) => {
        const p = PRODUCTS.find((x) => x.id === id);
        return p ? { name: getProductName(p), qty, priceUZS: p.priceUZS } : null;
      })
      .filter(Boolean);

    if (items.length === 0) {
      toast(t("cartEmpty"));
      return;
    }
    const msg = buildOrderMessage(items, "Cart checkout");
    openTelegramWithText(msg);
  });

  // Quick order from hero
  $("#btnQuickOrder").addEventListener("click", () => {
    openCart();
    if (cartCount() === 0) {
      // Suggest a top featured item
      const top = PRODUCTS.find((p) => p.featured) || PRODUCTS[0];
      addToCart(top.id);
    }
  });

  // Deal scroll
  $("#btnDealScroll").addEventListener("click", () => {
    document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Wishlist button: show wishlist-only view quickly
  $("#btnWishlist").addEventListener("click", () => {
    const wished = Object.keys(state.wishlist);
    if (wished.length === 0) {
      toast(t("wishlist") + ": 0");
      return;
    }
    state.category = "all";
    state.query = ""; // keep it clean
    LS.set("category", state.category);
    $("#searchInput").value = "";
    $("#searchInputMobile").value = "";
    renderCategories();

    // temporary filter by swapping query behavior:
    const originalFilter = filteredProducts;
    // render cards of wishlist only
    const items = PRODUCTS.filter((p) => state.wishlist[p.id]);
    $("#resultsMeta").textContent = t("wishlist") + ": " + items.length;

    const grid = $("#productGrid");
    const empty = $("#emptyState");
    grid.innerHTML = "";
    empty.classList.add("hidden");
    for (const p of items) {
      const inWish = true;
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
            <span class="text-rose-600">${ICONS.heart}</span>
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
              ${ICONS.plus}<span>${escapeHtml(t("add"))}${qty ? ` • ${qty}` : ""}</span>
            </button>
            <button class="btnDetails inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900" data-id="${escapeHtml(p.id)}">
              <span>${escapeHtml(t("details"))}</span>
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    }

    grid.querySelectorAll(".btnAdd").forEach((btn) =>
      btn.addEventListener("click", (e) => addToCart(e.currentTarget.dataset.id))
    );
    grid.querySelectorAll(".btnDetails").forEach((btn) =>
      btn.addEventListener("click", (e) => openProductModal(e.currentTarget.dataset.id))
    );
    grid.querySelectorAll(".btnWish").forEach((btn) =>
      btn.addEventListener("click", (e) => toggleWishlist(e.currentTarget.dataset.id))
    );

    document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Mobile menu
  $("#btnMobileMenu").addEventListener("click", () => {
    $("#mobileMenu").classList.toggle("hidden");
  });

  // Header nav anchors close menu
  ["#navProducts", "#navServices", "#navLocation", "#navFAQ"].forEach((id) => {
    document.querySelector(id).addEventListener("click", () => $("#mobileMenu").classList.add("hidden"));
  });
}
