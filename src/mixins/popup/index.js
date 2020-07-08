import { context } from "./context";

import { openMask, closeMask, removeMask, updateMask } from "./mask";

import { on, off, preventDefault } from "../../utils/dom/event";
import { removeNode } from "../../utils/dom/node";
import { getScroller } from "../../utils/dom/scroll";

import { TouchMixn } from "../touch";
import { CloseOnPopstateMixin } from "../close-on-popstate";
import { PortalMixin } from "../portal";

export const popupMixinProps = {
  // whether to show popup
  value: Boolean,
  // whether to show overlay
  mask: Boolean,
  // overlay custom style
  maskStyle: Object,
  // overlay custom class name
  maskClass: String,
  // whether to close popup when click overlay
  closeOnClickMask: Boolean,
  // z-index
  zIndex: [Number, String],
  // prevent body scroll
  lockScroll: {
    type: Boolean,
    default: true,
  },
  // whether to lazy render
  lazyRender: {
    type: Boolean,
    default: true,
  },
};

export function PopupMixin(option = {}) {
  return {
    mixins: [
      TouchMixn,
      CloseOnPopstateMixin,
      PortalMixin({
        afterPortal() {
          if (this.mask) {
            updateMask();
          }
        },
      }),
    ],
    props: popupMixinProps,
    data() {
      return {
        inited: this.value,
      };
    },
    computed: {
      shouldRender() {
        //会一直等到inited为true才会渲染，否则先渲染
        return this.inited || !this.lazyRender;
      },
    },
    watch: {
      value(val) {
        const type = val ? "open" : "close";
        this.inited = this.inited || this.value;
        this[type]();
        if (!option.skipToggleEvent) {
          this.$emit(type);
        }
      },
      mask: "renderMask",
    },
    methods: {
      open() {
        if (this.$isServer || this.opened) {
          return;
        }
        // cover default zIndex
        if (this.zIndex !== undefined) {
          context.zIndex = this.zIndex;
        }
        this.opened = true;
        this.renderMask();
        this.addLock();
      },
      addLock() {
        if (this.lockScroll) {
          on(document, "touchstart", this.touchStart);
          on(document, "touchmove", this.onTouchMove);
          if (!context.lockCount) {
            document.body.classList.add("m-overflow-hidden");
          }
          context.lockCount++;
        }
      },
      removeLock() {
        if (this.lockScroll) {
          context.lockCount--;
          off(document, "touchstart", this.touchStart);
          off(document, "touchmove", this.onTouchMove);

          if (!context.lockCount) {
            document.body.classList.remove("m-overflow-hidden");
          }
        }
      },
      close() {
        if (!this.opened) {
          return;
        }
        closeMask(this);
        this.opened = false;
        this.removeLock();
        this.$emit("input", false);
      },
      onTouchMove(e) {
        this.touchMove(event);
        //  向下滑动取10，向上取01
        const direction = this.deltaY > 0 ? "10" : "01";
        const el = getScroller(event.target, this.$el);
        /**
         * scrollHeight=滚动元素的高度
         * offsetHeight=包括padding、border、水平滚动条，但不包括margin的元素的高度
         * offsetHeight =  border-top-width + padding-top + height + padding-bottom + border-bottom-width
         * 如果存在水平滚动条，offsetHeight也包括水平滚动条的高度
         * offsetTop 包含滚动高度
         * scrollTop=滑动距离顶部的距离
         */
        const { scrollHeight, offsetHeight, scrollTop } = el;
        let status = "11";
        //没有滚动条
        if (scrollTop === 0) {
          //没有滚动条时，scrollHeight==clientHeight=》00代表有border，01代表？offsetHeight 会< scrollHeight吗？好像不会
          status = offsetHeight >= scrollHeight ? "00" : "01";
        } else if (scrollTop + offsetHeight >= scrollHeight) {
          //scrollTop + clientHeight = scrollHeight这是滚动到底部（offsetHeight>=clientHeight因为有可能有border）
          status = "10";
        }
        //这里的!(parseInt(status, 2)(2是二进制)代表是没有滑动时， status === '11'代表在滑动中
        if (
          status !== "11" &&
          this.direction === "vertical" &&
          !(parseInt(status, 2) & parseInt(direction, 2))
        ) {
          preventDefault(event, true);
        }
      },
      updateZIndex(value = 0) {
        this.$el.style.zIndex = ++context.zIndex + value;
      },
      renderMask() {
        if (this.$isServer || !this.value) {
          return;
        }

        this.$nextTick(() => {
          this.updateZIndex(this.mask ? 1 : 0);

          if (this.mask) {
            openMask(this, {
              zIndex: context.zIndex++,
              duration: this.duration,
              className: this.maskClass,
              customStyle: this.maskStyle,
            });
          } else {
            closeMask(this);
          }
        });
      },
    },
  };
}
