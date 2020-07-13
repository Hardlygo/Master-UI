//toast出现的时候禁止点击其他内容
let lockCount = 0;
export function lockClick(isLock) {
  if (isLock) {
    if (!lockCount) {
      document.body.classList.add("m-toast--unclickable");
    }
    lockCount++;
  } else {
    lockCount--;
    if (!lockCount) {
      document.body.classList.remove("m-toast--unclickable");
    }
  }
  
}
