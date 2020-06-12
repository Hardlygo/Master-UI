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
        return ["circle", "spinner"].indexOf(value) !== -1;
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
  },
  computed: {
    computedSize() {
      return isNum(this.size) ? `${this.size}px` : this.size;
    },
    computedName() {
      return `loading-${this.type}`;
    },
  },
  render(h) {
    const { type, computedSize, computedName, color } = this;
    return (
      <m-icon
        color={color}
        size={computedSize}
        name={computedName}
        class={[bem([type])]}
      ></m-icon>
    );
  },
};
