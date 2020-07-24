//用于图标或信息右上角提示，比如未读消息
import "./index.styl";

//component
import MIcon from "../m-icon";

//util
import { convertToUnit } from "../../utils";

import { createNameSpace } from "../../utils";
const { bem } = createNameSpace("badge");

export const badgeProps={
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
      // 这个值必须匹配下列字符串中的一个,text是文字，icon是图表或图片
      return ["text", "icon"].indexOf(value) !== -1;
    },
    default: "icon",
  },
  overlayMiddle: [Boolean],
  overlayMax: [Boolean],
  overlaySmall: [Boolean],
  offsetX: [String, Number],
  offsetY: [String, Number],
  left: [Boolean],
  bottom: [Boolean],
  bordered: {
    type: Boolean,
    default: true,
  },
  //dot的颜色或info的背景色
  color: String,
  
  //底下内容
  icon: String,
  iconRounded: Boolean,
  iconSize: [String, Number],
  iconColor:String,
  text: String,
}
//slot:badge   slot content
// badge要有一个动画
export default {
  inheritAttr:true,
  name: "MBadge",
  props: {
   ...badgeProps
  },
  computed: {
    computedXOffset() {
      return this.calcPosition(this.offsetX);
    },
    computedYOffset() {
      return this.calcPosition(this.offsetY);
    },
    computedTop() {
      return this.bottom ? this.computedYOffset : "auto";
    },
    computedBottom() {
      return this.bottom ? "auto" : this.computedYOffset;
    },
    computedLeft() {
      return this.left ? "auto" : this.computedXOffset;
    },
    computedRight() {
      return !this.left ? "auto" : this.computedXOffset;
    },
    // Default fallback if offsetX
    // or offsetY are undefined.
    offset() {
      const { overlaySmall, overlayMiddle, overlayMax } = this;
      let defaultOffset = "4";
      if (overlayMax) {
        defaultOffset = "12";
      } else if (overlayMiddle) {
        defaultOffset = "8";
      } else if (overlaySmall) {
        defaultOffset = "2";
      }
      return defaultOffset;
    },

    badgeStyle() {
      return {
        bottom: this.computedBottom,
        left: this.computedLeft,
        right: this.computedRight,
        top: this.computedTop,
      };
    },
    colorSyle() {
      if (this.color) {
        return { background: this.color };
      }
    },
    contentIconSizeStyle() {
      if (this.iconSize) {
        return {
          fontSize: convertToUnit(this.iconSize),
        };
      }
    },
    contentIconColorStyle() {
      if (this.iconColor) {
        return {
          color: this.iconColor,
        };
      }
    },
  },
  methods: {
    calcPosition(offset) {
      return `calc(100% - ${convertToUnit(offset || this.offset)})`;
    },
    genContent() {
      const { icon, text, contentType } = this;
      
      let iconContent = null;
      let textContent = null;
      if (contentType === "icon" && icon) {
        iconContent = (
          <m-icon
            name={icon}
            style={{ ...this.contentIconSizeStyle,...this.contentIconColorStyle }}
            class={[bem("content", { icon, "icon-rounded": this.iconRounded })]}
          ></m-icon>
        );
      }
      if (contentType === "text" && text) {
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
              style={{ ...this.badgeStyle, ...this.colorSyle }}
              class={[bem("badge-wrapper_badge", { bordered })]}
            >
              {badge}
            </div>
          );
        }
        if (badgeType === "dot") {
          info = (
            <div
              style={{ ...this.badgeStyle, ...this.colorSyle }}
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
