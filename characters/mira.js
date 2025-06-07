// ===============================
// /characters/mira.js
// ===============================

import { playerState } from '../scripts/state.js';
import { renderCharacter } from '../scripts/character_renderer.js';

export const Mira = {
  name: "Mira",
  id: "mira",
  color: "#e2d45c", // 🟡 soft yellow
  position: { x: 4, y: 15 },

  /**
   * Places Mira on the grid using shared renderer
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
   * Interaction logic — Mira only gives items
   */
  interact(playerInventory) {
    if (!playerInventory.includes('iron_ingot')) {
      return { give: 'iron_ingot' };
    }
    return null;
  }
};
