// ===============================
// PsychGrid – router.js
// ===============================

/**
 * UI panel registry
 * Keys are logical names (e.g., "dialogue", "crafting")
 * Values are DOM elements
 */
const panels = {
  dialogue: document.getElementById('dialogue-panel'),
  crafting: document.getElementById('crafting-panel'),
  inventory: document.getElementById('inventory-panel'),
  win: null,       // Optional: future modal or screen
  pause: null      // Optional: for future pause logic
};

/**
 * Show a panel and optionally hide all others
 * @param {string} name - The key of the panel to show
 * @param {boolean} [hideOthers=true] - Whether to hide everything else
 */
export function showPanel(name, hideOthers = true) {
  if (hideOthers) hideAllPanels();
  const panel = panels[name];
  if (panel) panel.classList.remove('hidden');
}

/**
 * Hide a specific panel
 */
export function hidePanel(name) {
  const panel = panels[name];
  if (panel) panel.classList.add('hidden');
}

/**
 * Hide all panels
 */
export function hideAllPanels() {
  Object.values(panels).forEach(panel => {
    if (panel) panel.classList.add('hidden');
  });
}

/**
 * Register additional panels dynamically
 * Useful for custom or future UI elements
 */
export function registerPanel(name, element) {
  panels[name] = element;
}
