/*
 * @Author: PENGZY
 * @since: 2020-05-28 11:09:26
 * @lastTime: 2020-05-28 11:49:02
 * @LastAuthor: Do not edit
 * @FilePath: \rx-guilind:\workspace\JS\prescription-ann-v2\src\icons\index.js
 * @moto: Be Curious!
 * @message: 
 */

import Vue from 'vue'
import MIcon from '@/components/m-icon' // svg组件
// 注册为全局组件
Vue.component('m-icon', MIcon)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
