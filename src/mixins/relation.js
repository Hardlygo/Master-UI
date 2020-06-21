/**
 * 为 row与col增加父子关系的mixins，加入到组件实例中
 */

import Vue from "vue";
import { sortChildren } from "../utils/vnodes";
/**
 * @description
 * 在子组件中混入
 * 关联其与父组件的关系
 * @export
 * @param {string} [parent]
 * @param {*} [options={}]
 */
export function ChildernMixin(parent, options = {}) {
  const indexKey = options.indexKey || "index"; //用于求当前子组件是父元素的第几个子组件
  return Vue.extend({
    inject: {
      [parent]: {
        default: null,
      },
    },
    computed: {
      parent() {
        if (this.disableBindRelation) {
          //该子组件指明不与父组件绑定父子关系
          return null;
        }
        return this[parent];
      },
      [indexKey]() {
        //求当前组件的位置
        this.bindRelation();
        if (this.parent) {
          return this.parent.children.indexOf(this);
        }
        return null;
      },
    },
    mounted() {
      //渲染成功做一次绑定
      this.bindRelation();
    },
    beforeDestroy() {
      //销毁时候要把当前父子关系消除
      if (this.parent) {
        this.parent.children = this.parent.children.filter((item) => {
          return item != this;
        });
      }
    },
    methods: {
      //用来绑定父子关系的方法
      bindRelation() {
        if (!this.parent || this.parent.children.indexOf(this) !== -1) {
          //没有父组件或者已经绑定了关系的不再进行任何动作
          return;
        }
        const children = [...this.parent.children, this];
        //对其按照vnode顺序排序
        sortChildren(children,this.parent);
        this.parent.children = children;
      },
    },
  });
}

/**
 * @description 父组件mixins[放到row中]
 * @export
 * @param {string} parent
 */
export function ParentMixin(parent) {
  //返回一个vue组件包含属性的对象，用于混入到源对象
  return {
    provide() {
      return {
        [parent]: this, //向子孙组件提供父组件实例
      };
    },
    data() {
      return {
        children: [],
      };
    },
  };
}
