// ===============================
// PsychGrid – movement.js
// ===============================

import { playerState } from './state.js';
import { renderPlayer } from '../characters/player.js';
import { characters } from '../characters/character_registry.js';
import { tryInteractAt } from './interaction.js';
import { isUIBlocking } from './utils.js';

const STEP_DELAY = 200;

let clickTimeout = null;

export function handleTileClick(x, y) {
  if (isUIBlocking()) return;
  if (clickTimeout) {
    clearTimeout(clickTimeout);
    clickTimeout = null;
    tryInteractAt(x, y); // Double click → interact
  } else {
    clickTimeout = setTimeout(() => {
      clickTimeout = null;
      attemptMoveTo(x, y); // Single click → move
    }, 250);
  }
}

function attemptMoveTo(targetX, targetY) {
  const { x, y } = playerState.position;

  const path = computePath(x, y, targetX, targetY);
  if (path.length === 0) return;

  walkPath(path);
}

function computePath(x0, y0, x1, y1) {
  const path = [];
  let cx = x0;
  let cy = y0;

  while (cx !== x1 || cy !== y1) {
    let nextX = cx;
    let nextY = cy;

    if (cx < x1) nextX++;
    else if (cx > x1) nextX--;

    else if (cy < y1) nextY++;
    else if (cy > y1) nextY--;

    if (!isWalkable(nextX, nextY)) break;

    path.push({ x: nextX, y: nextY });
    cx = nextX;
    cy = nextY;
  }

  return path;
}

function isWalkable(x, y) {
  // Cannot walk on characters
  if (characters.some(c => c.position.x === x && c.position.y === y)) return false;

  // Cannot walk on static objects
  const blocked = ['0,10', '19,10', '5,5', '2,2']; // doors, table, chest
  return !blocked.includes(`${x},${y}`);
}

function walkPath(path) {
  let i = 0;

  function step() {
    if (i >= path.length) return;

    const { x, y } = path[i];
    playerState.position = { x, y };
    renderPlayer();
    i++;

    setTimeout(step, STEP_DELAY);
  }

  step();
}
