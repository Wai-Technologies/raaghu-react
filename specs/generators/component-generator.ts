import { ComponentSpec } from '../validators/spec-validator';
import * as fs from 'fs';
import * as path from 'path';

export interface GeneratedComponent {
  fileName: string;
  content: string;
  type: 'component' | 'styles' | 'stories' | 'types';
}

export class ComponentGenerator {
  private outputDir: string;

  constructor(outputDir: string = 'generated-components') {
    this.outputDir = outputDir;
  }

  /**
   * Generate all component files from a specification
   */
  generateComponent(spec: ComponentSpec): GeneratedComponent[] {
    const files: GeneratedComponent[] = [];

    // Generate TypeScript types
    const types = this.generateTypes(spec);
    files.push(types);

    // Generate React component
    const component = this.generateReactComponent(spec);
    files.push(component);

    // Generate SCSS styles
    const styles = this.generateStyles(spec);
    files.push(styles);

    // Generate Storybook stories
    const stories = this.generateStories(spec);
    files.push(stories);

    return files;
  }

  /**
   * Generate TypeScript types file
   */
  private generateTypes(spec: ComponentSpec): GeneratedComponent {
    const fileName = `${spec.name.toLowerCase()}.types.ts`;
    
    let content = `// Generated types for ${spec.name}\n`;
    content += `// Version: ${spec.version}\n\n`;

    // Generate prop types
    content += `export interface ${spec.name}Props {\n`;
    
    for (const [propName, propSpec] of Object.entries(spec.props)) {
      content += this.generatePropType(propName, propSpec);
    }

    content += `}\n\n`;

    // Generate variant types
    if (spec.styling?.variants) {
      content += `export type ${spec.name}Variant = `;
      const variants = spec.styling.variants.map(v => `'${v.name}'`).join(' | ');
      content += `${variants};\n\n`;
    }

    // Generate size types
    const sizeProps = Object.entries(spec.props).filter(([_, prop]) => 
      prop.type === 'enum' && prop.enum?.includes('small')
    );
    
    if (sizeProps.length > 0) {
      const [sizePropName, sizeProp] = sizeProps[0];
      content += `export type ${spec.name}Size = `;
      const sizes = sizeProp.enum.map((s: string) => `'${s}'`).join(' | ');
      content += `${sizes};\n\n`;
    }

    // Generate behavior types
    if (spec.behaviors.length > 0) {
      content += `export interface ${spec.name}Behaviors {\n`;
      for (const behavior of spec.behaviors) {
        const behaviorName = behavior.name.replace(/\s+/g, '');
        content += `  ${behaviorName}: () => void;\n`;
      }
      content += `}\n\n`;
    }

    return {
      fileName,
      content,
      type: 'types'
    };
  }

  /**
   * Generate React component file
   */
  private generateReactComponent(spec: ComponentSpec): GeneratedComponent {
    const fileName = `${spec.name.toLowerCase()}.tsx`;
    
    let content = `import React, { forwardRef, useCallback, useMemo } from 'react';\n`;
    content += `import clsx from 'clsx';\n`;
    content += `import './${spec.name.toLowerCase()}.scss';\n`;
    content += `import { ${spec.name}Props } from './${spec.name.toLowerCase()}.types';\n\n`;

    // Generate component
    content += `/**\n`;
    content += ` * ${spec.description}\n`;
    content += ` * \n`;
    content += ` * @version ${spec.version}\n`;
    content += ` * @category ${spec.category}\n`;
    content += ` */\n`;
    content += `export const ${spec.name} = forwardRef<HTMLDivElement, ${spec.name}Props>(({\n`;

    // Generate props destructuring
    const propNames = Object.keys(spec.props);
    content += propNames.map(prop => `  ${prop}`).join(',\n');
    content += `\n}, ref) => {\n`;

    // Generate default props
    const defaultProps = Object.entries(spec.props).filter(([_, prop]) => prop.default !== undefined);
    if (defaultProps.length > 0) {
      content += `\n  // Default props\n`;
      for (const [propName, propSpec] of defaultProps) {
        content += `  const ${propName}Value = ${propName} ?? ${JSON.stringify(propSpec.default)};\n`;
      }
    }

    // Generate class name logic
    content += `\n  // Generate class names\n`;
    content += `  const className = useMemo(() => {\n`;
    content += `    return clsx(\n`;
    content += `      'rds-${spec.name.toLowerCase().replace('rds', '')}',\n`;
    
    // Add variant classes
    const variantProps = Object.entries(spec.props).filter(([_, prop]) => 
      prop.type === 'enum' && prop.enum?.includes('primary')
    );
    
    for (const [propName, propSpec] of variantProps) {
      content += `      ${propName}Value && \`rds-${spec.name.toLowerCase().replace('rds', '')}--\${${propName}Value}\`,\n`;
    }

    // Add state classes
    content += `      disabled && 'rds-${spec.name.toLowerCase().replace('rds', '')}--disabled',\n`;
    content += `      className\n`;
    content += `    );\n`;
    content += `  }, [${propNames.join(', ')}]);\n`;

    // Generate behaviors
    if (spec.behaviors.length > 0) {
      content += `\n  // Behaviors\n`;
      for (const behavior of spec.behaviors) {
        const behaviorName = behavior.name.replace(/\s+/g, '');
        content += this.generateBehavior(spec, behavior, behaviorName);
      }
    }

    // Generate render
    content += `\n  return (\n`;
    content += `    <div\n`;
    content += `      ref={ref}\n`;
    content += `      className={className}\n`;
    content += `      id={id}\n`;
    content += `      data-testid={dataTestId}\n`;
    
    // Add accessibility attributes
    if (spec.accessibility) {
      content += this.generateAccessibilityAttributes(spec);
    }

    // Add event handlers
    const eventProps = Object.entries(spec.props).filter(([_, prop]) => 
      prop.type === 'function' && prop.description?.includes('click')
    );
    
    for (const [propName] of eventProps) {
      content += `\n      ${propName}={${propName}}\n`;
    }

    content += `    >\n`;
    content += `      {children}\n`;
    content += `    </div>\n`;
    content += `  );\n`;
    content += `});\n\n`;
    content += `${spec.name}.displayName = '${spec.name}';\n`;

    return {
      fileName,
      content,
      type: 'component'
    };
  }

  /**
   * Generate SCSS styles file
   */
  private generateStyles(spec: ComponentSpec): GeneratedComponent {
    const fileName = `${spec.name.toLowerCase()}.scss`;
    const componentClass = `rds-${spec.name.toLowerCase().replace('rds', '')}`;
    
    let content = `// ${spec.name} Component Styles\n`;
    content += `// Generated from specification v${spec.version}\n\n`;

    // Base component styles
    content += `.$componentClass {\n`;
    content += `  // Base component styles\n`;
    content += `  display: block;\n`;
    content += `  position: relative;\n\n`;

    // Add theme support
    if (spec.styling?.themeSupport) {
      content += `  // Theme variables\n`;
      content += `  background-color: var(--rds-color-surface, #ffffff);\n`;
      content += `  color: var(--rds-color-on-surface, #000000);\n`;
      content += `  border: 1px solid var(--rds-color-outline, #e0e0e0);\n\n`;
    }

    // Add responsive support
    if (spec.styling?.responsive) {
      content += `  // Responsive styles\n`;
      content += `  @media (max-width: 768px) {\n`;
      content += `    // Mobile styles\n`;
      content += `  }\n\n`;
    }

    content += `  // States\n`;
    content += `  &:hover {\n`;
    content += `    // Hover state\n`;
    content += `  }\n\n`;
    content += `  &:focus {\n`;
    content += `    // Focus state\n`;
    content += `    outline: 2px solid var(--rds-color-primary, #1976d2);\n`;
    content += `    outline-offset: 2px;\n`;
    content += `  }\n\n`;
    content += `  &:disabled {\n`;
    content += `    // Disabled state\n`;
    content += `    opacity: 0.6;\n`;
    content += `    cursor: not-allowed;\n`;
    content += `  }\n\n`;
    content += `}\n\n`;

    // Generate variant styles
    if (spec.styling?.variants) {
      for (const variant of spec.styling.variants) {
        content += `// ${variant.description}\n`;
        content += `.$componentClass--${variant.name} {\n`;
        content += `  // ${variant.name} variant styles\n`;
        content += `}\n\n`;
      }
    }

    // Generate size styles
    const sizeProps = Object.entries(spec.props).filter(([_, prop]) => 
      prop.type === 'enum' && prop.enum?.includes('small')
    );
    
    if (sizeProps.length > 0) {
      const [_, sizeProp] = sizeProps[0];
      for (const size of sizeProp.enum) {
        content += `// ${size} size\n`;
        content += `.$componentClass--${size} {\n`;
        content += `  // ${size} size styles\n`;
        content += `}\n\n`;
      }
    }

    // Accessibility styles
    content += `// Accessibility styles\n`;
    content += `.$componentClass {\n`;
    content += `  // High contrast mode support\n`;
    content += `  @media (prefers-contrast: high) {\n`;
    content += `    border-width: 2px;\n`;
    content += `  }\n\n`;
    content += `  // Reduced motion support\n`;
    content += `  @media (prefers-reduced-motion: reduce) {\n`;
    content += `    transition: none;\n`;
    content += `  }\n`;
    content += `}\n`;

    return {
      fileName,
      content,
      type: 'styles'
    };
  }

  /**
   * Generate Storybook stories file
   */
  private generateStories(spec: ComponentSpec): GeneratedComponent {
    const fileName = `${spec.name.toLowerCase()}.stories.tsx`;
    
    let content = `import type { Meta, StoryObj } from '@storybook/react';\n`;
    content += `import { ${spec.name} } from './${spec.name.toLowerCase()}';\n\n`;

    // Generate meta
    content += `const meta: Meta<typeof ${spec.name}> = {\n`;
    content += `  title: '${spec.category}/${spec.name}',\n`;
    content += `  component: ${spec.name},\n`;
    content += `  parameters: {\n`;
    content += `    docs: {\n`;
    content += `      description: {\n`;
    content += `        component: '${spec.description}'\n`;
    content += `      }\n`;
    content += `    }\n`;
    content += `  },\n`;
    content += `  argTypes: {\n`;

    // Generate argTypes
    for (const [propName, propSpec] of Object.entries(spec.props)) {
      content += this.generateArgType(propName, propSpec);
    }

    content += `  }\n`;
    content += `};\n\n`;
    content += `export default meta;\n`;
    content += `type Story = StoryObj<typeof meta>;\n\n`;

    // Generate default story
    content += `// Default story\n`;
    content += `export const Default: Story = {\n`;
    content += `  args: {\n`;
    
    // Add default args
    for (const [propName, propSpec] of Object.entries(spec.props)) {
      if (propSpec.default !== undefined) {
        content += `    ${propName}: ${JSON.stringify(propSpec.default)},\n`;
      }
    }
    
    content += `  }\n`;
    content += `};\n\n`;

    // Generate variant stories
    if (spec.styling?.variants) {
      for (const variant of spec.styling.variants) {
        content += `// ${variant.description}\n`;
        content += `export const ${variant.name.charAt(0).toUpperCase() + variant.name.slice(1)}: Story = {\n`;
        content += `  args: {\n`;
        content += `    ...Default.args,\n`;
        content += `    variant: '${variant.name}'\n`;
        content += `  }\n`;
        content += `};\n\n`;
      }
    }

    // Generate size stories
    const sizeProps = Object.entries(spec.props).filter(([_, prop]) => 
      prop.type === 'enum' && prop.enum?.includes('small')
    );
    
    if (sizeProps.length > 0) {
      const [sizePropName, sizeProp] = sizeProps[0];
      for (const size of sizeProp.enum) {
        content += `// ${size} size\n`;
        content += `export const ${size.charAt(0).toUpperCase() + size.slice(1)}: Story = {\n`;
        content += `  args: {\n`;
        content += `    ...Default.args,\n`;
        content += `    ${sizePropName}: '${size}'\n`;
        content += `  }\n`;
        content += `};\n\n`;
      }
    }

    // Generate state stories
    content += `// Disabled state\n`;
    content += `export const Disabled: Story = {\n`;
    content += `  args: {\n`;
    content += `    ...Default.args,\n`;
    content += `    disabled: true\n`;
    content += `  }\n`;
    content += `};\n\n`;

    return {
      fileName,
      content,
      type: 'stories'
    };
  }

  /**
   * Generate prop type
   */
  private generatePropType(propName: string, propSpec: any): string {
    let type = '';
    
    switch (propSpec.type) {
      case 'string':
        type = 'string';
        break;
      case 'number':
        type = 'number';
        break;
      case 'boolean':
        type = 'boolean';
        break;
      case 'object':
        type = 'object';
        break;
      case 'array':
        type = 'any[]';
        break;
      case 'function':
        type = '() => void';
        break;
      case 'ReactNode':
        type = 'React.ReactNode';
        break;
      case 'enum':
        type = propSpec.enum.map((e: string) => `'${e}'`).join(' | ');
        break;
      default:
        type = 'any';
    }

    const optional = propSpec.required ? '' : '?';
    const comment = propSpec.description ? `  /** ${propSpec.description} */\n` : '';
    
    return `${comment}  ${propName}${optional}: ${type};\n`;
  }

  /**
   * Generate behavior
   */
  private generateBehavior(spec: ComponentSpec, behavior: any, behaviorName: string): string {
    let behaviorCode = `  const handle${behaviorName} = useCallback(() => {\n`;
    behaviorCode += `    // ${behavior.description}\n`;
    
    if (behavior.trigger.condition) {
      behaviorCode += `    if (${behavior.trigger.condition}) {\n`;
    }
    
    if (behavior.expected.callback) {
      behaviorCode += `      ${behavior.expected.callback}?.();\n`;
    }
    
    if (behavior.trigger.condition) {
      behaviorCode += `    }\n`;
    }
    
    behaviorCode += `  }, [${Object.keys(spec.props).filter(prop => 
      spec.props[prop].type === 'function'
    ).join(', ')}]);\n\n`;
    
    return behaviorCode;
  }

  /**
   * Generate accessibility attributes
   */
  private generateAccessibilityAttributes(spec: ComponentSpec): string {
    let attrs = '';
    
    if (spec.accessibility.screenReader.ariaLabel) {
      attrs += `\n      aria-label={ariaLabel || '${spec.name} component'}\n`;
    }
    
    if (spec.accessibility.screenReader.role) {
      attrs += `\n      role="${spec.accessibility.screenReader.role}"\n`;
    }
    
    if (spec.accessibility.screenReader.liveRegion) {
      attrs += `\n      aria-live="polite"\n`;
    }
    
    return attrs;
  }

  /**
   * Generate argType for Storybook
   */
  private generateArgType(propName: string, propSpec: any): string {
    let argType = `    ${propName}: {\n`;
    argType += `      description: '${propSpec.description}',\n`;
    
    if (propSpec.type === 'enum') {
      argType += `      control: { type: 'select' },\n`;
      argType += `      options: [${propSpec.enum.map((e: string) => `'${e}'`).join(', ')}]\n`;
    } else if (propSpec.type === 'boolean') {
      argType += `      control: { type: 'boolean' }\n`;
    } else if (propSpec.type === 'number') {
      argType += `      control: { type: 'number' }\n`;
    } else {
      argType += `      control: { type: 'text' }\n`;
    }
    
    argType += `    },\n`;
    return argType;
  }

  /**
   * Write generated component files
   */
  writeComponent(files: GeneratedComponent[], outputPath: string): void {
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    for (const file of files) {
      const filePath = path.join(outputPath, file.fileName);
      fs.writeFileSync(filePath, file.content);
      console.log(`Generated ${file.type}: ${filePath}`);
    }
  }

  /**
   * Generate and write all component files
   */
  generateAndWriteComponent(spec: ComponentSpec, outputPath: string): void {
    const files = this.generateComponent(spec);
    this.writeComponent(files, outputPath);
  }
}

// CLI usage
if (require.main === module) {
  const generator = new ComponentGenerator();
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node component-generator.js <spec-file> [output-path]');
    process.exit(1);
  }

  const specFile = args[0];
  const outputPath = args[1] || 'generated-components';

  try {
    const specContent = fs.readFileSync(specFile, 'utf8');
    const spec = JSON.parse(specContent);
    
    generator.generateAndWriteComponent(spec, outputPath);
    console.log('Component generation completed successfully!');
  } catch (error) {
    console.error('Error generating component:', error);
    process.exit(1);
  }
}
