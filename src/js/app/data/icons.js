"use strict";

/**
 * =========================================================
 * UI ICONS (inline SVG)
 * =========================================================
 */
const ICONS = {
  menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  close: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M10.5 19a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17Z" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.2-4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  cart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M6 6l-2-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" stroke="currentColor" stroke-width="2"/></svg>`,
  heart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.35-9.33-8.5C.6 8.9 2.28 6 5.5 6c1.76 0 3.21.88 4 2.07C10.29 6.88 11.74 6 13.5 6c3.22 0 4.9 2.9 2.83 6.5C19 16.65 12 21 12 21z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  sunMoon: (isDark) =>
    isDark
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 1 0 9.8 9.8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  plus: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  bolt: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6.5 3h3L11 7l-2 2c1.2 2.4 3.1 4.3 5.5 5.5l2-2 4 1.5v3c0 1-1 2-2 2C10.6 19.5 4.5 13.4 4.5 5c0-1 1-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  map: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M10 20l-6 2V6l6-2 4 2 6-2v16l-6 2-4-2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M10 4v16M14 6v16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  arrowDown: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  telegram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.04 15.62 8.9 19.8c.57 0 .82-.24 1.12-.53l2.7-2.58 5.6 4.1c1.02.56 1.75.27 2-.95l3.63-17.02v0c.3-1.4-.5-1.95-1.5-1.58L1.5 9.28c-1.35.52-1.33 1.27-.25 1.6l5.92 1.85L20.7 4.5c.64-.42 1.22-.2.74.22z"/></svg>`,
  instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" stroke="currentColor" stroke-width="2"/><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" stroke-width="2"/><path d="M17.5 6.5h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
};
