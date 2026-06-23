import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/react-vite';
import type { InlineConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../stories/Introduction.mdx',
    '../stories/**/*.mdx',
    "../raaghu-elements/**/**/*.stories.@(js|jsx|ts|tsx)",
    // Exclude internal/paid components (grid=paid, tree-structure=internal, date-and-time-picker=internal)
    "../raaghu-components/!(rds-comp-grid|rds-comp-tree-structure|rds-comp-date-and-time-picker)/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-layouts/**/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    {
      name: getAbsolutePath("@storybook/addon-docs"),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-coverage"),
    getAbsolutePath("@storybook/addon-mcp"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  staticDirs: [{ from: '../.storybook/public', to: '/' }],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: 'tsconfig.library.json',
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      exclude: ['**/*.test.tsx', '**/*.spec.tsx', '**/*.test.ts', '**/*.spec.ts'],
    },
  },
  async viteFinal(config: InlineConfig) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...(typeof config.resolve?.alias === 'object' ? config.resolve.alias : {}),
          '@icons/material/UnfoldMoreHorizontalIcon': fileURLToPath(new URL('./shims/UnfoldMoreHorizontalIcon.tsx', import.meta.url)),
          '@icons/material/CheckIcon': fileURLToPath(new URL('./shims/CheckIcon.tsx', import.meta.url)),
        },
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include ?? []),
          // MUI subpaths — Vite 7 cannot auto-resolve the wildcard "./*" export pattern
          '@mui/material',
          '@mui/material/styles',
          '@mui/material/Box',
          '@mui/material/CssBaseline',
          '@mui/material/FormControl',
          '@mui/material/Grid',
          '@mui/material/IconButton',
          '@mui/material/ImageList',
          '@mui/material/ImageListItem',
          '@mui/material/ListItemText',
          '@mui/material/Menu',
          '@mui/material/MenuItem',
          '@mui/material/Radio',
          '@mui/material/Select',
          '@mui/material/SvgIcon',
          '@mui/material/Typography',
          '@mui/lab',
          '@mui/lab/Timeline',
        ],
      },
      css: {
        ...config.css,
        preprocessorOptions: {
          ...config.css?.preprocessorOptions,
          scss: {
            ...config.css?.preprocessorOptions?.scss,
            api: 'modern',
          },
        },
      },
    };
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
