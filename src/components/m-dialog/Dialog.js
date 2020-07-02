import "./index.styl";

import Button from "../m-button";
import { PopupMixin } from "../../mixins/popup";
import { createNameSpace } from "../../utils";
import { multiple } from "webpack-merge";
const { bem } = createNameSpace("dialog");
function isNum(val) {
  const param = `${val}`;
  return /^\d+(\.\d+)?$/.test(param);
}
export default {
  name: "MDialog",
  mixins: [PopupMixin()],
  props: {
    className: null,
    title: [String],
    width: [Number, String],
    content: [String],
    contentAlign: {
      type: String,
    },
    showConfirmBtn: {
      type: Boolean,
      default: true,
    },
    showCancleBtn: {
      type: Boolean,
      default: true,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    cancleBtnText: {
      type: String,
      default: "取消",
    },
    confirmBtnText: {
      type: String,
      default: "确定",
    },
    cancleBtnColor: {
      type: String,
      default: "",
    },
    confirmBtnColor: {
      type: String,
      default: "",
    },
    closeOnClickMask: {
      type: Boolean,
      default: true,
    },
    cancleBtnClass: null,
    confirmBtnclass: null,
    transition: {
      type: String,
      default: "m-dialog-bounce",
    },
    //关闭前需要触发的方法
    beforeClose: Function,
    //关闭后触发的回调
    callBack: Function,
    allowHtml: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: {
        confirm: false,
        cancel: false,
      },
    };
  },
  computed: {
    computedWidth() {
      return isNum(this.width) ? `${this.width}px` : this.width;
    },
  },
  methods: {
    onClickMask() {
      this.handleAction("mask");
    },
    handleAction(action) {
      // show not trigger close event when hidden
      if (!this.value) {
        return;
      }
      this.$emit(action);
      if (this.beforeClose) {
        this.loading[action] = true;
        this.beforeClose(action, (state) => {
          console.log("state: ", state);
          //state传true才会执行onclose
          if (state !== false && this.loading[action]) {
            this.onClose(action);
          }

          this.loading.confirm = false;
          this.loading.cancel = false;
        });
      } else {
        this.onClose(action);
      }
    },
    onClose(action) {
      this.close();
      if (this.callBack) {
        this.callBack(action);
      }
    },
    onOpened() {
      this.$emit("opened");
    },
    onClosed() {
      this.$emit("closed");
    },
    genFooterBtns() {
      const showTwoBtns = this.showCancleBtn && this.showConfirmBtn;
      return (
        <div class={[bem("footer", { buttons: multiple })]}>
          {this.showCancleBtn && (
            <Button
              size="large"
              class={[
                bem("cancel"),
                this.cancleBtnClass ? this.cancleBtnClass : "",
              ]}
              loading={this.loading.cancel}
              text={this.cancleBtnText}
              style={{ color: this.cancleBtnColor }}
              onClick={() => {
                this.handleAction("cancle");
              }}
            ></Button>
          )}
          {this.showConfirmBtn && (
            <Button
              size="large"
              class={[
                bem("confirm"),
                this.confirmBtnclass ? this.confirmBtnclass : "",
              ]}
              loading={this.loading.confirm}
              text={this.confirmBtnText}
              style={{ color: this.confirmBtnColor }}
              onClick={() => {
                this.handleAction("confirm");
              }}
            ></Button>
          )}
        </div>
      );
    },
    genContent(hasTitle, contentSlot) {
      if (contentSlot) {
        return <div class={[bem("content")]}>{contentSlot}</div>;
      }
      const { content, contentAlign } = this;
      if (content) {
        const contentProps = {
          class: [
            bem("content", {
              "has-title": hasTitle,
              [contentAlign]: contentAlign,
            }),
          ],
          domProps: {
            [this.allowHtml ? "innerHTML" : "textContent"]: content,
          },
        };
        return <div {...contentProps}></div>;
      }
    },
  },
  render() {
    if (!this.shouldRender) {
      return;
    }
    const { content } = this;
    const contentSlot = this.$slots.default;
    const title = this.$slots.titleSlot || this.title;
    const Title = title && (
      <div class={bem("header", { isolated: !content && !contentSlot })}>
        {title}
      </div>
    );

    return (
      <transition
        name={this.transition}
        onAfterEnter={this.onOpened}
        onAfterLeave={this.onClosed}
      >
        <div
          vShow={this.value}
          role="dialog"
          aria-labelledby={this.title || content}
          class={[bem(), this.className]}
          style={{ width: this.computedWidth }}
        >
          {Title}
          {this.genContent(title, contentSlot)}
          {this.genFooterBtns()}
        </div>
      </transition>
    );
  },
};
