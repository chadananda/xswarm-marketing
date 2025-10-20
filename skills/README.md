# Skills Directory

This directory contains the core marketing skills bundled with xswarm-buzz.

## Structure

```
skills/
├── core/           # Bundled core skills (included in npm package)
│   ├── campaign-creator/
│   ├── message-generator/
│   ├── prospect-analyzer/
│   ├── daily-briefing/
│   └── skill-fetcher/
├── integration/    # Platform integration skills
│   ├── linkedin-connector/
│   ├── gmail-connector/
│   └── facebook-connector/
├── analytics/      # Analytics and learning skills
│   ├── metrics-tracker/
│   └── learning-capture/
└── workflow/       # Workflow automation skills
    ├── outreach-executor/
    └── response-handler/
```

## Skill Format

Each skill is a folder containing:

- `SKILL.md` - Instructions + YAML frontmatter (required)
- `scripts/` - Optional scripts
- `resources/` - Optional resources

### SKILL.md Structure

```markdown
---
description: One clear sentence describing when Claude should use this skill
tier: 2
preferred-models: [llama-3.2-local, claude-haiku]
allowed-tools: [bash, browser]
use-embeddings: false
---

# Skill Name

Detailed instructions for Claude on how to use this skill...
```

## Creating Skills

Use the built-in skill-creator:

```bash
xswarm-buzz
> "Create a new skill called 'my-custom-skill'"
```

Or manually:
1. Create folder: `skills/custom/my-skill/`
2. Add `SKILL.md` with frontmatter and instructions
3. Test: `> "Use my-skill to [scenario]"`

## Fetching Community Skills

Skills can be fetched from the community repository:

```bash
> "Install the tweet-generator skill"
> "Show me available skills for email marketing"
```

Fetched skills are stored in `.claude/skills/fetched/` (user's project).

## Contributing

Create skills and share them via GitHub:
- Repository: https://github.com/chadananda/xswarm-buzz
- Add to: `skills/community/`
- Submit PR with clear description

## Status

🚧 **Planning Phase** - Skill implementations coming in Phase 2.

See `planning/prd.md` for complete specification.
