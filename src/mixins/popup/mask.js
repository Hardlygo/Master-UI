import Mask from "../../components/m-mask";

import { mount } from "../../utils/functional";

import { removeNode } from "../../utils/dom/node";

import { context } from "./context";

const defaultMaskCfg = {
  className: "",
  customStly: {},
};

function mountMask(vm) {
  return mount(Mask, {
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

export function updateMask(vm) {
  const item = context.find(vm);
  if (item) {
    const el = vm.$el;
    const { config, mask } = item;
    if (el && el.parentNode) {
      //mask应当和对应的vm在同一层
      el.parentNode.insertBefore(mask.$el, el);
    }
    Object.assign(mask, defaultMaskCfg, config, { show: true });
  }
}

export function closeMask(vm) {
  const item = context.find(vm);
  if (item) {
    item.mask.show = false;
  }
}

export function removeMask() {
  const item = context.find(vm);
  if (item) {
    removeNode(item.mask.$el);
  }
}
