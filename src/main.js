import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'

import axios from "axios";
import VueAxios from "vue-axios";
// 全局引入ElementPlus，当然也可以使用局部引入
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css"; //引入样式
import locale from "element-plus/lib/locale/lang/zh-cn";


//打印
import print from "vue-print-nb/print/packages/print";




createApp(App)
    .use(VueAxios,axios)
    .use(ElementPlus, { size: "small", zIndex: 3000, locale })
    .use(store)
    .use(router)
    .use(print)
    .mount('#app')

//
// export default new Vuex.Store({
//     state:{
//         token:''
//     },
//     mutations:{
//         set_token(state, token) {
//             state.token = token
//             sessionStorage.token = token
//         },
//         del_token(state) {
//             state.token = ''
//             sessionStorage.removeItem('token')
//         }
//     }
// })
