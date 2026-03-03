"use strict";

/**
 * =========================================================
 * ACTIONS
 * =========================================================
 */
function persistCart() {
  LS.set("cart", state.cart);
  renderCounts();
  renderCart();
  renderProducts();
}

function addToCart(productId) {
  const p = PRODUCTS.find((x) => x.id === productId);
  if (!p || p.stock <= 0) return;
  state.cart[productId] = (state.cart[productId] || 0) + 1;
  persistCart();
  toast(t("toastAdded"));
}

function changeQty(productId, delta) {
  const cur = state.cart[productId] || 0;
  const next = cur + delta;
  if (next <= 0) {
    delete state.cart[productId];
    toast(t("toastRemoved"));
  } else {
    state.cart[productId] = next;
  }
  persistCart();
}

function removeFromCart(productId) {
  delete state.cart[productId];
  persistCart();
  toast(t("toastRemoved"));
}

function toggleWishlist(productId) {
  if (state.wishlist[productId]) {
    delete state.wishlist[productId];
    toast(t("toastWishRemoved"));
  } else {
    state.wishlist[productId] = true;
    toast(t("toastWishAdded"));
  }
  LS.set("wishlist", state.wishlist);
  renderCounts();
  renderProducts();
}
