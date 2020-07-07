import Vue from "vue";

import { isServer } from "../../utils";
import MDialog from "./Dialog";

let instance;

function isInDocument(element) {
  document.body.contains(element);
}

function initInstance() {
  if (instance) {
    instance.$destroy();
  }
  const Dialog = Vue.extend(MDialog);
  instance = new Dialog({
    el: document.createElement("div"),
    // avoid missing animation when first rendered
    propsData: {
      lazyRender: false,
    },
  });

  instance.$on("input", (value) => {
    instance.value = value;
  });
}

function Dialog(options) {
  if (isServer) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    if (!instance || !isInDocument(instance.$el)) {
      initInstance();
    }
    //callback指定resolve或reject的时机
    Object.assign(instance, Dialog.currentOptions, options, {
      resolve,
      reject,
    });
  });
}
//Dialog的静态变量
Dialog.defaultOptions = {
  value: true,
  title: "",
  width: "",
  content: "",
  mask: true,
  className: "",
  allowHtml: true,
  lockScroll: true,
  transition: "m-dialog-bounce",
  beforeClose: null,
  maskClass: "",
  maskStyle: null,
  messageAlign: "",
  getContainer: "body",
  cancelBtnText: "",
  cancelBtnColor: null,
  confirmBtnText: "",
  confirmBtnColor: null,
  showConfirmBtn: true,
  showCancelBtn: false,
  closeOnPopstate: false,
  closeOnClickMask: false,
  //指定什么时候触发resolve和reject
  callback: (action) => {
    instance[action === "confirm" ? "resolve" : "reject"](action);
  },
};
//不出现取消按钮
Dialog.alert = (options) =>
  Dialog({
    showCancelBtn: false,
    confirmBtnText: "确定",
    ...options,
  });
Dialog.confirm = (options) =>
  Dialog({
    showCancelBtn: true,
    confirmBtnText: "确定",
    cancelBtnText:"取消",
    ...options,
  });

Dialog.close = () => {
  if (instance) {
    instance.value = false;
  }
};

Dialog.setOptions = (options) => {
  Object.assign(Dialog.currentOptions, options);
};

Dialog.resetDefaultOptions = () => {
  Dialog.currentOptions = { ...Dialog.defaultOptions };
};

Dialog.resetDefaultOptions();

Dialog.Component = MDialog;
Vue.prototype.$dialog = Dialog;

Dialog.install = (vue) => {
  vue.component(MDialog.name, MDialog);
};
export default Dialog;
