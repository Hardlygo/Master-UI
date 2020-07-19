import "./index.styl";

import { createNameSpace } from "../../utils";
const { bem } = createNameSpace("radio");

import { ChecekboxRadioMixins } from "../../mixins/checkbox-radio";

export default {
  name: "MRadio",
  mixins: [ChecekboxRadioMixins({ parent: "MRadioGroup", bem, role: "radio" })],
  //   props: {
  //     checked: {
  //       type: Boolean,
  //       default: false,
  //     },
  //   },
  modle: {
    props: "value",
    event: "change",
  },
  computed: {
    currentValue: {
      get() {
        return this.parent ? this.parent.value : this.value;
      },

      set(val) {
        (this.parent || this).$emit("input", val);
      },
    },

    checked() {
      return this.currentValue === this.value;
    },
  },
  methods: {
    toggle() {
      this.currentValue = this.value;
    },
  },
};
