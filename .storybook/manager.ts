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

// Custom search placeholder replacement
const updateSearchPlaceholder = () => {
  const searchInput = document.querySelector('input[placeholder="Find components"]') as HTMLInputElement;
  if (searchInput) {
    searchInput.placeholder = 'Type to search...';
  }
};

// Run on DOM content loaded and also observe for dynamic changes
document.addEventListener('DOMContentLoaded', updateSearchPlaceholder);

// Use MutationObserver to handle dynamic content loading
const observer = new MutationObserver(() => {
  updateSearchPlaceholder();
});

// Start observing when the document is ready
setTimeout(() => {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}, 100);
