
# Raaghu Component Implementation Plan: [COMPONENT_NAME]

**Branch**: `[###-rds-component-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Component specification from `/specs/[###-rds-component-name]/spec.md`

## Execution Flow (/plan command scope)
```
1. Load component spec from Input path
   → If not found: ERROR "No component spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Component Type (Element/Component/Layout) from atomic design hierarchy
   → Set Package Location based on component type
   → Identify Material-UI base component if applicable
3. Fill the Constitution Check section based on Raaghu Design System constitution
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md (design tokens, accessibility, theme requirements)
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → component-contracts.md, prop-interfaces.md, storybook-spec.md, testing-strategy.md
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 8. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
[Extract from component spec: primary functionality + design system integration approach from research]

## Technical Context
**Component Type**: [Element/Component/Layout - determines package location]  
**Base Framework**: React 19.1.0 with TypeScript 5.8.3  
**Styling**: SCSS with BEM methodology + CSS custom properties  
**Base Component**: [Material-UI component if applicable, or custom implementation]  
**Theme Support**: Light/Dark/Semi-dark themes via design tokens  
**Testing**: Jest + Testing Library + Chromatic visual regression  
**Documentation**: Storybook 9.0.16 with MDX documentation  
**Accessibility**: WCAG 2.1 AA compliance with axe-core testing  
**Internationalization**: i18next support for 8 languages + RTL  
**Performance Goals**: Bundle size < 10KB, LCP contribution < 50ms  
**Browser Support**: Modern browsers (ES2020+), mobile responsive  
**Package Location**: [raaghu-elements|raaghu-components|raaghu-layouts]

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Atomic Design Methodology Compliance
- [ ] **Component Classification**: Component properly classified as Atom/Molecule/Organism
- [ ] **Package Placement**: Located in correct package (elements/components/layouts)
- [ ] **Dependency Hierarchy**: Only imports from lower-level packages + themes
- [ ] **Reusability**: Component designed for reuse across multiple contexts

### II. Single Source of Truth for Theming
- [ ] **No Hardcoded Values**: All colors, spacing, typography use CSS custom properties
- [ ] **Design Token Usage**: Uses existing design tokens or defines new ones appropriately
- [ ] **Theme Compatibility**: Supports all three themes (light/dark/semi-dark)
- [ ] **BEM Naming**: Follows `.rds-{component}__element--modifier` pattern

### III. Component Structure Standards
- [ ] **File Organization**: Follows exact structure (tsx, scss, stories.tsx, test.tsx)
- [ ] **TypeScript Interface**: Proper props interface with complete type definitions
- [ ] **Export Pattern**: Named export for component, proper index.ts integration

### IV. Test-Driven Development Requirements
- [ ] **Test Strategy**: Unit tests covering behavior, not implementation
- [ ] **Coverage Target**: Plan for 85%+ test coverage
- [ ] **Visual Testing**: Chromatic integration for visual regression
- [ ] **Accessibility Testing**: axe-core integration for a11y compliance

### V. Performance Standards
- [ ] **Bundle Impact**: Component bundle size estimated < 10KB
- [ ] **Lazy Loading**: Dynamic imports if component is large/complex
- [ ] **Tree Shaking**: Component supports tree shaking
- [ ] **Performance Monitoring**: Web vitals impact considered

### VI. Accessibility Requirements
- [ ] **WCAG 2.1 AA**: Component meets accessibility standards
- [ ] **Keyboard Navigation**: Full keyboard accessibility support
- [ ] **Screen Reader**: Proper ARIA labels and semantic HTML
- [ ] **Focus Management**: Clear focus indicators and logical tab order

### VII. Internationalization Readiness
- [ ] **Text Externalization**: All text strings use i18next keys
- [ ] **RTL Support**: Component layout works with RTL languages
- [ ] **Cultural Adaptation**: Date/number formats respect locale
- [ ] **Dynamic Loading**: Translation bundles load efficiently

## Project Structure

### Documentation (this component)
```
specs/[###-rds-component]/
├── plan.md                    # This file (/plan command output)
├── research.md               # Phase 0 output - design tokens, accessibility research
├── component-contracts.md    # Phase 1 output - component API contracts
├── prop-interfaces.md        # Phase 1 output - TypeScript interfaces
├── storybook-spec.md        # Phase 1 output - Storybook story specifications
├── testing-strategy.md      # Phase 1 output - comprehensive testing approach
└── tasks.md                 # Phase 2 output (/tasks command - NOT created by /plan)
```

### Raaghu Design System Structure
```
raaghu-elements/                    # ATOMIC COMPONENTS (Basic UI elements)
└── rds-{component-name}/
    ├── rds-{component-name}.tsx    # React component
    ├── rds-{component-name}.scss   # SCSS styles with theme variables
    ├── rds-{component-name}.stories.tsx  # Storybook documentation
    ├── rds-{component-name}.test.tsx     # Jest + Testing Library tests
    └── index.ts                    # Export definition

raaghu-components/                  # MOLECULAR COMPONENTS (Composed elements)
└── rds-comp-{component-name}/
    ├── rds-comp-{component-name}.tsx
    ├── rds-comp-{component-name}.scss
    ├── rds-comp-{component-name}.stories.tsx
    ├── rds-comp-{component-name}.test.tsx
    └── index.ts

raaghu-layouts/                     # ORGANISM COMPONENTS (Layout compositions)
└── rds-comp-{layout-name}/
    ├── rds-comp-{layout-name}.tsx
    ├── rds-comp-{layout-name}.css     # CSS for layout-specific styles
    ├── rds-comp-{layout-name}.stories.tsx
    ├── rds-comp-{layout-name}.test.tsx
    └── index.ts

raaghu-react-themes/               # CENTRALIZED THEME SYSTEM
├── src/styles/
│   ├── index.scss                # Main theme entry point
│   ├── custom-properties.scss    # CSS custom properties (design tokens)
│   ├── variables/
│   │   └── color-variables.scss  # SCSS color variables
│   └── themes/
│       ├── light.scss           # Light theme
│       ├── dark.scss            # Dark theme
│       └── semi-dark.scss       # Semi-dark theme

stories/                           # STORYBOOK CONFIGURATION
├── main.ts                       # Storybook main configuration
├── preview.ts                    # Global decorators and parameters
└── theme.ts                      # Storybook theme customization
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [ ] Phase 0: Research complete (/plan command)
- [ ] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [ ] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
