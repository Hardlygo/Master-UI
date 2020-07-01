//滚动条
function isWindow(val) {
  return val === window;
}
// get nearest scroll element
// http://w3help.org/zh-cn/causes/SD9013
// http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
const overflowScrollReg = /scroll|auto/i;
/**
 * @description
 * 从里向外返回scroll 的元素，最外层是window，到html到body再到el
 * @export
 * @param {*} el
 * @param {*} [root=window]
 * @returns
 */
export function getScroller(el, root = window) {
  let node = el;
  //节点存在并且节点不是html并且是元素节点并且不是window，循环
  while (
    node &&
    node.tagName !== "HTML" &&
    node.nodeType === 1 &&
    node !== root
  ) {
    //取得只读属性overflowY
    const { overflowY } = window.getComputedStyle(el);
    if (overflowScrollReg.test(overflowY)) {
      //当前元素不是body并且是scroll就返回
      if (node.tagName !== "BODY") {
        return node;
      }

      // see: https://github.com/youzan/vant/issues/3823
      const { overflowY: htmlOverflowY } = window.getComputedStyle(
        node.parentNode
      );
      //循环到body，检测html有没有scroll，有就返回body
      if (overflowScrollReg.test(htmlOverflowY)) {
        return node;
      }
    }
    node = node.parentNode;
  }
  return root;
}

export function getScrollTop(el) {
  return "scrollTop" in el ? el.scrollTop : el.pageYOffset;
}

export function setScrollTop(el, val) {
  //如果el能读出scrollTop则直接设置，要不重新设置
  if ("scrollTop" in el) {
    el.scrollTop = val;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}

export function getRootScrollTop() {
  //document.documentElement.scrollTop等于html元素的scrollTop
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export function setRootScrollTop(val) {
  setScrollTop(window, val);
  setScrollTop(document.body, val);
}

// get distance from element top to page top or scroller top
export function getElementTop(el, scroller) {
  if (isWindow(el)) {
    return 0;
  }
  //若scroller存在则求scroller的偏离否则求root的
  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return el.getBoundingClientRect().top + scrollTop;
}

export function getVisibleHeight(el) {
  if (isWindow(el)) {
    return el.innerHeight;
  }
  return el.getBoundingClientRect().height;
}
export function getVisibleTop(el) {
  if (isWindow(el)) {
    return 0;
  }
  return el.getBoundingClientRect().top;
}
