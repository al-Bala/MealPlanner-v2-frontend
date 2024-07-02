import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { translationEn } from './English/TranslationEn';
import {translationPL} from "./Polish/TranslationPL.ts";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    pl: { translation: translationPL }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
