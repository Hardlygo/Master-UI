import { isServer } from "..";

const isBrowser = !isServer;
export let supportsPassive = false;
//解释见https://segmentfault.com/a/1190000022744664（用来检测当前浏览器是否支持passive）
if (isBrowser) {
  try {
    const opts = {};
    Object.defineProperty(opts, "passive", {
      get() {
        supportsPassive = true;
      },
    });
    window.addEventListener("test-passive", null, opts);
  } catch (error) {}
}

export function on(target, event, handler, passive = false) {
  if (isBrowser) {
    target.addEventListener(
      event,
      handler,
      supportsPassive ? { capture: false, passive } : false
    );
  }
}

export function off(target, event, handler) {
  if (isBrowser) {
    target.removeEventListener(event, handler);
  }
}

export function stopPropagation(event) {
  //该方法将停止事件的传播
  event.stopPropagation();
}

export function preventDefault(event, isStopPropagation) {
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}
