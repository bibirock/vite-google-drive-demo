import { createPinia } from 'pinia';
import router from './router';
import CustomIcon from '@/components/customIcon/CustomIcon.vue';
import { Icon } from '@iconify/vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { i18n } from './locales/lang.js';
import mitt from 'mitt';
export const emitter = mitt();
import { globalFunction, TYPE } from './globalMethods/global';
import './index.css';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
//全域變數設置
app.provide('$emitter', emitter);
app.provide('$globalF', globalFunction);
app.provide('$TYPE', TYPE);
//全域組件
app.component('CustomIcon', CustomIcon).component('Icon', Icon);
app.use(router).use(createPinia()).use(i18n).use(Antd).mount('#app');
