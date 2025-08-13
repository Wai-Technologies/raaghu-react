# Raaghu Design Syst3. **[CSS_IMPLEMENTATION_GUIDE.md](./CSS_IMPLEMENTATION_GUIDE.md)**
   - Implementation status and checklist
   - Development workflow
   - Integration instructions
   - Production readiness guide

4. **[CSS_REFERENCE.md](./CSS_REFERENCE.md)**
   - Quick reference for developers
   - Common patterns and templates
   - Naming conventions cheat sheet
   - Development best practices

5. **[THEME_INTEGRATION_GUIDE.md](./THEME_INTEGRATION_GUIDE.md)** ✨ **NEW**
   - Complete theme integration documentation
   - CSS custom properties system
   - Single source of truth for all styling
   - Theme switching implementationation

This folder contains comprehensive documentation for the Raaghu Design System CSS/SCSS architecture.

## 📚 Documentation Overview

### Core Architecture Guides

1. **[ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)**
   - Complete system architecture overview
   - Technology stack and design principles
   - Component hierarchy and organization
   - Performance and accessibility standards

2. **[CSS_ARCHITECTURE.md](./CSS_ARCHITECTURE.md)**
   - CSS/SCSS file organization and naming conventions
   - BEM methodology implementation
   - Component structure standards
   - Best practices and guidelines

3. **[CSS_IMPLEMENTATION_GUIDE.md](./CSS_IMPLEMENTATION_GUIDE.md)**
   - Implementation status and checklist
   - Development workflow
   - Integration instructions
   - Production readiness guide

4. **[CSS_REFERENCE.md](./CSS_REFERENCE.md)**
   - Quick reference for developers
   - Common patterns and templates
   - Naming conventions cheat sheet
   - Development best practices

5. **[BOOTSTRAP_IMPLEMENTATION_GUIDE.md](./BOOTSTRAP_IMPLEMENTATION_GUIDE.md)** ✨ **NEW**
   - Bootstrap 5 integration across the system
   - Grid system implementation patterns
   - Utility class usage guidelines
   - Best practices for responsive design

## 🎯 Quick Start

For developers new to the Raaghu Design System:

1. **Read First**: [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)
2. **Understand Structure**: [CSS_ARCHITECTURE.md](./CSS_ARCHITECTURE.md)  
3. **Follow Guidelines**: [CSS_QUICK_REFERENCE.md](./CSS_QUICK_REFERENCE.md)
4. **Check Status**: [CSS_IMPLEMENTATION_GUIDE.md](./CSS_IMPLEMENTATION_GUIDE.md)
5. **Bootstrap Usage**: [BOOTSTRAP_IMPLEMENTATION_GUIDE.md](./BOOTSTRAP_IMPLEMENTATION_GUIDE.md)

## 🏗️ Component Structure

Every RDS component follows this consistent structure:

```
rds-{component}/
├── rds-{component}.tsx          # React component
├── rds-{component}.scss         # Component styles
└── rds-{component}.stories.tsx  # Storybook documentation
```

## 🎨 Naming Convention

All CSS classes follow BEM methodology with RDS prefix:

```scss
.rds-{component}                    // Block
.rds-{component}__element          // Element
.rds-{component}--modifier         // Modifier
.rds-{component}__element--modifier // Element Modifier
```

## 📦 Implementation Status

✅ **Complete**: All 60+ components have SCSS files
✅ **Documented**: Comprehensive architecture documentation
✅ **Standardized**: Consistent naming and structure
✅ **Theme Integrated**: All components use raaghu-react-themes variables
✅ **Bootstrap Integrated**: Responsive grid system and utilities implemented ✨ **NEW**
✅ **Ready**: Production-ready implementation

## 🛠️ Development Guidelines

### Adding New Components
1. Create component directory: `rds-{name}/`
2. Follow established naming conventions
3. Use BEM methodology for CSS classes
4. Include all necessary variants and states
5. Create comprehensive Storybook stories

### Modifying Existing Components
1. Follow existing patterns
2. Test across all themes
3. Ensure backward compatibility
4. Update documentation if needed

## 🎯 Key Principles

- **Consistency**: Same patterns across all components
- **Maintainability**: Clear structure and documentation
- **Scalability**: Easy to extend and modify
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized for production use

## 📞 Getting Help

1. **Check Documentation**: Start with the guides above
2. **Review Examples**: Look at existing component implementations
3. **Follow Patterns**: Use established conventions
4. **Ask Questions**: Reach out to the design system team

---

*This documentation is maintained by the Raaghu Design System team and updated with each release.*
