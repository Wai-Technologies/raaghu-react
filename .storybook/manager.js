import { addons } from "@storybook/addons";
// import { raaghuTheme } from "./raaghuTheme";
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: themes.light,
  toolbar: {
    "storybook/background": { hidden: true },
  },
  sidebar: {
    showRoots: false,
},
});
