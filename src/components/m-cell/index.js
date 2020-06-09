/*
 * @Author: PENGZY
 * @since: 2020-06-01 09:38:49
 * @lastTime: 2020-06-01 16:40:16
 * @LastAuthor: Do not edit
 * @FilePath: \rx-guilind:\workspace\pzy\Master-UI\src\components\m-cell\index.js
 * @moto: Be Curious!
 * @message:
 */
import { functionalRoute } from "../../utils/router";
import "./index.styl";
import MIcon from "../m-icon";
export default {
  name: "MCell",
  data() {
    return {};
  },
  props: {
    label: {
      type: [String, Number],
    },
    description: {
      type: String,
    },
    content: {
      type: [String, Number],
    },
    isLink: Boolean,
    url: String,
    to: [Object, String],
    clickable: Boolean,
    border: Boolean,
    icon: String,
    arrowDirection: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["left", "up", "down", "right"].indexOf(value) !== -1;
      },
      default: "right",
    },
    iconClass: null,
    labelClass: null,
    descriptionClass: null,
    contentClass: null,
    arrowClass: null,
    iconStyle: null,
    labelStyle: null,
    descriptionStyle: null,
    contentStyle: null,
    arrowStyle: null,
  },
  computed: {
    clickActive() {
      return this.clickable || this.isLink;
    },
    rightIconName() {
      if (this.arrowDirection) {
        return `arrow-${this.arrowDirection}`;
      }
    },
  },
  methods: {
    onClick(e) {
      this.$emit("click", e);
      functionalRoute(this);
    },
    genLeftIcon() {
      const slots = this.$slots;
      if (slots["icon"]) {
        return (
          <div
            {...{ class: ["m-cell_lefticon", this.iconClass] }}
            style={this.iconStyle}
          >
            {slots["icon"]}
          </div>
        );
      }
      if (this.icon) {
        return (
          <m-icon
            name={this.icon}
            class={["m-cell_lefticon", this.iconClass]}
            style={this.iconStyle}
          ></m-icon>
        );
      }
    },
    genDescription() {
      const slots = this.$slots;
      const showDescription = this.description || slots["description"];

      if (showDescription) {
        return (
          <div
            class={["m-cell_label_description", this.descriptionClass]}
            style={this.descriptionStyle}
          >
            {slots["description"] ? slots["description"] : this.description}
          </div>
        );
      }
    },
    genLabel() {
      const slots = this.$slots;
      if (this.label || slots["label"]) {
        return (
          <div
            {...{ class: ["m-cell_label", this.labelClass] }}
            style={this.labelStyle}
          >
            {slots["label"] ? slots["label"] : this.label}
            {this.genDescription()}
          </div>
        );
      }
    },

    genContent() {
      const slots = this.$slots;
      const isAlone = !this.label && !slots["label"];
      if (this.content || slots["content"]) {
        return (
          <div
            {...{
              class: [
                "m-cell_content",
                isAlone ? "m-cell_content--alone" : "",
                this.contentClass,
              ],
            }}
            style={this.contentStyle}
          >
            {slots["content"] ? slots["content"] : this.content}
          </div>
        );
      }
    },
    genRightIcon() {
      if (this.isLink) {
        return (
          <m-icon
            name={this.rightIconName}
            class={["m-cell_righticon", this.arrowClass]}
            style={this.arrowStyle}
          ></m-icon>
        );
      }
    },
  },
  render(h) {
    const cellProps = {
      ref: "cell",
      class: ["m-cell", this.clickActive ? "m-cell--clickable" : ""],
      domProps: {},
      attrs: {
        role: this.clickActive ? "button" : "",
        tabindex: this.clickActive ? "0" : "",
        ...this.$attrs,
      },
      on: {
        ...this.$listeners,
        click: this.onClick,
      },
    };
    return (
      <div {...cellProps}>
        {this.genLeftIcon()}
        {this.genLabel()}
        {this.genContent()}
        {this.genRightIcon()}
      </div>
    );
  },
};
