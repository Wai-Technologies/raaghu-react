import { addons } from "@storybook/addons";

addons.setConfig({
  theme: customTheme,
  toolbar: {
    "storybook/background": { hidden: true },
  },
  sidebar: {
    showRoots: false,
},
});
