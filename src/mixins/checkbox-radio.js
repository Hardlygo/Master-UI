//checkbox和radio公用的mixins
import MIcon from "../components/m-icon";

import { ChildernMixin } from "./relation";

export const ChecekboxRadioMixins = ({ parent, bem, role }) => ({
  mixins: [ChildernMixin(parent)],
  props: {
    //用于绑定到radio|CheckBox的值
    value: null,
    disabled: Boolean,
    iconSize: [Number, String],
    checkedColor: String,
    labelPosition: String,
    labelClickDisabled: Boolean,
    shape: {
      type: String,
      default: "round",
    },
    bindGroup: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    disableBindRelation() {
      return !this.bindGroup;
    },
    isDisabled() {
      return (this.parent && this.parent.disabled) || this.disabled;
    },
    direction() {
      return (this.parent && this.parent.direction) || null;
    },
    iconStyle() {
      //选中的icon样式
      const checkedColor =
        this.checkedColor || (this.parent && this.parent.checkedColor);
      if (checkedColor && this.checked && !this.isDisabled) {
        //checked在哪里定义？
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor,
        };
      }
    },
    tabindex() {
      // 当一个元素设置tabindex属性值为-1的时候，元素会变得focusable，
      // 所谓focusable指的是元素可以被鼠标或者JS focus，在Chrome浏览器下表现为会有outline发光效果，IE浏览器下是虚框，同时能够响应focus事件。但是，却不能被键盘focus。
      
      // <div>设置了tabindex="0"，从键盘访问的角度来讲，相对于<div>元素变成了<button>元素。
      //因此，实际上，我们是可以使用<div>或者<span>元素模拟按钮的，但是千万不能忘记设置tabindex属性，如下示意：
      // <div class="button" tabindex="0" role="button">按钮</div>  既然要用DIV模拟按钮，就应该加这个，让用户无障碍访问
      //https://www.jb51.cc/bootstrap/234376.html
      if (this.isDisabled || (role === "radio" && !this.checked)) {
          //由于设置了tabindex="-1"的元素鼠标点击可以focus并outline轮廓显示
        return -1;
      }
      return 0;
    },
  },
});
