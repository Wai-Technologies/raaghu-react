import { readFileSync, appendFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function (plop) {

  // ─── ELEMENT generator ───────────────────────────────────────────────────
  plop.setGenerator('element', {
    description: 'Create a new Raaghu element (raaghu-elements/)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Element name (e.g. "color-swatch", "icon-badge"):',
        validate: (v) => v.trim().length > 0 || 'Name is required',
      },
    ],
    actions: [
      // TSX
      {
        type: 'add',
        path: 'raaghu-elements/rds-{{kebabCase name}}/rds-{{kebabCase name}}.tsx',
        templateFile: 'plop-templates/element/component.tsx.hbs',
      },
      // SCSS
      {
        type: 'add',
        path: 'raaghu-elements/rds-{{kebabCase name}}/rds-{{kebabCase name}}.scss',
        templateFile: 'plop-templates/element/component.scss.hbs',
      },
      // Story
      {
        type: 'add',
        path: 'raaghu-elements/rds-{{kebabCase name}}/rds-{{kebabCase name}}.stories.tsx',
        templateFile: 'plop-templates/element/component.stories.tsx.hbs',
      },
      // Test
      {
        type: 'add',
        path: 'raaghu-elements/rds-{{kebabCase name}}/rds-{{kebabCase name}}.test.tsx',
        templateFile: 'plop-templates/element/component.test.tsx.hbs',
      },
      // Append export to index.ts
      {
        type: 'append',
        path: 'raaghu-elements/index.ts',
        separator: '\n',
        template: "export { default as Rds{{pascalCase name}} } from './rds-{{kebabCase name}}/rds-{{kebabCase name}}';",
      },
      () => `\n✅  Element created:\n  raaghu-elements/rds-{{kebabCase name}}/\n    ├── rds-{{kebabCase name}}.tsx\n    ├── rds-{{kebabCase name}}.scss\n    ├── rds-{{kebabCase name}}.stories.tsx\n    └── rds-{{kebabCase name}}.test.tsx\n  raaghu-elements/index.ts  ← export added`,
    ],
  });

  // ─── COMPONENT generator ─────────────────────────────────────────────────
  plop.setGenerator('component', {
    description: 'Create a new Raaghu component (raaghu-components/)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (e.g. "data-table", "user-profile"):',
        validate: (v) => v.trim().length > 0 || 'Name is required',
      },
    ],
    actions: [
      // TSX
      {
        type: 'add',
        path: 'raaghu-components/rds-comp-{{kebabCase name}}/rds-comp-{{kebabCase name}}.tsx',
        templateFile: 'plop-templates/component/component.tsx.hbs',
      },
      // SCSS
      {
        type: 'add',
        path: 'raaghu-components/rds-comp-{{kebabCase name}}/rds-comp-{{kebabCase name}}.scss',
        templateFile: 'plop-templates/component/component.scss.hbs',
      },
      // Story
      {
        type: 'add',
        path: 'raaghu-components/rds-comp-{{kebabCase name}}/rds-comp-{{kebabCase name}}.stories.tsx',
        templateFile: 'plop-templates/component/component.stories.tsx.hbs',
      },
      // Test
      {
        type: 'add',
        path: 'raaghu-components/rds-comp-{{kebabCase name}}/rds-comp-{{kebabCase name}}.test.tsx',
        templateFile: 'plop-templates/component/component.test.tsx.hbs',
      },
      // Append export to index.ts
      {
        type: 'append',
        path: 'raaghu-components/index.ts',
        separator: '\n',
        template: "export { default as RdsComp{{pascalCase name}} } from './rds-comp-{{kebabCase name}}/rds-comp-{{kebabCase name}}';",
      },
      () => `\n✅  Component created:\n  raaghu-components/rds-comp-{{kebabCase name}}/\n    ├── rds-comp-{{kebabCase name}}.tsx\n    ├── rds-comp-{{kebabCase name}}.scss\n    ├── rds-comp-{{kebabCase name}}.stories.tsx\n    └── rds-comp-{{kebabCase name}}.test.tsx\n  raaghu-components/index.ts  ← export added`,
    ],
  });
}
