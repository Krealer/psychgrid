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
  const inputs = [...craftState.inputs].sort();
  craftState.result = null;

  console.log('Crafting inputs:', inputs);
  console.log('Available recipes:', getRecipes());

  for (const recipe of getRecipes()) {
    const recipeInputs = [...recipe.input].sort();
    if (inputs.length !== recipeInputs.length) continue;

    const match = inputs.every((id, i) => id === recipeInputs[i]);
    if (match) {
      craftState.result = recipe.output;
      return;
    }
  }
}
