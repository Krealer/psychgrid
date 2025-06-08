// ===============================
// scripts/dev_interactions.js
// ===============================

import { characters } from '../characters/character_registry.js';
import { playerState } from './state.js';

/**
 * Analyzes and logs potential character interactions
 */
export function checkCharacterInteractions() {
  const report = characters.map(character => {
    const inventorySamples = [[], ['iron_ingot'], ['wood_handle']];
    const results = [];

    inventorySamples.forEach(sample => {
      const result = character.interact(sample);
      if (result) {
        results.push({ sample, result });
      }
    });

    return {
      name: character.name,
      id: character.id,
      trust: playerState.flags.trust[character.name] || 0,
      fear: playerState.flags.fear[character.name] || 0,
      interactions: results
    };
  });

  console.clear();
  console.log('%c[DEV] Character Interaction Report', 'color: cyan; font-weight: bold;');
  report.forEach(r => {
    console.log(`\n%c${r.name}`, 'font-weight: bold; color: yellow');
    console.log(`  Trust: ${r.trust}, Fear: ${r.fear}`);
    if (r.interactions.length === 0) {
      console.log('  ⚠️ No interactions found for sample inventories.');
    } else {
      r.interactions.forEach(({ sample, result }) => {
        const sampleDesc = sample.length > 0 ? sample.join(', ') : 'Empty';
        const action = result.give ? `Gives ${result.give}` : result.take ? `Takes ${result.take}` : 'No action';
        console.log(`  [${sampleDesc}] → ${action}`);
      });
    }
  });
}
