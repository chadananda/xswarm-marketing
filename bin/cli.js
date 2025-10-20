#!/usr/bin/env node

/**
 * xswarm-marketing CLI Entry Point
 *
 * Guerilla marketing automation via conversational AI.
 * Part of the xSwarm family: https://xswarm.ai
 *
 * Usage:
 *   xswarm-marketing              # Human mode (conversational)
 *   xswarm-marketing --json       # Machine mode (JSONL protocol)
 *   xswarm-marketing init         # First-time setup
 */

import { program } from 'commander';
import chalk from 'chalk';
import { runHumanMode } from '../src/modes/human.js';
import { runMachineMode } from '../src/modes/machine.js';
import { runInit } from '../src/commands/init.js';
import { getVersion } from '../src/utils/version.js';

// ASCII Art Banner
const banner = `
╦ ╦╔═╗╦ ╦╔═╗╦═╗╔╦╗  ╔╦╗╔═╗╦═╗╦╔═╔═╗╔╦╗╦╔╗╔╔═╗
╔╩╦╝╚═╗║║║╠═╣╠╦╝║║║───║║║╠═╣╠╦╝╠╩╗║╣  ║ ║║║║║ ╦
╩ ╚═╚═╝╚╩╝╩ ╩╩╚═╩ ╩  ╩ ╩╩ ╩╩╚═╩ ╩╚═╝ ╩ ╩╝╚╝╚═╝
${chalk.cyan('Team of One • AI Marketing • xSwarm Family')}
`;

// CLI Configuration
program
  .name('xswarm-marketing')
  .description('AI-powered guerilla marketing automation for technical founders')
  .version(getVersion())
  .option('-j, --json', 'Machine mode: JSONL protocol for external orchestration')
  .option('-v, --verbose', 'Verbose logging');

// Init Command
program
  .command('init')
  .description('Initialize xswarm-marketing in current directory (first-time setup)')
  .action(async () => {
    console.log(banner);
    await runInit();
  });

// Default Action (Conversational Mode)
program.action(async (options) => {
  // Don't show banner in machine mode (JSONL should be clean)
  if (!options.json) {
    console.log(banner);
    console.log(chalk.gray('Type "help" for commands, "exit" to quit.\n'));
  }

  // Route to appropriate mode
  if (options.json) {
    await runMachineMode();
  } else {
    await runHumanMode();
  }
});

// Parse CLI arguments
program.parse();
