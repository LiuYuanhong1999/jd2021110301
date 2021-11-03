import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'

import axios from "axios";
import VueAxios from "vue-axios";
// 全局引入ElementPlus，当然也可以使用局部引入
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css"; //引入样式
import locale from "element-plus/lib/locale/lang/zh-cn";


createApp(App)
    .use(VueAxios,axios)
    .use(ElementPlus, { size: "small", zIndex: 3000, locale })
    .use(store)
    .use(router)
    .mount('#app')
