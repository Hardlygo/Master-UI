import "./index.styl";
import MIcon from "../m-icon";
import MLoading from "../m-loading";
import { functionalRoute } from "../../utils/router";
import { createNameSpace } from "../../utils/create";
const { bem } = createNameSpace("button");
const LOADINGTYPES = ["circle", "spinner", "line-spinner"];
export default {
  name: "MButton",
  data() {
    return {};
  },
  props: {
    text: String,
    loading: Boolean,
    disabled: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    hairline: Boolean,
    color: String,
    noBorder: Boolean, //是否不显示边框
    icon: String,
    //是否为朴素按钮
    plain: Boolean,
    //按钮的几个类型
    type: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return (
          ["primary", "info", "warning", "danger", "default"].indexOf(value) !==
          -1
        );
      },
      default: "default",
    },
    //按钮的几个规格
    size: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["large", "small", "mini", "normal"].indexOf(value) !== -1;
      },
      default: "normal",
    },
    loadingText: String,
    loadingType: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return LOADINGTYPES.indexOf(value) !== -1;
      },
      default: "circle",
    },
    loadingSize: {
      type: String,
      default: "20px",
    },

    tag: {
      type: String,
      default: "button",
    },
  },
  computed: {},
  methods: {
    onClick(e) {
      const { loading, disabled } = this;
      if (!loading && !disabled) {
        this.$emit("click", e);
        functionalRoute(this);
      }
    },
    onTochStart(e) {
      const { loading, disabled } = this;
      if (!loading && !disabled) {
        this.$emit("tochStart", e);
      }
    },
    /**
     * @description
     * 生成button内容
     * 主要有
     * 1.loading类型button还是icon类型button
     * 2.按钮的内容赋值方式
     * @returns
     */
    genContent() {
      let content = [];
      const {
        $slots,
        loading,
        color,
        icon,
        text,
        loadingText,
        loadingSize,
        loadingType,
      } = this;
      if (loading) {
        // color直接读取父级div字体颜色  currentColor
        let loadingColor = "currentColor";
        if (loadingType === "line-spinner") {
          //对这个类型的color的做特殊判断
          if (color && (color.indexOf("gradient") !== -1 || !this.plain))
            loadingColor = "rgba(255,255,255,0.2)"; 
          if (!color && !this.plain) loadingColor = "#c8c9cc";//没有传color就是用loading默认的color
        }
        content.push(
          <MLoading
            class={bem("loading")}
            type={loadingType}
            size={loadingSize}
            color={loadingColor}
          />
        );
      } else if (icon) {
        content.push(<m-icon name={this.icon} class={[bem("icon")]}></m-icon>);
      }
      let btnText;
      //是loading的文字还是默认slot的还是props内的属性值
      if (loading) {
        btnText = loadingText;
      } else {
        btnText = $slots.default ? $slots.default : text;
      }
      if (btnText) {
        content.push(<span class={["m-button_text"]}>{btnText}</span>);
      }

      return content;
    },
    /**
     * @description
     * 根据props生成含有modify的class
     */
    genClasses() {
      const {
        type,
        size,
        plain,
        loading,
        disabled,
        block,
        round,
        square,
        hairline,
      } = this;
      return [
        hairline ? "m-hairline--surround" : "",
        bem([
          type,
          size,
          { plain, loading, disabled, block, round, square, hairline },
        ]),
      ];
    },
    genStyle() {
      let mStyle = {};
      let { plain, color, noBorder } = this;
      if (color) {
        //传color了分plain和plain&&noBorder同时存在情况
        mStyle.color = plain ? color : "white"; //不支持将文字设置为渐变色
        if (plain) {
          mStyle.borderColor = color;
        } else {
          mStyle.background = color;
        }

        //只有两者都满足才会使得border为0
        if (plain && noBorder) {
          mStyle.borderWidth = 0;
        }
        // hide border when color is linear-gradient
        if (color.indexOf("gradient") !== -1) {
          mStyle.border = 0;
        } else {
          mStyle.borderColor = color;
        }
      } else {
        if (plain && noBorder) {
          mStyle.borderWidth = 0;
        }
      }

      return mStyle;
    },
    genButton() {
      const {
        tag,
        $slots,
        $attrs,
        $listeners,
        nativeType,
        disabled,
        onClick,
        onTochStart,
        genClasses,
        genStyle,
        genContent,
      } = this;
      const btnProps = {
        class: [genClasses()],
        style: { ...genStyle() },
        attrs: {
          ...$attrs,
          type: nativeType,
          disabled,
        },
        on: {
          click: onClick,
          tochStart: onTochStart,
          ...$listeners,
        },
      };
      return (
        <tag {...btnProps}>
          <div class={bem("content")}>{genContent()}</div>
        </tag>
      );
    },
  },
  render(h) {
    return this.genButton();
  },
};
