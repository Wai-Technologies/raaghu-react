//import { addons } from "@storybook/addons";
import customTheme from "./customTheme";
import { addons } from '@storybook/manager-api';


addons.setConfig({
  theme: customTheme,
  toolbar: {
    "storybook/background": { hidden: true },
  },
  sidebar: {
    showRoots: false,
  },
});
