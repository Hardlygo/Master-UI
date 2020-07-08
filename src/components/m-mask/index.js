import "./inde.styl";
import { preventDefault } from "../../utils/dom/event";
import { createNameSpace, isDef, noop } from "../../utils";
const { bem } = createNameSpace("mask");
export default {
  name: "MMask",
  props: {
    show: {
      default: false,
      type: Boolean,
    },
    zIndex: { type: [Number, String] },
    duration: [Number, String],
    customClass: null,
    customStyle: Object,

    lockScroll: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    style() {
      let style = {
        zIndex: this.zIndex,
        ...this.customStyle,
      };
      if (isDef(this.duration)) {
        style.duration = `${this.duration}s`;
      }
      return style;
    },
  },
  methods: {
    preventTouchMove(e) {
      preventDefault(e, true);
    },
    onClick(e) {
      
      this.$emit("click", e);
    },
  },
  render() {
    const maskProps = {
      style: this.style,
      class: [bem(), this.customClass],
      on: {
        touchMove: this.lockScroll ? this.preventTouchMove : noop,
        click: this.onClick,
      },
    };
    return (
      <transition name="m-fade">
        <div {...maskProps} vShow={this.show}>
          {this.$slots.default ? this.$slots.default : null}
        </div>
      </transition>
    );
  },
};
