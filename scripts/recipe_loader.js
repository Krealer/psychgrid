// ===============================
// PsychGrid – recipe_loader.js
// ===============================

let allRecipes = [];

/**
 * Loads recipes from the JSON file and stores them in memory
 */
export async function loadRecipes() {
  try {
    const res = await fetch('./data/recipes.json');
    if (!res.ok) throw new Error('Failed to load recipes');
    allRecipes = await res.json();
  } catch (error) {
    console.error('Error loading recipes:', error);
  }
}

/**
 * Returns the currently loaded recipes
 * Used by crafting.js and other systems
 */
export function getRecipes() {
  return allRecipes;
}
