// ===============================
// PsychGrid – reset_state.js
// ===============================

import { initializeState } from './state.js';
import { initInventory } from './inventory.js';
import { initChest } from './chest.js';
import { characters } from '../characters/character_registry.js';
import { setupPlayer, renderPlayer } from '../characters/player.js';
import { renderMemoryDebugUI } from './memory_debug.js';

/**
 * Fully resets player state, chest, character positions, and UI
 */
export async function resetGameState() {
  if (!confirm('Are you sure you want to reset? All progress will be lost.')) return;

  console.log('🔄 Resetting game state...');

  // Reset core state
  initializeState();

  // Reset inventory and chest
  await initInventory();
  await initChest();

  // Reset characters
  characters.forEach(c => {
    c.despawn?.(); // Optional cleanup hook
    c.spawn();     // Place NPCs again
  });

  // Reset player
  setupPlayer();
  renderPlayer();

  // Optional: refresh debug UI if enabled
  renderMemoryDebugUI?.();

  alert('Game has been reset!');
}
