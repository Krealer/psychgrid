// ===============================
// scripts/inventory_state.js
// ===============================

import { playerState } from './state.js';
import { chestState } from './chest_state.js';
import { renderChestUI } from './chest.js';
import { getItemById } from './item_loader.js';

export function renderInventory() {
  const container = document.getElementById('inventory-list');
  if (!container) return;

  container.innerHTML = '';

  playerState.inventory.forEach(itemId => {
    const item = getItemById(itemId);
    const li = document.createElement('li');
    li.classList.add('triangle-item');
    li.title = item?.description || '';

    // Create the image element for the SVG icon
    const img = document.createElement('img');
    img.src = `./assets/${itemId}.svg`;
    img.alt = item?.name || itemId;
    img.style.width = '32px';
    img.style.height = '32px';
    img.style.display = 'block';
    img.style.margin = '0 auto';

    // Optional label underneath
    const label = document.createElement('span');
    label.textContent = item ? item.name : itemId;
    label.style.display = 'block';
    label.style.textAlign = 'center';
    label.style.fontSize = '0.7rem';
    label.style.color = '#ccc';

    li.appendChild(img);
    li.appendChild(label);

    li.onclick = () => {
      if (chestState.items.length >= 100) {
        alert('Chest is full.');
        return;
      }

      const index = playerState.inventory.indexOf(itemId);
      if (index !== -1) {
        playerState.inventory.splice(index, 1);
        chestState.items.push(itemId);
        renderInventory();
        renderChestUI();
      }
    };

    container.appendChild(li);
  });
}

/**
 * Toggles the inventory bar visibility
 */
export function toggleInventoryUI() {
  const panel = document.getElementById('inventory-list');
  if (!panel) return;

  panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
}
