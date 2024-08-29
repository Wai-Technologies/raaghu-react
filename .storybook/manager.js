import { addons } from "@storybook/addons";
import customTheme from "./customTheme";
// import { addons } from '@storybook/manager-api';  // if this import is use then theme option not visible in storybook.



addons.setConfig({
  theme: customTheme,
  toolbar: {
    "storybook/background": { hidden: true },
  },
  sidebar: {
    showRoots: false,
  },
});
