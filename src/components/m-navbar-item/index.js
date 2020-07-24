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
import { convertToUnit } from "../../utils";

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
    showDadgeorDot() {
      return !!this.badge || !!this.dot;
    },
    // badgeType() {
    //   return this.dot ? "dot" : "badge";
    // },
  },
  methods: {
    genIcon() {
      const {
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
        color,
        iconRounded,
        iconSize,
        iconColor,
      } = this;
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
    const active = false;
    return (
      <div class={[bem()]}>
        {this.genIcon()}
        <div class={bem("text")}>{this.slots("default", { active })}</div>
      </div>
    );
  },
};
