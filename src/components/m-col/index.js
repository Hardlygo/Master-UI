import "./index.styl";
import { ChildernMixin } from "../../mixins/relation";

import { createNameSpace } from "../../utils/create";
const { bem } = createNameSpace("col");
export default {
  name: "MCol",
  mixins: [ChildernMixin("MRow")],
  props: {
    cols: [Number, String],
    offset: [Number, String],
    tag: {
      type: String,
      default: "div",
    },
  },
  computed: {
    style() {
        console.log(this.$attrs)
      const { index } = this;
      const { space } = this.parent || {};
      if (space && space[index]) {
        //取得当前col左右padding
        const { left, right } = space[index];
        return {
          paddingLeft: left ? `${left}px` : null,
          paddingRight: right ? `${right}px` : null,
        };
      }
    },
  },
  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
  },
  render() {
    const { cols, offset, tag } = this;
    return (
      <tag
        style={this.style}
        class={bem({ [cols]: cols, [`offset-${offset}`]: offset })}
        onClick={this.onClick}
      >
        {this.$slots.default}
      </tag>
    );
  },
};
