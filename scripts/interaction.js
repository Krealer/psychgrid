// ===============================
// PsychGrid – interaction.js
// ===============================

import { playerState } from './state.js';
import { startDialogue } from './dialogue_state.js';
import { renderCraftingUI, hideCraftingUI } from './crafting.js';
import { showChestUI } from './chest.js';
import { characters } from '../characters/character_registry.js';
import { miraDialogue } from '../dialogue/mira_dialogue.js';
import { selenaDialogue } from '../dialogue/selena_dialogue.js';
import { vieraDialogue } from '../dialogue/viera_dialogue.js';
import { kaelDialogue } from '../dialogue/kael_dialogue.js';

/**
 * Registers global keyboard input (E key for interaction)
 */
export function registerInteractions() {
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e') {
      tryAdjacentInteract();
    }
  });
}

/**
 * Attempts interaction with nearby tile entities
 */
function tryAdjacentInteract() {
  const { x, y } = playerState.position;

  const adjacent = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 }
  ];

  for (const pos of adjacent) {
    const entity = getEntityAt(pos.x, pos.y);
    if (!entity) continue;

    handleInteraction(entity);
    return;
  }

  hideCraftingUI(); // Hide if not actively interacting
}

/**
 * Attempts to interact with the specified tile
 * (Used by double-click interaction)
 * @param {number} x
 * @param {number} y
 */
export function tryInteractAt(x, y) {
  const entity = getEntityAt(x, y);
  if (!entity) return;

  handleInteraction(entity);
}

/**
 * Handles interaction logic for any entity type
 * @param {Object} entity
 */
function handleInteraction(entity) {
  if (entity.type === 'npc') {
    const dialogue = getDialogueForNPC(entity.name);
    if (dialogue) {
      startDialogue(entity, dialogue);
    }
  }

  else if (entity.type === 'table') {
    renderCraftingUI();
  }

  else if (entity.type === 'chest') {
    showChestUI();
  }

  else if (entity.type === 'door') {
    if (playerState.inventory.includes('iron_key')) {
      alert('You used the key and escaped. You win!');
      // Future: trigger end screen
    } else {
      alert('The door is locked.');
    }
  }
}

/**
 * Retrieves entity (character or object) at a grid coordinate
 * @param {number} x
 * @param {number} y
 * @returns {Object|null}
 */
function getEntityAt(x, y) {
  // Check NPCs
  for (const char of characters) {
    if (char.position.x === x && char.position.y === y) {
      return { type: 'npc', name: char.name };
    }
  }

  // Check static tiles
  const staticEntities = {
    '0,10': { type: 'door' },
    '19,10': { type: 'door' },
    '5,5': { type: 'table' },
    '2,2': { type: 'chest' }
  };

  const key = `${x},${y}`;
  return staticEntities[key] || null;
}

/**
 * Links NPC names to their dialogue trees
 * @param {string} name
 * @returns {Array|null}
 */
function getDialogueForNPC(name) {
  switch (name) {
    case 'Selena': return selenaDialogue;
    case 'Mira': return miraDialogue;
    case 'Viera': return vieraDialogue;
    case 'Kael': return kaelDialogue;
    default: return null;
  }
}
