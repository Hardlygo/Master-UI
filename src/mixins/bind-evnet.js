/**
 * Bind event when mounted or activated
 */
import { off, on } from "../utils/dom/event";

/**
 * 
 * type BindEventMixinThis = {
  binded: boolean;
};

type BindEventHandler = (bind: Function, isBind: boolean) => void;

 */

export function BindEventMixin(handler) {
  //vm=BindEventMixinThis
  function bind(vm) {
    if (!vm.binded) {
      //转为vm.handler(on,true)
      handler.call(vm, on, true);
      vm.binded = true;
    }
  }

  function unbind(vm) {
    if (vm.binded) {
      handler.call(vm, off, false);
      vm.binded = false;
    }
  }
  return {
    mounted() {
      bind(this);
    },
    activated() {
      bind(this);
    },
    deactivated() {
      unbind(this);
    },
    beforeDestroy() {
      unbind(this);
    },
  };
}
