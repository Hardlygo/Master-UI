import Vue, { RenderContext, VNodeData } from "vue";
// 挂载组件方法
export function mount(component, data) {
  const instance = new Vue({
    el: document.createElement("div"),
    props: component.props,
    render(h) {
      return h(component, {
        props: this.$props,
        ...data,
      });
    },
  });
  document.body.appendChild(instance.$el);
  return instance;
}
