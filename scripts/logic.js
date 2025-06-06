// ===============================
// PsychGrid – logic.js
// ===============================

import { playerState } from './state.js';
import { getItemById } from './inventory.js';

/**
 * Checks if the player has crafted the key and reached the door.
 * Called by interaction.js when interacting with a door.
 */
export function checkWinCondition() {
  return playerState.inventory.includes('iron_key');
}

/**
 * Prevents duplicate items from being given (enforced elsewhere too)
 */
export function canReceiveItem(itemId) {
  return (
    !playerState.inventory.includes(itemId) &&
    playerState.inventory.length < 3
  );
}

/**
 * Determines if a character can manipulate the player.
 * Based on player's current state (can be extended).
 */
export function isPlayerManipulatable() {
  // Placeholder: could be based on dialogue history, fear/trust scores
  return playerState.flags.hasBeenTricked < 2;
}

/**
 * Applies consequences if player is manipulated by an NPC.
 * Removes a random item.
 */
export function applyManipulationConsequence() {
  if (playerState.inventory.length === 0) return;

  const randomIndex = Math.floor(Math.random() * playerState.inventory.length);
  const removedItem = playerState.inventory.splice(randomIndex, 1)[0];

  alert(`You were manipulated and lost: ${getItemById(removedItem).name}`);
}

/**
 * Logs an event for tracking flags/stats (future use)
 */
export function logEvent(type, detail) {
  playerState.log.push({ type, detail, time: Date.now() });
}
