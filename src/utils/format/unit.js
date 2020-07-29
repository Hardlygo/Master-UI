//单位转化
import { isNum, isDef, isServer } from "..";

export function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }
  value = String(value);
  return isNum(value) ? `${value}px` : value;
}

let rootFontSize;

//获取根html的fontsize
function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize =
      doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }
  return rootFontSize;
}
//转换rem
function convertRem(value) {
  value = value.replace(/rem/g, "");
  return +value * getRootFontSize();
}
//转换宽度
function convertVw(value) {
  value = value.replace(/vw/g, "");
  return (+value * window.innerWidth) / 100;
}

export function unit2px(value) {
  if (typeof value == "number") {
    return value;
  }
  if (!isServer) {
    if (value.indexOf("rem") > -1) {
      return convertRem(value);
    }
    if (value.indexOf("vw") > -1) {
      return convertVw(value);
    }
  }
  //字符串类型的数字
  return parseFloat(value);
}
