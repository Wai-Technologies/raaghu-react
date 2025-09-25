# Spec-Driven Development Guide

## Overview

Spec-driven development (SDD) is a methodology where you define detailed specifications before implementing components. These specifications serve as the single source of truth for component behavior, enabling automated test generation, consistent documentation, and validation that ensures implementation matches requirements.

## Benefits

- **Consistency**: All components follow the same specification format
- **Quality**: Comprehensive testing and validation from the start
- **Documentation**: Specifications serve as living documentation
- **Automation**: Generate tests, stories, and boilerplate code automatically
- **Validation**: Ensure implementation matches requirements
- **Accessibility**: Built-in accessibility requirements and testing

## Getting Started

### 1. Understanding the Specification Structure

Each component specification includes:

- **Basic Info**: Name, version, description, category
- **Props**: Complete prop interface with types, validation, and defaults
- **Behaviors**: Component behavior specifications with triggers and expected outcomes
- **Accessibility**: WCAG compliance requirements and accessibility features
- **Testing**: Unit, integration, and accessibility test specifications
- **Performance**: Performance requirements and constraints
- **Styling**: Theme support, responsive behavior, and variants

### 2. Creating Your First Specification

1. **Copy a template**:
   ```bash
   cp specs/templates/element-template.json specs/rds-my-component.spec.json
   ```

2. **Edit the specification**:
   - Update the component name and description
   - Define all props with types and validation
   - Specify behaviors and their triggers
   - Add accessibility requirements
   - Define test cases

3. **Validate the specification**:
   ```bash
   npm run spec:validate specs/rds-my-component.spec.json
   ```

### 3. Generating Code from Specifications

Once your specification is validated, generate the component code:

```bash
# Generate component files
npm run spec:generate:component specs/rds-my-component.spec.json

# Generate test files
npm run spec:generate:test specs/rds-my-component.spec.json

# Generate Storybook stories
npm run spec:generate:story specs/rds-my-component.spec.json

# Generate everything at once
npm run spec:generate:all specs/rds-my-component.spec.json
```

## Specification Schema

### Component Properties

```json
{
  "name": "RdsComponentName",           // Required: Component name following RDS conventions
  "version": "1.0.0",                  // Required: Specification version
  "description": "Component description", // Required: Brief description
  "category": "form",                  // Required: Component category
  "props": { ... },                    // Required: Props specification
  "behaviors": [ ... ],                // Required: Behavior specifications
  "accessibility": { ... },            // Required: Accessibility requirements
  "testing": { ... },                  // Required: Test specifications
  "performance": { ... },              // Optional: Performance requirements
  "styling": { ... }                   // Optional: Styling requirements
}
```

### Props Specification

```json
{
  "propName": {
    "type": "string",                  // Required: Prop type
    "description": "Prop description", // Required: Prop description
    "required": false,                 // Optional: Whether prop is required
    "default": "defaultValue",         // Optional: Default value
    "enum": ["value1", "value2"],      // Optional: Allowed values for enum types
    "validation": {                    // Optional: Validation rules
      "min": 0,
      "max": 100,
      "pattern": "^[a-zA-Z]+$"
    }
  }
}
```

### Behavior Specification

```json
{
  "name": "behaviorName",              // Required: Behavior name
  "description": "What it does",       // Required: Behavior description
  "trigger": {                         // Required: What triggers the behavior
    "event": "click",                  // Optional: Event type
    "condition": "not disabled",       // Optional: Condition for trigger
    "props": { "disabled": false }     // Optional: Prop conditions
  },
  "expected": {                        // Required: Expected outcome
    "callback": "onClick",             // Optional: Callback to trigger
    "ui": "visual feedback",           // Optional: UI changes
    "state": { "loading": true },      // Optional: State changes
    "accessibility": "announcement"    // Optional: Accessibility changes
  }
}
```

### Testing Specification

```json
{
  "unit": [                            // Unit test specifications
    {
      "name": "testName",
      "description": "Test description",
      "test": {
        "render": { "props": { ... } },
        "assertions": [ "assertion1", "assertion2" ]
      }
    }
  ],
  "integration": [ ... ],              // Integration test specifications
  "accessibility": [ ... ]             // Accessibility test specifications
}
```

## Development Workflow

### 1. Design Phase

1. **Define Requirements**: Understand what the component needs to do
2. **Create Specification**: Write a detailed specification following the schema
3. **Review Specification**: Validate against schema and business rules
4. **Iterate**: Refine specification based on feedback

### 2. Development Phase

1. **Generate Boilerplate**: Use generators to create initial code
2. **Implement Component**: Build the component according to specification
3. **Generate Tests**: Create comprehensive test suites
4. **Run Tests**: Ensure all tests pass

### 3. Testing Phase

1. **Unit Tests**: Test individual component behavior
2. **Integration Tests**: Test component interactions
3. **Accessibility Tests**: Verify WCAG compliance
4. **Visual Tests**: Ensure visual consistency

### 4. Documentation Phase

1. **Generate Stories**: Create Storybook documentation
2. **Update Documentation**: Keep docs in sync with specification
3. **Review**: Ensure documentation is complete and accurate

## Best Practices

### Writing Specifications

1. **Be Specific**: Include all props, behaviors, and edge cases
2. **Think User-First**: Focus on user interactions and accessibility
3. **Consider Edge Cases**: Include error states and boundary conditions
4. **Performance Conscious**: Define performance requirements upfront
5. **Accessibility First**: Include comprehensive accessibility requirements

### Maintaining Specifications

1. **Version Control**: Track specification changes with semantic versioning
2. **Review Process**: Require specification review before implementation
3. **Sync with Code**: Keep specifications in sync with implementation
4. **Documentation**: Use specifications as living documentation

### Testing Strategy

1. **Comprehensive Coverage**: Include unit, integration, and accessibility tests
2. **Real Scenarios**: Test realistic user interactions
3. **Edge Cases**: Test boundary conditions and error states
4. **Accessibility**: Ensure WCAG compliance in all tests

## Tools and Commands

### Validation Commands

```bash
# Validate single specification
npm run spec:validate specs/rds-component.spec.json

# Validate all specifications
npm run spec:validate:all

# Generate validation report
npm run spec:report
```

### Generation Commands

```bash
# Generate component files
npm run spec:generate:component specs/rds-component.spec.json

# Generate test files
npm run spec:generate:test specs/rds-component.spec.json

# Generate Storybook stories
npm run spec:generate:story specs/rds-component.spec.json

# Generate everything
npm run spec:generate:all specs/rds-component.spec.json
```

### Testing Commands

```bash
# Run specification tests
npm run test:spec specs/rds-component.spec.json

# Run all specification tests
npm run test:spec:all

# Run regular tests
npm run test
```

## Examples

### Simple Element Specification

See `specs/examples/rds-button.spec.json` for a complete button component specification.

### Complex Component Specification

See `specs/examples/rds-input.spec.json` for a comprehensive input component specification.

### Template Specifications

- `specs/templates/element-template.json` - For atomic UI components
- `specs/templates/component-template.json` - For complex UI components
- `specs/templates/layout-template.json` - For layout components

## Integration with Existing Workflow

### Pre-commit Hooks

Add specification validation to your pre-commit hooks:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run spec:validate:all && npm run test"
    }
  }
}
```

### CI/CD Integration

Include specification validation in your CI pipeline:

```yaml
- name: Validate Specifications
  run: npm run spec:validate:all

- name: Run Specification Tests
  run: npm run test:spec:all

- name: Generate Test Report
  run: npm run spec:report
```

### IDE Integration

Configure your IDE to:
- Validate JSON specifications
- Provide autocomplete for specification schema
- Show validation errors inline

## Troubleshooting

### Common Issues

1. **Schema Validation Errors**: Check that your specification follows the JSON schema
2. **Missing Required Fields**: Ensure all required fields are present
3. **Invalid Prop Types**: Use only supported prop types
4. **Test Generation Failures**: Check that test specifications are complete

### Getting Help

1. **Check Examples**: Look at existing specifications for reference
2. **Validate Early**: Run validation frequently during development
3. **Review Templates**: Use templates as starting points
4. **Ask Questions**: Reach out to the design system team

## Migration Guide

### Migrating Existing Components

1. **Analyze Current Component**: Understand existing behavior and props
2. **Create Specification**: Write specification based on current implementation
3. **Validate Specification**: Ensure specification is complete and accurate
4. **Generate Tests**: Create comprehensive test suite
5. **Update Implementation**: Refactor component to match specification
6. **Verify Tests**: Ensure all tests pass

### Gradual Adoption

1. **Start with New Components**: Use SDD for all new components
2. **Migrate Critical Components**: Prioritize high-impact components
3. **Update Documentation**: Keep existing docs in sync
4. **Train Team**: Ensure team understands SDD methodology

---

*This guide is maintained by the Raaghu Design System team and updated with each release.*
