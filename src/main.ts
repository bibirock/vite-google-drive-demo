/* eslint-disable @typescript-eslint/no-empty-function */
import { createPinia } from 'pinia';
import router from '@/router';
import '@/index.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from '@/App.vue';
import { createApp } from 'vue';
const app = createApp(App);

import { i18n } from '@/locales/lang.js';
import mitt from 'mitt';
const emitter = mitt();

import { useRegisterSW } from 'virtual:pwa-register/vue';
useRegisterSW();

import { registerSW } from 'virtual:pwa-register';
registerSW({
    onNeedRefresh() {},
    onOfflineReady() {}
})();

import CustomIcon from '@/components/customIcon/CustomIcon.vue';
import { Icon } from '@iconify/vue';
app.component('CustomIcon', CustomIcon).component('Icon', Icon);
app.use(router).use(createPinia()).use(i18n).use(Antd).mount('#app');

export { emitter };
