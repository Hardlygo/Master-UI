//tabs的content,组件化，单函数生成一个组件
//bem
import { createNameSpace, isDef } from "../../utils";
const { bem } = createNameSpace("tabs");

//mixins
//提供取得slot的方法=》this.slots
import { SlotsMixin } from "../../mixins/slots";
import { TouchMixn } from "../../mixins/touch";
//滑动的最小距离，超过这个距离就会翻页
const MIN_SWIPE_DISTANCE = 50;
export default {
  mixins: [TouchMixn, SlotsMixin],
  props: {
    count: Number, //一共有多少个tab
    duration: [Number, String],
    animated: Boolean,
    swipeable: Boolean,
    currentIndex: Number, //当前tab的index
  },
  computed: {
    style() {
      if (this.animated) {
        return {
          transform: `translate3d(${-1 * this.currentIndex * 100}%,0,0)`,
          transitionDuraton: `${this.duration}s`,
        };
      }
    },
    listeners() {
      if (this.swipeable) {
        return {
          touchstart: this.touchStart,
          touchmove: this.touchMove,
          touchend: this.onTouchEnd,
          touchcancel: this.onTouchEnd,
        };
      }
    },
  },
  methods: {
    //监听往哪个方向滑动，左或右
    onTouchEnd() {
      const { direction, deltaX, currentIndex } = this;
      if (direction === "horizontal" && this.offsetX > MIN_SWIPE_DISTANCE) {
        //横向滑动，并且超过了最小值
        if (deltaX > 0 && currentIndex !== 0) {
          //向左滑动
          this.$emit("change", currentIndex - 1);
        }
        if (deltaX < 0 && currentIndex !== this.count - 1) {
          //向右滑动，并且不是最后一个
          this.$emit("change", currentIndex + 1);
        }
      }
    },
    genChildrens() {
      if (this.animated) {
        return (
          <div class={[bem("track")]} style={{ ...this.style }}>
            {this.slots()}
          </div>
        );
      }
      return this.slots();
    },
  },
  render() {
    return (
      <div
        class={[bem("content", { animated: this.animated })]}
        {...{ on: this.listeners }}
      >
        {this.genChildrens()}
      </div>
    );
  },
};
