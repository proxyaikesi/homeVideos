import { createApp } from "vue"
import App from './App.vue'
import router from './router'
import qs from 'qs'

import element from 'element-plus';
import 'element-plus/theme-chalk/index.css'
import store from './store/index'
import locale from 'element-plus/dist/locale/zh-cn.mjs'
// import 'swiper/css';
// import VueAMap from "vue-amap";


import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css



// import * as echarts from 'echarts'


// import echarts from './echarts/index'
const app = createApp(App)

// app.config.globalProperties.$echarts = echarts
app.use(store).use(router, qs,).use(vue3videoPlay).use(element,{locale}).mount('#app')
// VueAMap.initAMapApiLoader({
//     key: 'b10ba7467979b474bd30bc1c313fd58a',
//     plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',],
//     v: '1.4.4'
//   });