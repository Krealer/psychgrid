// ===============================
// PsychGrid – main.js
// ===============================

import { createGrid } from './grid.js';
import { setupPlayer, renderPlayer } from '../characters/player.js';
import { characters } from '../characters/character_registry.js';
import { initInventory } from './inventory.js';
import { initChest } from './chest.js';
import { loadConfig } from './config_loader.js';
import { loadRecipes } from './recipe_loader.js';
import { registerInteractions } from './interaction.js';
import { handleTileClick } from './movement.js';

/**
 * Main game initializer
 */
async function initGame() {
  console.log('Initializing PsychGrid...');

  // Load config and recipes before using
  await loadConfig();
  await loadRecipes();

  // Build 20x20 grid
  createGrid(20, 20);
  bindGridTileClicks();

  // Setup player and characters
  setupPlayer();
  renderPlayer();
  characters.forEach(c => c.spawn());

  // Init inventory and chest system
  await initInventory();
  await initChest();

  // Input handler (keyboard)
  registerInteractions();
}

/**
 * Hook up click handlers to each tile after grid is rendered
 */
function bindGridTileClicks() {
  const tiles = document.querySelectorAll('.grid-tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const x = parseInt(tile.dataset.x);
      const y = parseInt(tile.dataset.y);
      handleTileClick(x, y);
    });
  });
}

initGame();
