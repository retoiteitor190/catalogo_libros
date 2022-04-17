import * as Localization from 'expo-localization';

import i18n from 'i18n-js';




import * as enL from "./translation/en.json";

import * as esL from "./translation/es.json";



i18n.translation = {

    en: enL,

    es: esL,

};



i18n.locale = Localization.locale;

i18n.fallbacks = true;



export default i18n;