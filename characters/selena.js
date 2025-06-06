// ===============================
// PsychGrid – selena.js
// ===============================

import { playerState } from '../scripts/state.js';

export const Selena = {
  name: "Selena",
  id: "selena",
  colorClass: "selena", // .circle.selena = purple
  position: { x: 10, y: 4 },

  /**
   * Places Selena on the grid
   */
  spawn() {
    const tile = getTileAt(this.position.x, this.position.y);
    if (!tile) return;

    const npcElement = document.createElement('div');
    npcElement.classList.add('circle', this.colorClass);
    npcElement.dataset.character = this.name;

    tile.appendChild(npcElement);
  },

  /**
   * Interaction logic — Selena never gives items, but may take one.
   */
  interact(playerInventory) {
    const trust = playerState.flags.trust[this.name] || 0;
    const fear = playerState.flags.fear[this.name] || 0;

    if (trust < 0 && fear < 2 && playerInventory.includes('wood_handle')) {
      return { take: 'wood_handle' }; // symbolic punishment
    }

    return null;
  }
};

/**
 * Utility: gets a tile DOM element by x/y
 */
function getTileAt(x, y) {
  return document.querySelector(`.grid-tile[data-x="${x}"][data-y="${y}"]`);
}
