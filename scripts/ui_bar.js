// ===============================
// PsychGrid – ui_bar.js (updated)
// ===============================

import { toggleInventoryUI } from './inventory_state.js';
import { resetGameState } from './reset_state.js';
import { toggleSettings } from './settings_state.js';

/**
 * Creates a bottom UI bar with main controls
 */
export function renderUIBar() {
  // UI Bar container
  const bar = document.createElement('div');
  bar.id = 'ui-bar';
  bar.style.position = 'fixed';
  bar.style.bottom = '0';
  bar.style.left = '0';
  bar.style.width = '100%';
  bar.style.background = '#1a1a1a';
  bar.style.color = '#fff';
  bar.style.display = 'flex';
  bar.style.justifyContent = 'center';
  bar.style.gap = '20px';
  bar.style.padding = '10px 0';
  bar.style.zIndex = '9999';
  bar.style.borderTop = '1px solid #333';

  const createButton = (label, onClick) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.padding = '8px 16px';
    btn.style.border = 'none';
    btn.style.borderRadius = '4px';
    btn.style.background = '#333';
    btn.style.color = '#fff';
    btn.style.cursor = 'pointer';
    btn.onmouseenter = () => btn.style.background = '#555';
    btn.onmouseleave = () => btn.style.background = '#333';
    btn.onclick = onClick;
    return btn;
  };

  const inventoryBtn = createButton('Inventory', toggleInventoryUI);
  const resetBtn = createButton('Reset', resetGameState);
  const settingsBtn = createButton('Settings', toggleSettings);

  bar.appendChild(inventoryBtn);
  bar.appendChild(resetBtn);
  bar.appendChild(settingsBtn);
  document.body.appendChild(bar);

  // Inventory container (hidden by default)
  const inventoryPanel = document.createElement('ul');
  inventoryPanel.id = 'inventory-list';
  inventoryPanel.style.position = 'fixed';
  inventoryPanel.style.bottom = '60px'; // above UI bar
  inventoryPanel.style.left = '50%';
  inventoryPanel.style.transform = 'translateX(-50%)';
  inventoryPanel.style.display = 'none';
  inventoryPanel.style.flexDirection = 'row';
  inventoryPanel.style.gap = '12px';
  inventoryPanel.style.listStyle = 'none';
  inventoryPanel.style.padding = '10px';
  inventoryPanel.style.background = 'rgba(0, 0, 0, 0.75)';
  inventoryPanel.style.borderRadius = '8px';
  inventoryPanel.style.zIndex = '9998';

  document.body.appendChild(inventoryPanel);
}
