import Vue from "vue";

/**
 * type PortalMixinOptions = {
  ref?: string;
  afterPortal?: () => void;
};
 */

function getElement(selector) {
  if (typeof selector === "string") {
    return document.querySelector(selector);
  }
  if (typeof selector === "function") {
    return selector();
  }

  return null;
}

export function PortalMixin(ref, afterPortal) {
  return Vue.extend({
    props: {
      getContainer: [String, Function],
    },
    watch: {
      getContainer: "portal",
    },
    mounted() {
      if (this.getContainer) {
        this.portal();
      }
    },
    methods: {
      portal() {
        const { getContainer } = this;
        const el = ref ? this.refs[ref] : this.$el;
        //取得父元素
        let container;
        if (getContainer) {
          container = getElement(getContainer);
        } else if (this.$parent) {
          container = this.$parent.$el;
        }
        if (container && container !== el.parentNode) {
          //container不是父元素的，container加上当前元素
          container.appendChild(el);
        }
        if (afterPortal) {
          afterPortal.call(this);
        }
      },
    },
  });
}
