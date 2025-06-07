// ===============================
// PsychGrid – settings_state.js
// ===============================

let settingsPanel = null;

/**
 * Creates or toggles the settings UI.
 * Placeholder for now — shows "Work in Progress".
 */
export function toggleSettings() {
  if (settingsPanel) {
    settingsPanel.remove();
    settingsPanel = null;
    return;
  }

  settingsPanel = document.createElement('div');
  settingsPanel.id = 'settings-panel';
  settingsPanel.style.position = 'fixed';
  settingsPanel.style.top = '50%';
  settingsPanel.style.left = '50%';
  settingsPanel.style.transform = 'translate(-50%, -50%)';
  settingsPanel.style.background = '#111';
  settingsPanel.style.color = '#fff';
  settingsPanel.style.padding = '20px';
  settingsPanel.style.borderRadius = '8px';
  settingsPanel.style.zIndex = '10000';
  settingsPanel.style.textAlign = 'center';
  settingsPanel.style.minWidth = '200px';
  settingsPanel.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

  settingsPanel.innerHTML = `
    <h3>⚙️ Settings</h3>
    <p>Work in progress...</p>
    <button id="close-settings">Close</button>
  `;

  document.body.appendChild(settingsPanel);

  document.getElementById('close-settings').onclick = () => {
    settingsPanel.remove();
    settingsPanel = null;
  };
}
