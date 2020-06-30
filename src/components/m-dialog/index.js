import "./index.styl";

export default {
  name: "MDialog",
  props: {
    title: [String],
    content: [String],
    showConfirmBtn: {
      type: Boolean,
      default: true,
    },
    showCancleBtn: {
      type: Boolean,
      default: true,
    },
    showMask: {
      type: Boolean,
      default: true,
    },
  },
};
