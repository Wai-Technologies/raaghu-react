import * as Ajv from 'ajv';
import * as fs from 'fs';
import * as path from 'path';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ComponentSpec {
  name: string;
  version: string;
  description: string;
  category: string;
  props: Record<string, any>;
  behaviors: any[];
  accessibility: any;
  testing: any;
  performance?: any;
  styling?: any;
}

export class SpecValidator {
  private ajv: any;
  private schema: any;

  constructor() {
    this.ajv = new (Ajv as any)({ allErrors: true });
    this.loadSchema();
  }

  private loadSchema(): void {
    const schemaPath = path.resolve(__dirname, '../component-spec-schema.json');
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    this.schema = JSON.parse(schemaContent);
  }

  /**
   * Validate a component specification against the schema
   */
  validateSpec(spec: ComponentSpec): ValidationResult {
    const result: ValidationResult = {
      valid: true,
      errors: [],
      warnings: []
    };

    // Schema validation
    const validate = this.ajv.compile(this.schema);
    const valid = validate(spec);

    if (!valid) {
      result.valid = false;
      result.errors = validate.errors?.map(error => 
        `${(error as any).instancePath || 'root'}: ${error.message}`
      ) || [];
    }

    // Business rule validation
    const businessErrors = this.validateBusinessRules(spec);
    result.errors.push(...businessErrors);

    // Warning checks
    const warnings = this.checkWarnings(spec);
    result.warnings.push(...warnings);

    return result;
  }

  /**
   * Validate business rules specific to RDS
   */
  private validateBusinessRules(spec: ComponentSpec): string[] {
    const errors: string[] = [];

    // Component naming convention
    if (!spec.name.match(/^Rds[A-Z][a-zA-Z]*$/)) {
      errors.push(`Component name '${spec.name}' must follow RDS naming convention (Rds[ComponentName])`);
    }

    // Required props validation
    const requiredProps = ['className', 'id', 'dataTestId'];
    for (const prop of requiredProps) {
      if (!spec.props[prop]) {
        errors.push(`Required prop '${prop}' is missing`);
      }
    }

    // Accessibility validation
    if (spec.accessibility.wcagLevel !== 'AA') {
      errors.push('WCAG level must be AA or higher for RDS components');
    }

    // Performance validation
    if (spec.performance) {
      if (spec.performance.maxRenderTime > 100) {
        errors.push('Maximum render time should not exceed 100ms');
      }
      if (spec.performance.maxBundleSize > 50000) {
        errors.push('Maximum bundle size should not exceed 50KB');
      }
    }

    // Testing validation
    if (!spec.testing.unit || spec.testing.unit.length === 0) {
      errors.push('At least one unit test specification is required');
    }

    if (!spec.testing.accessibility || spec.testing.accessibility.length === 0) {
      errors.push('At least one accessibility test specification is required');
    }

    // Behavior validation
    for (const behavior of spec.behaviors) {
      if (!behavior.name || !behavior.description || !behavior.trigger || !behavior.expected) {
        errors.push(`Behavior '${behavior.name || 'unnamed'}' is missing required fields`);
      }
    }

    return errors;
  }

  /**
   * Check for potential issues and provide warnings
   */
  private checkWarnings(spec: ComponentSpec): string[] {
    const warnings: string[] = [];

    // Check for missing performance specs
    if (!spec.performance) {
      warnings.push('Performance specifications are missing - consider adding them');
    }

    // Check for missing styling specs
    if (!spec.styling) {
      warnings.push('Styling specifications are missing - consider adding them');
    }

    // Check for minimal test coverage
    if (spec.testing.unit.length < 3) {
      warnings.push('Consider adding more unit test specifications for better coverage');
    }

    if (spec.testing.integration.length < 2) {
      warnings.push('Consider adding more integration test specifications');
    }

    // Check for accessibility completeness
    if (!spec.accessibility.colorContrast.testedStates || 
        spec.accessibility.colorContrast.testedStates.length < 3) {
      warnings.push('Consider testing more color contrast states');
    }

    // Check for prop validation
    for (const [propName, propSpec] of Object.entries(spec.props)) {
      if (propSpec.required && !propSpec.validation) {
        warnings.push(`Required prop '${propName}' should have validation rules`);
      }
    }

    return warnings;
  }

  /**
   * Validate a specification file
   */
  validateSpecFile(filePath: string): ValidationResult {
    try {
      const specContent = fs.readFileSync(filePath, 'utf8');
      const spec = JSON.parse(specContent);
      return this.validateSpec(spec);
    } catch (error) {
      return {
        valid: false,
        errors: [`Failed to parse specification file: ${error}`],
        warnings: []
      };
    }
  }

  /**
   * Validate all specification files in a directory
   */
  validateAllSpecs(directory: string): Record<string, ValidationResult> {
    const results: Record<string, ValidationResult> = {};
    
    if (!fs.existsSync(directory)) {
      return results;
    }

    const files = fs.readdirSync(directory);
    const specFiles = files.filter(file => file.endsWith('.spec.json'));

    for (const file of specFiles) {
      const filePath = path.join(directory, file);
      results[file] = this.validateSpecFile(filePath);
    }

    return results;
  }

  /**
   * Generate a validation report
   */
  generateReport(results: Record<string, ValidationResult>): string {
    let report = '# Specification Validation Report\n\n';
    
    const validSpecs = Object.entries(results).filter(([_, result]) => result.valid);
    const invalidSpecs = Object.entries(results).filter(([_, result]) => !result.valid);

    report += `## Summary\n`;
    report += `- Total specifications: ${Object.keys(results).length}\n`;
    report += `- Valid: ${validSpecs.length}\n`;
    report += `- Invalid: ${invalidSpecs.length}\n\n`;

    if (invalidSpecs.length > 0) {
      report += `## Invalid Specifications\n\n`;
      for (const [fileName, result] of invalidSpecs) {
        report += `### ${fileName}\n`;
        for (const error of result.errors) {
          report += `- ❌ ${error}\n`;
        }
        for (const warning of result.warnings) {
          report += `- ⚠️ ${warning}\n`;
        }
        report += '\n';
      }
    }

    if (validSpecs.length > 0) {
      report += `## Valid Specifications\n\n`;
      for (const [fileName, result] of validSpecs) {
        report += `### ${fileName}\n`;
        if (result.warnings.length > 0) {
          for (const warning of result.warnings) {
            report += `- ⚠️ ${warning}\n`;
          }
        } else {
          report += `- ✅ No issues found\n`;
        }
        report += '\n';
      }
    }

    return report;
  }
}

// CLI usage
if (require.main === module) {
  const validator = new SpecValidator();
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node spec-validator.js <spec-file> [spec-file2] ...');
    console.log('   or: node spec-validator.js --all <directory>');
    process.exit(1);
  }

  if (args[0] === '--all' && args[1]) {
    const results = validator.validateAllSpecs(args[1]);
    const report = validator.generateReport(results);
    console.log(report);
  } else {
    for (const filePath of args) {
      const result = validator.validateSpecFile(filePath);
      console.log(`\n${filePath}:`);
      if (result.valid) {
        console.log('✅ Valid');
      } else {
        console.log('❌ Invalid');
        for (const error of result.errors) {
          console.log(`  - ${error}`);
        }
      }
      for (const warning of result.warnings) {
        console.log(`  ⚠️ ${warning}`);
      }
    }
  }
}
