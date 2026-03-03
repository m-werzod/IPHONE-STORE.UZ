"use strict";

const SECTION_PATHS = {
  topBanner: "src/sections/top-banner.html",
  header: "src/sections/header.html",
  hero: "src/sections/hero.html",
  products: "src/sections/products.html",
  services: "src/sections/services.html",
  brands: "src/sections/brands.html",
  location: "src/sections/location.html",
  faq: "src/sections/faq.html",
  footer: "src/sections/footer.html",
  productModal: "src/sections/product-modal.html",
  cartDrawer: "src/sections/cart-drawer.html",
  toastHost: "src/sections/toast-host.html",
};

function injectHtml(slot, html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  slot.replaceWith(template.content.cloneNode(true));
}

async function loadSection(slot) {
  const key = slot.dataset.section;
  const path = SECTION_PATHS[key];
  if (!path) {
    throw new Error(`Unknown section key: ${key}`);
  }

  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load section (${response.status}): ${path}`);
  }

  const html = await response.text();
  injectHtml(slot, html);
}

function loadScript(path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = path;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${path}`));
    document.body.appendChild(script);
  });
}

(async function boot() {
  try {
    const slots = Array.from(document.querySelectorAll("[data-section]"));
    await Promise.all(slots.map((slot) => loadSection(slot)));
    await loadScript("src/js/app.js");
  } catch (error) {
    console.error(error);
  }
})();
