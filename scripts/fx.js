// ===============================
// scripts/fx.js
// ===============================

/**
 * Visual FX utility module for PsychGrid
 * Can be extended for sparkles, trails, fade-ins, etc.
 */

/**
 * Highlights a tile briefly (e.g., when player moves)
 * @param {number} x
 * @param {number} y
 */
export function flashTile(x, y, color = 'rgba(255,255,255,0.3)', duration = 200) {
  const tile = document.querySelector(`.grid-tile[data-x="${x}"][data-y="${y}"]`);
  if (!tile) return;

  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = color;
  overlay.style.pointerEvents = 'none';
  overlay.style.transition = `opacity ${duration / 2}ms ease-out`;
  overlay.style.opacity = 1;

  tile.style.position = 'relative';
  tile.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = 0;
    setTimeout(() => tile.removeChild(overlay), duration / 2);
  }, 50);
}

/**
 * Small shake effect for attention or feedback
 * @param {HTMLElement} element
 */
export function shakeElement(element, intensity = 4, duration = 300) {
  const keyframes = [
    { transform: `translate(${intensity}px, 0)` },
    { transform: `translate(-${intensity}px, 0)` },
    { transform: `translate(${intensity / 2}px, 0)` },
    { transform: `translate(0, 0)` }
  ];

  element.animate(keyframes, {
    duration,
    iterations: 1
  });
}
