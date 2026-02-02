# Raaghu Design System Constitution

## Core Principles

### I. Atomic Design Methodology (FOUNDATIONAL)
Follow Brad Frost's Atomic Design principles strictly:
- **Atoms**: Basic elements (button, input, icon) in `raaghu-elements/`
- **Molecules**: Groups of atoms (search bar, card header) in `raaghu-components/`
- **Organisms**: Groups of molecules (header, product grid) in `raaghu-layouts/`
- **Templates**: Layout structures (page templates) in `raaghu-layouts/`
- **Pages**: Specific instances of templates in `raaghu-pages/`

Component hierarchy must be respected: Pages → Layouts → Components → Elements → Themes

### II. Single Source of Truth for Theming (NON-NEGOTIABLE)  
All styling must use `raaghu-react-themes` as the single point of contact:
- **No hardcoded values**: All colors, spacing, typography must reference theme variables
- **CSS Custom Properties**: Use CSS custom properties system (150+ design tokens)
- **Theme consistency**: Support light, dark, and semi-dark themes uniformly
- **BEM with RDS prefix**: `.rds-{component}`, `.rds-{component}__element`, `.rds-{component}--modifier`

### III. Component Structure Standards (STRICT)
Every component must follow exact file organization:
```
rds-{component-name}/
├── rds-{component-name}.tsx          # React component
├── rds-{component-name}.scss         # Component styles (Elements)
├── rds-{component-name}.css          # Component styles (Layouts)  
├── rds-{component-name}.stories.tsx  # Storybook documentation
└── rds-{component-name}.test.tsx     # Unit tests (mandatory)
```

### IV. Test-Driven Development (NON-NEGOTIABLE)
Testing Trophy methodology with strict coverage requirements:
- **80% Unit Tests**: Individual component isolation tests
- **15% Integration Tests**: Component interaction and data flow
- **5% E2E Tests**: Complete user journey validation
- **85%+ Code Coverage**: Minimum threshold for all components
- **Visual Regression**: Chromatic integration for UI consistency

### V. Performance by Design (MANDATORY)
Performance considerations integrated from component creation:
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Optimization**: Tree-shaking, code splitting, lazy loading
- **Million.js Integration**: Performance optimization for React components
- **Performance Budget**: Strict bundle size limits per component

### VI. Accessibility First (UNIVERSAL)
Components must meet WCAG 2.1 AA standards:
- **Semantic HTML**: Proper element usage and structure
- **Keyboard Navigation**: Full keyboard accessibility support  
- **Screen Reader**: ARIA labels and descriptions
- **Color Contrast**: 4.5:1 minimum ratio for normal text
- **Focus Management**: Clear visual focus indicators

### VII. Internationalization Ready (GLOBAL)
Support for 8 primary languages with RTL capability:
- **i18next Integration**: React-i18next for translation management
- **Cultural Sensitivity**: Support diverse cultural conventions
- **RTL Support**: Arabic and Hebrew language layouts
- **Lazy Loading**: Efficient translation bundle management

## Technology Stack Requirements

### Core Technologies (MANDATORY)
- **React 19.1.0**: Component framework with latest features
- **TypeScript 5.8.3**: Strict type safety enforcement
- **Material-UI 7.2.0**: Base component library foundation
- **SCSS/Sass**: Styling preprocessor with BEM methodology
- **Vite 7.0.4**: Build tool and development server

### Development Tools (REQUIRED)
- **Storybook 9.0.16**: Component documentation and testing
- **ESLint 9.30.1**: Code quality and consistency enforcement
- **Million.js 3.1.11**: React performance optimization
- **Jest + Testing Library**: Unit and integration testing
- **Chromatic**: Visual regression testing

### Performance Monitoring (CONTINUOUS)
- **Web Vitals**: Real-time performance metrics
- **Bundle Analyzer**: Bundle size monitoring and optimization
- **Lighthouse CI**: Automated performance audits
- **Sentry**: Error tracking and performance monitoring

## Development Workflow Standards

### Component Development Process
1. **Design Review**: Figma design approval before development
2. **Story Creation**: Storybook story with all variants and states
3. **Test Writing**: Unit tests covering behavior and edge cases
4. **Implementation**: Component with TypeScript and SCSS
5. **Visual Testing**: Chromatic visual regression validation
6. **Performance Check**: Bundle size and runtime performance validation
7. **Accessibility Audit**: WCAG compliance verification
8. **Documentation**: README and usage examples

### Code Review Requirements
- **Type Safety**: Full TypeScript coverage without `any` types
- **Theme Compliance**: All styles use theme variables
- **Test Coverage**: 85%+ test coverage required
- **Performance Impact**: Bundle size increase < 10KB per component  
- **Accessibility**: WCAG 2.1 AA compliance verification
- **Storybook Documentation**: Complete stories with controls and docs

### Quality Gates
- **Build Success**: TypeScript compilation without errors
- **Test Passing**: All unit and integration tests pass
- **Visual Consistency**: Chromatic visual tests approved
- **Performance Budget**: Bundle size within limits
- **Accessibility Compliance**: axe-core tests passing
- **Code Quality**: ESLint rules passing

## Architecture Constraints

### Monorepo Structure (IMMUTABLE)
```
@waiin/raaghu-react/
├── raaghu-elements/         # Atomic UI components
├── raaghu-components/       # Molecular components  
├── raaghu-layouts/          # Layout compositions
├── raaghu-pages/            # Complete page templates
├── raaghu-react-themes/     # Centralized theme system
├── stories/                 # Storybook documentation
├── docs/                    # Architecture documentation
└── utils/                   # Shared utilities
```

### Import Hierarchy (STRICT)
- Pages can import from Layouts, Components, Elements, Themes
- Layouts can import from Components, Elements, Themes  
- Components can import from Elements, Themes
- Elements can import from Themes only
- Themes have no internal dependencies

### Styling Architecture (ENFORCED)
- **BEM Methodology**: Block__Element--Modifier with RDS prefix
- **SCSS Structure**: Variables, mixins, base styles, components
- **CSS Custom Properties**: 150+ design tokens covering all values
- **Theme Integration**: All themes import custom properties
- **No Global Styles**: All styles scoped to components

## Governance

### Constitution Authority
This constitution supersedes all other development practices and guidelines. Any conflicting practices must be updated to align with these principles.

### Amendment Process
1. **Documentation**: Detailed rationale and impact analysis
2. **Team Review**: Architecture team approval required  
3. **Migration Plan**: Update strategy for existing components
4. **Testing**: Verify no regressions in component library
5. **Documentation Update**: Update all related guides and references

### Compliance Verification
- **PR Reviews**: All pull requests must verify constitutional compliance
- **Automated Checks**: CI/CD pipeline enforces quality gates
- **Performance Monitoring**: Continuous performance and accessibility monitoring
- **Regular Audits**: Monthly architecture compliance reviews

### Exception Handling
Exceptions to these principles require:
- **Technical Justification**: Detailed technical reasoning
- **Architecture Approval**: Lead architect sign-off required
- **Documentation**: Exception rationale and alternatives considered
- **Timeline**: Temporary exceptions must include resolution timeline

**Version**: 1.0.0 | **Ratified**: September 29, 2025 | **Last Amended**: September 29, 2025