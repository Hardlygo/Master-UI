/*
 * @Author: your name
 * @Date: 2020-05-31 13:23:40
 * @LastEditTime: 2020-06-21 21:04:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog_vuee:\JSWorkSpace\master-ui\src\components\m-cell-group\index.js
 */
import "./index.styl";
export default {
  name: "MCellGorup",
  props: {
    title: String,
    border: Boolean,
  },
  render(h) {
    const slots = this.$slots;
    const groupProps = {
      class: ["m-cell-group", this.border ? "m-cell-group--border" : ""], //使用bem命名
      attrs: {
        ...this.$attrs,
      },
      on: {
        ...this.$listeners,
      },
    };
    let groupTitle = null;
    if (this.title || slots.title) {
      groupTitle = (
        <div {...{ class: ["m-cell-group_title"] }}>
          {slots.title ? slots.title : this.title}
        </div>
      );
    }

    return (
      <div {...groupProps}>
        {groupTitle}
        <div {...{ class: ["m-cell-group_body"] }}>{slots.default || null}</div>
      </div>
    );
  },
};
