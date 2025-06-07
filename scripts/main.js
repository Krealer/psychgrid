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
import { loadItems } from './item_loader.js'; 
import { registerInteractions } from './interaction.js';
import { handleTileClick } from './movement.js';
import { toggleMemoryDebugUI } from './memory_debug.js';

const DEV_MODE = true;

/**
 * Main game initializer
 */
async function initGame() {
  console.log('Initializing PsychGrid...');

  await loadConfig();
  await loadItems();
  await loadRecipes();

  createGrid(20, 20);
  bindGridTileClicks();

  setupPlayer();
  renderPlayer();
  characters.forEach(c => c.spawn());

  await initInventory();
  await initChest();

  registerInteractions();

  if (DEV_MODE) {
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'm') {
        toggleMemoryDebugUI();
      }
    });
  }
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
