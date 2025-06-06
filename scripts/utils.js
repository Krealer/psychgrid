// ===============================
// PsychGrid – utils.js
// ===============================

import { hasItem } from './inventory.js';
import { playerState } from './state.js';

/**
 * Checks if two tile positions are adjacent (4-directional)
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {boolean}
 */
export function isAdjacent(x1, y1, x2, y2) {
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);
  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

/**
 * Clamps a number between min and max
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Returns a random element from an array
 * @param {Array} array
 * @returns {*}
 */
export function randomChoice(array) {
  if (!Array.isArray(array) || array.length === 0) return null;
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

/**
 * Generates a 2D position key (e.g., "3,7") from x/y
 */
export function posKey(x, y) {
  return `${x},${y}`;
}

/**
 * Pauses execution for X ms (for async timing)
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Checks if any blocking UI (dialogue, chest, crafting) is visible
 * @returns {boolean}
 */
export function isUIBlocking() {
  return (
    !document.getElementById('dialogue-box')?.classList.contains('hidden') ||
    !document.getElementById('chest-ui')?.classList.contains('hidden') ||
    !document.getElementById('crafting-ui')?.classList.contains('hidden')
  );
}

/**
 * Checks if two positions are within N tiles distance (default 1)
 * Uses Chebyshev distance (max of dx, dy)
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} maxDistance
 * @returns {boolean}
 */
export function isWithinDistance(x1, y1, x2, y2, maxDistance = 1) {
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);
  return Math.max(dx, dy) <= maxDistance;
}

/**
 * Common dialogue condition helpers
 */
export const Conditions = {
  hasItem: (itemId) => hasItem(itemId),
  notHasItem: (itemId) => !hasItem(itemId),
  flagEquals: (flagPath, expectedValue) => {
    const keys = flagPath.split('.');
    let current = playerState.flags;
    for (const key of keys) {
      if (!(key in current)) return false;
      current = current[key];
    }
    return current === expectedValue;
  }
};
