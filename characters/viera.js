// ===============================
// /characters/viera.js
// ===============================

import { playerState } from '../scripts/state.js';
import { renderCharacter } from '../scripts/character_renderer.js';

export const Viera = {
  name: "Viera",
  id: "viera",
  colorClass: "viera", // CSS: .circle.viera = dark pink
  position: { x: 14, y: 4 },

  /**
   * Places Viera on the grid
   */
  spawn() {
    renderCharacter({
      name: this.name,
      x: this.position.x,
      y: this.position.y,
      color: '#d81b60', // 💗 dark pink (Material Design pink[700])
      extraClasses: [this.colorClass]
    });
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
