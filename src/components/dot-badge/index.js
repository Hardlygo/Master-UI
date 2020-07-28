//不带m开头的组件不向外暴露供使用
import "./index.styl";

//bem
import { createNameSpace } from "../../utils";
const { bem } = createNameSpace("dot-badge");

//utils
import { isDef } from "../../utils";

//提供取得slot的方法=》this.slots mixins
import { SlotsMixin } from "../../mixins/slots";

export default {
  name: "DotBadge",
  mixins: [SlotsMixin],
  props: {
    dot: Boolean,
    badge: [String, Number],
    color: String,
  },
  computed: {
    stlye() {
      let style = null;
      if (isDef(this.color)) {
        style.backgroundColor = this.color;
      }
    },
  },
  render() {
    const showBadge = isDef(this.badge) && this.badge !== "";
    if (!isDef(this.dot) && !showBadge) {
      return;
    }
    return <div class={[bem({ dot })]}>{this.dot ? "" : this.badge}</div>;
  },
};
