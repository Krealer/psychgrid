// ===============================
// /characters/kael.js
// ===============================

import { playerState } from '../scripts/state.js';
import { renderCharacter } from '../scripts/character_renderer.js';

export const Kael = {
  name: "Kael",
  id: "kael",
  color: "#cc4444", // 🔴 custom color (override if needed)
  position: { x: 15, y: 10 },

  /**
   * Places Kael on the grid using the shared renderer
   */
  spawn() {
    renderCharacter({
      name: this.name,
      x: this.position.x,
      y: this.position.y,
      color: this.color
    });
  },

  /**
   * Determines whether Kael will give or take an item
   */
  interact(playerInventory) {
    const trust = playerState.flags.trust[this.name] || 0;

    if (trust >= 2 && !playerInventory.includes('wood_handle')) {
      return { give: 'wood_handle' };
    } else if (trust <= -1 && playerInventory.includes('iron_ingot')) {
      return { take: 'iron_ingot' };
    }
    return null;
  }
};
