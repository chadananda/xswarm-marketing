/**
 * Init Command
 *
 * First-time setup for xswarm-buzz.
 * Creates the promotion folder structure and context files.
 */

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';

export async function runInit() {
  console.log(chalk.cyan('\n🎯 xswarm-buzz initialization\n'));
  console.log(chalk.gray('This will set up your project for AI-driven guerilla marketing.\n'));

  // Check if already initialized
  const exists = await checkExisting();
  if (exists) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'xswarm-buzz files already exist. Overwrite?',
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log(chalk.yellow('\n✋ Init cancelled.\n'));
      return;
    }
  }

  // Create folder structure
  const spinner = ora('Creating folder structure...').start();

  try {
    await createFolderStructure();
    spinner.succeed('Folder structure created');

    // Create context files
    spinner.start('Creating context templates...');
    await createContextTemplates();
    spinner.succeed('Context templates created');

    // Create config
    spinner.start('Creating config files...');
    await createConfigFiles();
    spinner.succeed('Config files created');

    // Create .gitignore
    spinner.start('Updating .gitignore...');
    await updateGitignore();
    spinner.succeed('.gitignore updated');

    console.log(chalk.green('\n✅ Initialization complete!\n'));
    console.log(chalk.cyan('📁 Created structure:'));
    console.log(chalk.gray('  context/          - Product, market, personas, voice'));
    console.log(chalk.gray('  campaigns/        - Active, planned, completed'));
    console.log(chalk.gray('  audiences/        - Prospects, contacts (gitignored)'));
    console.log(chalk.gray('  interactions/     - Engagement history (gitignored)'));
    console.log(chalk.gray('  config/           - Auth, model preferences (gitignored)'));
    console.log(chalk.gray('  .claude/skills/   - Marketing capabilities\n'));

    console.log(chalk.cyan('📝 Next steps:'));
    console.log(chalk.gray('  1. Fill in context/*.md files with your product/market info'));
    console.log(chalk.gray('  2. Configure config/model-preferences.json'));
    console.log(chalk.gray('  3. Run: xswarm-buzz\n'));

    console.log(chalk.yellow('⚠️  Note: Currently in planning phase'));
    console.log(chalk.gray('Full implementation coming in Phase 2.\n'));
  } catch (error) {
    spinner.fail('Initialization failed');
    console.error(chalk.red(`\n❌ Error: ${error.message}\n`));
    throw error;
  }
}

async function checkExisting() {
  try {
    await fs.access('context');
    return true;
  } catch {
    return false;
  }
}

async function createFolderStructure() {
  const folders = [
    'context',
    'campaigns/active',
    'campaigns/planned',
    'campaigns/completed',
    'audiences',
    'interactions',
    'config/auth',
    '.claude/skills/core',
    '.claude/skills/fetched',
    '.claude/skills/custom',
  ];

  for (const folder of folders) {
    await fs.mkdir(folder, { recursive: true });
  }
}

async function createContextTemplates() {
  // product.md
  await fs.writeFile(
    'context/product.md',
    `# Product Context

## What We Built
[Describe your product/service in 2-3 sentences]

## Why It Matters
[What problem does it solve? Why should people care?]

## Key Features
- Feature 1
- Feature 2
- Feature 3

## Unique Value Proposition
[What makes this different from alternatives?]

## Success Stories
[Any early wins, testimonials, or results?]
`
  );

  // market.md
  await fs.writeFile(
    'context/market.md',
    `# Market Context

## Target Market
[Who needs this? Be specific: industry, role, company size, etc.]

## Market Landscape
[What's happening in this market? Trends, pain points, opportunities]

## Competition
[Who else is solving this problem? How are you different?]

## Market Size & Opportunity
[How big is this opportunity? Growth potential?]
`
  );

  // personas.md
  await fs.writeFile(
    'context/personas.md',
    `# Persona Context

## Primary Persona: [Name]
- **Role:** [Job title]
- **Demographics:** [Age range, location, etc.]
- **Pain Points:**
  - Pain point 1
  - Pain point 2
- **Language & Communication:**
  - How they talk
  - What resonates with them
- **Where They Hang Out:**
  - LinkedIn, Twitter, specific Slack communities, etc.

## Secondary Persona: [Name]
[Repeat above structure]
`
  );

  // voice.md
  await fs.writeFile(
    'context/voice.md',
    `# Voice Context

## Your Writing Style
[How do YOU communicate? Formal? Casual? Technical? Friendly?]

Examples of your writing:
- [Paste a few examples of messages, posts, or emails you've written]
- [This helps AI match your authentic voice]

## Tone Guidelines
- ✅ Do: [What to emphasize]
- ❌ Don't: [What to avoid]

## Phrases You Use
[Common phrases, terminology, or expressions you naturally use]
`
  );
}

async function createConfigFiles() {
  // model-preferences.json
  const modelPreferences = {
    tier1: {
      preferred: ['claude-sonnet', 'gpt-4'],
      maxCostPerRequest: 0.5,
    },
    tier2: {
      preferred: ['claude-haiku', 'llama-3.2-local'],
      maxCostPerRequest: 0.1,
    },
    tier3: {
      preferred: ['llama-local', 'phi-local'],
      preferLocal: true,
    },
    embeddings: {
      provider: 'local',
      model: 'all-MiniLM-L6-v2',
    },
  };

  await fs.writeFile('config/model-preferences.json', JSON.stringify(modelPreferences, null, 2));

  // .env template
  await fs.writeFile(
    'config/.env.example',
    `# API Keys (copy to .env and fill in)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_API_KEY=

# Platform Auth (managed by auth-setup skill)
# LinkedIn, Gmail, etc. tokens stored in config/auth/
`
  );
}

async function updateGitignore() {
  const gitignoreContent = `
# xswarm-buzz sensitive data
config/.env
config/auth/
audiences/prospects.json
audiences/contacts.json
audiences/*.json
interactions/
`;

  try {
    const existing = await fs.readFile('.gitignore', 'utf-8');
    if (!existing.includes('xswarm-buzz')) {
      await fs.appendFile('.gitignore', gitignoreContent);
    }
  } catch {
    // .gitignore doesn't exist, create it
    await fs.writeFile('.gitignore', gitignoreContent);
  }
}
