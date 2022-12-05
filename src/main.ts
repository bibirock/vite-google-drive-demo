import { createPinia } from 'pinia';
import router from './router';
import './index.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';
import { createApp } from 'vue';
const app = createApp(App);

//全域變數設置
import { globalFunction, TYPE } from './globalMethods/global';
import { i18n } from './locales/lang.js';
// @ts-ignore：
const { t } = i18n.global;
import mitt from 'mitt';
const emitter = mitt();

app.provide('$globalF', globalFunction);
app.provide('$emitter', emitter);
app.provide('$TYPE', TYPE);
app.provide('$t', t);

//全域組件
import CustomIcon from '@/components/customIcon/CustomIcon.vue';
import { Icon } from '@iconify/vue';
app.component('CustomIcon', CustomIcon).component('Icon', Icon);
app.use(router).use(createPinia()).use(i18n).use(Antd).mount('#app');

export { emitter };
