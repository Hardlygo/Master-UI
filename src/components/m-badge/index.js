//用于图标或信息右上角提示，比如未读消息
import "./index.styl";

import MIcon from "../m-icon";

import { createNameSpace } from "../../utils";
const { bem } = createNameSpace("badge");
//slot:badge   slot content
// badge要有一个动画
export default {
  name: "MBadge",
  props: {
    badgeType: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个,dot是红点或其他颜色的点，info是数字或其他的文字
        return ["dot", "badge"].indexOf(value) !== -1;
      },
      default: "badge",
    },
    showBadge: {
      type: Boolean,
      default: true,
    },
    //当badgeType是badge时候，badge 的数值
    badge: {
      type: [String, Number],
    },
    contentType: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个,text是文字，icon是图表或图片,both是两者都要
        return ["text", "icon", "both"].indexOf(value) !== -1;
      },
      default: "both",
    },
    overlayMiddle: [Boolean],
    overlayMax: [Boolean],
    overlaySmall: [Boolean],

    bordered: {
      type: Boolean,
      default: true,
    },

    //dot的颜色或info的背景色
    color: String,

    //底下内容
    icon: String,
    text: String,
  },
  computed: {
    badgeStyle() {
      let badgeStyle = {
        bottom: " calc(100% - 4px)",
        left: "calc(100% - 4px)",
        right: "auto",
        top: "auto",
      };
      if (this["overlaySmall"]) {
        badgeStyle = {
          bottom: "calc(100% - 2px)",
          left: "calc(100% - 2px)",
          right: "auto",
          top: "auto",
        };
      }
      if (this["overlayMiddle"]) {
        badgeStyle = {
          bottom: "calc(100% - 8px)",
          left: "calc(100% - 8px)",
          right: "auto",
          top: "auto",
        };
      }
      if (this["overlayMax"]) {
        badgeStyle = {
          bottom: "calc(100% - 12px)",
          left: "calc(100% - 12px)",
          right: "auto",
          top: "auto",
        };
      }
      return badgeStyle;
    },
  },
  methods: {
    genContent() {
      const { icon, text } = this;
      let iconContent = null;
      let textContent = null;
      if (icon) {
        iconContent = (
          <m-icon name={icon} class={[bem("content", { icon })]}></m-icon>
        );
      }
      if (text) {
        textContent = <span class={[bem("content", { text })]}>{text}</span>;
      }
      return (
        <div class={[bem("content")]}>
          {iconContent}
          {textContent}
        </div>
      );
    },
    genBadge() {
      const { showBadge, badgeType, badge, bordered } = this;
      if (showBadge) {
        let info = null;
        if (badgeType === "badge") {
          info = (
            <div
              style={{ ...this.badgeStyle }}
              class={[bem("badge-wrapper_badge", { bordered })]}
            >
              {badge}
            </div>
          );
        }
        if (badgeType === "dot") {
          info = (
            <div
              style={{ ...this.badgeStyle }}
              class={[bem("badge-wrapper_dot")]}
            ></div>
          );
        }
        return <div class={[bem("badge-wrapper")]}>{info}</div>;
      }
    },
  },
  render() {
    return (
      <div class={[bem()]}>
        {this.genBadge()}
        {this.genContent()}
      </div>
    );
  },
};
