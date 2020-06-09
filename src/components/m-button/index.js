import MIcon from "../m-icon";
import "./index.styl";
import { functionalRoute } from "../../utils/router";
import { createNameSpace } from "../../utils/create";
const { bem } = createNameSpace("button");
export default {
  name: "MButton",
  data() {
    return {};
  },
  props: {
    text: String,
    loading: Boolean,
    disabled: Boolean,
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
    color: String,
    icon: String,
    //是否为朴素按钮
    plain: Boolean,
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
      const { $slots, loading, icon, text, loadingText } = this;
      if (loading) {
      } else if (icon) {
        content.push(
          <m-icon name={this.icon} class={["m-button_icon"]}></m-icon>
        );
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
      } = this;
      return [
        bem([type, size, { plain, loading, disabled, block, round, square }]),
      ];
    },
    genButton() {
      const {
        tag,
        $slots,
        $attrs,
        $listeners,
        onClick,
        genClasses,
        genContent,
      } = this;
      const btnProps = {
        class: [genClasses()],
        attrs: {
          ...$attrs,
        },
        on: {
          click: onClick,
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
