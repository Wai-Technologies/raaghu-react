import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';
import '../.storybook/custom-theme.css';

const theme = create({
  base: 'light',
  brandTitle: 'Raaghu Design System',
  brandUrl: 'https://raaghu.ai',
  brandImage: 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png',
});

addons.setConfig({
  theme,
   toolbar: {
    "storybook/background": { hidden: true },
  },
  sidebar: {
    showRoots: false,
  },
});
