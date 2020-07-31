import "./index.styl";

//mxins
import { ChildernMixin } from "../../mixins/relation";
//提供取得slot的方法=》this.slots
import { SlotsMixin } from "../../mixins/slots";

//bem
import { createNameSpace, isDef } from "../../utils";
const { bem } = createNameSpace("tab");

//props
import { routeProps } from "../../utils/router";
export default {
  name: "MTab",
  mixins: [ChildernMixin("MTabs"), SlotsMixin],
  props: {
    ...routeProps,
    dot: Boolean,
    value: [String, Number],
    badge: [String, Number],
    title: String,
    titleStyle: null,
    disabled: Boolean,
  },
  data() {
    return {
      inited: false,
    };
  },
  computed: {
    computedVal() {
      return isDef(this.value) ? this.value : this.index;
    },
    isActive() {
      const active = this.computedVal === this.parent.currentVal;
      if (active) {
        this.inited = true;
      }
      return active;
    },
  },
  watch: {
    title() {
      //title改变 需要重绘line
      this.parent.setLine();
    },
    inited(val) {
      if (this.parent.lazyRender && val) {
        this.$nextTick(() => {
          this.parent.$emit("rendered", this.computedVal, this.title);
        });
      }
    },
  },
  render(h) {
    //渲染tab内容

    const { isActive, parent, slots } = this;
    //若初始化了或者纵向滑动或者不是延迟渲染，则开始渲染
    const shouldRender = this.inited || parent.scrollspy || !parent.lazyRender;

    const show = parent.scrollspy || isActive;
    //若渲染，则渲染默认插槽
    const Content = shouldRender ? slots() : h();

    if (parent.animated) {
      return (
        <div
          role="tabpanel"
          aria-hidden={!isActive}
          class={[bem("pane-wrapper", { off: !isActive })]}
        >
          <div class={bem("pane")}>{Content}</div>
        </div>
      );
    }

    return (
      <div vShow={show} role="tabpanel" class={bem("pane")}>
        {Content}
      </div>
    );
  },
};
