// ===============================
// PsychGrid – chest.js
// ===============================

import { getItemById } from './inventory.js';
import { getConfig } from './config_loader.js';

export const chestState = {
  items: [] // Holds item IDs
};

/**
 * Initializes the chest system (can preload items here if needed)
 */
export async function initChest() {
  chestState.items = []; // or preload with some IDs
  renderChestUI();
}

/**
 * Opens the chest UI
 */
export function showChestUI() {
  const chestUI = document.getElementById('chest-ui');
  if (!chestUI) return;

  chestUI.classList.remove('hidden');
  renderChestUI();
}

/**
 * Renders the current contents of the chest
 */
function renderChestUI() {
  const chestUI = document.getElementById('chest-ui');
  if (!chestUI) return;

  chestUI.innerHTML = `
    <h2>Chest</h2>
    <ul id="chest-items"></ul>
    <button id="close-chest">Close</button>
  `;

  const list = document.getElementById('chest-items');
  chestState.items.forEach(itemId => {
    const item = getItemById(itemId);
    const li = document.createElement('li');
    li.textContent = item ? item.name : itemId;
    list.appendChild(li);
  });

  document.getElementById('close-chest').onclick = () => {
    chestUI.classList.add('hidden');
  };
}
