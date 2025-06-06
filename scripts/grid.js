// ===============================
// PsychGrid – grid.js
// ===============================

/**
 * Creates a grid of the given width and height inside #grid-container
 * Each tile gets the class .grid-tile and data-x/data-y attributes
 * Object tiles get an inner .object div (chest, table, door)
 * @param {number} width
 * @param {number} height
 */
export function createGrid(width, height) {
  const container = document.getElementById('grid-container');
  if (!container) {
    console.error('Missing #grid-container element');
    return;
  }

  container.innerHTML = '';
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${height}, 1fr)`;

  const OBJECTS = {
    '2,2': 'chest',
    '5,5': 'table',
    '0,10': 'door1',
    '19,10': 'door2'
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tile = document.createElement('div');
      tile.classList.add('grid-tile');
      tile.dataset.x = x;
      tile.dataset.y = y;

      // Check for object to render
      const key = `${x},${y}`;
      if (OBJECTS[key]) {
        const object = document.createElement('div');
        object.classList.add('object', OBJECTS[key]);
        tile.appendChild(object);
      }

      container.appendChild(tile);
    }
  }
}
