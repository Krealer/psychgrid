// ===============================
// PsychGrid – grid.js
// ===============================

/**
 * Creates a grid of the given width and height inside #grid-container
 * Each tile gets the class .grid-tile and data-x/data-y attributes
 * @param {number} width
 * @param {number} height
 */
export function createGrid(width, height) {
  const container = document.getElementById('grid-container');
  if (!container) {
    console.error('Missing #grid-container element');
    return;
  }

  container.innerHTML = ''; // clear if re-rendered
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${height}, 1fr)`;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tile = document.createElement('div');
      tile.classList.add('grid-tile');
      tile.dataset.x = x;
      tile.dataset.y = y;
      container.appendChild(tile);
    }
  }
}
