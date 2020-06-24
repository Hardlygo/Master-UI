import Vue from "vue";

export const isServer = Vue.prototype.$isServer;

export function isDef(val) {
  return val !== undefined && val !== null;
}

export function isFunction(val) {
  return typeof val === "function";
}

export function isObject(val) {
  return val !== null && typeof val === "object";
}

export function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
