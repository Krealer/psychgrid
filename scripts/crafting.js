// ===============================
// PsychGrid – crafting.js
// ===============================

import { playerState } from './state.js';
import { getItemById, addItemToInventory, removeItemsFromInventory } from './inventory.js';
import { loadRecipes } from './recipe_loader.js';

let recipes = [];

/**
 * Load crafting recipes once
 */
async function ensureRecipesLoaded() {
  if (recipes.length === 0) {
    recipes = await loadRecipes();
  }
}

/**
 * Render crafting UI with available recipes
 */
export async function renderCraftingUI() {
  await ensureRecipesLoaded();

  const container = document.getElementById('crafting-ui');
  if (!container) return;

  container.classList.remove('hidden');
  const options = document.getElementById('crafting-options');
  options.innerHTML = '';

  recipes.forEach(recipe => {
    const button = document.createElement('button');
    const item = getItemById(recipe.output);
    const label = item ? item.name : recipe.output;
    button.textContent = `Craft: ${label}`;
    button.onclick = () => attemptCraft(recipe);
    options.appendChild(button);
  });
}

/**
 * Hides the crafting interface
 */
export function hideCraftingUI() {
  const container = document.getElementById('crafting-ui');
  if (container) {
    container.classList.add('hidden');
    container.innerHTML = '<h2>Crafting</h2><div id="crafting-options"></div>';
  }
}

/**
 * Attempts to craft an item using player inventory
 */
function attemptCraft(recipe) {
  const inv = playerState.inventory;
  const missing = recipe.input.filter(req => !inv.includes(req));

  if (missing.length > 0) {
    alert(`Missing items: ${missing.join(', ')}`);
    return;
  }

  // Remove input items
  removeItemsFromInventory(recipe.input);

  // Add crafted item
  const success = addItemToInventory(recipe.output);
  if (!success) {
    alert('Could not add crafted item.');
    return;
  }

  alert(`Crafted: ${recipe.output}`);
}
