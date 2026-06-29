/**
 * Component Quality Standards and Guidelines for Raaghu Design System
 */

// Component Quality Metrics
export interface ComponentQualityMetrics {
  accessibility: AccessibilityScore;
  performance: PerformanceScore;
  testCoverage: TestCoverageScore;
  documentation: DocumentationScore;
  designSystemCompliance: ComplianceScore;
  overallScore: number;
}

export interface AccessibilityScore {
  score: number; // 0-100
  wcagLevel: 'A' | 'AA' | 'AAA' | 'FAIL';
  issues: AccessibilityIssue[];
}

export interface PerformanceScore {
  score: number; // 0-100
  bundleSize: number; // bytes
  renderTime: number; // milliseconds
  memoryUsage: number; // bytes
}

export interface TestCoverageScore {
  score: number; // 0-100
  linesCovered: number;
  totalLines: number;
  branchesCovered: number;
  totalBranches: number;
}

export interface DocumentationScore {
  score: number; // 0-100
  hasStorybook: boolean;
  hasExamples: boolean;
  hasAPIDoc: boolean;
  hasUsageGuide: boolean;
}

export interface ComplianceScore {
  score: number; // 0-100
  followsNaming: boolean;
  usesDesignTokens: boolean;
  hasProperProps: boolean;
  implementsThemes: boolean;
}

export interface AccessibilityIssue {
  severity: 'error' | 'warning' | 'info';
  rule: string;
  message: string;
  element: string;
}

// Component Standards
export class ComponentStandards {
  // Quality Gates - minimum requirements
  static readonly QUALITY_GATES = {
    accessibility: {
      minScore: 90,
      requiredWCAGLevel: 'AA' as 'AA' | 'AAA',
    },
    performance: {
      minScore: 85,
      maxBundleSize: 50000, // 50KB
      maxRenderTime: 16, // 16ms
    },
    testCoverage: {
      minScore: 80,
      minLineCoverage: 80,
      minBranchCoverage: 75,
    },
    documentation: {
      minScore: 90,
      requiredDocs: ['storybook', 'examples', 'api'],
    },
    designSystemCompliance: {
      minScore: 95,
    },
    overall: {
      minScore: 85,
    },
  };

  // Naming conventions
  static readonly NAMING_CONVENTIONS = {
    component: /^Rds[A-Z][a-zA-Z]*$/,
    props: /^[a-z][a-zA-Z]*$/,
    file: /^rds-[a-z-]+\.(tsx|ts|scss|stories\.tsx)$/,
    storyName: /^[A-Z][a-zA-Z\s]*$/,
  };

  // Required props interface
  static readonly REQUIRED_PROPS = {
    className: 'string',
    'data-testid': 'string',
    id: 'string',
  };

  // Validate component name
  static validateComponentName(name: string): boolean {
    return this.NAMING_CONVENTIONS.component.test(name);
  }

  // Validate file name
  static validateFileName(fileName: string): boolean {
    return this.NAMING_CONVENTIONS.file.test(fileName);
  }

  // Validate CSS class name (BEM-style rds- prefix without backtracking-prone regex)
  static validateCSSClassName(className: string): boolean {
    if (!className.startsWith('rds-')) return false;
    const segments = className.split('--');
    if (segments.length > 2) return false;
    const blockPart = segments[0];
    if (!/^rds-[a-z-]+(__[a-z-]+)?$/.test(blockPart)) return false;
    if (segments.length === 2 && !/^[a-z-]+$/.test(segments[1])) return false;
    return true;
  }

  // Calculate overall quality score
  static calculateOverallScore(metrics: Omit<ComponentQualityMetrics, 'overallScore'>): number {
    const weights = {
      accessibility: 0.25,
      performance: 0.20,
      testCoverage: 0.20,
      documentation: 0.15,
      designSystemCompliance: 0.20,
    };

    return Math.round(
      metrics.accessibility.score * weights.accessibility +
      metrics.performance.score * weights.performance +
      metrics.testCoverage.score * weights.testCoverage +
      metrics.documentation.score * weights.documentation +
      metrics.designSystemCompliance.score * weights.designSystemCompliance
    );
  }

  // Check if component meets quality gates
  static meetsQualityGates(metrics: ComponentQualityMetrics): {
    passed: boolean;
    failures: string[];
  } {
    const failures: string[] = [];

    // Check accessibility
    if (metrics.accessibility.score < this.QUALITY_GATES.accessibility.minScore) {
      failures.push(`Accessibility score ${metrics.accessibility.score} is below minimum ${this.QUALITY_GATES.accessibility.minScore}`);
    }

    if (metrics.accessibility.wcagLevel === 'FAIL' || 
        (this.QUALITY_GATES.accessibility.requiredWCAGLevel === 'AAA' && 
         !['AAA'].includes(metrics.accessibility.wcagLevel)) ||
        (this.QUALITY_GATES.accessibility.requiredWCAGLevel === 'AA' && 
         !['AA', 'AAA'].includes(metrics.accessibility.wcagLevel))) {
      failures.push(`WCAG level ${metrics.accessibility.wcagLevel} does not meet required ${this.QUALITY_GATES.accessibility.requiredWCAGLevel}`);
    }

    // Check performance
    if (metrics.performance.score < this.QUALITY_GATES.performance.minScore) {
      failures.push(`Performance score ${metrics.performance.score} is below minimum ${this.QUALITY_GATES.performance.minScore}`);
    }

    if (metrics.performance.bundleSize > this.QUALITY_GATES.performance.maxBundleSize) {
      failures.push(`Bundle size ${metrics.performance.bundleSize} exceeds maximum ${this.QUALITY_GATES.performance.maxBundleSize}`);
    }

    // Check test coverage
    if (metrics.testCoverage.score < this.QUALITY_GATES.testCoverage.minScore) {
      failures.push(`Test coverage score ${metrics.testCoverage.score} is below minimum ${this.QUALITY_GATES.testCoverage.minScore}`);
    }

    // Check documentation
    if (metrics.documentation.score < this.QUALITY_GATES.documentation.minScore) {
      failures.push(`Documentation score ${metrics.documentation.score} is below minimum ${this.QUALITY_GATES.documentation.minScore}`);
    }

    // Check design system compliance
    if (metrics.designSystemCompliance.score < this.QUALITY_GATES.designSystemCompliance.minScore) {
      failures.push(`Design system compliance ${metrics.designSystemCompliance.score} is below minimum ${this.QUALITY_GATES.designSystemCompliance.minScore}`);
    }

    // Check overall score
    if (metrics.overallScore < this.QUALITY_GATES.overall.minScore) {
      failures.push(`Overall score ${metrics.overallScore} is below minimum ${this.QUALITY_GATES.overall.minScore}`);
    }

    return {
      passed: failures.length === 0,
      failures,
    };
  }
}

// Component Validator
export class ComponentValidator {
  // Validate component props interface
  static validatePropsInterface(propsInterface: Record<string, string>): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];

    // Check for required base props
    Object.entries(ComponentStandards.REQUIRED_PROPS).forEach(([prop, type]) => {
      if (!propsInterface[`${prop}?`] && !propsInterface[prop]) {
        issues.push(`Missing optional prop: ${prop}?: ${type}`);
      }
    });

    // Check prop naming
    Object.keys(propsInterface).forEach(prop => {
      const cleanProp = prop.replace('?', '');
      if (!ComponentStandards.NAMING_CONVENTIONS.props.test(cleanProp)) {
        issues.push(`Invalid prop name: ${prop}. Should follow camelCase convention.`);
      }
    });

    return {
      isValid: issues.length === 0,
      issues,
    };
  }

  // Validate component structure
  static validateComponentStructure(_componentPath: string): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    
    // This would be implemented to check:
    // - File structure follows conventions
    // - Required files exist (component, styles, stories, tests)
    // - Imports are properly structured
    
    // Mock validation for now - commented out for now as it's not being used
    /* 
    const requiredFiles = [
      `${componentPath}.tsx`,
      `${componentPath}.scss`,
      `${componentPath}.stories.tsx`,
      `${componentPath}.test.tsx`,
    ];
    */

    // In real implementation, check if files exist
    // For now, assume they exist
    
    return {
      isValid: issues.length === 0,
      issues,
    };
  }
}

// Quality Reporter
export class QualityReporter {
  // Generate quality report for a component
  static generateReport(componentName: string, metrics: ComponentQualityMetrics): string {
    const qualityCheck = ComponentStandards.meetsQualityGates(metrics);
    
    let report = `# Quality Report: ${componentName}\n\n`;
    report += `## Overall Score: ${metrics.overallScore}/100\n`;
    report += `**Status: ${qualityCheck.passed ? '✅ PASSED' : '❌ FAILED'}**\n\n`;

    // Individual scores
    report += `## Individual Scores\n\n`;
    report += `- **Accessibility:** ${metrics.accessibility.score}/100 (WCAG ${metrics.accessibility.wcagLevel})\n`;
    report += `- **Performance:** ${metrics.performance.score}/100\n`;
    report += `- **Test Coverage:** ${metrics.testCoverage.score}/100\n`;
    report += `- **Documentation:** ${metrics.documentation.score}/100\n`;
    report += `- **Design System Compliance:** ${metrics.designSystemCompliance.score}/100\n\n`;

    // Performance details
    report += `## Performance Details\n\n`;
    report += `- **Bundle Size:** ${(metrics.performance.bundleSize / 1024).toFixed(2)} KB\n`;
    report += `- **Render Time:** ${metrics.performance.renderTime.toFixed(2)} ms\n`;
    report += `- **Memory Usage:** ${(metrics.performance.memoryUsage / 1024).toFixed(2)} KB\n\n`;

    // Test coverage details
    report += `## Test Coverage Details\n\n`;
    report += `- **Lines:** ${metrics.testCoverage.linesCovered}/${metrics.testCoverage.totalLines} (${((metrics.testCoverage.linesCovered / metrics.testCoverage.totalLines) * 100).toFixed(1)}%)\n`;
    report += `- **Branches:** ${metrics.testCoverage.branchesCovered}/${metrics.testCoverage.totalBranches} (${((metrics.testCoverage.branchesCovered / metrics.testCoverage.totalBranches) * 100).toFixed(1)}%)\n\n`;

    // Accessibility issues
    if (metrics.accessibility.issues.length > 0) {
      report += `## Accessibility Issues\n\n`;
      metrics.accessibility.issues.forEach(issue => {
        const icon = issue.severity === 'error' ? '🔴' : issue.severity === 'warning' ? '🟡' : 'ℹ️';
        report += `${icon} **${issue.severity.toUpperCase()}:** ${issue.message} (${issue.rule})\n`;
      });
      report += '\n';
    }

    // Quality gate failures
    if (!qualityCheck.passed) {
      report += `## Quality Gate Failures\n\n`;
      qualityCheck.failures.forEach(failure => {
        report += `❌ ${failure}\n`;
      });
      report += '\n';
    }

    report += `## Recommendations\n\n`;
    
    if (metrics.accessibility.score < 90) {
      report += `- Improve accessibility by addressing WCAG issues\n`;
    }
    if (metrics.performance.score < 85) {
      report += `- Optimize performance by reducing bundle size and render time\n`;
    }
    if (metrics.testCoverage.score < 80) {
      report += `- Increase test coverage with more unit and integration tests\n`;
    }
    if (metrics.documentation.score < 90) {
      report += `- Improve documentation with better examples and API docs\n`;
    }

    return report;
  }

  // Generate summary report for multiple components
  static generateSummaryReport(components: Record<string, ComponentQualityMetrics>): string {
    const componentCount = Object.keys(components).length;
    const passedCount = Object.values(components)
      .filter(metrics => ComponentStandards.meetsQualityGates(metrics).passed).length;
    
    const averageScore = Object.values(components)
      .reduce((sum, metrics) => sum + metrics.overallScore, 0) / componentCount;

    let report = `# Component Library Quality Summary\n\n`;
    report += `**Total Components:** ${componentCount}\n`;
    report += `**Passed Quality Gates:** ${passedCount}/${componentCount} (${((passedCount / componentCount) * 100).toFixed(1)}%)\n`;
    report += `**Average Score:** ${averageScore.toFixed(1)}/100\n\n`;

    report += `## Component Scores\n\n`;
    report += `| Component | Overall | Accessibility | Performance | Tests | Docs | Compliance | Status |\n`;
    report += `|-----------|---------|---------------|-------------|-------|------|------------|--------|\n`;

    Object.entries(components).forEach(([name, metrics]) => {
      const status = ComponentStandards.meetsQualityGates(metrics).passed ? '✅' : '❌';
      report += `| ${name} | ${metrics.overallScore} | ${metrics.accessibility.score} | ${metrics.performance.score} | ${metrics.testCoverage.score} | ${metrics.documentation.score} | ${metrics.designSystemCompliance.score} | ${status} |\n`;
    });

    return report;
  }
}

// Export all classes and interfaces
export default {
  ComponentStandards,
  ComponentValidator,
  QualityReporter,
};
