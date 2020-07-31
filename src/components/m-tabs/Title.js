//tab的title,组件化，单函数生成一个组件
//bem
import { createNameSpace, isDef } from "../../utils";
import DotBadge from "../dot-badge";
const { bem } = createNameSpace("tab");

//提供取得slot的方法=》this.slots
import { SlotsMixin } from "../../mixins/slots";
export default {
  mixins:[SlotsMixin],
  props: {
    dot: Boolean,
    //是否为卡等其他样式
    type: String,
    badge: [Number, String],
    //card的颜色样式
    color: String,
    title: String,
    isActive: Boolean,
    ellipsis: Boolean,
    disabled: Boolean,
    scrollable: Boolean,
    activeColor: String,
    offColor: String,
    swipeThrehold: [String, Number], //滑动的阙值
  },
  computed: {
    style() {
      const { type, isActive, color, disabled } = this;
      let styl = {};
      //card 的样式
      if (type === "card" && color) {
        styl.borderColor = color;
        if (!disabled) {
          if (!isActive) {
            styl.backgroundColor = color;
          } else {
            styl.color = color;
          }
        }
      }
      //设置自定义颜色
      const titleColor = isActive ? this.activeColor : this.offColor;
      if (titleColor) {
        styl.color = color;
      }
      //基础宽度
      if (this.scrollable && this.ellipsis) {
        styl.flexBasis = `${88 / this.swipeThrehold}`;
      }
      return styl;
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
    genText() {
      const Text = (
        <span class={[bem("text", { ellipsis: this.ellipsis })]}>
          {this.slots() || this.title}
        </span>
      );
      if (this.dot || (isDef(this.badge) && this.badge !== "")) {
        return (
          <div class={[bem("text-wrapper")]}>
            {Text}
            <DotBadge dot={this.dot} badge={this.badge}></DotBadge>
          </div>
        );
      }
      return Text;
    },
  },
  render() {
    return (
      <div
        role="tab"
        aria-selected={this.isActive}
        class={[
          bem({
            active: this.isActive,
            disabled: this.disabled,
            complete: !this.ellipsis, //是否是显示完的，还是省略的
          }),
        ]}
        style={{ ...this.styl }}
        onClick={this.onClick}
      >
        {this.genText()}
      </div>
    );
  },
};
