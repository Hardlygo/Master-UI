//底部导航栏的项
import "./index.styl";

//component
import MIcon from "../m-icon";
import MBadge from "../m-badge";
import { badgeProps } from "../m-badge";

//mxins
import { ChildernMixin } from "../../mixins/relation";
//提供取得slot的方法=》this.slots
import { SlotsMixin } from "../../mixins/slots";

//util
import { convertToUnit, isObject, isDef } from "../../utils";

//bem
import { createNameSpace } from "../../utils";
const { bem } = createNameSpace("navbar-item");

//route
import { route, routeProps } from "../../utils/router";

export default {
  name: "MNavbarItem",
  mixins: [ChildernMixin("MNavbar"), SlotsMixin],
  props: {
    ...routeProps,
    ...badgeProps,
    dot: Boolean,
    // badge: [String, Number],
    // //地下的icon
    // icon: {
    //   type: String,
    //   required: true,
    // },
    //当前选中的item绑定的值
    value: [String, Number],
  },
  computed: {
    // showDadgeorDot() {
    //   return !!this.badge || !!this.dot;
    // },
    // badgeType() {
    //   return this.dot ? "dot" : "badge";
    // },
    //路由模式下，是否是被激活了
    routeActive() {
      //如果有传入to配置，则看看是那种路由模式匹配上的
      const { to, $route } = this;
      if (to && $route) {
        const config = isObject(to) ? to : { path: to };
        const pathMatched = config.path === $route.path;
        const nameMatched = isDef(config.name) && config.name === $route.name;
        return pathMatched || nameMatched;
      }
    },
  },
  data() {
    return { active: false };
  },
  methods: {
    onClick(event) {
      this.parent.onChange(this.name || this.index);
      this.$emit("click", event);
      route(this.$router, this);
    },
    genIcon(color) {
      let {
        showDadgeorDot,
        badgeType,
        icon,
        badge,
        dot,
        left,
        bottom,
        offsetX,
        offsetY,
        overlayMiddle,
        overlayMax,
        overlaySmall,
        iconRounded,
        iconSize,
        iconColor,
      } = this;
      if (this.dot) badgeType = "dot";
      if (this.badge) badgeType = "badge";
      if (!this.dot && !this.badge) {
        showDadgeorDot = false;
      }
      const badgeProps = {
        showBadge: showDadgeorDot,
        badgeType,
        icon,
        badge,
        dot,
        left,
        bottom,
        offsetX,
        offsetY,
        overlayMiddle,
        overlayMax,
        overlaySmall,
        color,
        iconRounded,
        iconSize,
        iconColor,
        contentType: "icon",
      };

      return (
        <div class={[bem("icon")]}>
          <MBadge props={badgeProps}></MBadge>
        </div>
      );
    },
  },
  render() {
    const active =
      this.parent && this.parent.route ? this.routeActive : this.active;
    const color =
      this.parent && this.parent[active ? "activeColor" : "inactiveColor"];

    return (
      <div class={[bem({ active })]} onClick={this.onClick}>
        {this.genIcon(color)}
        <div class={bem("text")}>
          {this.text || this.slots("default", { active })}
        </div>
      </div>
    );
  },
};
