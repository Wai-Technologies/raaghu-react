import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        debug: false,
        nsSeparator: false,
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
            bindI18n: "languageChanged"
        },
        backend: {
            loadPath: "/assets/i18n/{{lng}}.json",
            backends: [
                LocalStorageBackend,
                HttpBackend
            ],
            backendOptions: [{
                expirationTime: 7 * 24 * 60 * 60 * 1000 // 7 days
            }, {
                loadPath: "/assets/i18n/{{lng}}.json"
            }]
        }
    });

export default i18n;
