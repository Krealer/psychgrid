// ===============================
// PsychGrid – chest.js
// ===============================

import { getItemById } from './item_loader.js'; // ✅ CORRECT
import { addItemToInventory } from './inventory.js';
import { getConfig } from './config_loader.js';
import { chestState } from './chest_state.js'; // External chest logic if used

/**
 * Initializes the chest system
 */
export async function initChest() {
  chestState.items = [];
  renderChestUI();
}

/**
 * Opens the chest UI and activates overlay
 */
export function showChestUI() {
  const chestUI = document.getElementById('chest-ui');
  const overlay = document.getElementById('state-overlay');
  if (!chestUI || !overlay) return;

  chestUI.classList.remove('hidden');
  overlay.classList.remove('hidden');

  renderChestUI();
}

/**
 * Closes chest UI and deactivates overlay
 */
export function hideChestUI() {
  const chestUI = document.getElementById('chest-ui');
  const overlay = document.getElementById('state-overlay');
  if (!chestUI || !overlay) return;

  chestUI.classList.add('hidden');
  overlay.classList.add('hidden');
}

/**
 * Renders the chest contents to the UI using item icons
 */
export function renderChestUI() {
  const chestUI = document.getElementById('chest-ui');
  if (!chestUI) return;

  chestUI.innerHTML = `
    <h2>Chest</h2>
    <ul id="chest-items" class="chest-grid"></ul>
    <button id="close-chest">Close</button>
  `;

  const list = document.getElementById('chest-items');
  chestState.items.forEach((itemId, index) => {
    const item = getItemById(itemId);
    const li = document.createElement('li');
    li.classList.add('triangle-item');
    li.title = item?.description || '';

    // SVG icon
    const img = document.createElement('img');
    img.src = item?.icon || `./assets/${itemId}.svg`;
    img.alt = item?.name || itemId;
    img.style.width = '32px';
    img.style.height = '32px';
    img.style.display = 'block';
    img.style.margin = '0 auto';

    // Label
    const label = document.createElement('span');
    label.textContent = item?.name || itemId;
    label.style.display = 'block';
    label.style.textAlign = 'center';
    label.style.fontSize = '0.7rem';
    label.style.color = '#ccc';

    li.appendChild(img);
    li.appendChild(label);

    li.onclick = () => {
      const success = addItemToInventory(itemId);
      if (!success) {
        alert('Inventory full or duplicate item not allowed.');
        return;
      }
      chestState.items.splice(index, 1);
      renderChestUI();
    };

    list.appendChild(li);
  });

  document.getElementById('close-chest').onclick = hideChestUI;
}

