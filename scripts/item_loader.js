// ===============================
// PsychGrid – item_loader.js
// ===============================

/**
 * Loads and returns the full item list from items.json
 * @returns {Promise<Array>} List of item objects
 */
export async function loadItems() {
  try {
    const res = await fetch('./data/items.json');
    if (!res.ok) throw new Error(`Failed to load items.json: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Item loading error:', err);
    return [];
  }
}
