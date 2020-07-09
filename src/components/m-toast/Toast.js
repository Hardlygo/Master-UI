import "./index.styl";

import MIcon from "../m-icon";
import MLoading from "../m-loading";
import { PopupMixin } from "../../mixins/popup";
import { createNameSpace, isDef } from "../../utils";
const { bem } = createNameSpace("toast");

export default {
  name: "MToast",
  mixins: [PopupMixin()],
  props: {
    //
    icon: String,
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
    text:String
  },
  methods: {
    genIcon() {},
    genText() {},
  },
  render() {},
};
