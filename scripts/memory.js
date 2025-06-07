// ===============================
// PsychGrid – memory.js
// ===============================

import { playerState } from './state.js';
import { renderMemoryDebugUI } from './memory_debug.js';

/**
 * Marks a memory flag for a given NPC.
 * @param {string} npc – e.g., "Kael"
 * @param {string} flag – e.g., "gotNotebook"
 */
export function markNpcMemory(npc, flag) {
  if (!playerState.npcMemory[npc]) {
    playerState.npcMemory[npc] = new Set();
  }
  playerState.npcMemory[npc].add(flag);

  renderMemoryDebugUI?.(); // Optional, safe check
}



/**
 * Checks if a specific memory flag is set for an NPC.
 * @param {string} npc
 * @param {string} flag
 * @returns {boolean}
 */
export function checkNpcMemory(npc, flag) {
  return playerState.npcMemory[npc]?.has(flag) || false;
}

/**
 * Clears a specific memory flag for an NPC.
 * @param {string} npc
 * @param {string} flag
 */
export function clearNpcMemory(npc, flag) {
  playerState.npcMemory[npc]?.delete(flag);
}

/**
 * Clears all memory for all NPCs.
 */
export function resetAllNpcMemory() {
  for (const npc in playerState.npcMemory) {
    playerState.npcMemory[npc] = new Set();
  }
}

/**
 * Returns the full memory structure for debugging
 */
export function getNpcMemory() {
  return playerState.npcMemory;
}
