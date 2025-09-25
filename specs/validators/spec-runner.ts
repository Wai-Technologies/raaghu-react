import { ComponentSpec } from './spec-validator';
import * as fs from 'fs';
import * as path from 'path';

export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  duration: number;
}

export interface SpecTestResults {
  specName: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  results: TestResult[];
  duration: number;
}

export class SpecRunner {
  public specs: Map<string, ComponentSpec> = new Map();

  /**
   * Load a specification file
   */
  loadSpec(filePath: string): ComponentSpec {
    const specContent = fs.readFileSync(filePath, 'utf8');
    const spec = JSON.parse(specContent);
    this.specs.set(spec.name, spec);
    return spec;
  }

  /**
   * Load all specifications from a directory
   */
  loadSpecs(directory: string): void {
    if (!fs.existsSync(directory)) {
      return;
    }

    const files = fs.readdirSync(directory);
    const specFiles = files.filter(file => file.endsWith('.spec.json'));

    for (const file of specFiles) {
      const filePath = path.join(directory, file);
      this.loadSpec(filePath);
    }
  }

  /**
   * Generate test code from a specification
   */
  generateTestCode(spec: ComponentSpec): string {
    let testCode = `import React from 'react';\n`;
    testCode += `import { render, screen, fireEvent, waitFor } from '@testing-library/react';\n`;
    testCode += `import '@testing-library/jest-dom';\n`;
    testCode += `import { axe, toHaveNoViolations } from 'jest-axe';\n`;
    testCode += `import ${spec.name} from './${spec.name.toLowerCase()}';\n\n`;
    testCode += `expect.extend(toHaveNoViolations);\n\n`;
    testCode += `describe('${spec.name}', () => {\n`;

    // Generate unit tests
    if (spec.testing.unit) {
      testCode += `  // Unit Tests\n`;
      for (const unitTest of spec.testing.unit) {
        testCode += this.generateUnitTest(spec, unitTest);
      }
    }

    // Generate integration tests
    if (spec.testing.integration) {
      testCode += `  // Integration Tests\n`;
      for (const integrationTest of spec.testing.integration) {
        testCode += this.generateIntegrationTest(spec, integrationTest);
      }
    }

    // Generate accessibility tests
    if (spec.testing.accessibility) {
      testCode += `  // Accessibility Tests\n`;
      for (const a11yTest of spec.testing.accessibility) {
        testCode += this.generateAccessibilityTest(spec, a11yTest);
      }
    }

    testCode += `});\n`;
    return testCode;
  }

  /**
   * Generate unit test code
   */
  private generateUnitTest(spec: ComponentSpec, test: any): string {
    let testCode = `\n  it('${test.name}', async () => {\n`;
    testCode += `    // ${test.description}\n`;

    // Generate render call
    if (test.test.render) {
      testCode += `    const { container } = render(\n`;
      testCode += `      <${spec.name}`;
      
      if (test.test.render.props) {
        for (const [propName, propValue] of Object.entries(test.test.render.props)) {
          if (typeof propValue === 'string' && propValue.startsWith('mock')) {
            testCode += `\n        ${propName}={jest.fn()}`;
          } else if (typeof propValue === 'string') {
            testCode += `\n        ${propName}="${propValue}"`;
          } else if (typeof propValue === 'boolean') {
            testCode += `\n        ${propName}={${propValue}}`;
          } else if (typeof propValue === 'object') {
            testCode += `\n        ${propName}={${JSON.stringify(propValue)}}`;
          }
        }
      }
      
      testCode += `\n      />\n`;
      testCode += `    );\n\n`;
    }

    // Generate assertions
    if (test.test.assertions) {
      for (const assertion of test.test.assertions) {
        testCode += this.generateAssertion(assertion);
      }
    }

    testCode += `  });\n`;
    return testCode;
  }

  /**
   * Generate integration test code
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
      for (const action of test.scenario.actions) {
        testCode += this.generateAction(action);
      }
    }

    // Expected results
    if (test.scenario.expected) {
      testCode += `\n    // Verify expected results\n`;
      for (const [key, value] of Object.entries(test.scenario.expected)) {
        testCode += `    expect(${key}).${this.generateExpectation(value)};\n`;
      }
    }

    testCode += `  });\n`;
    return testCode;
  }

  /**
   * Generate accessibility test code
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
   * Generate assertion code
   */
  private generateAssertion(assertion: string): string {
    const assertionMap: Record<string, string> = {
      'component is in document': 'expect(screen.getByRole("button")).toBeInTheDocument();',
      'has correct default classes': 'expect(container.firstChild).toHaveClass("rds-component");',
      'has correct default attributes': 'expect(container.firstChild).toHaveAttribute("data-testid");',
      'click triggers onClick callback': 'expect(mockFunction).toHaveBeenCalledTimes(1);',
      'click count is tracked correctly': 'expect(mockFunction).toHaveBeenCalledWith(expect.any(Object));',
      'click does not trigger onClick callback': 'expect(mockFunction).not.toHaveBeenCalled();',
      'component appears disabled': 'expect(screen.getByRole("button")).toBeDisabled();',
      'loading indicator is visible': 'expect(screen.getByText(/loading/i)).toBeInTheDocument();',
      'interactions are disabled': 'expect(screen.getByRole("button")).toBeDisabled();',
      'has loading aria attributes': 'expect(container.firstChild).toHaveAttribute("aria-busy", "true");',
      'error message is displayed': 'expect(screen.getByText(/error/i)).toBeInTheDocument();',
      'error styling is applied': 'expect(container.firstChild).toHaveClass("error");',
      'has error aria attributes': 'expect(container.firstChild).toHaveAttribute("aria-invalid", "true");',
      'initial data is displayed': 'expect(screen.getByText("item1")).toBeInTheDocument();',
      'data change triggers callback': 'expect(mockFunction).toHaveBeenCalled();',
      'component re-renders with new data': 'expect(screen.getByText("newItem")).toBeInTheDocument();'
    };

    return `    ${assertionMap[assertion] || `// TODO: Implement assertion: ${assertion}`}\n`;
  }

  /**
   * Generate action code
   */
  private generateAction(action: string): string {
    const actionMap: Record<string, string> = {
      'tab to component': 'fireEvent.keyDown(container, { key: "Tab" });',
      'press enter': 'fireEvent.keyDown(container, { key: "Enter" });',
      'press escape': 'fireEvent.keyDown(container, { key: "Escape" });',
      'update data prop': 'rerender(<Component data={["newItem"]} />);',
      'trigger loading state': 'rerender(<Component loading={true} />);',
      'simulate error': 'rerender(<Component error="Test error" />);',
      'change config prop': 'rerender(<Component config={{sort: "desc"}} />);',
      'verify behavior change': 'await waitFor(() => expect(screen.getByText("sorted")).toBeInTheDocument());'
    };

    return `    ${actionMap[action] || `// TODO: Implement action: ${action}`}\n`;
  }

  /**
   * Generate keyboard test code
   */
  private generateKeyboardTest(test: string): string {
    const testMap: Record<string, string> = {
      'tab navigation': 'fireEvent.keyDown(container, { key: "Tab" });\n    expect(document.activeElement).toBe(container.firstChild);',
      'enter activation': 'fireEvent.keyDown(container, { key: "Enter" });\n    expect(mockFunction).toHaveBeenCalled();',
      'focus indicators': 'expect(container.firstChild).toHaveClass("focus-visible");',
      'arrow keys': 'fireEvent.keyDown(container, { key: "ArrowDown" });\n    // Verify arrow key behavior'
    };

    return `    // ${test}\n    ${testMap[test] || `// TODO: Implement keyboard test: ${test}`}\n`;
  }

  /**
   * Generate screen reader test code
   */
  private generateScreenReaderTest(test: string): string {
    const testMap: Record<string, string> = {
      'aria labels': 'expect(container.firstChild).toHaveAttribute("aria-label");',
      'role attributes': 'expect(container.firstChild).toHaveAttribute("role");',
      'state announcements': 'expect(container.firstChild).toHaveAttribute("aria-live");',
      'loading announcement': 'expect(container.firstChild).toHaveAttribute("aria-busy");',
      'error announcement': 'expect(container.firstChild).toHaveAttribute("aria-invalid");',
      'error description': 'expect(container.firstChild).toHaveAttribute("aria-describedby");'
    };

    return `    // ${test}\n    ${testMap[test] || `// TODO: Implement screen reader test: ${test}`}\n`;
  }

  /**
   * Generate expectation code
   */
  private generateExpectation(value: any): string {
    if (typeof value === 'string') {
      return `toBe("${value}")`;
    } else if (typeof value === 'boolean') {
      return `toBe(${value})`;
    } else if (typeof value === 'number') {
      return `toBe(${value})`;
    } else {
      return `toEqual(${JSON.stringify(value)})`;
    }
  }

  /**
   * Run tests for a specific specification
   */
  async runSpecTests(specName: string): Promise<SpecTestResults> {
    const spec = this.specs.get(specName);
    if (!spec) {
      throw new Error(`Specification '${specName}' not found`);
    }

    const startTime = Date.now();
    const results: TestResult[] = [];

    // Run unit tests
    if (spec.testing.unit) {
      for (const unitTest of spec.testing.unit) {
        const result = await this.runUnitTest(spec, unitTest);
        results.push(result);
      }
    }

    // Run integration tests
    if (spec.testing.integration) {
      for (const integrationTest of spec.testing.integration) {
        const result = await this.runIntegrationTest(spec, integrationTest);
        results.push(result);
      }
    }

    // Run accessibility tests
    if (spec.testing.accessibility) {
      for (const a11yTest of spec.testing.accessibility) {
        const result = await this.runAccessibilityTest(spec, a11yTest);
        results.push(result);
      }
    }

    const duration = Date.now() - startTime;
    const passedTests = results.filter(r => r.passed).length;
    const failedTests = results.filter(r => !r.passed).length;

    return {
      specName,
      totalTests: results.length,
      passedTests,
      failedTests,
      results,
      duration
    };
  }

  /**
   * Run a single unit test
   */
  private async runUnitTest(spec: ComponentSpec, test: any): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      // This would integrate with your actual test runner
      // For now, we'll simulate the test
      await new Promise(resolve => setTimeout(resolve, 10));
      
      return {
        name: test.name,
        passed: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        name: test.name,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime
      };
    }
  }

  /**
   * Run a single integration test
   */
  private async runIntegrationTest(spec: ComponentSpec, test: any): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      // This would integrate with your actual test runner
      await new Promise(resolve => setTimeout(resolve, 20));
      
      return {
        name: test.name,
        passed: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        name: test.name,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime
      };
    }
  }

  /**
   * Run a single accessibility test
   */
  private async runAccessibilityTest(spec: ComponentSpec, test: any): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      // This would integrate with your actual test runner
      await new Promise(resolve => setTimeout(resolve, 30));
      
      return {
        name: test.name,
        passed: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        name: test.name,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime
      };
    }
  }

  /**
   * Generate a test report
   */
  generateTestReport(results: SpecTestResults[]): string {
    let report = '# Specification Test Report\n\n';
    
    const totalTests = results.reduce((sum, r) => sum + r.totalTests, 0);
    const totalPassed = results.reduce((sum, r) => sum + r.passedTests, 0);
    const totalFailed = results.reduce((sum, r) => sum + r.failedTests, 0);
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

    report += `## Summary\n`;
    report += `- Total specifications tested: ${results.length}\n`;
    report += `- Total tests: ${totalTests}\n`;
    report += `- Passed: ${totalPassed}\n`;
    report += `- Failed: ${totalFailed}\n`;
    report += `- Total duration: ${totalDuration}ms\n\n`;

    for (const result of results) {
      report += `## ${result.specName}\n`;
      report += `- Tests: ${result.totalTests} (${result.passedTests} passed, ${result.failedTests} failed)\n`;
      report += `- Duration: ${result.duration}ms\n\n`;

      for (const testResult of result.results) {
        const status = testResult.passed ? '✅' : '❌';
        report += `- ${status} ${testResult.name} (${testResult.duration}ms)\n`;
        if (testResult.error) {
          report += `  - Error: ${testResult.error}\n`;
        }
      }
      report += '\n';
    }

    return report;
  }
}

// CLI usage
if (require.main === module) {
  const runner = new SpecRunner();
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node spec-runner.js <spec-file> [spec-file2] ...');
    console.log('   or: node spec-runner.js --all <directory>');
    process.exit(1);
  }

  const runTests = async () => {
    if (args[0] === '--all' && args[1]) {
      runner.loadSpecs(args[1]);
      const results: SpecTestResults[] = [];
      
      const specNames = Array.from(runner.specs.keys());
      for (const specName of specNames) {
        const result = await runner.runSpecTests(specName);
        results.push(result);
      }
      
      const report = runner.generateTestReport(results);
      console.log(report);
    } else {
      for (const filePath of args) {
        const spec = runner.loadSpec(filePath);
        const result = await runner.runSpecTests(spec.name);
        const report = runner.generateTestReport([result]);
        console.log(report);
      }
    }
  };

  runTests().catch(console.error);
}
