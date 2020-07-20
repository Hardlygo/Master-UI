//checkbox和radio公用的mixins
import MIcon from "../components/m-icon";
import { isDef, isNum } from "../utils";
import { ChildernMixin } from "./relation";
import { SlotsMixin } from "./slots";

export const ChecekboxRadioMixins = ({ parent, bem, role }) => ({
  mixins: [ChildernMixin(parent), SlotsMixin],
  props: {
    //用于绑定到radio|CheckBox的值
    value: null,
    disabled: Boolean,
    iconSize: [Number, String],
    checkedColor: String,
    label: String,
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
        //checked在radio或checkbox内定义
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor,
        };
      }
    },
    tabindex() {
      // 当一个元素设置tabindex属性值为-1的时候，元素会变得focusable
      // 所谓focusable指的是元素可以被鼠标或者JS focus，在Chrome浏览器下表现为会有outline发光效果，IE浏览器下是虚框，同时能够响应focus事件。但是，却不能被键盘focus。

      // <div>设置了tabindex="0"，从键盘访问的角度来讲，相对于<div>元素变成了<button>元素。 ，也就是能hightlight周围还有边框
      //因此，实际上，我们是可以使用<div>或者<span>元素模拟按钮的，但是千万不能忘记设置tabindex属性，如下示意：
      // <div class="button" tabindex="0" role="button">按钮</div>  既然要用DIV模拟按钮，就应该加这个，让用户无障碍访问
      //https://www.jb51.cc/bootstrap/234376.html
      if (this.isDisabled || (role === "radio" && !this.checked)) {
        //由于设置了tabindex="-1"的元素鼠标点击可以focus并outline轮廓显示
        return -1;
      }
      return 0;
    },
    computedIconSize() {
      let iconSize = this.iconSize || (this.parent && this.parent.iconSize);
      if (isDef(iconSize)) {
        return isNum(iconSize) ? `${iconSize}px` : iconSize;
      }
    },
  },
  methods: {
    onClick(e) {
      const { target } = e;
      const { icon } = this.$refs;
      const iconClicked = icon === target || icon.contains(target);

      if (!this.isDisabled && (iconClicked || !this.labelClickDisabled)) {
        //这是触发change事件
        this.toggle();

        // wait for toggle method to complete
        // so we can get the changed value in the click event listener
        setTimeout(() => {
          this.$emit("click", event);
        });
      } else {
        this.$emit("click", event);
      }
    },
    genIcon() {
      const { checked } = this;
      return (
        <div
          ref="icon"
          class={bem("icon", [
            this.shape,
            { disabled: this.isDisabled, checked },
          ])}
          style={{ fontSize: this.computedIconSize }}
        >
          {this.slots("icon", { checked }) || (
            <m-icon name="success" style={this.iconStyle}></m-icon>
          )}
        </div>
      );
    },
    genLabel() {
      const slot = this.slots();

      return (
        <span
          class={bem("label", [
            this.labelPosition,
            { disabled: this.isDisabled },
          ])}
        >
          {slot || this.label}
        </span>
      );
    },
  },
  render() {
    const Children = [this.genIcon()];

    if (this.labelPosition === "left") {
      Children.unshift(this.genLabel());
    } else {
      Children.push(this.genLabel());
    }

    return (
      <div
        role={role}
        class={bem([
          {
            disabled: this.isDisabled,
            "label-disabled": this.labelDisabled,
          },
          this.direction,
        ])}
        tabindex={this.tabindex}
        aria-checked={String(this.checked)}
        onClick={this.onClick}
      >
        {Children}
      </div>
    );
  },
});
