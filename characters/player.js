// ===============================
// PsychGrid – player.js
// ===============================

import { playerState } from '../scripts/state.js';

/**
 * Initial placement of the player
 */
export function setupPlayer() {
  renderPlayer();
}

/**
 * Renders the player at their current position on the grid
 */
export function renderPlayer() {
  // Remove any existing player circles
  const old = document.querySelector('.circle.player');
  if (old && old.parentElement) old.parentElement.removeChild(old);

  const tile = getTileAt(playerState.position.x, playerState.position.y);
  if (!tile) return;

  const playerElement = document.createElement('div');
  playerElement.classList.add('circle', 'player');
  tile.appendChild(playerElement);
}

/**
 * Utility: gets a tile DOM element by x/y
 */
function getTileAt(x, y) {
  return document.querySelector(`.grid-tile[data-x="${x}"][data-y="${y}"]`);
}
