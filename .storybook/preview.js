import '../raaghu-react-themes/src/styles/default_storybook.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './preview-theme.css';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import React, { Suspense, useEffect } from "react";
import * as stories from "../raaghu-layouts/src/rds-comp-app-shell/rds-comp-app-shell.stories";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: "light",
    list: [
      { name: "light", class: "theme-light", color: "#F8F8F8", default: true },
      { name: "dark", class: "theme-dark", color: "#333333" },
    ],
  },
  globalTypes: {
    locale: {
      name: 'Language',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'hi', title: 'Hindi' },
          { value: 'ar', title: 'عربي' },
        ],
      },
      showName: true,
    },
    shell: {
      name: 'Shell',
      description: 'Shell to be used for layouts',
      toolbar: {
        icon: 'sidebar',
        items: [
          { value: 'reset', title: 'Reset Shell' }, 
          ...Object.keys(stories)
            .filter(story => !['default', '__namedExportsOrder', 'exports'].includes(story))
            .map(story => ({
              value: story.toLowerCase(),
              title: story,
            }))
        ],
      },
      showName: true,
    },
  },
};

const withI18next = (Story, context) => {
  const { locale } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

export const decorators = [withI18next];

i18n.on('languageChanged', (locale) => {
  const direction = i18n.dir(locale);
  document.dir = direction;
});