// ===============================
// PsychGrid – viera.js
// ===============================

import { playerState } from '../scripts/state.js';

export const Viera = {
  name: "Viera",
  id: "viera",
  colorClass: "viera", // CSS: .circle.viera = dark pink
  position: { x: 14, y: 4 },

  /**
   * Places Viera on the grid
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
   * Interaction logic – Viera may reward respect or punish arrogance
   */
  interact(playerInventory) {
    const trust = playerState.flags.trust[this.name] || 0;
    const fear = playerState.flags.fear[this.name] || 0;

    // Reward path: high trust, doesn't already have item
    if (trust >= 2 && !playerInventory.includes('wood_handle')) {
      return { give: 'wood_handle' };
    }

    // Punishment path: low trust and has something to lose
    if (trust < 0 && fear > 0 && playerInventory.includes('iron_ingot')) {
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
