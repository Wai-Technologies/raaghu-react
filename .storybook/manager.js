import { addons } from "@storybook/addons";

addons.setConfig({
  theme: raaghuThemes,
  toolbar: {
    "storybook/background": { hidden: true },
  },
  sidebar: {
    showRoots: false,
},
});
