import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { createPinia } from 'pinia';
import router from './router';
import CustomIcon from '@/assets/CustomIcon/CustomIcon.vue';
import { Icon } from '@iconify/vue';
//ant-desige-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { i18n } from './locales/lang.js';

const app = createApp(App);
app.component('CustomIcon', CustomIcon).component('Icon', Icon);
app.use(router).use(createPinia()).use(i18n).use(Antd).mount('#app');
