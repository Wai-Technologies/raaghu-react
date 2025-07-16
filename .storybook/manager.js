//import { addons } from "@storybook/addons";
import customTheme from "./customTheme";
import { addons } from 'storybook/manager-api';

// Update search placeholder
window.addEventListener('load', function() {
  function setPlaceholder() {
    var field = document.getElementById('storybook-explorer-searchfield');
    if (field) field.placeholder = 'Type to search...';
  }
  
  setPlaceholder();
  new MutationObserver(setPlaceholder).observe(document.body, { childList: true, subtree: true });
});

addons.setConfig({
  theme: customTheme,
  toolbar: {
    "storybook/background": { hidden: true },
  },
  sidebar: {
    showRoots: false,
  },
});
