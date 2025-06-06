// ===============================
// PsychGrid – dialogue_state.js
// ===============================

import { playerState } from './state.js';
import {
  addItemToInventory,
  removeItemsFromInventory,
  hasItem,
  renderInventory
} from './inventory.js';

let currentDialogue = null;
let currentStep = null;
let currentCharacter = null;

/**
 * Checks if player has already received a unique reward
 * @param {string} itemId
 */
function hasReward(itemId) {
  return playerState.rewardsGiven.includes(itemId);
}

/**
 * Starts dialogue with an NPC
 * @param {Object} character – character object (with .name)
 * @param {Object} dialogueTree – array of steps
 */
export function startDialogue(character, dialogueTree) {
  currentDialogue = dialogueTree;
  currentCharacter = character;
  currentStep = 0;

  showDialogueBox();
  renderDialogueStep();
}

/**
 * Renders the current dialogue line and options
 */
function renderDialogueStep() {
  const step = currentDialogue[currentStep];
  if (!step) {
    endDialogue();
    return;
  }

  const textBox = document.getElementById('dialogue-text');
  const optionsBox = document.getElementById('dialogue-options');

  textBox.textContent = step.text;
  optionsBox.innerHTML = '';

  const validOptions = step.options.filter(option => {
    // Hide if this reward was already given
    if (option.give && hasReward(option.give)) return false;

    // Hide if condition is false
    if (typeof option.condition === 'function' && !option.condition(playerState)) return false;

    return true;
  });

  validOptions.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option.label || option.text || '...';
    btn.onclick = () => handleOption(option);
    optionsBox.appendChild(btn);
  });

  if (validOptions.length === 0) {
    const btn = document.createElement('button');
    btn.textContent = 'End';
    btn.onclick = endDialogue;
    optionsBox.appendChild(btn);
  }
}

/**
 * Handles the logic when a player chooses a dialogue option
 */
function handleOption(option) {
  // Give item only if not already rewarded
  if (option.give && !hasReward(option.give)) {
    const success = addItemToInventory(option.give);
    if (success) {
      playerState.rewardsGiven.push(option.give);
    } else {
      alert('Could not receive item.');
    }
  }

  // Remove item
  if (option.take) {
    removeItemsFromInventory([option.take]);
  }

  // Trust/fear modifiers
  const char = currentCharacter.name;
  if (option.trust !== undefined) {
    playerState.flags.trust[char] = (playerState.flags.trust[char] || 0) + option.trust;
  }
  if (option.fear !== undefined) {
    playerState.flags.fear[char] = (playerState.flags.fear[char] || 0) + option.fear;
  }

  // Move to next
  if (typeof option.goto === 'number') {
    currentStep = option.goto;
    renderDialogueStep();
  } else {
    endDialogue();
  }
}

/**
 * Closes the dialogue UI and resets state
 */
function endDialogue() {
  currentDialogue = null;
  currentStep = null;
  currentCharacter = null;

  const box = document.getElementById('dialogue-box');
  const overlay = document.getElementById('state-overlay');

  if (box) box.classList.add('hidden');
  if (overlay) overlay.classList.add('hidden');

  renderInventory();
}

/**
 * Shows dialogue UI and overlay
 */
function showDialogueBox() {
  const box = document.getElementById('dialogue-box');
  const overlay = document.getElementById('state-overlay');

  if (box) box.classList.remove('hidden');
  if (overlay) overlay.classList.remove('hidden');
}
