import "./index.styl";

import { createNameSpace } from "../../utils";
const { bem } = createNameSpace("checkbox");

import { ChecekboxRadioMixins } from "../../mixins/checkbox-radio";
export default {
  name: "MCheckbox",
  mixins: [
    ChecekboxRadioMixins({ parent: "MCheckboxGroup", bem, role: "checkbox" }),
  ],
  //重新定义vmodel(注释的原因：想过用checked来接收vmodel值，但是一旦用checked值就不能内部修改checked，
  //只能内部触发vmodel的值变化，而且必须要有变量在外部接受变化才会改变,此时将不能随意更改选中或不选中[单向数据流])
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: {
      type: Boolean,
    },
    shape: {
      type: String,
      default: "square",
    },
  },
  data() {
    return {
      isChecked: this.checked,
    };
  },
  methods: {
    toggle() {
      if (!this.parent) {
          console.log(this.checked)
        this.isChecked = !this.checked;
        this.$emit("change", this.isChecked);
      }
    },
  },
};
