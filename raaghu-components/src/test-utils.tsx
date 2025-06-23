import React, { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Minimal i18n instance for testing
const testI18n = i18n.createInstance();
testI18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: { en: { translation: {} } },
  interpolation: { escapeValue: false },
});

export function Providers({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={testI18n}>{children}</I18nextProvider>;
}

// Custom render for RTL
import { render } from "@testing-library/react";
export function renderWithProviders(ui: React.ReactElement, options?: any) {
  return render(<Providers>{ui}</Providers>, options);
}
