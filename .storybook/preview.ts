import type { Preview } from "@storybook/react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../raaghu-react-themes/src/styles/default_storybook.scss';
import { themes } from '@storybook/theming';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
    themes: {
      default: "light",
      list: [
        { name: "light", class: "theme-light", color: "#F8F8F8", default: true },
        { name: "dark", class: "theme-dark", color: "#333333" },
      ],
    },
  },
};

export default preview;
