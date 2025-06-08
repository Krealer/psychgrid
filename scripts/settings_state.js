// ===============================
// scripts/settings_state.js
// ===============================

import { playerState } from './state.js';

let settingsPanel = null;

/**
 * Creates or toggles the settings UI.
 */
export function toggleSettings() {
  if (settingsPanel) {
    settingsPanel.remove();
    settingsPanel = null;
    return;
  }

  // Create panel
  settingsPanel = document.createElement('div');
  settingsPanel.id = 'settings-panel';
  Object.assign(settingsPanel.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#111',
    color: '#fff',
    padding: '20px',
    borderRadius: '8px',
    zIndex: '10000',
    textAlign: 'left',
    minWidth: '240px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    fontFamily: 'sans-serif'
  });

  settingsPanel.innerHTML = `
    <h3 style="margin-top: 0;">⚙️ Settings</h3>

    <section style="margin-bottom: 1em;">
      <h4 style="margin-bottom: 0.5em;">General</h4>
      <label>
        <input type="checkbox" id="setting-memory-debug">
        Enable Memory Debug (M key)
      </label>
    </section>

    <section style="margin-bottom: 1em;">
      <h4 style="margin-bottom: 0.5em;">Developer</h4>
      <label>
        <input type="checkbox" id="setting-dev-mode">
        Developer Mode
      </label>
    </section>

    <button id="close-settings" style="
      margin-top: 1em;
      background: #333;
      color: #fff;
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Close</button>
  `;

  document.body.appendChild(settingsPanel);
  bindSettingsControls();
}

/**
 * Binds logic to settings checkboxes and buttons.
 */
function bindSettingsControls() {
  const memoryCheckbox = document.getElementById('setting-memory-debug');
  const devCheckbox = document.getElementById('setting-dev-mode');
  const closeBtn = document.getElementById('close-settings');

  // Set initial values (defaults to false)
  playerState.settings = playerState.settings || {
    memoryDebug: false,
    developerMode: false
  };

  memoryCheckbox.checked = playerState.settings.memoryDebug;
  devCheckbox.checked = playerState.settings.developerMode;

  // Event bindings
  memoryCheckbox.onchange = (e) => {
    playerState.settings.memoryDebug = e.target.checked;
    console.log('Memory Debug:', e.target.checked);
  };

  devCheckbox.onchange = (e) => {
    playerState.settings.developerMode = e.target.checked;
    alert('Developer Mode is toggled. Reload might be needed for some features.');
  };

  closeBtn.onclick = () => {
    settingsPanel.remove();
    settingsPanel = null;
  };
}
