/**
 * Human Mode - Conversational Interface
 *
 * Natural language interaction with Claude.
 * Default mode when running `xswarm-buzz`.
 */

import chalk from 'chalk';
import inquirer from 'inquirer';

export async function runHumanMode() {
  console.log(chalk.yellow('🚧 Human mode (conversational AI) coming soon!\n'));
  console.log(chalk.gray('This will be the natural language interface where you can:'));
  console.log(chalk.gray('  • Ask "What should I do today?"'));
  console.log(chalk.gray('  • Say "Create a campaign for [target audience]"'));
  console.log(chalk.gray('  • Request "Generate 10 personalized outreach messages"'));
  console.log(chalk.gray('  • And more...\n'));

  console.log(chalk.cyan('📋 Status: Planning Phase'));
  console.log(chalk.gray('See planning/prd.md for full specification.\n'));

  // Placeholder: Simple prompt loop
  const continueLoop = true;
  while (continueLoop) {
    const { command } = await inquirer.prompt([
      {
        type: 'input',
        name: 'command',
        message: chalk.cyan('>'),
        prefix: '',
      },
    ]);

    if (!command || command.toLowerCase() === 'exit') {
      console.log(chalk.gray('\nGoodbye! Come back when implementation is ready. 👋\n'));
      break;
    }

    if (command.toLowerCase() === 'help') {
      console.log(chalk.yellow('\n📚 Help:'));
      console.log(chalk.gray('  help    - Show this help'));
      console.log(chalk.gray('  exit    - Exit the program'));
      console.log(chalk.gray('\n  (Full conversational AI coming in Phase 2)\n'));
    } else {
      console.log(chalk.gray('\n💡 Coming soon! This will execute your request via Claude.\n'));
    }
  }
}
