import "./index.styl";

import MIcon from "../m-icon";
import { PopupMixin } from "../../mixins/popup";
import { createNameSpace, isDef } from "../../utils";
const { bem } = createNameSpace("popup");
export default {
  name: "MPopup",
  mixins: [PopupMixin()],
  props: {
    round: Boolean,
    duration: [Number, String],
    safeAreaInsetBottom: Boolean,
    mask: {
      type: Boolean,
      default: true,
    },
    closeable: {
      type: Boolean,
      default: false,
    },
    closeIcon: {
      type: String,
      default: "shanchu",
    },
    position: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return (
          ["top", "center", "bottom", "left", "right"].indexOf(value) !== -1
        );
      },
      default: "center",
    },
    transitionName: {
      type: String,
      default: "",
    },
    closeIconPosition: {
      type: String,
      default: "top-right",
    },
    closeOnClickMask: {
      type: Boolean,
      default: true,
    },
  },
  beforeCreate() {
    const createEmitter = (eventNamt) => (event) =>
      this.$emit(eventNamt, event);
    this.onClick = createEmitter("click");
    this.onOpened = createEmitter("open");
    this.onClosed = createEmitter("close");
  },
  render() {
    if (!this.shouldRender) {
      return;
    }
    const { round, position } = this;
    const isCenter = position === "center";
    const transitionName =
      this.transitionName ||
      (isCenter ? "m-fade" : `m-popup-slide-${position}`);
    const style = {};
    if (isDef(this.duration)) {
      const key = isCenter ? "animationDuration" : "transitionDuration";
      style[key] = this.duration + "s";
    }

    return (
      <transition
        name={transitionName}
        onAfterEnter={this.onOpened}
        onAfterLeave={this.onClosed}
      >
        <div
          vShow={this.value}
          style={style}
          class={[
            bem({
              round,
              [position]: position,
              "safe-area-inset-bottom": this.safeAreaInsetBottom,
            }),
          ]}
          onClick={this.onClick}
        >
          {this.$slots.default}
          {this.closeable && (
            <m-icon
              onClick={this.close}
              role="button"
              tabindex="0"
              name={this.closeIcon}
              class={[
                bem("close-icon", {
                  [this.closeIconPosition]: this.closeIconPosition,
                }),
              ]}
            ></m-icon>
          )}
        </div>
      </transition>
    );
  },
};
