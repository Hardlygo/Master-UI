//用来设置路径变了之后dialog等关闭
import { on, off } from "../utils/dom/event";
import { BindEventMixin } from "./bind-evnet";

export const CloseOnPopstateMixin = {
  mixins: [
    BindEventMixin(function(bind, isBind) {
      this.handlePopstate(isBind && this.closeOnPopstate);
    }),
  ],
  props: {
    closeOnPopstate: [Boolean],
  },
  data() {
    return {
      bindStatus: false,
    };
  },
  watch: {
    closeOnPopstate(val) {
      this.handlePopstate(val);
    },
  },
  methods: {
    handlePopstate(bind) {
      if (this.$isServer) {
        return;
      }

      if (this.bindStatus !== bind) {
        this.bindStatus = bind;
        const action = bind ? on : off;
        /**
         * Note that just calling history.pushState() or history.replaceState() won't trigger a popstate event.
         *  The popstate event will be triggered by doing a browser action such as a click on the back or forward button (or calling history.back() or history.forward() in JavaScript).
         * 监听回退操作 https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
         */

        action(window, "popstate", () => {
          this.close();
          this.shouldReopen = false;
        });
      }
    },
  },
};
