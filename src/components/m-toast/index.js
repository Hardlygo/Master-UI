import Vue from "vue";
import { isDef, isObject, isServer } from "../../utils";

import MToast from "./Toast";

const defaultOpts = {
  icon: "",
  type: "text",
  mask: false,
  value: true,
  text: "",
  className: "",
  timeout: 3000,
  transitionName: "m-fade",
  position: "middle",
  closeOnClickMask: false,
  lockScroll: true,
  onToastOpened: undefined,
  onToastClosed: undefined,
  getContainer: "body",
};

let queue = [];
let multiple = false;
// default options of specific type(某一类type的option)
let defaultOptionsMap = {};

let currentOpts = {
  ...defaultOpts,
};
//可以直接接受内容即可
function parseOptions(text) {
  if (isObject(text)) {
    return text;
  }

  return { text };
}

function createInstance() {
  if (isServer) {
    return {};
  }
  if (!queue.length || multiple) {
    const _Toast = Vue.extend(MToast);
    const instance = new _Toast({
      el: document.createElement("div"),
    });
    instance.$on("input", (value) => {
      instance.value = value;
    });
    queue.push(instance);
  }
  return queue[queue.length - 1];
}

export function Toast(options = {}) {
  const _toast = createInstance();
  // should add z-index if previous toast has not disappeared
  if (_toast.value) {
    _toast.updateZIndex();
  }

  //可以直接接受内容即可
  options = parseOptions(options);

  options = {
    ...currentOpts,
    ...defaultOptionsMap[options.type || currentOpts.type],
    ...options,
  };
  options.tearDownIntance = () => {
    _toast.$on("closed", () => {
      if (multiple && !isServer) {
        queue = queue.filter((item) => item !== _toast);

        removeNode(_toast.$el);
        _toast.$destroy();
      }
    });
  };

  Object.assign(_toast, options);

  return _toast;
}

const createMethod = (type) => (options) =>
  Toast({ type, ...parseOptions(options) });

["loading", "success", "fail"].forEach((method) => {
  Toast[method] = createMethod(method);
});

Toast.clear = (all) => {
  if (queue.length) {
    if (all) {
      queue.forEach((toast) => {
        toast.clear();
      });
      queue = [];
    } else if (!multiple) {
      queue[0].clear();
    } else {
      queue.shift().clear();
    }
  }
};

//两种传参方式，若既有type又有options，则设置defaultOptionsMap否则，合并currentOptions
Toast.setDefaultOptions = (type, options) => {
  if (typeof type === "string") {
    defaultOptionsMap[type] = options;
  } else {
    Object.assign(currentOptions, type);
  }
};

Toast.resetDefaultOptions = (type) => {
  if (typeof type === "string") {
    defaultOptionsMap[type] = null;
  } else {
    currentOptions = { ...defaultOptions };
    defaultOptionsMap = {};
  }
};

Toast.allowMultiple = (value = true) => {
  multiple = value;
};

Vue.prototype.$toast = Toast;

Toast.install = (vue) => {
  vue.component(MToast.name, MToast);
};

export default MToast;
