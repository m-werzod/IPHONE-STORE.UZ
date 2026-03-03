"use strict";

/**
 * =========================================================
 * INIT
 * =========================================================
 */
function init() {
  // Defaults
  $("#langSelect").value = state.lang;
  $("#langSelectMobile").value = state.lang;
  $("#currencySelect").value = state.currency;
  $("#currencySelectMobile").value = state.currency;
  $("#sortSelect").value = state.sort;

  setTheme(state.theme === "dark" ? "dark" : "light");
  hydrateText();
  bindEvents();
  renderAll();
}

init();
