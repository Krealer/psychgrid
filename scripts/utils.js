// ===============================
// PsychGrid – utils.js
// ===============================

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
