<!--
 * @Author: your name
 * @Date: 2020-06-05 17:26:04
 * @LastEditTime: 2020-07-09 10:15:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rx-guilind:\workspace\pzy\Master-UI\src\views\Hello.vue
--> 
<template>
  <div>
    <h3>hello world!</h3>
  </div>
</template>
<script>
export default {
  mounted() {
    let that = this;
    this.$dialog.confirm({
      content: "弹窗内容",
      onDialogOpen() {
        console.log("1: ", 1);
        //pushstate仅仅是从url上进行了改变，不会校验url的内容，页面不会改变
        window.history.pushState(null, null, "#");
      },
      onDialogOpened() {
        console.log("2: ", 2);
      },
      onDialogClose() {
        console.log("3: ", 3);
      },
      onDialogClosed() {
        console.log("4: ", 4);
      }
    });
    window.addEventListener("popstate", this.popstate, false);
  },
  methods: {
    popstate() {
      console.log("this.$dialog.isVisible(): ", this.$dialog.isVisible());
      if (this.$dialog.isVisible()) {
        this.$dialog.close();
      } else {
        this.$router.go(-1);
      }
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.popstate, false);
  }
};
</script>