// ===============================
// /characters/selena.js
// ===============================

import { playerState } from '../scripts/state.js';
import { renderCharacter } from '../scripts/character_renderer.js';

export const Selena = {
  name: "Selena",
  id: "selena",
  colorClass: "selena", // .circle.selena = purple
  position: { x: 10, y: 4 },

  /**
   * Places Selena on the grid
   */
  spawn() {
    renderCharacter({
      name: this.name,
      x: this.position.x,
      y: this.position.y,
      color: '#9c27b0', // 🟣 purple
      extraClasses: [this.colorClass]
    });
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
