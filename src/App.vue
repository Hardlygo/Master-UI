<!--
 * @Author: your name
 * @Date: 2020-05-30 15:56:39
 * @LastEditTime: 2020-05-30 15:57:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog_vuee:\JSWorkSpace\master-ui\App.vue
--> 

<template>
  <div id="app">
    <router-view />
  </div>
</template> 
<script>
export default {
  name: "App"
};
</script>

<style lang="stylus">
html
  height 100%
  #app
    height 100%
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
</style>
