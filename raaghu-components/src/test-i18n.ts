import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Minimal i18n instance for testing
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: { en: { translation: {} } },
    interpolation: { escapeValue: false },
  });
}

export default i18n;
