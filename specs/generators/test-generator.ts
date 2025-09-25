import { ComponentSpec } from '../validators/spec-validator';
import * as fs from 'fs';
import * as path from 'path';

export interface GeneratedTest {
  fileName: string;
  content: string;
  type: 'unit' | 'integration' | 'accessibility';
}

export class TestGenerator {
  private outputDir: string;

  constructor(outputDir: string = 'generated-tests') {
    this.outputDir = outputDir;
  }

  /**
   * Generate all test files from a component specification
   */
  generateTests(spec: ComponentSpec, componentPath: string): GeneratedTest[] {
    const tests: GeneratedTest[] = [];

    // Generate unit tests
    if (spec.testing.unit && spec.testing.unit.length > 0) {
      const unitTest = this.generateUnitTestFile(spec, componentPath);
      tests.push(unitTest);
    }

    // Generate integration tests
    if (spec.testing.integration && spec.testing.integration.length > 0) {
      const integrationTest = this.generateIntegrationTestFile(spec, componentPath);
      tests.push(integrationTest);
    }

    // Generate accessibility tests
    if (spec.testing.accessibility && spec.testing.accessibility.length > 0) {
      const accessibilityTest = this.generateAccessibilityTestFile(spec, componentPath);
      tests.push(accessibilityTest);
    }

    return tests;
  }

  /**
   * Generate unit test file
   */
  private generateUnitTestFile(spec: ComponentSpec, componentPath: string): GeneratedTest {
    const componentName = spec.name;
    const fileName = `${componentName.toLowerCase()}.test.tsx`;
    
    let content = this.generateTestHeader(spec, componentPath);
    content += `describe('${componentName} Unit Tests', () => {\n`;

    // Generate unit tests
    for (const unitTest of spec.testing.unit) {
      content += this.generateUnitTest(spec, unitTest);
    }

    content += `});\n`;
    
    return {
      fileName,
      content,
      type: 'unit'
    };
  }

  /**
   * Generate integration test file
   */
  private generateIntegrationTestFile(spec: ComponentSpec, componentPath: string): GeneratedTest {
    const componentName = spec.name;
    const fileName = `${componentName.toLowerCase()}.integration.test.tsx`;
    
    let content = this.generateTestHeader(spec, componentPath);
    content += `describe('${componentName} Integration Tests', () => {\n`;

    // Generate integration tests
    for (const integrationTest of spec.testing.integration) {
      content += this.generateIntegrationTest(spec, integrationTest);
    }

    content += `});\n`;
    
    return {
      fileName,
      content,
      type: 'integration'
    };
  }

  /**
   * Generate accessibility test file
   */
  private generateAccessibilityTestFile(spec: ComponentSpec, componentPath: string): GeneratedTest {
    const componentName = spec.name;
    const fileName = `${componentName.toLowerCase()}.accessibility.test.tsx`;
    
    let content = this.generateTestHeader(spec, componentPath);
    content += `describe('${componentName} Accessibility Tests', () => {\n`;

    // Generate accessibility tests
    for (const a11yTest of spec.testing.accessibility) {
      content += this.generateAccessibilityTest(spec, a11yTest);
    }

    content += `});\n`;
    
    return {
      fileName,
      content,
      type: 'accessibility'
    };
  }

  /**
   * Generate test file header
   */
  private generateTestHeader(spec: ComponentSpec, componentPath: string): string {
    const componentName = spec.name;
    const importPath = this.getImportPath(componentPath);
    
    let header = `import React from 'react';\n`;
    header += `import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';\n`;
    header += `import '@testing-library/jest-dom';\n`;
    header += `import { axe, toHaveNoViolations } from 'jest-axe';\n`;
    header += `import userEvent from '@testing-library/user-event';\n`;
    header += `import ${componentName} from '${importPath}';\n\n`;
    header += `expect.extend(toHaveNoViolations);\n\n`;
    
    return header;
  }

  /**
   * Generate a single unit test
   */
  private generateUnitTest(spec: ComponentSpec, test: any): string {
    let testCode = `\n  it('${test.name}', async () => {\n`;
    testCode += `    // ${test.description}\n`;

    // Generate render call
    if (test.test.render) {
      testCode += this.generateRenderCall(spec, test.test.render);
    }

    // Generate assertions
    if (test.test.assertions) {
      testCode += `\n    // Assertions\n`;
      for (const assertion of test.test.assertions) {
        testCode += this.generateAssertion(spec, assertion);
      }
    }

    testCode += `  });\n`;
    return testCode;
  }

  /**
   * Generate a single integration test
   */
  private generateIntegrationTest(spec: ComponentSpec, test: any): string {
    let testCode = `\n  it('${test.name}', async () => {\n`;
    testCode += `    // ${test.description}\n`;

    // Setup
    if (test.scenario.setup) {
      testCode += `    const setupProps = ${JSON.stringify(test.scenario.setup, null, 6)};\n`;
      testCode += `    const { container, rerender } = render(\n`;
      testCode += `      <${spec.name} {...setupProps} />\n`;
      testCode += `    );\n\n`;
    }

    // Actions
    if (test.scenario.actions) {
      testCode += `    // Actions\n`;
      for (const action of test.scenario.actions) {
        testCode += this.generateAction(spec, action);
      }
    }

    // Expected results
    if (test.scenario.expected) {
      testCode += `\n    // Verify expected results\n`;
      for (const [key, value] of Object.entries(test.scenario.expected)) {
        testCode += this.generateExpectation(key, value);
      }
    }

    testCode += `  });\n`;
    return testCode;
  }

  /**
   * Generate a single accessibility test
   */
  private generateAccessibilityTest(spec: ComponentSpec, test: any): string {
    let testCode = `\n  it('${test.name}', async () => {\n`;
    testCode += `    // ${test.description}\n`;

    testCode += `    const { container } = render(\n`;
    testCode += `      <${spec.name} />\n`;
    testCode += `    );\n\n`;

    // Axe tests
    if (test.test.axeRules) {
      testCode += `    // Axe accessibility tests\n`;
      testCode += `    const results = await axe(container);\n`;
      testCode += `    expect(results).toHaveNoViolations();\n\n`;
    }

    // Keyboard tests
    if (test.test.keyboardTests) {
      testCode += `    // Keyboard navigation tests\n`;
      for (const keyboardTest of test.test.keyboardTests) {
        testCode += this.generateKeyboardTest(keyboardTest);
      }
    }

    // Screen reader tests
    if (test.test.screenReaderTests) {
      testCode += `    // Screen reader tests\n`;
      for (const srTest of test.test.screenReaderTests) {
        testCode += this.generateScreenReaderTest(srTest);
      }
    }

    testCode += `  });\n`;
    return testCode;
  }

  /**
   * Generate render call
   */
  private generateRenderCall(spec: ComponentSpec, renderConfig: any): string {
    let renderCode = `    const { container } = render(\n`;
    renderCode += `      <${spec.name}`;
    
    if (renderConfig.props) {
      for (const [propName, propValue] of Object.entries(renderConfig.props)) {
        renderCode += this.generatePropAssignment(propName, propValue);
      }
    }
    
    renderCode += `\n      />\n`;
    renderCode += `    );\n\n`;
    
    return renderCode;
  }

  /**
   * Generate prop assignment
   */
  private generatePropAssignment(propName: string, propValue: any): string {
    if (typeof propValue === 'string' && propValue.startsWith('mock')) {
      return `\n        ${propName}={jest.fn()}`;
    } else if (typeof propValue === 'string') {
      return `\n        ${propName}="${propValue}"`;
    } else if (typeof propValue === 'boolean') {
      return `\n        ${propName}={${propValue}}`;
    } else if (typeof propValue === 'object') {
      return `\n        ${propName}={${JSON.stringify(propValue)}}`;
    } else {
      return `\n        ${propName}={${propValue}}`;
    }
  }

  /**
   * Generate assertion
   */
  private generateAssertion(spec: ComponentSpec, assertion: string): string {
    const assertionMap: Record<string, string> = {
      'component is in document': `    expect(screen.getByRole("button")).toBeInTheDocument();`,
      'has correct default classes': `    expect(container.firstChild).toHaveClass("rds-${spec.name.toLowerCase().replace('rds', '')}");`,
      'has correct default attributes': `    expect(container.firstChild).toHaveAttribute("data-testid");`,
      'click triggers onClick callback': `    expect(mockFunction).toHaveBeenCalledTimes(1);`,
      'click count is tracked correctly': `    expect(mockFunction).toHaveBeenCalledWith(expect.any(Object));`,
      'click does not trigger onClick callback': `    expect(mockFunction).not.toHaveBeenCalled();`,
      'component appears disabled': `    expect(screen.getByRole("button")).toBeDisabled();`,
      'loading indicator is visible': `    expect(screen.getByText(/loading/i)).toBeInTheDocument();`,
      'interactions are disabled': `    expect(screen.getByRole("button")).toBeDisabled();`,
      'has loading aria attributes': `    expect(container.firstChild).toHaveAttribute("aria-busy", "true");`,
      'error message is displayed': `    expect(screen.getByText(/error/i)).toBeInTheDocument();`,
      'error styling is applied': `    expect(container.firstChild).toHaveClass("error");`,
      'has error aria attributes': `    expect(container.firstChild).toHaveAttribute("aria-invalid", "true");`,
      'initial data is displayed': `    expect(screen.getByText("item1")).toBeInTheDocument();`,
      'data change triggers callback': `    expect(mockFunction).toHaveBeenCalled();`,
      'component re-renders with new data': `    expect(screen.getByText("newItem")).toBeInTheDocument();`
    };

    return `    ${assertionMap[assertion] || `// TODO: Implement assertion: ${assertion}`}\n`;
  }

  /**
   * Generate action
   */
  private generateAction(spec: ComponentSpec, action: string): string {
    const actionMap: Record<string, string> = {
      'tab to component': `    fireEvent.keyDown(container, { key: "Tab" });`,
      'press enter': `    fireEvent.keyDown(container, { key: "Enter" });`,
      'press escape': `    fireEvent.keyDown(container, { key: "Escape" });`,
      'update data prop': `    rerender(<${spec.name} data={["newItem"]} />);`,
      'trigger loading state': `    rerender(<${spec.name} loading={true} />);`,
      'simulate error': `    rerender(<${spec.name} error="Test error" />);`,
      'change config prop': `    rerender(<${spec.name} config={{sort: "desc"}} />);`,
      'verify behavior change': `    await waitFor(() => expect(screen.getByText("sorted")).toBeInTheDocument());`
    };

    return `    ${actionMap[action] || `// TODO: Implement action: ${action}`}\n`;
  }

  /**
   * Generate keyboard test
   */
  private generateKeyboardTest(test: string): string {
    const testMap: Record<string, string> = {
      'tab navigation': `    fireEvent.keyDown(container, { key: "Tab" });\n    expect(document.activeElement).toBe(container.firstChild);`,
      'enter activation': `    fireEvent.keyDown(container, { key: "Enter" });\n    expect(mockFunction).toHaveBeenCalled();`,
      'focus indicators': `    expect(container.firstChild).toHaveClass("focus-visible");`,
      'arrow keys': `    fireEvent.keyDown(container, { key: "ArrowDown" });\n    // Verify arrow key behavior`
    };

    return `    // ${test}\n    ${testMap[test] || `// TODO: Implement keyboard test: ${test}`}\n`;
  }

  /**
   * Generate screen reader test
   */
  private generateScreenReaderTest(test: string): string {
    const testMap: Record<string, string> = {
      'aria labels': `    expect(container.firstChild).toHaveAttribute("aria-label");`,
      'role attributes': `    expect(container.firstChild).toHaveAttribute("role");`,
      'state announcements': `    expect(container.firstChild).toHaveAttribute("aria-live");`,
      'loading announcement': `    expect(container.firstChild).toHaveAttribute("aria-busy");`,
      'error announcement': `    expect(container.firstChild).toHaveAttribute("aria-invalid");`,
      'error description': `    expect(container.firstChild).toHaveAttribute("aria-describedby");`
    };

    return `    // ${test}\n    ${testMap[test] || `// TODO: Implement screen reader test: ${test}`}\n`;
  }

  /**
   * Generate expectation
   */
  private generateExpectation(key: string, value: any): string {
    if (typeof value === 'string') {
      return `    expect(${key}).toBe("${value}");`;
    } else if (typeof value === 'boolean') {
      return `    expect(${key}).toBe(${value});`;
    } else if (typeof value === 'number') {
      return `    expect(${key}).toBe(${value});`;
    } else {
      return `    expect(${key}).toEqual(${JSON.stringify(value)});`;
    }
  }

  /**
   * Get import path for component
   */
  private getImportPath(componentPath: string): string {
    // Convert component path to relative import
    const relativePath = path.relative(this.outputDir, componentPath);
    return `./${relativePath.replace(/\\/g, '/')}`;
  }

  /**
   * Write generated tests to files
   */
  writeTests(tests: GeneratedTest[], outputPath: string): void {
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    for (const test of tests) {
      const filePath = path.join(outputPath, test.fileName);
      fs.writeFileSync(filePath, test.content);
      console.log(`Generated ${test.type} test: ${filePath}`);
    }
  }

  /**
   * Generate and write all tests for a specification
   */
  generateAndWriteTests(spec: ComponentSpec, componentPath: string, outputPath: string): void {
    const tests = this.generateTests(spec, componentPath);
    this.writeTests(tests, outputPath);
  }
}

// CLI usage
if (require.main === module) {
  const generator = new TestGenerator();
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: node test-generator.js <spec-file> <component-path> [output-path]');
    process.exit(1);
  }

  const specFile = args[0];
  const componentPath = args[1];
  const outputPath = args[2] || 'generated-tests';

  try {
    const specContent = fs.readFileSync(specFile, 'utf8');
    const spec = JSON.parse(specContent);
    
    generator.generateAndWriteTests(spec, componentPath, outputPath);
    console.log('Test generation completed successfully!');
  } catch (error) {
    console.error('Error generating tests:', error);
    process.exit(1);
  }
}
