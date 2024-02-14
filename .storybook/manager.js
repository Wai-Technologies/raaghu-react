import { addons } from "@storybook/addons";
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
