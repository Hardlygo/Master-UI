/**
 * requestAnimationFrame polyfill
 * 支持 requestAnimationFrame则用它，否则回退setTimeout
 */

let lastTime = Date.now();
/**
 * @description
 * 设置回调函数，最迟16ms（一帧的执行时间）执行
 * @param {*} animationCallbackFn
 */
function fallback(animationCallbackFn) {
  let crrentTime = Date.now();
  const diff = Math.max(0, 16 - (crrentTime - lastTime));
  const id = setTimeout(animationCallbackFn, diff);
  //修改上次时间，为上上次执行时间加上回调执行的时间间隔
  lastTime = crrentTime + diff;
  return id;
}

const root = window;

const animationFn = root.requestAnimationFrame || fallback;

const cancelFn = root.cancelAnimationFrame || clearTimeout;

//单次动画，要实现无限循环，在animationCallbackFn再次声明runRaf(animationCallbackFn)即可
export function runRaf(animationCallbackFn) {
  return animationFn.call(root, animationCallbackFn);
}

// double raf for animation // use double raf to ensure animation can start
export function doubleRunRaf(animationCallbackFn) {
  runRaf(() => {
    runRaf(animationCallbackFn);
  });
}

//取消动画
export function cancelRaf(id) {
  cancelFn.call(root, id);
}
