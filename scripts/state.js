// ===============================
// PsychGrid – state.js
// ===============================

/**
 * Player state
 */
export const playerState = {
  position: { x: 10, y: 10 },
  inventory: [],
  rewardsGiven: [],
  npcMemory: {        // ✅ Corrected: Moved from "memory"
    Kael: new Set(),
    Selena: new Set(),
    Mira: new Set(),
    Viera: new Set()
  },
  flags: {
    hasBeenTricked: 0,
    trust: {
      Selena: 0,
      Mira: 0,
      Viera: 0,
      Kael: 0
    },
    fear: {
      Selena: 0,
      Kael: 0
    }
  },
  log: []
};

/**
 * Shared chest state (100 item cap)
 */
export const chestState = {
  items: []
};

/**
 * Room object placement (static references)
 * Can be expanded or loaded from grid.json
 */
export const roomObjects = {
  table: { x: 5, y: 5 },
  chest: { x: 2, y: 2 },
  door:  { x: 19, y: 10 }
};

/**
 * Initializes the state (e.g. reset for new game)
 */
export function initializeState(gridSize = 20) {
  playerState.position = { x: 10, y: 10 };
  playerState.inventory = [];
  playerState.rewardsGiven = [];
  playerState.flags.hasBeenTricked = 0;
  playerState.log = [];

  // ✅ Reset memory
  for (const key in playerState.npcMemory) {
    playerState.npcMemory[key] = new Set();
  }

  chestState.items = [];
}
