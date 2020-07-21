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
    prop: "value",
    event: "input",
  },
  props: {
    // checked: {
    //   type: Boolean,
    // },
    shape: {
      type: String,
      default: "square",
    },
  },
  computed: {
    checked: {
      get() {
        if (!this.parent) {
          //单组件情况，vmodel结果只会true or false
          return this.value;
        }
        return [...this.parent.value].includes(this.value);
      },
      set(val) {
        if (!this.parent) {
          //通过checked改变, 触发value改变
          this.$emit("input", val);
        } else {
          //true为add，false为minus
          this.setParentValue(val);
        }
      },
    },
  },
  watch: {
    value(val) {
      this.$emit("change", val);
    },
  },
  methods: {
    toggle(checked = !this.checked) {
      // When toggle method is called multiple times at the same time,
      // only the last call is valid.
      // This is a hack for usage inside Cell.
      clearTimeout(this.toggleTask);
      this.toggleTask = setTimeout(() => {
        this.checked = checked;
      });
    },
    setParentValue(val) {
      let values = [...this.parent.value];
      if (val) {
        if (this.parent.max && values.length >= this.parent.max) {
          //超过设置的最大可选中数
          return;
        }
        if (!values.includes(this.value)) {
          values.push(this.value);
          this.parent.$emit("input", values);
        }
      } else {
        if (values.includes(this.value)) {
          const index = values.indexOf(this.value);
          values.splice(index, 1);
          this.parent.$emit("input", values);
        }
      }
    },
  },
};
