import { VNode } from "vue";
/**
 * @description
 *递归 拉平vue节点数组，把数组中每个节点及其子节点拉平放到数组中
 * @param {*} [vnodes=[]]
 */
function flattenVNodes(vnodes = []) {
  const result = [];

  //遍历层次数组
  function traverse(vnodes = []) {
    vnodes.forEach((vnode) => {
      //有点像前序遍历
      result.push(vnode);
      if (vnode.componentInstance) {
        traverse(vnode.componentInstance.$children.map((item) => item.$vnode));
      }
      if (vnode.children) {
        traverse(vnode.children);
      }
    });
  }

  traverse(vnodes);
  return result;
}
// sort children instances by vnodes order
//children是vue实例数组，parent是children的父vue实例
export function sortChildren(children = [], parent) {
  const { componentOptions } = parent.$vnode;
  if (!componentOptions || !componentOptions.children) {
    return;
  }

  const vnodes = flattenVNodes(componentOptions.children);
  children.sort((a, b) => vnodes.indexOf(a.$vnode) - vnodes.indexOf(b.$vnode));
}
