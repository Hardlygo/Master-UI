/*
 * @Author: your name
 * @Date: 2020-05-30 16:00:59
 * @LastEditTime: 2020-07-09 00:53:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog_vuee:\JSWorkSpace\master-ui\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
        path: '/',
        name: 'Home',
        component:   () => import( /* webpackChunkName: "about" */ '@/views/Test.vue')
    },{
        path: '/hello',
        name: 'HelloWorld',
        component:   () => import( /* webpackChunkName: "about" */ '@/views/Hello.vue')
    }
]
})