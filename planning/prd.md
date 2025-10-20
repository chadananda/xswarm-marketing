# xswarm-marketing PRD
## Context-Driven Guerrilla Marketing with Claude Code

**Version:** 2.0
**Date:** October 20, 2025

---

## 1. Overview

**xswarm-marketing** wraps Claude Code SDK to create context-driven marketing automation in any project folder.

```
Your Project/promotion/
├── .claude/skills/        # Core, fetched, custom
├── context/               # Product, markets, personas, user voice
├── campaigns/             # Active, planned, completed
├── audiences/             # Prospects, contacts (gitignored)
├── interactions/          # Engagement history (gitignored)
└── config/                # Auth, model preferences (gitignored)
```

**Core principle:** CD to promotion folder → Run npx xswarm-marketing → AI uses context → Executes marketing

---

## 2. Architecture

### Components
- **xswarm-marketing**: npm wrapper, Standard I/O (JSONL), core skills, subagent orchestration
- **Claude Code**: AI engine, skill execution, context reading
- **Skills**: Modular capabilities (SKILL.md + scripts + resources)
- **Subagents**: Delegate tasks to cheapest appropriate model

### Model Tiers
- **Tier 1** (Complex): Claude Sonnet, GPT-4, Gemini Pro - Strategy, creative, reasoning
- **Tier 2** (Standard): Claude Haiku, GPT-3.5, Gemini Flash, Llama 3.2 - Data extraction, simple analysis
- **Tier 3** (Simple): Local models (Llama, Phi) - List ops, file organization, parsing

### Model Selection
1. Check skill's preferred-models
2. Check user's tier preferences (config/model-preferences.json)
3. Try local models if prefer_local=true
4. Check API availability and cost constraints
5. Select cheapest available
6. Fall back to next tier if needed

### User Configuration
Users specify model preferences per tier, cost limits, local endpoints, embedding models. System respects preferences while optimizing cost.

### Standard I/O
JSONL protocol for machine orchestration. Two modes:
- Human mode: Natural conversation (default)
- Machine mode: `--json` flag, structured I/O for external orchestrators

**Message types:** command, approval, status, progress, result, log, error, control

---

## 3. Skills

### What are Skills?
Folders containing SKILL.md (instructions + metadata) + optional scripts/resources. Claude auto-discovers and loads relevant skills based on description.

**Locations:**
- Personal: `~/.claude/skills/` (global)
- Project: `.claude/skills/` (shared via git)
- Plugin: Bundled with plugins

### SKILL.md Format
```markdown
---
description: When Claude should use this skill
tier: 2
preferred-models: [llama-3.2-local, claude-haiku]
allowed-tools: [bash, browser]
use-embeddings: false
---

# Skill Name
Instructions for Claude
```

### Core Skills (npm)
- **campaign-creator** (T1): Interactive campaign builder with research
- **message-generator** (T1): AI-generated personalized messages from context
- **prospect-analyzer** (T1): Deep prospect intelligence
- **skill-fetcher** (T2): Download skills from GitHub
- **daily-briefing** (T2+T1): Morning routine with prioritization
- **auth-setup** (T2): OAuth flows and credential management

### Integration Skills (npm)
- **linkedin-connector**: OAuth, search, profile analysis, messaging
- **gmail-connector**: Email sending, thread management
- **facebook-connector**: Group discovery, post scheduling

### Analytics Skills (npm)
- **metrics-tracker** (T3): Track campaigns, conversion rates
- **learning-capture** (T1): Analyze outcomes, improve generation
- **ab-test-analyzer** (T1): Statistical analysis

### Workflow Skills (npm)
- **outreach-executor** (T2+T1): Daily outreach with message generation
- **content-scheduler** (T2): Manage content calendar
- **response-handler** (T1): Generate responses to engagement

### Community Skills (Proposed)
**Analytics:** competitive-monitor, sentiment-analyzer, engagement-predictor, market-researcher
**Content:** tweet-generator, blog-outliner, video-script-writer, meme-creator
**Outreach:** email-warmup-tracker, cold-email-sequencer, comment-responder, dm-conversation-manager
**Platform:** reddit-engagement, twitter-thread-creator, instagram-caption-generator, tiktok-script-generator
**Tools:** calendar-optimizer, hashtag-researcher, competitor-content-analyzer, prospect-enrichment
**Reporting:** weekly-report-generator, roi-calculator, funnel-visualizer, dashboard-builder

**Test implementation:** Build 6 community skills as validation of skill-creator, contribution process, and skill-fetcher.

### Authentication
Skills requiring external APIs specify credentials in SKILL.md. **auth-setup** skill handles OAuth flows, token storage (config/auth/), and secure management.

### Skill Lifecycle
- **Create:** Use skill-creator (Anthropic built-in) or build manually
- **Test:** Ask Claude questions matching description
- **Share:** Contribute to github.com/chadananda/xswarm-marketing via PR
- **Fetch:** skill-fetcher downloads on-demand to .claude/skills/fetched/
- **Update:** Check GitHub for newer versions, fetch updates

---

## 4. AI-Generated Personalized Messaging

### No Templates
Every message generated fresh from context: product, market, persona, prospect intelligence, user's writing style, high-performing examples, learnings.

### Generation Flow
1. Load comprehensive context
2. Analyze prospect (recent activity, pain points, language)
3. Generate 3 scored options
4. Present for user selection
5. Log outcome for learning

### Learning System
Every interaction tracked. Outcomes feed back to improve future generations. Patterns identified automatically.

---

## 5. Campaign System

### Campaign Creation
Interactive flow: Research market → Generate context → Build strategy → Create content calendar → Setup tracking → Launch

Creates: campaigns/active/{name}/ with goals.md, strategy.md, timeline.md, content-calendar.md, results.md

### Daily Workflow
**daily-briefing** shows: Overnight activity, active campaigns status, today's content/outreach, priority actions

**Execution:** respond-to-engagement → outreach-executor → content-scheduler

### Multi-Campaign Management
Balance attention across campaigns. Identify winning patterns. Reallocate resources dynamically.

---

## 6. Data Schemas

### Prospect
```json
{
  "id": "uuid",
  "profile": {"name": "", "title": "", "organization": ""},
  "classification": {"market": "", "persona": "", "priority": "high"},
  "status": {"stage": "engaged", "lastContact": "date"},
  "intelligence": {"recentPosts": [], "painPoints": [], "languagePatterns": {}},
  "interactions": [{"date": "", "type": "connection", "response": "accepted"}]
}
```

### Content
```json
{
  "id": "uuid",
  "type": "linkedin-post",
  "campaign": "mississippi-coaches-q4",
  "status": "published",
  "performance": {"views": 1247, "likes": 34, "engagementRate": 0.037},
  "generationContext": {"contextUsed": [], "learningsApplied": []}
}
```

---

## 7. Security

### .gitignore Critical
```
config/.env
config/auth/
audiences/prospects.json
audiences/contacts.json
interactions/
```

### Credentials
- Environment variables in config/.env
- OAuth tokens in config/auth/ (encrypted optional)
- System keychain integration (macOS Keychain, Windows Credential Manager)
- Backup script encrypts sensitive data

---

## 8. Planning Documents Required

Before implementation, create 13 planning documents:

**Phase 1: Core UX**
1. First-Time User Experience - Installation to first message (30 min target)
2. Conversation Patterns - Natural language interaction, approval flows
3. Interface Design - Human mode vs machine mode (JSONL protocol)
4. Message Generation Deep Dive - Context → prompt → generation → learning

**Phase 2: Architecture**
5. Skill Interaction Model - Discovery, chaining, delegation, data flow
6. Subagent Orchestration - Model selection algorithm, cost optimization
7. Data Schemas & Storage - Complete data model with migrations
8. Authentication & Security Flows - OAuth per platform, token management

**Phase 3: Operations**
9. Campaign Lifecycle - Research → activation → execution → learning
10. Error Handling & Edge Cases - Detection, messages, recovery
11. Cost Modeling & Optimization - Per-tier costs, local vs cloud tradeoffs

**Phase 4: Community**
12. Skill Development Guide - Best practices, contribution process
13. Testing Strategy - Unit, integration, E2E for AI system

**Deliverable:** Complete specification with examples, wireframes, flows before any coding.

---

## 9. Success Metrics

### Leading (Daily)
- Outreach sent: 15/day (>30% acceptance)
- Responses: >20% reply rate
- Posts: 1/day

### Lagging (Weekly)
- Prospects → Connected: 25/week
- Connected → Engaged: 10/week
- Engaged → User: 3/week

### Platform Health
- Green: >30% acceptance, >20% response, >3 signups/week
- Yellow: 20-30% acceptance, 10-20% response, 1-2 signups/week
- Red: <20% acceptance, <10% response, <1 signup/week

---

## 10. Key Principles

1. **CD to work** - Each project = own promotion folder
2. **Standard I/O** - JSONL for remote control
3. **Subagent everything** - Delegate to cheapest model
4. **Multi-provider** - Any LLM (Anthropic, OpenAI, Google, local)
5. **User-configurable** - Prefer local, set cost limits, choose embeddings
6. **Cost optimization** - Always cheapest model for tier
7. **Local-first option** - Free local models for T2/T3 when sufficient
8. **No templates** - AI-generated from context
9. **Context-driven** - Reads folder before acting
10. **Learning system** - Every interaction improves future
11. **Skills on-demand** - Fetch from GitHub as needed
12. **Privacy-first** - Data local, gitignored, local models option
13. **Community-powered** - Share skills via GitHub
14. **Natural conversation** - Talk to Claude (human mode)
15. **Machine-controllable** - JSONL protocol (machine mode)

---

## 11. Next Steps

### Phase 1: Planning (4 weeks, NO CODE)
Generate all 13 planning documents with examples, wireframes, complete specifications.

### Phase 2: Implementation (TBD)
Determined after planning complete.

### Phase 3: Beta (TBD)
Determined after planning complete.

**Complete PRD - Ready for planning phase.**