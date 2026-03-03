"use strict";

const APP_ENTRY_SCRIPTS = [
  "src/js/app/data/store.js",
  "src/js/app/data/i18n.js",
  "src/js/app/data/catalog.js",
  "src/js/app/data/icons.js",
  "src/js/app/state.js",
  "src/js/app/helpers.js",
  "src/js/app/render.js",
  "src/js/app/hydrate.js",
  "src/js/app/actions.js",
  "src/js/app/modals.js",
  "src/js/app/events.js",
  "src/js/app/init.js",
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

(async function bootApp() {
  try {
    for (const src of APP_ENTRY_SCRIPTS) {
      await loadScript(src);
    }
  } catch (error) {
    console.error(error);
  }
})();
