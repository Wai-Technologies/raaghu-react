import type { Preview } from "@storybook/react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../raaghu-react-themes/src/styles/default_storybook.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
