import "./index.styl";
import MIcon from "../m-icon";
import MLoading from "../m-loading";
export default {
  name: "MImage",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: String,
    fit: String,
    height: {
      type: [String, Number],
    },
    width: {
      type: [String, Number],
    },
    rounded:Boolean,//是否显示图片为圆形
    radius:[String,Number],//图片圆角大小
    lazyLoad: Boolean,
    showLoading: {
      type: Boolean,
      default: true,
    },
    loadingIcon: {
      type: String,
      default: "img-library",
    },
    showError: {
      type: Boolean,
      default: true,
    },
    errorIcon: {
      type: String,
      default: "img-broken",
    },
  },
  methods:{
      genImg(){
          
      }
  }
};
