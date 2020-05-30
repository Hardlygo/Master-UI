/*
 * @Author: your name
 * @Date: 2020-05-30 13:35:48
 * @LastEditTime: 2020-05-30 21:54:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog_vuee:\JSWorkSpace\master-ui\src\main.js
 */
import Vue from 'vue';
import App from './App'
import router from './router'
import './config/rem'
import './icons'
import 'reset-css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})