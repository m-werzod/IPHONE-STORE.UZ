"use strict";

const LS = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const state = {
  lang: LS.get("lang", "en"),
  currency: LS.get("currency", "UZS"),
  theme: LS.get("theme", "dark"),
  query: "",
  category: LS.get("category", "all"),
  sort: LS.get("sort", "featured"),
  compact: LS.get("compact", false),
  cart: LS.get("cart", {}), // { productId: qty }
  wishlist: LS.get("wishlist", {}), // { productId: true }
  activeProductId: null,
};
