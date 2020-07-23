import Vue from "vue";
export { createNameSpace } from "./create";
export const isServer = Vue.prototype.$isServer;

export function isDef(val) {
  return val !== undefined && val !== null;
}

//啥都不做的函数 eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function isFunction(val) {
  return typeof val === "function";
}

export function isObject(val) {
  return val !== null && typeof val === "object";
}

export function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isNum(val) {
  const param = `${val}`;
  return /^\d+(\.\d+)?$/.test(param);
}

export function convertToUnit(str, unit = "px") {
  if (str == null || str === "") {
    return undefined;
  } else if (isNum(str)) {
    return `${Number(str)}${unit}`;
  } else {
    return String(str);
  }
}
