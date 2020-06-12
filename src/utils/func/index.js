/**
 * 工具函数
 */

export function isNum(val) {
  const param = `${val}`;
  return /^\d+(\.\d+)?$/.test(param);
}
