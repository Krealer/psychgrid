// ===============================
// item_loader.js
// ===============================

export async function loadItems() {
  try {
    const res = await fetch('./data/items.json');
    const data = await res.json();
    window.allItems = data; // ✅ THIS MUST EXIST
    return data;
  } catch (err) {
    console.error('Item loading error:', err);
    return [];
  }
}

export function getItemById(id) {
  const items = window.allItems || [];
  return items.find(item => item.id === id) || null;
}
