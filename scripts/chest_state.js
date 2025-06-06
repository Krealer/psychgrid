// ===============================
// PsychGrid – chest_state.js
// ===============================

/**
 * Manages the state of the player's chest
 * Used to store and retrieve chest item contents
 */

const MAX_CHEST_CAPACITY = 100;

export const chestState = {
  items: [] // array of item IDs
};

/**
 * Resets the chest contents (useful at init or restart)
 */
export function resetChest() {
  chestState.items = [];
}

/**
 * Returns a copy of the current chest items
 */
export function getChestItems() {
  return [...chestState.items];
}

/**
 * Adds an item to the chest if there's room
 * @param {string} itemId
 * @returns {boolean} success
 */
export function addItemToChest(itemId) {
  if (chestState.items.length >= MAX_CHEST_CAPACITY) return false;
  chestState.items.push(itemId);
  return true;
}

/**
 * Removes an item by ID from the chest
 * @param {string} itemId
 * @returns {boolean} success
 */
export function removeItemFromChest(itemId) {
  const index = chestState.items.indexOf(itemId);
  if (index === -1) return false;
  chestState.items.splice(index, 1);
  return true;
}

/**
 * Checks if the chest contains an item
 * @param {string} itemId
 * @returns {boolean}
 */
export function chestHasItem(itemId) {
  return chestState.items.includes(itemId);
}
