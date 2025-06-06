// ===============================
// PsychGrid – mira.js
// ===============================

import { playerState } from '../scripts/state.js';

export const Mira = {
  name: "Mira",
  id: "mira",
  colorClass: "mira", // CSS: .circle.mira = yellow
  position: { x: 4, y: 15 },

  /**
   * Places Mira on the grid
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
   * Interaction logic — Mira only gives items
   * Gives iron_ingot if the player doesn't already have it
   */
  interact(playerInventory) {
    if (!playerInventory.includes('iron_ingot')) {
      return { give: 'iron_ingot' };
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
