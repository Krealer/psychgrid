// ===============================
// PsychGrid – crafting.js
// ===============================

import { playerState } from './state.js';
import { getItemById } from './item_loader.js'; // ✅ Centralized
import {
  hasItem,
  removeItemsFromInventory,
  addItemToInventory
} from './inventory.js';

import {
  craftState,
  addCraftInput,
  removeCraftInput,
  resetCrafting,
  getCraftResult
} from './craft_state.js';

const craftingUI = document.getElementById('crafting-ui');
const overlay = document.getElementById('state-overlay');

/**
 * Show the crafting UI
 */
export function renderCraftingUI() {
  if (!craftingUI || !overlay) return;
  craftingUI.classList.remove('hidden');
  overlay.classList.remove('hidden');
  renderCraftingSlots();
}

/**
 * Hide crafting UI and reset state
 */
export function hideCraftingUI() {
  if (!craftingUI || !overlay) return;
  craftingUI.classList.add('hidden');
  overlay.classList.add('hidden');
  resetCrafting();
}

/**
 * Render the 2 input slots and result output
 */
function renderCraftingSlots() {
  craftingUI.innerHTML = `
    <h2>Crafting</h2>
    <div id="crafting-slots" style="display: flex; gap: 20px; justify-content: center; margin-bottom: 10px;">
      <div class="craft-slot" id="slot-1"></div>
      <div class="craft-slot" id="slot-2"></div>
      <div class="craft-result" id="result-slot"></div>
    </div>
    <div id="crafting-inventory"></div>
    <button id="close-crafting">Close</button>
  `;

  document.getElementById('close-crafting').onclick = hideCraftingUI;

  const slot1 = document.getElementById('slot-1');
  const slot2 = document.getElementById('slot-2');
  const resultSlot = document.getElementById('result-slot');

  const [first, second] = craftState.inputs;

  // Render input slots
  [slot1, slot2].forEach((slot, i) => {
    const itemId = craftState.inputs[i];
    if (itemId) {
      const item = getItemById(itemId);
      slot.textContent = item.name;
      slot.title = item.description;
      slot.onclick = () => {
        removeCraftInput(itemId);
        renderCraftingSlots();
      };
    } else {
      slot.textContent = 'Empty';
    }
  });

  // Render result slot
  const result = getCraftResult();
  if (result) {
    const item = getItemById(result);
    resultSlot.textContent = item.name;
    resultSlot.title = item.description;
    resultSlot.classList.add('clickable');
    resultSlot.onclick = () => {
      const success = removeItemsFromInventory([...craftState.inputs]);
      if (!success) return alert('Failed to remove inputs.');

      const added = addItemToInventory(result);
      if (!added) return alert('Inventory full or duplicate.');

      resetCrafting();
      renderCraftingSlots();
    };
  } else {
    resultSlot.textContent = 'No Match';
    resultSlot.classList.remove('clickable');
  }

  // Show clickable inventory items
// Show clickable inventory items
const invContainer = document.getElementById('crafting-inventory');
invContainer.innerHTML = '<h4>Your Items</h4>';
const ul = document.createElement('ul');
ul.style.display = 'flex';
ul.style.gap = '10px';
ul.style.flexWrap = 'wrap';

playerState.inventory.forEach(itemId => {
  const item = getItemById(itemId);

  if (!item) {
    console.warn(`Missing item metadata for ID: ${itemId}`);
    return;
  }

  const li = document.createElement('li');
  li.textContent = item.name;
  li.title = item.description;
  li.style.background = '#333';
  li.style.padding = '5px 10px';
  li.style.borderRadius = '4px';
  li.style.cursor = 'pointer';

  li.onclick = () => {
    const added = addCraftInput(itemId);
    if (added) {
      console.log(`Added "${itemId}" to crafting input.`);
      renderCraftingSlots();
    } else {
      console.warn(`Could not add "${itemId}" to crafting input.`);
    }
  };

  ul.appendChild(li);
});

invContainer.appendChild(ul);
}
