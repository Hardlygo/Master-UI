<!--
 * @Author: your name
 * @Date: 2020-05-30 16:04:40
 * @LastEditTime: 2020-05-31 21:32:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog_vuee:\JSWorkSpace\master-ui\src\views\Test.vue
--> 
<template>
  <div>
    <m-cell-group border >
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
    </m-cell-group>
    {{myVal}}
  </div>
</template>
<script>
import MInput from "@/components/m-input";
import MCellGroup from "@/components/m-cell-group";
export default {
  components: {
    MInput,
    MCellGroup
  },
  data() {
    return {
      myVal: ""
    };
  }
};
</script>
