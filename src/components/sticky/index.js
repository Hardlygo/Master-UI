import "./index.styl";

//utils
import { isHidden } from "../../utils/dom/style";
import { unit2px } from "../../utils/format/unit";
import {
  getElementTop,
  getScrollTop,
  getScroller,
} from "../../utils/dom/scroll";
import { isDef, isServer, createNameSpace } from "../../utils";
const { bem } = createNameSpace("sticky");

//mixins
import { BindEventMixin } from "../../mixins/bind-evnet";
//提供取得slot的方法=》this.slots
import { SlotsMixin } from "../../mixins/slots";

export default {
  name: "Sticky",
  mixins: [
    BindEventMixin(function(bindMethod, isBind) {
      if (!this.scroller) {
        this.scroller = getScroller(this.$el);
      }
      if (this.observer) {
        const method = isBind ? "observe" : "unobserve";
        this.observer[method](this.$el);
      }
      //调用BindEventMixin绑定的bind监听方法，见BindEventMixin的on/off
      bindMethod(this.scroller, "scroll", this.onScroll, true);
      this.onScroll();
    }),
    SlotsMixin,
  ],
  props: {
    zIndex: [String, Number],
    container: null,
    offsetTop: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      fixed: false,
      height: 0,
      transform: 0,
    };
  },
  computed: {
    offsetTopPx() {
      return unit2px(this.offsetTop);
    },
    style() {
      if (!this.fixed) return;
      const style = {};
      if (isDef(this.zIndex)) {
        style.zIndex = this.zIndex;
      }
      if (this.offsetTopPx && this.fixed) {
        style.top = `${this.offsetTopPx}px`;
      }
      if (this.transform) {
        style.transform = `translate3d(0,${this.transform}px,0)`;
      }
      return style;
    },
  },
  created() {
    if (!isServer && window.IntersectionObserver) {
      //见http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
      this.observer = new IntersectionObserver(
        (entrise) => {
          //当第一个元素可见时
          if (entrise[0].intersectionRatio > 0) {
            this.onScroll();
          }
        },
        //根元素
        { root: document.body }
      );
    }
  },
  methods: {
    onScroll() {
      if (isHidden(this.$el)) {
        return;
      }
      this.height = this.$el.offsetHight;
      const { container, offsetTopPx } = this;
      const scrollTop = getScrollTop(window);
      const top2pageTop = getElementTop(this.$el);

      const emmitScrollEvent = () => {
        this.$emit("scroll", {
          scrollTop,
          fixed: this.fixed,
        });
      };

      if (container) {
        const bottom2pageTop = top2pageTop + container.offsetHight;

        if (scrollTop + offsetTopPx + this.height > bottom2pageTop) {
          const distance2bottom = this.height + scrollTop - bottom2pageTop;

          if (distance2bottom < this.height) {
            this.fixed = true;
            //上移
            this.transform = -(distance2bottom + offsetTopPx);
          } else {
            this.fixed = false;
          }
          emmitScrollEvent();
          return;
        }
      }
      if (scrollTop + offsetTopPx > top2pageTop) {
        this.fixed = true;
        this.transform = 0;
      } else {
        this.fixed = false;
      }
      emmitScrollEvent();
    },
  },
  render() {
    const { fixed } = this;
    const style = {
      height: fixed ? `${this.height}px` : null,
    };

    return (
      <div style={style}>
        <div class={bem({ fixed })} style={this.style}>
          {this.slots()}
        </div>
      </div>
    );
  },
};
