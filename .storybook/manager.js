import { addons } from "@storybook/addons";
import { raaghuTheme } from "./raaghuTheme";

addons.setConfig({
  theme: raaghuTheme,
  toolbar: {
    "storybook/background": { hidden: true },
  },
  sidebar: {
    showRoots: false,
},
});
