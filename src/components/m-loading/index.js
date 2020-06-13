import "./index.styl";
import MIcon from "../m-icon";
import { isNum } from "../../utils/func";
import { createNameSpace } from "../../utils/create";
const { bem } = createNameSpace("loading");
export default {
  name: "MLoading",
  props: {
    type: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["circle", "spinner", "line-spinner"].indexOf(value) !== -1;
      },
      default: "circle",
    },
    color: {
      type: String,
      default: "#c8c9cc",
    },
    size: {
      type: [String, Number],
      default: "30",
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
    style.color = color;
    return (
      <div class={[bem({vertical})]} style={style}>
        <computedTag
          color={color}
          size={computedSize}
          name={computedName}
          class={bem("spinner", type)}
        ></computedTag>
        {this.genText()}
      </div>
    );
  },
};
