// ===============================
// PsychGrid – inventory.js
// ===============================

import { playerState } from './state.js';
import { chestState } from './chest_state.js';
import { renderChestUI } from './chest.js';
import { getItemById } from './item_loader.js';

/**
 * Initializes inventory UI on game load
 */
export function initInventory() {
  renderInventory();
}

/**
 * Adds item to inventory if space and not duplicate
 * @param {string} itemId
 * @returns {boolean} success
 */
export function addItemToInventory(itemId) {
  if (hasItem(itemId)) return false;
  if (playerState.inventory.length >= 3) return false;

  playerState.inventory.push(itemId);
  renderInventory();
  return true;
}

/**
 * Removes a single item by ID
 * @param {string} itemId
 * @returns {boolean} success
 */
export function removeItemFromInventory(itemId) {
  const index = playerState.inventory.indexOf(itemId);
  if (index === -1) return false;

  playerState.inventory.splice(index, 1);
  renderInventory();
  return true;
}

/**
 * Removes multiple items
 * @param {string[]} itemIds
 * @returns {boolean} success
 */
export function removeItemsFromInventory(itemIds) {
  const clone = [...playerState.inventory];

  for (const id of itemIds) {
    const index = clone.indexOf(id);
    if (index === -1) return false;
    clone.splice(index, 1);
  }

  playerState.inventory = clone;
  renderInventory();
  return true;
}

/**
 * Checks if player has an item
 * @param {string} itemId
 * @returns {boolean}
 */
export function hasItem(itemId) {
  return playerState.inventory.includes(itemId);
}

/**
 * Renders inventory to #inventory-list
 */
/**
 * Renders inventory to #inventory-list using SVG icons
 */
export function renderInventory() {
  const container = document.getElementById('inventory-list');
  if (!container) return;

  container.innerHTML = '';

  if (playerState.inventory.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'Inventory is empty';
    empty.style.color = '#666';
    container.appendChild(empty);
    return;
  }

  playerState.inventory.forEach(itemId => {
    const item = getItemById(itemId);
    if (!item) {
      console.warn(`Missing metadata for item: ${itemId}`);
      return;
    }

    const li = document.createElement('li');
    li.classList.add('triangle-item');
    li.title = item.description || '';

    // SVG Icon
    const img = document.createElement('img');
    img.src = item.icon || `./assets/${itemId}.svg`; // Fallback path
    img.alt = item.name || itemId;
    img.style.width = '32px';
    img.style.height = '32px';
    img.style.display = 'block';
    img.style.margin = '0 auto';

    // Label
    const label = document.createElement('span');
    label.textContent = item.name || itemId;
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

      if (!removeItemFromInventory(itemId)) return;
      chestState.items.push(itemId);
      renderChestUI();
    };

    container.appendChild(li);
  });
}
