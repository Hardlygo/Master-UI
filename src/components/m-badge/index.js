//用于图标或信息右上角提示，比如未读消息
import "./index.styl";

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
        return ["dot", "info", "icon"].indexOf(value) !== -1;
      },
      default: "dot",
    },
    showBadge: {
      type: Boolean,
      default: false,
    },
    contentType: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个,text是文字，icon是图表或图片,both是两者都要
        return ["text", "icon", "both"].indexOf(value) !== -1;
      },
      default: "both",
    },

    //dot的颜色或info的背景色
    color: String,

    icon: String,
    text: String,
  },
};
