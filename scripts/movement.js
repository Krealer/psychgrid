// ===============================
// scripts/movement.js
// ===============================

import { playerState } from './state.js';
import { renderPlayer } from '../characters/player.js';
import { characters } from '../characters/character_registry.js';
import { tryInteractAt } from './interaction.js';
import { isUIBlocking } from './utils.js';
import { flashTile } from './fx.js';

const STEP_DELAY = 200;
let currentWalkAbort = null;

export function handleTileClick(x, y) {
  if (isUIBlocking()) return;

  if (currentWalkAbort) {
    currentWalkAbort(); // Cancel current walk
    currentWalkAbort = null;
  }

  // Double-click triggers interaction
  if (clickTimeout) {
    clearTimeout(clickTimeout);
    clickTimeout = null;
    tryInteractAt(x, y);
  } else {
    clickTimeout = setTimeout(() => {
      clickTimeout = null;
      attemptMoveTo(x, y);
    }, 250);
  }
}

let clickTimeout = null;

function attemptMoveTo(targetX, targetY) {
  const { x, y } = playerState.position;
  const path = findPath(x, y, targetX, targetY);
  if (!path.length) return;

  walkPath(path);
}

function isWalkable(x, y) {
  const blocked = ['0,10', '19,10', '5,5', '2,2']; // doors, chest, table
  if (characters.some(c => c.position.x === x && c.position.y === y)) return false;
  return !blocked.includes(`${x},${y}`);
}

// A* pathfinding (simple and slow but works for small grid)
function findPath(x0, y0, x1, y1) {
  const open = [{ x: x0, y: y0, path: [] }];
  const visited = new Set();

  while (open.length) {
    const current = open.shift();
    const key = `${current.x},${current.y}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (current.x === x1 && current.y === y1) return current.path;

    const neighbors = [
      { x: current.x + 1, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 },
      { x: current.x, y: current.y - 1 }
    ];

    for (const n of neighbors) {
      if (!isWalkable(n.x, n.y)) continue;
      open.push({
        x: n.x,
        y: n.y,
        path: [...current.path, { x: n.x, y: n.y }]
      });
    }
  }

  return []; // No path found
}

function walkPath(path) {
  let i = 0;
  let aborted = false;

  currentWalkAbort = () => {
    aborted = true;
  };

  function step() {
    if (aborted) return;
    if (i >= path.length) {
      currentWalkAbort = null;
      return;
    }

    const { x, y } = path[i];
    playerState.position = { x, y };
    renderPlayer();
    flashTile(x, y); // ✨ visual feedback

    i++;
    setTimeout(step, STEP_DELAY);
  }

  step();
}

