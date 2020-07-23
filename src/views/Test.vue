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
    <m-cell-group
      border
      title="icon"
    >
      <m-icon
        name="arrow-left"
        size="26px"
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
    </m-cell-group>
    <div style="padding: 10px">
      <m-button
        color="#7232dd"
        block
        text="点我点我"
        @click="show=!show"
      ></m-button>
    </div>
    <m-cell-group
      border
      title="loading"
    >
      <m-loading
        type="line-spinner"
        size="28px"
      ></m-loading>
      <m-loading
        size="28px"
        type="spinner"
        color="skyblue"
      ></m-loading>
      <m-loading></m-loading>
    </m-cell-group>
    <m-cell-group
      border
      title="image"
    >
      <m-image
        width="100"
        height="100"
        fit="cover"
        lazy-load
        src="https://avatars3.githubusercontent.com/u/33127984?s=60&v=4"
      />
    </m-cell-group>
    <!-- <template v-slot:error>加载失败</template> -->
    <m-cell-group
      border
      title="layout(row|col)"
    >
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
    </m-cell-group>
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
    <m-cell-group
      border
      title="dialog|popup|toast"
    >
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
          text="弹窗dialog"
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

      <div style="padding:10px">
        <m-button
          color="DeepSkyBlue"
          block
          text="methodToast"
          @click="methodToast"
        ></m-button>
      </div>

      <div style="padding:10px">
        <m-button
          color="DeepSkyBlue"
          block
          text="twoToast"
          @click="twoToast"
        ></m-button>
      </div>
      <div style="padding:10px">
        <m-button
          color="DeepSkyBlue"
          block
          text="dynamicToast"
          @click="dynamicToast"
        ></m-button>
      </div>
    </m-cell-group>
    <m-cell-group
      border
      title="radio"
    >
      <div style="padding:10px">
        <m-radio
          v-model="myval"
          value="1"
        >单选框 1</m-radio>
        <m-radio
          v-model="myval"
          disabled
          value="2"
        >单选框 2</m-radio>
      </div>
      {{myval}}
    </m-cell-group>
    <m-cell-group
      border
      title="radio-group"
    >
      <div style="padding:10px">
        <m-radio-group v-model="myval">
          <m-radio value="1">单选框 1</m-radio>
          <m-radio value="2">单选框 2</m-radio>
        </m-radio-group>
      </div>
    </m-cell-group>
    <m-cell-group
      border
      title="radio-group-row"
    >
      <div style="padding:10px">
        <m-radio-group
          direction="row"
          v-model="myval"
        >
          <m-radio value="1">单选框 1</m-radio>
          <m-radio value="2">单选框 2</m-radio>
        </m-radio-group>
      </div>
    </m-cell-group>
    <m-cell-group
      border
      title="checkbox"
    >
      <div style="padding:10px">
        <m-checkbox
          v-model="isChecked"
          icon-size="24px"
        >复选框</m-checkbox>
        <m-checkbox
          v-model="isChecked"
          disabled
          icon-size="24px"
        >复选框</m-checkbox>
      </div>
      {{isChecked}}
    </m-cell-group>
    <m-cell-group
      border
      title="checkbox-group"
    >
      <div style="padding:10px">
        <m-checkbox-group
          v-model="result"
          ref="checkboxGroup"
          max="2"
          direction="row"
        >
          <m-checkbox
            icon-size="24px"
            value="打游戏"
          >打游戏</m-checkbox>
          <m-checkbox
            value="打代码"
            icon-size="24px"
          >打代码</m-checkbox>
          <m-checkbox
            value="打球"
            icon-size="24px"
          >打球</m-checkbox>
        </m-checkbox-group>
        {{result}}
      </div>
    </m-cell-group>
    <m-cell-group
      border
      title="badge"
    >
      <div style="padding:10px">
        <m-badge
          badge="90"
          icon="https://cdn.vuetifyjs.com/images/lists/2.jpg"
          overlay-max
        />
        <m-badge
          bottom
          offset-y="10"
          offset-x="10"
          badge-type="dot"
          color="green"
          icon="https://cdn.vuetifyjs.com/images/lists/2.jpg"
          overlay-middle
        />
        <m-badge
          badge-type="dot"
         content-type="text"
          text="今天星期五"
          overlay-small
        />
        <m-badge
          badge="99+"
          content-type="text"
          text="今天星期五"
          overlay-middle
        />
      </div>
    </m-cell-group>
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
import { Toast } from "@/components/m-toast";
import MRadio from "@/components/m-radio";
import MRadioGroup from "@/components/m-radio-group";
import MCheckbox from "@/components/m-checkbox";
import MCheckboxGroup from "@/components/m-checkbox-group";
import MBadge from "@/components/m-badge";

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
    MDialog,
    MPopup,
    MToast,
    MRadio,
    MRadioGroup,
    MCheckbox,
    MCheckboxGroup,
    MBadge,
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
      showToast: false,
      myval: "",
      isChecked: false,
      result: ["打游戏"],
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
        content: "弹窗内容",
      });
    },
    methodToast() {
      this.$toast.success({
        text: "数据加载成功",
      });
    },
    twoToast() {
      Toast.allowMultiple();

      const toast1 = Toast("第一个 Toast");
      const toast2 = Toast.success("第二个 Toast");
      toast1.destroy();
      toast2.destroy();
      //尽量使得只是影响在方法，跳出方法应该恢复默认的allowMultiple即false
      Toast.allowMultiple(false);
    },
    dynamicToast() {
      const toast = Toast.loading({
        timeout: 0, // 持续展示 toast
        forbidClick: true,
        text: "倒计时 3 秒",
      });

      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.text = `倒计时 ${second} 秒`;
        } else {
          clearInterval(timer);
          // 手动清除 Toast
          Toast.destroy();
        }
      }, 1000);
    },
  },
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
