# .specify — AI-Assisted Development Workflow

This folder contains the governance framework and automation templates used to guide AI-assisted feature development in the Raaghu Design System.

## What's in Here

```
.specify/
├── memory/
│   └── constitution.md       # System-wide rules every AI agent must follow
├── templates/
│   ├── agent-file-template.md   # Template for per-feature AI agent context files
│   ├── plan-template.md         # Template for implementation plans
│   ├── spec-template.md         # Template for component specs
│   └── tasks-template.md        # Template for task tracking
└── scripts/powershell/
    ├── check-prerequisites.ps1  # Verify dev environment is set up correctly
    ├── common.ps1               # Shared PowerShell functions
    ├── create-new-feature.ps1   # Bootstrap a new feature with plan + spec
    ├── setup-plan.ps1           # Initialize a plan from the template
    └── update-agent-context.ps1 # Sync AI agent context after code changes
```

## How It Works

### 1. Constitution (`memory/constitution.md`)

This is the single governance document that defines non-negotiable standards for every component built in this repo:

- Atomic Design hierarchy: Elements → Components → Layouts → Pages
- File structure rules (every component needs `.tsx`, `.scss`, `.test.tsx`, `.stories.tsx`, `.figma.tsx`)
- Design token usage (no hardcoded hex values; always use `var(--rds-*)`)
- 85%+ test coverage minimum (90%+ for elements)
- WCAG 2.1 AA accessibility compliance
- Bundle size budget: 10KB max per component
- i18n with i18next, supporting 8 locales

All AI agents working in this repo are expected to load the constitution before starting work.

### 2. Templates

Use these templates to structure new work:

| Template | When to Use |
|----------|-------------|
| `spec-template.md` | Before building a new component — define its API, behavior, and acceptance criteria |
| `plan-template.md` | Break a spec into implementation steps |
| `tasks-template.md` | Track progress during implementation |
| `agent-file-template.md` | Create a context file an AI agent loads at the start of a feature |

### 3. PowerShell Scripts

Run these from the repo root in PowerShell:

```powershell
# Check your environment is ready
.\.specify\scripts\powershell\check-prerequisites.ps1

# Scaffold a new feature (creates spec + plan + agent context)
.\.specify\scripts\powershell\create-new-feature.ps1 -FeatureName "rds-new-button"

# Initialize a plan for an existing spec
.\.specify\scripts\powershell\setup-plan.ps1 -SpecPath "path/to/spec.md"

# Update AI agent context after significant code changes
.\.specify\scripts\powershell\update-agent-context.ps1
```

> **Non-Windows users**: The PowerShell scripts run cross-platform via `pwsh`. Install [PowerShell 7+](https://github.com/PowerShell/PowerShell) if you're on macOS or Linux.

## Workflow for a New Component

1. Copy `templates/spec-template.md` → fill in the component spec
2. Copy `templates/plan-template.md` → break the spec into tasks
3. Copy `templates/agent-file-template.md` → create the AI context file
4. Run `create-new-feature.ps1` to scaffold the files automatically
5. Scaffold component files from existing component examples in `raaghu-elements/` or `raaghu-components/`
6. Implement following the constitution rules
7. Run `update-agent-context.ps1` to keep AI context current

## Related

- `/docs/ARCHITECTURE_OVERVIEW.md` — Package structure and design token pipeline
- `/.github/prompts/` — GitHub Copilot prompt files for code review and generation
