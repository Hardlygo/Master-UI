import "./index.styl";
//mxins
import { ParentMixin } from "../../mixins/relation";
//提供取得slot的方法=》this.slots
import { SlotsMixin } from "../../mixins/slots";
import { BindEventMixin } from "../../mixins/bind-evnet";

//utils
import { createNameSpace, isDef, isPromise } from "../../utils";
import { addUnit } from "../../utils/format/unit";
import { scrollLeftTo, scrollTopTo } from "./utils";
import { route } from "../../utils/router";
import { isHidden } from "../../utils/dom/style";
import { on, off } from "../../utils/dom/event";
import {
  getElementTop,
  getScroller,
  getVisibleTop,
  setRootScrollTop,
  getVisibleHeight,
} from "../../utils/dom/scroll";
//bem
const { bem } = createNameSpace("tabs");
const BORDER_TOP_BOTTOM = "m-hairline--top-bottom";
//component
import Sticky from "../sticky";
import Title from "./Title";
import Content from "./Content";
export default {
  name: "MTabs",
  model: {
    prop: "value",
    event: "input",
  },
  mixins: [
    ParentMixin("MTabs"),
    BindEventMixin(function(bind) {
      if (!this.scroller) {
        this.scroller = getScroller(this.$el);
      }
      bind(window, "resize", this.resize, true);
      if (this.scrollspy) {
        bind(this.scroller, "scroll", this.onScroll, true);
      }
    }),
    SlotsMixin,
  ],
  props: {
    color: String,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    scrollspy: Boolean,
    background: String,
    lineWidth: [Number, String],
    lineHeight: [Number, String],
    beforeChange: Function,
    titleActiveColor: String,
    titleOffColor: String,
    type: {
      type: String,
      default: "line",
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    border: {
      type: Boolean,
      default: true,
    },
    //省略过长title文字
    ellipsis: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: [Number, String],
      default: 0.3,
    },
    offsetTop: {
      type: [Number, String],
      default: 0,
    },
    lazyRender: {
      type: Boolean,
      default: true,
    },
    swipeThreshold: {
      type: [Number, String],
      default: 4,
    },
  },
  data() {
    return {
      position: "",
      currentIndex: null,
      lineStyle: {
        backgroundColor: this.color,
      },
    };
  },
  computed: {
    //是否可滑动
    scrollable() {
      return this.children.length > this.swipeThreshold || !this.ellipsis;
    },
    navStyle() {
      return {
        borderColor: this.color,
        background: this.background,
      };
    },
    currentVal() {
      const activeTab = this.children[this.currentIndex];
      if (activeTab) {
        return activeTab.computedVal;
      }
    },
    scrollOffset() {
      if (this.sticky) {
        return +this.offsetTop + this.tabHeight;
      }
      return 0;
    },
  },
  watch: {
    color: "setLine",

    value(val, old) {
      if (val !== this.currentVal) {
        this.setCurrentIndexByVal(val);
      }
    },

    children() {
      this.setCurrentIndexByVal(this.currentVal || this.value);
      this.setLine();

      this.$nextTick(() => {
        this.scrollIntoView(true);
      });
    },

    currentIndex() {
      this.scrollIntoView();
      this.setLine();

      // scroll to correct position
      if (this.stickyFixed && !this.scrollspy) {
        setRootScrollTop(Math.ceil(getElementTop(this.$el) - this.offsetTop));
      }
    },

    scrollspy(val) {
      if (val) {
        on(this.scroller, "scroll", this.onScroll, true);
      } else {
        off(this.scroller, "scroll", this.onScroll);
      }
    },
  },
  mounted() {
    this.init();
  },

  activated() {
    this.init();
    this.setLine();
  },
  methods: {
    resize() {
      this.setLine();
    },
    init() {
      this.$nextTick(() => {
        this.inited = true;
        this.tabHeight = getVisibleHeight(this.$refs.wrap);
        this.scrollIntoView(true);
      });
    },
    // update nav bar
    setLine() {
      const shouldAnimate = this.inited;
      this.$nextTick(() => {
        const { titles } = this.$refs;
        if (
          !titles ||
          !titles[this.currentIndex] ||
          this.type !== "line" ||
          isHidden(this.$el)
        ) {
          return;
        }

        const title = titles[this.currentIndex].$el;
        const { lineHeight, lineWidth } = this;

        const width = isDef(lineWidth) ? lineWidth : title.offsetWidth / 2;
        const left = title.offsetLeft+ title.offsetWidth / 2;

        //line的长度为title长度一半
        const lineStyle = {
          width: addUnit(width),
          backgroundColor: this.color,
          //translateX(${left}px)为向右移动n-1个tab长度距离，再加上width长度一半，就到达了当前以当前tab中位线为起点， translateX(-50%)为向左移动自身宽度的一半，即width一半，通过向左移动自身长度一半达到中位线平分line
          transform: `translateX(${left}px) translateX(-50%)`,
        };
        if (shouldAnimate) {
          lineStyle.transitionDuration = `${this.duration}s`;
        }
        if (isDef(lineHeight)) {
          const height = addUnit(lineHeight);
          lineStyle.height = height;
          lineStyle.borderRadius = height;
        }
        this.lineStyle = lineStyle;
      });
    },
    // correct the index of active tab
    setCurrentIndexByVal(value) {
      const matched = this.children.filter((tab) => tab.computedVal === value);
      const defaultIndex = (this.children[0] || {}).index || 0;
      this.setCurrentIndex(matched.length ? matched[0].index : defaultIndex);
    },
    setCurrentIndex(currentIndex) {
      currentIndex = this.findAvailableTab(currentIndex);
      if (isDef(currentIndex) && currentIndex !== this.currentIndex) {
        const shouldEmitChange = this.currentIndex != null;
        this.currentIndex = currentIndex;
        this.$emit("input", this.currentVal);

        if (shouldEmitChange) {
          this.$emit(
            "change",
            this.currentVal,
            this.children[currentIndex].title
          );
        }
      }
    },
    //确定index是往前减还是往后加
    findAvailableTab(index) {
      const diff = index < this.currentIndex ? -1 : 1;

      while (index >= 0 && index < this.children.length) {
        if (!this.children[index].disabled) {
          return index;
        }

        index += diff;
      }
    },
    callBeforeChange(value, done) {
      if (this.beforeChange) {
        const returnVal = this.beforeChange(value);

        if (isPromise(returnVal)) {
          returnVal.then((value) => {
            if (value) {
              done();
            }
          });
        } else if (returnVal) {
          done();
        }
      } else {
        done();
      }
    },
    // emit event when clicked
    onClick(component, index) {
      const { title, disabled, computedVal } = this.children[index];
      if (disabled) {
        this.$emit("disabled", computedVal, title);
      } else {
        this.callBeforeChange(computedVal, () => {
          this.setCurrentIndex(index);
          this.scrollToCurrentContent();
        });
        this.$emit("click", computedVal, title);
        route(component.$router, component);
      }
    },

    scrollIntoView(immediate) {
      // debugger
      const { titles } = this.$refs;
      console.log("this.scrollable: ", this.scrollable);
      console.log(
        "!this.scrollable || !this.titles || !this.titles[this.currentIndex]: ",
        !this.scrollable || !this.titles || !this.titles[this.currentIndex]
      );
      console.log("!this.scrollable: ", !this.scrollable);
      console.log(" !this.titles: ", !titles);
      console.log(
        "!this.titles[this.currentIndex]: ",
        !titles[this.currentIndex]
      );
      if (!this.scrollable || !titles || !titles[this.currentIndex]) {
        return;
      }
      const { nav } = this.$refs;
      // debugger;
      const title = titles[this.currentIndex].$el;
      //为什么这样子算
      const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      console.log("to: ", to);
      console.log("title.offsetWidth: ", title.offsetWidth);
      console.log("nav.offsetWidth: ", nav.offsetWidth);
      console.log("title.offsetLeft : ", title.offsetLeft);
      scrollLeftTo(nav, to, immediate ? 0 : this.duration);
      console.log("nav scrollLeft : ", nav.scrollLeft);
    },

    onStickyScroll(params) {
      this.stickyFixed = params.isFixed;
      this.$emit("scroll", params);
    },
    scrollTo(val) {
      this.$nextTick(() => {
        this.setCurrentIndexByVal(val);
        this.scrollToCurrentContent(true);
      });
    },
    scrollToCurrentContent(immediate = false) {
      if (this.scrollspy) {
        const target = this.children[this.currentIndex];
        const el = target?.$el;

        if (el) {
          const to = getElementTop(el, this.scroller) - this.scrollOffset;

          this.lockScroll = true;
          scrollTopTo(this.scroller, to, immediate ? 0 : +this.duration, () => {
            this.lockScroll = false;
          });
        }
      }
    },
    onScroll() {
      if (this.scrollspy && !this.lockScroll) {
        const index = this.getCurrentIndexOnScroll();
        this.setCurrentIndex(index);
      }
    },
    getCurrentIndexOnScroll() {
      const { children } = this;

      for (let index = 0; index < children.length; index++) {
        const top = getVisibleTop(children[index].$el);

        if (top > this.scrollOffset) {
          return index === 0 ? 0 : index - 1;
        }
      }

      return children.length - 1;
    },
  },
  render() {
    const { type, ellipsis, animated, scrollable } = this;

    const Nav = this.children.map((item, index) => (
      <Title
        ref="titles"
        refInFor
        type={type}
        dot={item.dot}
        info={isDef(item.badge) ? item.badge : item.info}
        title={item.title}
        color={this.color}
        style={item.titleStyle}
        isActive={index === this.currentIndex}
        ellipsis={ellipsis}
        disabled={item.disabled}
        scrollable={scrollable}
        activeColor={this.titleActiveColor}
        inactiveColor={this.titleOffColor}
        swipeThreshold={this.swipeThreshold}
        scopedSlots={{
          default: () => item.slots("title"),
        }}
        onClick={() => {
          this.onClick(item, index);
        }}
      />
    ));

    const Wrap = (
      <div
        ref="wrap"
        class={[
          bem("wrap", { scrollable }),
          { [BORDER_TOP_BOTTOM]: type === "line" && this.border },
        ]}
      >
        <div
          ref="nav"
          role="tablist"
          class={bem("nav", [type])}
          style={this.navStyle}
        >
          {this.slots("nav-left")}
          {Nav}
          {type === "line" && (
            <div class={bem("line")} style={this.lineStyle} />
          )}
          {this.slots("nav-right")}
        </div>
      </div>
    );

    return (
      <div class={bem([type])}>
        {this.sticky ? (
          <Sticky
            container={this.$el}
            offsetTop={this.offsetTop}
            onScroll={this.onSticktScroll}
          >
            {Wrap}
          </Sticky>
        ) : (
          Wrap
        )}
        <Content
          count={this.children.length}
          animated={animated}
          duration={this.duration}
          swipeable={this.swipeable}
          currentIndex={this.currentIndex}
          onChange={this.setCurrentIndex}
        >
          {this.slots()}
        </Content>
      </div>
    );
  },
};
