// ===============================
// /scripts/character_renderer.js
// ===============================

/**
 * Renders a character node on the map.
 * @param {Object} character – Must contain { name, x, y, color }
 */
export function renderCharacter(character) {
  const tile = document.querySelector(`.grid-tile[data-x="${character.x}"][data-y="${character.y}"]`);
  if (!tile) return;

  // Remove any existing node with same ID
  const existing = document.getElementById(`char-${character.name}`);
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.classList.add('character-node');
  el.id = `char-${character.name}`;
  el.title = character.name;

  el.style.width = '16px';
  el.style.height = '16px';
  el.style.borderRadius = '50%';
  el.style.backgroundColor = character.color || '#aaa';
  el.style.position = 'absolute';
  el.style.top = '50%';
  el.style.left = '50%';
  el.style.transform = 'translate(-50%, -50%)';
  el.style.zIndex = '10';

  // Optional name label on hover
  el.addEventListener('mouseenter', () => {
    const label = document.createElement('div');
    label.textContent = character.name;
    label.classList.add('character-label');
    label.style.position = 'absolute';
    label.style.bottom = '110%';
    label.style.left = '50%';
    label.style.transform = 'translateX(-50%)';
    label.style.fontSize = '0.65rem';
    label.style.color = '#fff';
    label.style.background = '#000a';
    label.style.padding = '2px 4px';
    label.style.borderRadius = '4px';
    label.style.pointerEvents = 'none';
    label.style.whiteSpace = 'nowrap';
    label.classList.add(`char-label-${character.name}`);
    el.appendChild(label);
  });

  el.addEventListener('mouseleave', () => {
    const label = el.querySelector(`.char-label-${character.name}`);
    if (label) label.remove();
  });

  tile.appendChild(el);
}
