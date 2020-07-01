import Vue from "vue";
import { on } from "../utils/dom/event";

const MIN_DISTANCE = 10;

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return "horizontal";
  }
  if (y > x && y > MIN_DISTANCE) {
    return "vertical";
  }

  return "";
}

let defaultTouchMixinData = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
  direction: "",
};

export const TouchMixn = Vue.extend({
  data() {
    return {
      ...defaultTouchMixinData,
    };
  },
  methods: {
    resetTouchStatus() {
      this.direction = "";
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },
    touchStart(e) {
      this.resetTouchStatus();
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    },
    touchMove(e) {
      const touch = e.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX); //返回绝对值
      this.offsetY = Math.abs(this.deltaY);
      this.direction =
        this.direction || getDirection(this.offsetX, this.offsetY);
    },

    // avoid Vue 2.6 event bubble issues by manually binding events
    // https://github.com/youzan/vant/issues/3015
    bindTouchEvent(el) {
      const { onTouchStart, onTouchMove, onTouchEnd } = this;

      on(el, "touchstart", onTouchStart);
      on(el, "touchmove", onTouchMove);

      if (onTouchEnd) {
        on(el, "touchend", onTouchEnd);
        on(el, "touchcancel", onTouchEnd);
      }
    },
  },
});
