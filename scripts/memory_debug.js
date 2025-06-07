// ===============================
// PsychGrid – memory_debug.js
// ===============================

import { getNpcMemory } from './memory.js';

const debugPanelId = 'memory-debug';

/**
 * Toggle memory debug panel visibility
 */
export function toggleMemoryDebugUI() {
  let panel = document.getElementById(debugPanelId);

  if (panel) {
    panel.remove(); // 🧼 Clean toggle
    return;
  }

  panel = document.createElement('div');
  panel.id = debugPanelId;
  panel.style.position = 'fixed';
  panel.style.bottom = '0';
  panel.style.right = '0';
  panel.style.background = 'rgba(0, 0, 0, 0.8)';
  panel.style.color = '#fff';
  panel.style.padding = '10px';
  panel.style.fontSize = '12px';
  panel.style.maxHeight = '40vh';
  panel.style.overflowY = 'auto';
  panel.style.zIndex = '9999';
  panel.style.borderTopLeftRadius = '8px';

  panel.innerHTML = '<strong>🧠 NPC Memory Debug</strong><br><br>';

  const memory = getNpcMemory();
  for (const [npc, flags] of Object.entries(memory)) {
    panel.innerHTML += `<div><strong>${npc}</strong>: ${[...flags].join(', ') || '—'}</div>`;
  }

  document.body.appendChild(panel);
}

export function renderMemoryDebugUI() {
  let panel = document.getElementById('memory-debug');
  if (!panel) return; // Don't create panel unless it's already toggled

  panel.innerHTML = '<strong>🧠 NPC Memory Debug</strong><br><br>';

  const memory = getNpcMemory();
  for (const [npc, flags] of Object.entries(memory)) {
    panel.innerHTML += `<div><strong>${npc}</strong>: ${[...flags].join(', ') || '—'}</div>`;
  }
}
