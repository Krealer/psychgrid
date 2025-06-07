// ===============================
// /characters/player.js
// ===============================

import { playerState } from '../scripts/state.js';
import { renderCharacter } from '../scripts/character_renderer.js';

/**
 * Initial placement of the player
 */
export function setupPlayer() {
  renderPlayer();
}

/**
 * Renders the player at their current position
 */
export function renderPlayer() {
  // Remove existing player element
  const old = document.querySelector('.circle.player');
  if (old && old.parentElement) old.remove();

  renderCharacter({
    name: 'Player',
    x: playerState.position.x,
    y: playerState.position.y,
    color: '#00bcd4', // 🟦 cyan
    extraClasses: ['player']
  });
}
