import "./index.styl";

import MIcon from "../m-icon";
import MLoading from "../m-loading";
import { PopupMixin } from "../../mixins/popup";
import { createNameSpace, isDef } from "../../utils";
const { bem } = createNameSpace("toast");
const LOADINGTYPES = ["circle", "spinner", "line-spinner"];

export default {
  name: "MToast",
  mixins: [PopupMixin()],
  props: {
    //
    icon: String, //支持图片
    type: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return (
          ["text", "loading", "success", "fail", "html"].indexOf(value) !== -1
        );
      },
      default: "text",
    },
    //当type是loading时，只能使用规定的loadingType
    loadingType: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return LOADINGTYPES.indexOf(value) !== -1;
      },
      default: "circle",
    },
    position: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["middle", "top", "bottom"].indexOf(value) !== -1;
      },
      default: "middle",
    },
    transitionName: {
      type: String,
      default: "m-fade",
    },
    //animation时长
    duration: Number,
    mask: {
      type: Boolean,
      default: false,
    },
    closeOnClickMask: {
      type: Boolean,
      default: false,
    },
    text: String,
    onToastOpened: Function,
    onToastClosed: Function,
    className: String,
  },
  beforeCreate() {
    const createEmitter = (eventNamt) => (event) =>
      this.$emit(eventNamt, event);
    this.onOpened = createEmitter("opened");
    this.onClosed = createEmitter("closed");
  },
  created() {
    //监听本组件触发的事件
    this.$on("opened", () => {
      this.onToastOpened && this.onToastOpened();
    });
    this.$on("closed", () => {
      this.onToastClosed && this.onToastClosed();
    });
  },
  methods: {
    /**
     * @description
     * 先看有没有iconslot有直接用iconslot这样可以方便应用其他的图标
     * 没有iconslot则判断icon，有则直接应用icon，否则判断type
     */
    genIcon() {
      const { $slots, type, icon } = this;
      const useIcon = icon || type === "success" || type === "fail";
      if ($slots["icon"]) {
        return <div class={[bem("icon")]}>{$slots["icon"]}</div>;
      } else if (useIcon) {
        return <m-icon name={icon || type} class={[bem("icon")]}></m-icon>;
      } else if (type === "loading") {
        let color = "";
        if (this.loadingType === "line-spinner")
          //因为这个loadingtype的底色是白色，为了让看起来是动画，必须要和底色不一样
          color = "#c8c9cc";
        return (
          <MLoading
            type={this.loadingType}
            class={[bem("loading")]}
            color={color}
          ></MLoading>
        );
      }
    },
    genText() {
      const { text, type } = this;
      if (type === "html") {
        return <div class={[bem("text")]} domPropsInnerHTML={text}></div>;
      }
      return <div class={[bem("text")]}> {text}</div>;
    },
  },
  render() {
    return (
      <transition name={this.transitionName}>
        <div
          vShow={this.value}
          class={[
            bem([this.position, { [this.type]: !this.icon }]),
            this.className,
          ]}
        >
          {this.genIcon()}
          {this.genText()}
        </div>
      </transition>
    );
  },
};
