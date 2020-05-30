<!--
 * @Author: your name
 * @Date: 2020-05-30 16:04:40
 * @LastEditTime: 2020-05-30 22:35:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog_vuee:\JSWorkSpace\master-ui\src\views\Test.vue
--> 
<template>
  <div>
    <m-input
      type="number"
      label="文本"
      placeholder="请输入文本"
      clearable
      v-model="myVal"
    >
      <!-- <template v-slot:right-icon> -->
      <!-- <v-icon>mdi-close</v-icon> -->
      <!-- <m-icon name="delete" /> -->
      <!-- </template> -->
      <!-- <template #button>
        <v-btn text>发送短信</v-btn>
      </template> -->
    </m-input>
    {{myVal}}
  </div>
</template>
<script>
import MInput from "@/components/m-input";
export default {
  components: {
    MInput
  },
  data() {
    return {
      myVal: ""
    };
  }
};
</script>
