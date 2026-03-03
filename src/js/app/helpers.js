"use strict";
function t(key, ...args) {
  const dict = I18N[state.lang] || I18N.en;
  const val = dict[key];
  return typeof val === "function" ? val(...args) : val ?? key;
}

function categoryLabel(catId) {
  const c = CATEGORIES.find((x) => x.id === catId) || CATEGORIES[0];
  return c.label[state.lang] || c.label.en;
}

function formatMoneyUZS(uzs) {
  return new Intl.NumberFormat("uz-UZ").format(Math.round(uzs)) + " UZS";
}

function formatMoneyUSD(usd) {
  return "$" + new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(usd));
}

function displayPrice(uzs) {
  if (state.currency === "UZS") return formatMoneyUZS(uzs);
  const usd = uzs / STORE.usdToUzs;
  return formatMoneyUSD(usd);
}

function getProductName(p) {
  return p.name[state.lang] || p.name.en;
}

function getProductDesc(p) {
  return p.desc[state.lang] || p.desc.en;
}

function cartCount() {
  return Object.values(state.cart).reduce((a, b) => a + b, 0);
}

function wishlistCount() {
  return Object.keys(state.wishlist).length;
}

function cartTotalUZS() {
  return Object.entries(state.cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find((x) => x.id === id);
    return p ? sum + p.priceUZS * qty : sum;
  }, 0);
}

function toast(msg) {
  const host = $("#toastHost");
  const el = document.createElement("div");
  el.className =
    "animate-toast rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold shadow-soft dark:border-zinc-800 dark:bg-zinc-900";
  el.textContent = msg;
  host.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

function setTheme(theme) {
  state.theme = theme;
  LS.set("theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
  $("#iconTheme").innerHTML = ICONS.sunMoon(theme === "dark");
}

function setLang(lang) {
  state.lang = lang;
  LS.set("lang", lang);
  document.documentElement.lang = lang;
  hydrateText();
  renderAll();
}

function setCurrency(currency) {
  state.currency = currency;
  LS.set("currency", currency);
  renderAll();
}

function $(sel) {
  const el = document.querySelector(sel);
  if (!el) throw new Error("Missing element: " + sel);
  return el;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildOrderMessage(itemsUZS, context) {
  const lines = [];
  lines.push(`🛒 ${STORE.name} — Order`);
  lines.push(`📍 ${STORE.address.en}`);
  lines.push("");
  lines.push("Items:");
  for (const it of itemsUZS) {
    lines.push(`• ${it.name} ×${it.qty} — ${formatMoneyUZS(it.priceUZS)} each`);
  }
  lines.push("");
  const total = itemsUZS.reduce((s, x) => s + x.priceUZS * x.qty, 0);
  lines.push(`Total: ${formatMoneyUZS(total)}`);
  lines.push("");
  lines.push(`Context: ${context}`);
  lines.push("Name: ");
  lines.push("Phone: ");
  lines.push("Delivery: pickup / delivery");
  return lines.join("\n");
}

function openTelegramWithText(text) {
  const url = `https://t.me/${encodeURIComponent(STORE.telegramUsername)}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noreferrer");
}
