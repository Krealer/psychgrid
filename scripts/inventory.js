// ===============================
// PsychGrid – inventory.js
// ===============================

import { playerState } from './state.js';
import { chestState } from './chest_state.js'; // ✅ Correct file
import { renderChestUI } from './chest.js';
import { getItemById } from './item_loader.js'; // ✅ Added missing import

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
  const inv = playerState.inventory;

  if (inv.includes(itemId)) return false;
  if (inv.length >= 3) return false;

  inv.push(itemId);
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
 */
export function hasItem(itemId) {
  return playerState.inventory.includes(itemId);
}

/**
 * Renders inventory to #inventory-list
 */
export function renderInventory() {
  const container = document.getElementById('inventory-list');
  container.innerHTML = '';

  playerState.inventory.forEach(itemId => {
    const item = getItemById(itemId);
    const li = document.createElement('li');
    li.classList.add('triangle-item');
    li.title = item?.description || '';
    li.textContent = ''; // No inner text by default

    // Add name label under triangle
    const label = document.createElement('span');
    label.textContent = item ? item.name : itemId;
    label.style.position = 'absolute';
    label.style.bottom = '-1.2rem';
    label.style.fontSize = '0.75rem';
    label.style.color = '#ccc';
    label.style.whiteSpace = 'nowrap';

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
