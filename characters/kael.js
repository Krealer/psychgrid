// ===============================
// PsychGrid – kael.js
// ===============================

import { playerState } from '../scripts/state.js';

export const Kael = {
  name: "Kael",
  id: "kael",
  colorClass: "kael", // used in .circle.kael
  position: { x: 15, y: 10 },

  /**
   * Places Kael on the grid at his position
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
   * Determines whether Kael will give or take an item
   * This can be improved based on flags, dialogue, etc.
   */
  interact(playerInventory) {
    // Placeholder logic
    const trust = playerState.flags.trust[this.name] || 0;
    if (trust >= 2 && !playerInventory.includes('wood_handle')) {
      return { give: 'wood_handle' };
    } else if (trust <= -1 && playerInventory.includes('iron_ingot')) {
      return { take: 'iron_ingot' };
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
