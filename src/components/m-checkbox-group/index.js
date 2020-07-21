import "./index.styl";

import { ParentMixin } from "../../mixins/relation";
//提供取得slot的方法=》this.slots
import { SlotsMixin } from "../../mixins/slots";

import { createNameSpace } from "../../utils";
const { bem } = createNameSpace("checkbox-group");
export default {
  name: "MCheckboxGroup",
  mixins: [ParentMixin("MCheckboxGroup"), SlotsMixin],
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    max: [String, Number],
    checkedColor: String,
    disabled: Boolean,
    direction: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["row", "column"].indexOf(value) !== -1;
      },
      default: "column",
    },
    iconSize: [Number, String],
  },
  watch: {
    value(val) {
      this.$emit("change", val);
    },
  },
  methods: {
    /**
     * @description 外部触发全选，不传参数或者传true为全选，传false为取消全选
     * @param {boolean} [all=true]
     */
    checkedAll(all = true) {
      if (!all) {
        this.$emit("input", []);
      } else {
        const childrens = [...this.children];
        const values = childrens.map((item) => item.value);
        this.$emit("input", values);
      }
    },
  },
  render() {
    return <div class={bem([this.direction])}>{this.slots()}</div>;
  },
};
