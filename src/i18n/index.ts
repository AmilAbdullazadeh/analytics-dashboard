import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translation files directly
import enTranslations from '../../public/locales/en/common.json';
import azTranslations from '../../public/locales/az/common.json';
import ruTranslations from '../../public/locales/ru/common.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      az: {
        translation: azTranslations,
      },
      ru: {
        translation: ruTranslations,
      },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'az', 'ru'],
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },
  });

export default i18n;
