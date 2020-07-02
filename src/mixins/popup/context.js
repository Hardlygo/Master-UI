/**let stackItem = {
  vm: null,
  mask: null,
  config: null,
};*/
//context里面的stack保存了多个stackItem
export const context = {
  zIndex: 2000,
  lockCount: 0,//点击次数
  stack: [],
  find(vm) {
    return this.stack.find((item) => item.vm === vm);
  },
};
