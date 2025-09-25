# Raaghu Design System - Component Specifications

This directory contains the specification-driven development framework for the Raaghu Design System.

## Overview

Spec-driven development (SDD) ensures that all components are built according to well-defined specifications that serve as:
- **Single source of truth** for component behavior
- **Automated test generation** from specifications  
- **Living documentation** that stays in sync with code
- **Validation** that ensures implementation matches requirements

## Directory Structure

```
specs/
├── component-spec-schema.json    # JSON Schema for component specifications
├── templates/                    # Specification templates
│   ├── element-template.json     # Template for raaghu-elements
│   ├── component-template.json   # Template for raaghu-components
│   └── layout-template.json      # Template for raaghu-layouts
├── examples/                     # Example specifications
│   ├── rds-button.spec.json      # Button component specification
│   └── rds-input.spec.json       # Input component specification
├── validators/                   # Specification validation tools
│   ├── spec-validator.ts         # TypeScript validator
│   └── spec-runner.ts            # Test runner for specs
└── generators/                   # Code generation tools
    ├── test-generator.ts         # Generate tests from specs
    ├── story-generator.ts        # Generate Storybook stories
    └── component-generator.ts    # Generate component boilerplate
```

## Getting Started

### 1. Create a Component Specification

Use the provided templates to create specifications for new components:

```bash
# Copy template for a new element
cp specs/templates/element-template.json specs/rds-my-component.spec.json

# Edit the specification
# Validate the specification
npm run spec:validate specs/rds-my-component.spec.json
```

### 2. Generate Tests from Specification

```bash
# Generate unit tests
npm run spec:generate:test specs/rds-my-component.spec.json

# Generate integration tests  
npm run spec:generate:integration specs/rds-my-component.spec.json

# Generate accessibility tests
npm run spec:generate:a11y specs/rds-my-component.spec.json
```

### 3. Generate Component Boilerplate

```bash
# Generate component files
npm run spec:generate:component specs/rds-my-component.spec.json
```

## Specification Schema

All component specifications must conform to the JSON Schema defined in `component-spec-schema.json`. Key sections include:

- **Props**: Complete prop interface definition
- **Behaviors**: Component behavior specifications
- **Accessibility**: WCAG compliance requirements
- **Testing**: Test case specifications
- **Performance**: Performance requirements
- **Styling**: Theme and styling requirements

## Validation

Specifications are validated against the schema and additional business rules:

```bash
# Validate single specification
npm run spec:validate specs/rds-button.spec.json

# Validate all specifications
npm run spec:validate:all

# Validate and generate reports
npm run spec:validate:report
```

## Integration with Development Workflow

1. **Design Phase**: Create specification based on design requirements
2. **Review Phase**: Validate specification against schema and business rules
3. **Development Phase**: Generate tests and component boilerplate
4. **Testing Phase**: Run generated tests to ensure compliance
5. **Documentation Phase**: Generate Storybook stories from specifications

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

## Tools and Scripts

- `npm run spec:validate` - Validate specifications
- `npm run spec:generate:test` - Generate tests from specs
- `npm run spec:generate:component` - Generate component boilerplate
- `npm run spec:generate:story` - Generate Storybook stories
- `npm run spec:report` - Generate specification compliance report

## Examples

See the `examples/` directory for complete specification examples:
- `rds-button.spec.json` - Button component specification
- `rds-input.spec.json` - Input component specification

## Contributing

When adding new components or modifying existing ones:

1. Update or create the component specification
2. Validate the specification
3. Generate updated tests and documentation
4. Ensure all generated code passes validation
5. Update this README if adding new features

---

*This specification framework is maintained by the Raaghu Design System team and updated with each release.*
