import "./index.styl";
export default {
  name: "MButton",
  data() {
    return {};
  },
  props: {
    text: String,
    tag: {
      type: String,
      default: "button",
    },
  },
  computed: {},
  methods: {
    genContent(){

    },
    genButton() {
      const btnProps = {
        class: ["m-button", "m-button--default", "m-button--normal"],
      };
      const { tag, $slots } = this;
      return <tag {...btnProps}> {this.text}</tag>;
    },
  },
  render(h) {
    return this.genButton();
  },
};
