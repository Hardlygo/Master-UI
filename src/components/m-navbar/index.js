//底部导航栏的项
import "./index.styl";

//mxins
import { ParentMixin } from "../../mixins/relation";
//提供取得slot的方法=》this.slots
import { SlotsMixin } from "../../mixins/slots";

//bem
import { createNameSpace } from "../../utils";
const { bem } = createNameSpace("navbar");

export default {
  name: "MNavbar",
  mixins: [ParentMixin("MNavbar"), SlotsMixin],
  props: {
    route: Boolean,
    zIndex: [Number, String],
    placeholder: {
      type: Boolean,
      default: true,
    },
    activeColor: String,
    inactiveColor: String,
    value: {
      type: [Number, String],
      default: 0,
    },
    border: {
      type: Boolean,
      default: true,
    },
    fixed: {
      type: Boolean,
      default: true,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      height: null,
    };
  },
  computed: {
    fit() {
      if (this.safeAreaInsetBottom !== null) {
        return this.safeAreaInsetBottom;
      }
      // enable safe-area-inset-bottom by default when fixed
      return this.fixed;
    },
  },

  watch: {
    value: "setActiveItem",
    children: "setActiveItem",
  },

  mounted() {
    if (this.placeholder && this.fixed) {
      this.height = this.$refs.tabbar.getBoundingClientRect().height;
    }
  },

  methods: {
    setActiveItem() {
      this.children.forEach((item, index) => {
        item.active = (item.value || index) === this.value;
      });
    },

    onChange(active) {
      if (active !== this.value) {
        this.$emit("input", active);
        this.$emit("change", active);
      }
    },

    genTabbar() {
      return (
        <div
          ref="tabbar"
          style={{ zIndex: this.zIndex }}
          class={[
            { ["m-hairline-top-bottom"]: this.border },
            bem({
              unfit: !this.fit,
              fixed: this.fixed,
            }),
          ]}
        >
          {this.slots()}
        </div>
      );
    },
  },

  render() {
    if (this.placeholder && this.fixed) {
      return (
        <div class={bem("placeholder")} style={{ height: `${this.height}px` }}>
          {this.genTabbar()}
        </div>
      );
    }

    return this.genTabbar();
  },
};
