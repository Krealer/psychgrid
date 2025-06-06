// ===============================
// PsychGrid – recipe_loader.js
// ===============================

let cachedRecipes = null;

/**
 * Loads and caches crafting recipes from data/recipes.json
 * @returns {Promise<Array>} list of recipe objects
 */
export async function loadRecipes() {
  if (cachedRecipes) return cachedRecipes;

  try {
    const res = await fetch('./data/recipes.json');
    if (!res.ok) throw new Error(`Failed to load recipes.json: ${res.status}`);
    cachedRecipes = await res.json();
    return cachedRecipes;
  } catch (err) {
    console.error('Recipe loading error:', err);
    cachedRecipes = [];
    return cachedRecipes;
  }
}
