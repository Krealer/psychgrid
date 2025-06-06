// ===============================
// PsychGrid – inventory.js
// ===============================

import { playerState } from './state.js';
import { loadItems } from './item_loader.js';
import { getConfig } from './config_loader.js';

let allItems = [];

/**
 * Loads item metadata and initializes inventory display
 */
export async function initInventory() {
  allItems = await loadItems();
  renderInventory();
}

/**
 * Adds an item to the player's inventory
 * Respects config limits (max items, duplicates)
 */
export function addItemToInventory(itemId) {
  const config = getConfig();
  const inv = playerState.inventory;

  if (inv.length >= config.maxPlayerInventory) {
    alert('Your inventory is full.');
    return false;
  }

  if (!config.allowDuplicateItems && inv.includes(itemId)) {
    alert('You already have this item.');
    return false;
  }

  inv.push(itemId);
  renderInventory();
  return true;
}

/**
 * Removes specific items from inventory (by ID)
 * @param {string[]} itemIds
 */
export function removeItemsFromInventory(itemIds) {
  playerState.inventory = playerState.inventory.filter(
    item => !itemIds.includes(item)
  );
  renderInventory();
}

/**
 * Gets item metadata by ID
 * @param {string} id
 * @returns {Object|null}
 */
export function getItemById(id) {
  return allItems.find(item => item.id === id) || null;
}

/**
 * Renders the inventory UI
 */
export function renderInventory() {
  const list = document.getElementById('inventory-list');
  if (!list) return;

  list.innerHTML = '';

  for (const itemId of playerState.inventory) {
    const item = getItemById(itemId);
    const li = document.createElement('li');
    li.textContent = item ? item.name : itemId;
    list.appendChild(li);
  }
}
