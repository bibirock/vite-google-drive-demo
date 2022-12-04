import { createI18n } from 'vue-i18n';
let defaultLocale = '中文';

import en from '@/locales/en.json';
import zhTW from '@/locales/zh-TW.json';

export const lang = {
    en: en,
    zhTW: zhTW,
};

export const i18n = createI18n({
    globalInjection: true,
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: '中文',
    messages: {
        中文: lang.zhTW,
        English: lang.en,
    },
});
