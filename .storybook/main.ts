import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/react-vite';
import type { InlineConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../stories/Introduction.mdx',
    '../stories/**/*.mdx',
    "../raaghu-elements/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-components/!(rds-comp-grid|rds-comp-tree-structure|rds-comp-date-and-time-picker)/**/*.stories.@(js|jsx|ts|tsx)",
    "../raaghu-layouts/**/*.stories.@(js|jsx|ts|tsx)",
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
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        if ((prop.tags && 'deprecated' in prop.tags) || /(^|\n)\s*@deprecated\b/.test(prop.description ?? '')) return false;
        const files = [...(prop.declarations ?? []), ...(prop.parent ? [prop.parent] : [])].map((d) => d.fileName);
        return files.some((file) => !/node_modules/.test(file));
      },
      exclude: ['**/*.test.tsx', '**/*.spec.tsx', '**/*.test.ts', '**/*.spec.ts'],
    },
  },
  async viteFinal(config: InlineConfig) {
    const reactPath = fileURLToPath(new URL('../node_modules/react', import.meta.url));
    const reactDomPath = fileURLToPath(new URL('../node_modules/react-dom', import.meta.url));
    return {
      ...config,
      resolve: {
        ...config.resolve,
        dedupe: [...new Set([...(config.resolve?.dedupe ?? []), 'react', 'react-dom', '@emotion/react'])],
        alias: {
          ...(typeof config.resolve?.alias === 'object' ? config.resolve.alias : {}),
          react: reactPath,
          'react-dom': reactDomPath,
          'react/jsx-runtime': fileURLToPath(new URL('../node_modules/react/jsx-runtime.js', import.meta.url)),
          'react/jsx-dev-runtime': fileURLToPath(new URL('../node_modules/react/jsx-dev-runtime.js', import.meta.url)),
          '@icons/material/UnfoldMoreHorizontalIcon': fileURLToPath(new URL('./shims/UnfoldMoreHorizontalIcon.tsx', import.meta.url)),
          '@icons/material/CheckIcon': fileURLToPath(new URL('./shims/CheckIcon.tsx', import.meta.url)),
        },
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include ?? []),
          'react',
          'react-dom',
          'react/jsx-runtime',
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
