import "./index.styl";

import { createNameSpace } from "../../utils";
const { bem } = createNameSpace("radio");

import { ChecekboxRadioMixins } from "../../mixins/checkbox-radio";

export default {
  name: "MRadio",
  mixins: [ChecekboxRadioMixins({ parent: "MRadioGroup", bem, role: "radio" })],
  //有了v-modle不再需要checked属性
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
      this.currentValue = this.value;
    },
  },
};
