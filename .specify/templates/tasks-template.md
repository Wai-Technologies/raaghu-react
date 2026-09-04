# Tasks: [COMPONENT NAME]

**Input**: Design documents from `/specs/[###-rds-component-name]/`
**Prerequisites**: plan.md (required), research.md, component-contracts.md, prop-interfaces.md, storybook-spec.md, testing-strategy.md

## Execution Flow (main)
```
1. Load plan.md from component directory
   → If not found: ERROR "No implementation plan found"
   → Extract: component type, package location, dependencies
2. Load optional design documents:
   → component-contracts.md: Extract API contracts → interface tasks
   → prop-interfaces.md: Extract TypeScript interfaces → prop definition tasks
   → storybook-spec.md: Extract story requirements → documentation tasks
   → testing-strategy.md: Extract test cases → testing tasks
   → research.md: Extract design tokens and accessibility requirements → setup tasks
3. Generate tasks by category:
   → Setup: component structure, dependencies, design token integration
   → Tests: unit tests, accessibility tests, visual regression tests
   → Core: component implementation, TypeScript interfaces, SCSS styling
   → Documentation: Storybook stories, MDX documentation, usage examples
   → Quality: ESLint compliance, performance optimization, internationalization
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
   → Storybook stories parallel with implementation
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All component contracts have TypeScript interfaces?
   → All props have proper validation?
   → All stories cover component variants?
   → All accessibility requirements tested?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
Raaghu Design System follows strict package-based organization:
- **Elements**: `raaghu-elements/rds-{component}/`
- **Components**: `raaghu-components/rds-comp-{component}/`
- **Layouts**: `raaghu-layouts/rds-comp-{layout}/`
- **Themes**: `raaghu-react-themes/src/styles/`
- **Stories**: Component directory + Storybook config in `stories/`

## Phase 3.1: Component Setup
- [ ] T001 Create component directory structure in appropriate package (elements/components/layouts)
- [ ] T002 Set up TypeScript interface file with comprehensive prop definitions
- [ ] T003 [P] Configure component index.ts exports for package integration
- [ ] T004 [P] Create SCSS file with BEM structure and theme variable imports
- [ ] T005 [P] Set up Jest test configuration and initial test file structure

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004 [P] Contract test POST /api/users in tests/contract/test_users_post.py
- [ ] T005 [P] Contract test GET /api/users/{id} in tests/contract/test_users_get.py
- [ ] T006 [P] Integration test user registration in tests/integration/test_registration.py
- [ ] T007 [P] Integration test auth flow in tests/integration/test_auth.py

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T008 [P] User model in src/models/user.py
- [ ] T009 [P] UserService CRUD in src/services/user_service.py
- [ ] T010 [P] CLI --create-user in src/cli/user_commands.py
- [ ] T011 POST /api/users endpoint
- [ ] T012 GET /api/users/{id} endpoint
- [ ] T013 Input validation
- [ ] T014 Error handling and logging

## Phase 3.4: Integration
- [ ] T015 Connect UserService to DB
- [ ] T016 Auth middleware
- [ ] T017 Request/response logging
- [ ] T018 CORS and security headers

## Phase 3.3: Component Implementation
- [ ] T006 Implement base component structure with TypeScript interface
- [ ] T007 Create SCSS styles using design tokens and BEM methodology
- [ ] T008 [P] Implement component variants (primary, secondary, etc.)
- [ ] T009 [P] Add responsive design and mobile support
- [ ] T010 [P] Implement accessibility features (ARIA labels, keyboard navigation)
- [ ] T011 Add theme support verification (light, dark)

## Phase 3.4: Documentation & Stories
- [ ] T012 [P] Create comprehensive Storybook stories with all variants
- [ ] T013 [P] Write MDX documentation with usage examples
- [ ] T014 [P] Add accessibility documentation and testing instructions
- [ ] T015 [P] Add Storybook stories and Vitest play coverage for visual states

## Phase 3.5: Quality & Integration
- [ ] T016 [P] Run unit tests and achieve 85%+ coverage
- [ ] T017 [P] Perform accessibility testing with axe-core
- [ ] T018 Performance validation (bundle size < 10KB)
- [ ] T019 [P] ESLint and TypeScript strict mode compliance
- [ ] T020 [P] Internationalization integration (i18next keys)
- [ ] T021 Integration with package index.ts and main library export

## Dependencies
- Tests (T006-T011) before documentation (T012-T015)
- T006 blocks T007, T008
- T007 blocks T009, T010, T011
- Implementation complete before quality phase (T016-T021)

## Parallel Example
```
# Launch component variants together after base implementation:
Task: "Implement primary variant in rds-{component}.tsx"
Task: "Implement secondary variant in rds-{component}.tsx"
Task: "Add responsive styles in rds-{component}.scss"
Task: "Create accessibility features in rds-{component}.tsx"
```

## Notes
- [P] tasks = different files or independent sections, no dependencies
- Verify tests fail before implementing component logic
- Commit after each task with descriptive messages
- Test in Storybook after each implementation task
- Run `npm run test:storybook` after visual changes

## Task Generation Rules
*Applied during main() execution*

1. **From Component Contracts**:
   - Each prop interface → TypeScript definition task [P]
   - Each variant → implementation task [P]
   
2. **From Storybook Spec**:
   - Each story → Storybook story creation task [P]
   - Controls and documentation → MDX documentation tasks
   
3. **From Testing Strategy**:
   - Each test case → unit test implementation [P]
   - Accessibility requirements → a11y test tasks

4. **Ordering**:
   - Setup → Tests → Implementation → Stories → Quality
   - Dependencies block parallel execution within same file

## Validation Checklist
- [ ] All component props have TypeScript interfaces
- [ ] All variants have corresponding tests
- [ ] All Storybook stories render without errors
- [ ] Component passes accessibility audit
- [ ] Theme variables used throughout (no hardcoded values)
- [ ] Bundle size impact measured and within limits
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task