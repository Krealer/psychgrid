// ===============================
// PsychGrid – craft_state.js
// ===============================

import { getRecipes } from './recipe_loader.js';

/**
 * Holds the current crafting inputs (max 2)
 */
export const craftState = {
  inputs: [],     // array of item IDs
  result: null    // result item ID or null
};

/**
 * Clears the current crafting input and result
 */
export function resetCrafting() {
  craftState.inputs = [];
  craftState.result = null;
}

/**
 * Adds an item to the crafting input (max 2 items)
 * Automatically updates the result
 * @param {string} itemId
 * @returns {boolean} success
 */
export function addCraftInput(itemId) {
  if (craftState.inputs.length >= 2) return false;
  if (craftState.inputs.includes(itemId)) return false;

  craftState.inputs.push(itemId);
  updateCraftingResult();
  return true;
}

/**
 * Removes an item from the current crafting input
 * @param {string} itemId
 */
export function removeCraftInput(itemId) {
  craftState.inputs = craftState.inputs.filter(id => id !== itemId);
  updateCraftingResult();
}

/**
 * Returns the current result item ID (if any)
 */
export function getCraftResult() {
  return craftState.result;
}

/**
 * Internal: updates the result based on inputs
 */
function updateCraftingResult() {
  const inputSet = new Set(craftState.inputs);
  craftState.result = null;

  for (const recipe of getRecipes()) {
    if (recipe.input.length !== inputSet.size) continue;

    const recipeSet = new Set(recipe.input);
    const match = recipe.input.every(id => inputSet.has(id));

    if (match) {
      craftState.result = recipe.output;
      return;
    }
  }
}
