<!--
 * @Author: your name
 * @Date: 2020-05-30 16:04:40
 * @lastTime: 2020-06-01 16:39:51
 * @LastAuthor: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \rx-guilind:\workspace\pzy\Master-UI\src\views\Test.vue
--> 
<template>
  <div>
    <m-cell-group border>
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
      <m-cell
        isLink
        icon="https://b.yzcdn.cn/vant/icon-demo-1126.png"
        to="hello"
        description="干巴爹"
        label="名字"
        content="彭于晏"
      >
      </m-cell>
      <m-cell
        icon="https://b.yzcdn.cn/vant/icon-demo-1126.png"
        content="彭于晏"
      >
      </m-cell>
      <m-cell
        label="兴趣"
        content="冲冲冲"
      >

      </m-cell>
    </m-cell-group>
    <m-icon
      name="arrow-left"
      size="26px"
      color="green"
    />
    <m-icon
      name="arrow-right"
      size="26px"
      color="green"
    />
    <m-icon
      name="arrow-up"
      size="26px"
      color="green"
    />
    <m-icon
      name="arrow-down"
      size="26px"
      color="green"
    />
    <m-icon
      name="prompt-fill"
      size="26px"
      color="green"
    />
    <m-icon
      name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
      size="26px"
    />
    {{myVal}}
    <div style="pading:0 10px">
      <m-button
        icon="https://b.yzcdn.cn/vant/icon-demo-1126.png"
        block
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        loading
        loading-text="点我点我"
        loading-type="line-spinner"
      ></m-button>
    </div>
    <m-loading
      type="line-spinner"
      color="#4bb0ff"
    ></m-loading>
    <m-loading
      size="20px"
    ></m-loading>
  </div>
</template>
<script>
import MInput from "@/components/m-input";
import MCellGroup from "@/components/m-cell-group";
import MCell from "@/components/m-cell";
import MButton from "@/components/m-button";
import MLoading from "@/components/m-loading";
export default {
  components: {
    MInput,
    MCellGroup,
    MCell,
    MButton,
    MLoading
  },
  data() {
    return {
      myVal: ""
    };
  }
};
</script>
