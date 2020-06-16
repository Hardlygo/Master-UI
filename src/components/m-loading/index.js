import "./index.styl";
import MIcon from "../m-icon";
import { isNum } from "../../utils/func";
import { createNameSpace } from "../../utils/create";
const { bem } = createNameSpace("loading");
const LOADINGTYPES = ["circle", "spinner", "line-spinner"];
export default {
  name: "MLoading",
  props: {
    type: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return LOADINGTYPES.indexOf(value) !== -1;
      },
      default: "circle",
    },
    color: {
      type: String,
      validator: function(value) {
        // 这个值传空会报错
        return value!== "";
      },
      default: "#c8c9cc",
    },
    size: {
      type: [String, Number],
      default: "24",
    },
    textSize: {
      type: [String, Number],
      default: "14",
    },
    loadingText: String,
    vertical: Boolean,
  },
  computed: {
    computedSize() {
      return isNum(this.size) ? `${this.size}px` : this.size;
    },
    computedName() {
      return `loading-${this.type}`;
    },
    computedTag() {
      return this.type === "line-spinner" ? "div" : "m-icon";
    },
    computedTextSize() {
      return isNum(this.textSize) ? `${this.textSize}px` : this.textSize;
    },
  },
  methods: {
    genText() {
      const slots = this.$slots;
      const showLoadingText = this.loadingText || slots.default;
      const { computedTextSize } = this;
      if (showLoadingText) {
        let textStyl = {
          fontSize: computedTextSize,
        };
        return (
          <span class={bem("text")} style={textStyl}>
            {slots.default ? slots.default : this.loadingText}
          </span>
        );
      }
    },
  },
  render(h) {
    const {
      type,
      computedSize,
      computedName,
      computedTag,
      color,
      vertical,
    } = this;
    let style = {};
    //都是根据字体颜色和字体大小确定图标颜色和大小
    style.color = color||"";
    style.fontSize = computedSize||"";
    return (
      <div class={[bem({ vertical })]}>
        <computedTag
          style={style}
          size={computedSize}
          name={computedName}
          class={bem("spinner", type)}
        ></computedTag>
        {this.genText()}
      </div>
    );
  },
};
