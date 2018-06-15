import es from 'react-intl/locale-data/es';
import en from 'react-intl/locale-data/en';

import es_message from './es.json';
import en_message from './en.json';

export const Locales = [...es, ...en];

export const Messages = {
  es: es_message,
  en: en_message
};
