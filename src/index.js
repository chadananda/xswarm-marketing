/**
 * xswarm-buzz
 *
 * AI-powered guerilla marketing automation.
 * Conversational interface, context-driven, multi-model orchestration.
 *
 * Part of the xSwarm family: https://xswarm.ai
 */

export { runHumanMode } from './modes/human.js';
export { runMachineMode } from './modes/machine.js';
export { runInit } from './commands/init.js';
export { getVersion } from './utils/version.js';

// Main API for programmatic usage
export default {
  version: '0.1.0-alpha.1',
  // Future: Programmatic API for embedding in other tools
};
