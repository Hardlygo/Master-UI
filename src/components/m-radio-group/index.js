import "./index.styl";

import { ParentMixin } from "../../mixins/relation";
//提供取得slot的方法=》this.slots
import { SlotsMixin } from "../../mixins/slots";

import { createNameSpace } from "../../utils";
const { bem } = createNameSpace("radio-group");
export default {
  name: "MRadioGroup",
  mixins: [ParentMixin("MRadioGroup"), SlotsMixin],
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: null,
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
  render() {
    return (
      <div class={bem([this.direction])} role="radiogroup">
        {this.slots()}
      </div>
    );
  },
};
