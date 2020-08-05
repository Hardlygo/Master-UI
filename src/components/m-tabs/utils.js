import { getScrollTop, setScrollTop } from "../../utils/dom/scroll";

import { runRaf, cancelRaf } from "../../utils/dom/raf";

let scrollLeftRafId = 0;
//左右滑动时候，调到目的tab
export function scrollLeftTo(target, to, duration) {
  cancelRaf(scrollLeftRafId);
  let count = 0;
  const from = target.scrollLeft;
  //帧数
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16); //16ms一帧 (每秒60帧)
  console.log("start："+target.scrollLeft)
  function animate() {
    //向右向左滑动，公式是（tab宽度*tab数）-屏幕宽度=滑动最大值
    //一帧该滑动的距离（把要滑动的距离平均分给每一帧）
    target.scrollLeft += (to - from) / frames;
      //scrollLeft大于等于0，小于等于最大值
    console.log(
      `count:${count}`,
      `to:${to}`,
      `((to - from) / frames):${(to - from) / frames}`,
      `target.scrollLeft:${target.scrollLeft}`
    );

    if (++count < frames) {
      scrollLeftRafId = runRaf(animate);
    }
  }
  animate();
}

//上下滑动时候滑动到目的内容
export function scrollTopTo(target, to, duration, callback) {
  let current = getScrollTop(target);
  const isDown = current < to;

  //帧数
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16); //16ms一帧
  const step = (to - target) / frames;

  function animate() {
    current += step;
    //上下滑动要跳到准确目标位置上
    if ((isDown && current > to) || (!isDown && current < to)) {
      current = to;
    }

    setScrollTop(target, current);
    //倘若往下或往上都还没有到达目标位置，继续执行动画
    if ((isDown && current < to) || (!isDown && current > to)) {
      runRaf(animate);
    } else {
      runRaf(callback);
    }
  }
  animate();
}
