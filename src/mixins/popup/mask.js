import Mask from "../../components/m-mask";

import { mount } from "../../utils/functional";

import { removeNode } from "../../utils/dom/node";

let stackItem = {
  vm: null,
  mask: null,
  config: null,
};

let context = {
  zIndex: 2000,
  lockCount: 0,
  stack: [],
  find(vm) {
    return this.stack.find((item) => item.vm === vm);
  },
};

const defaultMaskCfg = {
  className: "",
  customStly: {},
};

function mountMask(vm) {
  return mount(mask, {
    on: {
      click() {
        vm.$emit("click-mask");
        if (vm.closeOnClickMask) {
          if (vm.onClickMask) {
            vm.onClickMask();
          } else {
            vm.close();
          }
        }
      },
    },
  });
}

export function openMask(vm, config) {
  const item = context.find(vm);
  if (item) {
    item.config = config;
  } else {
    const mask = mountMask(vm);
    context.stack.push({ vm, config, mask });
  }
  updateMask(vm);
}

export function updateMask(vm){
    
}
