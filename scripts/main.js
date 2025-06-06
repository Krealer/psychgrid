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
import { loadItems } from './item_loader.js'; // ✅ Load item data
import { registerInteractions } from './interaction.js';
import { handleTileClick } from './movement.js';

/**
 * Main game initializer
 */
async function initGame() {
  console.log('Initializing PsychGrid...');

  // Load data
  await loadConfig();
  await loadItems();      // ✅ Ensure item data is available
  await loadRecipes();

  // Build grid
  createGrid(20, 20);
  bindGridTileClicks();

  // Characters
  setupPlayer();
  renderPlayer();
  characters.forEach(c => c.spawn());

  // Inventory & chest
  await initInventory();
  await initChest();

  // Input handlers
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
