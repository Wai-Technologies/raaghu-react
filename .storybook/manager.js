import { addons } from "@storybook/addons";
// import { raaghuTheme } from "./raaghuTheme";
import { themes } from '@storybook/theming';
import customTheme from "./customTheme";


addons.setConfig({
  theme: customTheme,
  toolbar: {
    "storybook/background": { hidden: true },
  },
  sidebar: {
    showRoots: false,
  },
});
