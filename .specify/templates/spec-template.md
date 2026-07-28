# Raaghu Component Specification: [COMPONENT NAME]

**Component Branch**: `[###-rds-component-name]`  
**Created**: [DATE]  
**Status**: Draft  
**Component Type**: [Element/Component/Layout]  
**Input**: User description: "$ARGUMENTS"

## Execution Flow (main)
```
1. Parse component description from Input
   → If empty: ERROR "No component description provided"
2. Extract key concepts from description
   → Identify: component purpose, visual elements, interactions, data requirements
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Interaction Patterns section
   → If no clear interaction flow: ERROR "Cannot determine user interactions"
5. Generate Functional Requirements
   → Each requirement must be testable and measurable
   → Mark ambiguous requirements
6. Identify Component Props and State (if applicable)
7. Define Design System Integration requirements
8. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
9. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT the component does and WHY it's needed
- ❌ Avoid HOW to implement (no React hooks, SCSS specifics, file structure)
- 🎨 Written for designers and product stakeholders, not developers
- 📐 Design system consistency and accessibility are paramount

### Section Requirements
- **Mandatory sections**: Must be completed for every component
- **Optional sections**: Include only when relevant to the component
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation
When creating this spec from a user prompt:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "button component" without variants), mark it
3. **Think like a designer**: Every vague requirement should fail the "testable and unambiguous" checklist item
4. **Common underspecified areas**:
   - Component variants and states (primary, secondary, disabled, loading, etc.)
   - Size variations and responsive behavior
   - Accessibility requirements and keyboard interactions
   - Animation and transition specifications
   - Integration with existing design tokens
   - Internationalization and RTL support requirements
   - Security/compliance needs

---

## User Scenarios & Interaction Patterns *(mandatory)*

### Primary User Interaction
[Describe how users will interact with this component in plain language]

### Interaction Scenarios
1. **Given** [component state], **When** [user action], **Then** [visual feedback/result]
2. **Given** [component state], **When** [user action], **Then** [visual feedback/result]
3. **Given** [component state], **When** [accessibility action], **Then** [expected behavior]

### Edge Cases & Error States
- What happens when [component receives invalid props]?
- How does component handle [loading states]?
- What visual feedback occurs for [disabled/error states]?

## Component Requirements *(mandatory)*

### Functional Requirements
- **CR-001**: Component MUST [specific behavior, e.g., "display provided text label"]
- **CR-002**: Component MUST [interaction capability, e.g., "respond to click events"]  
- **CR-003**: Component MUST [visual requirement, e.g., "support primary and secondary variants"]
- **CR-004**: Component MUST [accessibility requirement, e.g., "be keyboard navigable"]
- **CR-005**: Component MUST [responsive requirement, e.g., "work on mobile viewports"]

*Example of marking unclear requirements:*
- **CR-006**: Component MUST support [NEEDS CLARIFICATION: size variants not specified - small, medium, large?]
- **CR-007**: Component MUST handle [NEEDS CLARIFICATION: loading state behavior not defined]

### Design System Integration Requirements
- **Theme Support**: Must work with light and dark themes
- **Design Tokens**: Must use CSS custom properties for all styling values
- **Typography**: Must integrate with Raaghu typography scale
- **Spacing**: Must use standard spacing tokens for padding/margins
- **Color Palette**: Must use semantic color tokens (primary, secondary, error, etc.)

### Component Props & Data *(include if component needs configuration)*
- **[Prop Name]**: [What it controls, expected value type conceptually]
- **[Prop Name]**: [Purpose, relationship to component behavior]

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [ ] No implementation details (React hooks, SCSS specifics, file structure)
- [ ] Focused on component purpose and user experience
- [ ] Written for designers and product stakeholders
- [ ] All mandatory sections completed

### Component Specification Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Component behavior is testable and unambiguous  
- [ ] Visual states and variants are clearly defined
- [ ] Accessibility requirements are specified
- [ ] Design system integration is documented
- [ ] Responsive behavior is outlined

### Design System Alignment
- [ ] Component fits within atomic design hierarchy
- [ ] Follows Raaghu naming conventions
- [ ] Integrates with existing design tokens
- [ ] Supports all required themes
- [ ] Meets WCAG 2.1 AA accessibility standards

---

## Execution Status
*Updated by main() during processing*

- [ ] Component description parsed
- [ ] Key concepts extracted
- [ ] Ambiguities marked
- [ ] Interaction patterns defined
- [ ] Component requirements generated
- [ ] Props and data structure identified
- [ ] Review checklist passed

---
