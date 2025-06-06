// ===============================
// PsychGrid – config_loader.js
// ===============================

let cachedConfig = null;

/**
 * Loads config.json once and caches the result
 * @returns {Promise<Object>} game config object
 */
export async function loadConfig() {
  if (cachedConfig) return cachedConfig;

  try {
    const res = await fetch('./data/config.json');
    if (!res.ok) throw new Error(`Failed to load config.json: ${res.status}`);
    cachedConfig = await res.json();
    return cachedConfig;
  } catch (err) {
    console.error('Config loading error:', err);
    cachedConfig = {}; // fallback to empty object
    return cachedConfig;
  }
}

/**
 * Gets the config synchronously after it's been loaded
 * You MUST call loadConfig() at startup!
 * @returns {Object} cached config
 */
export function getConfig() {
  if (!cachedConfig) {
    console.warn('getConfig() called before loadConfig(). Returning empty config.');
    return {};
  }
  return cachedConfig;
}
