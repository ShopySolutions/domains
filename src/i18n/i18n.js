import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fr, en } from './language';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,

  interpolation: {
    escapeValue: false
  },
  resources: {
    fr: {
      common: fr
    },
    en: {
      common: en
    }
  },
  ns: ['common'],
  defaultNS: 'common'
});

export default i18n;
