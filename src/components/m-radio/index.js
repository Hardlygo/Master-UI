import "./index.styl";

import { createNameSpace } from "../../utils";
const { bem } = createNameSpace("radio");

import { ChecekboxRadioMixins } from "../../mixins/checkbox-radio";

export default {
  name: "MRadio",
  mixins: [ChecekboxRadioMixins({ parent: "MRadioGroup", bem, role: "radio" })],
  //有了v-modle不再需要checked属性
  /**
   * v-model值流：
   * 外部调用组件v-model绑定的变量==》组件中model中对应的prop指定的props中属性值【相当于将v-modle变量的值赋值给props的这个属性】（默认value）
   *                          《== 组件中调用this.$emit(model中对应的event指定的触发的方法名,val)
   */
  model: {
    prop: "defaultVal",
    event: "change",
  },
  props: {
    //用来保存接受v-modle传过来的值
    defaultVal: {
      type: null,
    },
  },
  computed: {
    currentValue: {
      get() {
        return this.parent ? this.parent.value : this.defaultVal;
      },

      set(val) {
        (this.parent || this).$emit("change", val);
      },
    },

    checked() {
      //当没有父组件radioroup时候，拿的是defaultVal和value比较，当没有父组件radioroup时候，拿的是parent.value和value比较
      return this.currentValue === this.value;
    },
  },
  methods: {
    toggle() {
      //每次点击都触发，只是radio的value不是布尔值，不会改变
      this.currentValue = this.value;
    },
  },
};
