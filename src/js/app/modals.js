"use strict";

function openProductModal(productId) {
  const p = PRODUCTS.find((x) => x.id === productId);
  if (!p) return;

  state.activeProductId = productId;

  $("#modalTitle").textContent = getProductName(p);
  $("#modalCategory").textContent = categoryLabel(p.category);
  $("#modalImage").src = p.image;
  $("#modalImage").alt = getProductName(p);

  const stock = stockPill(p);
  $("#modalStock").textContent = stock.text;
  $("#modalStock").className = "rounded-full border px-3 py-1 text-xs font-semibold " + stock.cls;

  $("#modalDesc").textContent = getProductDesc(p);

  $("#modalPriceLabel").textContent = t("price");
  $("#modalPrice").textContent = displayPrice(p.priceUZS);
  $("#modalOldPrice").textContent = p.oldPriceUZS ? displayPrice(p.oldPriceUZS) : "";
  $("#modalOldPrice").style.display = p.oldPriceUZS ? "block" : "none";

  $("#modalBadge").textContent = p.badge || "";
  $("#modalBadge").classList.toggle("hidden", !p.badge);

  $("#modalAdd").textContent = t("add");
  $("#modalWish").textContent = t("wishlist");
  $("#modalOrderTitle").textContent = t("orderTitle");
  $("#modalOrderTelegram").textContent = t("orderTelegram");
  $("#modalOrderInstagram").textContent = t("orderInstagram");
  $("#modalOrderPhone").textContent = t("orderPhone");
  $("#modalOrderHint").textContent = t("orderHint");

  $("#btnModalAdd").disabled = p.stock <= 0;
  $("#btnModalAdd").onclick = () => addToCart(p.id);
  $("#btnModalWish").onclick = () => toggleWishlist(p.id);

  const message = buildOrderMessage(
    [{ name: getProductName(p), qty: 1, priceUZS: p.priceUZS }],
    "Product page"
  );

  $("#btnOrderTelegram").onclick = () => openTelegramWithText(message);
  $("#btnOrderInstagram").onclick = () => window.open(STORE.instagramUrl, "_blank", "noreferrer");
  $("#btnOrderPhone").onclick = () => (window.location.href = `tel:${STORE.phoneE164}`);

  $("#modalOverlay").classList.remove("hidden");
  $("#modalOverlay").classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  $("#modalOverlay").classList.add("hidden");
  $("#modalOverlay").classList.remove("flex");
  document.body.style.overflow = "";
  state.activeProductId = null;
}

function openCart() {
  $("#cartOverlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  $("#cartOverlay").classList.add("hidden");
  document.body.style.overflow = "";
}
