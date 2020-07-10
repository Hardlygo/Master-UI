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
    <m-cell-group
      border
      title="我是头部"
    >
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
    <div style="pading:0 10px">
      <m-button
        color="#7232dd"
        block
        text="点我点我"
        @click="show=!show"
      ></m-button>
    </div>
    <m-loading
      type="line-spinner"
      size="28px"
      color="skyblue"
    ></m-loading>
    <m-loading
      size="28px"
      type="spinner"
      color="skyblue"
    ></m-loading>
    <m-loading color="skyblue"></m-loading>
    <m-image
      width="100"
      height="100"
      fit="cover"
      lazy-load
      src="https://avatars3.githubusercontent.com/u/33127984?s=60&v=4"
    >
      <!-- <template v-slot:error>加载失败</template> -->
    </m-image>

    <m-row>
      <m-col
        style="background:#39a9ed"
        cols="8"
      >cols: 8</m-col>
      <m-col
        style="background:#66c6f2"
        cols="8"
      >cols: 8</m-col>
      <m-col
        style="background:#39a9ed"
        cols="8"
      >cols: 8</m-col>
    </m-row>
    <m-row>
      <m-col
        cols="4"
        style="background:#39a9ed;background-clip: content-box"
      >cols: 4</m-col>
      <m-col
        cols="10"
        offset="4"
        style="background:#66c6f2;background-clip: content-box"
      >offset: 4, cols: 10</m-col>
    </m-row>
    <m-row gutter="20">
      <m-col
        cols="8"
        style="background:#39a9ed;background-clip: content-box"
      >cols: 8</m-col>
      <m-col
        cols="8"
        style="background:#66c6f2;background-clip: content-box"
      >cols: 8</m-col>
      <m-col
        cols="8"
        style="background:#39a9ed;background-clip: content-box"
      >cols: 8</m-col>
    </m-row>
    <m-row>
      <m-col
        offset="12"
        cols="12"
        style="background:#66c6f2;background-clip: content-box"
      >offset: 12, cols: 12</m-col>
    </m-row>
    <!-- 左对齐 -->
    <m-row
      type="flex"
      gutter="30"
    >
      <m-col cols="6">cols: 6</m-col>
      <m-col cols="6">cols: 6</m-col>
      <m-col cols="6">cols: 6</m-col>
      <m-col cols="6">cols: 6</m-col>
      <m-col cols="12">cols:12</m-col>
      <m-col cols="12">cols: 12</m-col>
    </m-row>

    <!-- 居中 -->
    <m-row
      type="flex"
      justify="center"
    >
      <m-col cols="6">cols: 6</m-col>
      <m-col cols="6">cols: 6</m-col>
      <m-col cols="6">cols: 6</m-col>
      <m-col cols="6">cols: 6</m-col>
    </m-row>

    <!-- 右对齐 -->
    <m-row
      type="flex"
      justify="end"
    >
      <m-col cols="6">cols: 6</m-col>
      <m-col cols="6">cols: 6</m-col>
      <m-col cols="6">cols: 6</m-col>
    </m-row>

    <!-- <m-mask
      :show="show"
      @click="show = false"
    >
      <div
        class="wrapper"
        
      >
        <div class="block" @click.stop />
      </div>

    </m-mask> -->

    <m-dialog
      v-model="show"
      title="多花点时间就好了"
      content="学习是一辈子的事情，请你坚持住！！"
      show-cancel-btn
      close-on-popstate
    >
      <!-- <img style="width:100%" src="https://img.yzcdn.cn/vant/apple-3.jpg" /> -->
    </m-dialog>

    <div style="padding:0 10px">
      <m-button
        color="lightblue"
        block
        text="弹窗"
        @click="showDialog"
      ></m-button>
    </div>

    <div style="padding:10px">
      <m-button
        color="DeepSkyBlue"
        block
        text="showPopupCenter"
        @click="showPopupCenter=!showPopupCenter"
      ></m-button>
    </div>
    <div style="padding:10px">
      <m-button
        color="DeepSkyBlue"
        block
        text="showPopupTop"
        @click="showPopupTop=!showPopupTop"
      ></m-button>
    </div>
    <div style="padding:10px">
      <m-button
        color="DeepSkyBlue"
        block
        text="showPopupRight"
        @click="showPopupRight=!showPopupRight"
      ></m-button>
    </div>
    <div style="padding:10px">
      <m-button
        color="DeepSkyBlue"
        block
        text="showPopupBottom"
        @click="showPopupBottom=!showPopupBottom"
      ></m-button>
    </div>
    <div style="padding:10px">
      <m-button
        color="DeepSkyBlue"
        block
        text="showPopupLeft"
        @click="showPopupLeft=!showPopupLeft"
      ></m-button>
    </div>
    <m-popup
      v-model="showPopupTop"
      position="top"
      :style="{ height: '30%' }"
    >
      Stick to doing somethingsaddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeee</m-popup>
    <m-popup
      v-model="showPopupBottom"
      position="bottom"
      round
      closeable
      :close-on-click-mask="false"
      :style="{ height: '30%' }"
    >Stick to doing something88888888888888888888888888888888888888</m-popup>
    <m-popup
      v-model="showPopupLeft"
      position="left"
      :style="{ width: '30%', height: '100%' }"
    >Stick to doing something</m-popup>
    <m-popup
      v-model="showPopupRight"
      position="right"
      :style="{ width: '30%', height: '100%' }"
    >Stick to doing something</m-popup>
    <m-popup
      :style="{ padding: '30px 50px' }"
      v-model="showPopupCenter"
    >Stick to doing something</m-popup>
    <m-toast
      v-model="showToast"
      type="loading"
      loading-type="circle"
      text="数据加载中..."
    ></m-toast>
    <div style="padding:10px">
      <m-button
        color="DeepSkyBlue"
        block
        text="showToast"
        @click="showToast=!showToast"
      ></m-button>
    </div>
  </div>
</template>
<script>
import MInput from "@/components/m-input";
import MCellGroup from "@/components/m-cell-group";
import MCell from "@/components/m-cell";
import MButton from "@/components/m-button";
import MLoading from "@/components/m-loading";
import MImage from "@/components/m-image";
import MRow from "@/components/m-row";
import MCol from "@/components/m-col";
import MMask from "@/components/m-mask";
import MDialog from "@/components/m-dialog";
import MPopup from "@/components/m-popup";
import MToast from "@/components/m-toast";

export default {
  components: {
    MInput,
    MCellGroup,
    MCell,
    MButton,
    MLoading,
    MImage,
    MRow,
    MCol,
    MMask,
    [MDialog.Component.name]: MDialog.Component,
    MPopup,
    MToast
  },
  data() {
    return {
      myVal: "",
      show: false,
      showPopupCenter: false,
      showPopupTop: false,
      showPopupRight: false,
      showPopupBottom: false,
      showPopupLeft: false,
      showToast: false
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.showDialog();
    // }, 0);
  },
  methods: {
    showDialog() {
      this.$dialog.confirm({
        content: "弹窗内容"
      });
    }
  }
};
</script>
<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  border-radius: 8px;
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
