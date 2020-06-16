import "./index.styl";
import MIcon from "../m-icon";
import MLoading from "../m-loading";
import { isNum } from "../../utils/func";
import { createNameSpace } from "../../utils/create";
const { bem } = createNameSpace("image");
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
    rounded: Boolean, //是否显示图片为圆形
    radius: [String, Number], //图片圆角大小
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
  data() {
    return {
      loading: true,
      error: false,
    };
  },
  computed: {
    style() {
      let sty = {};
      if (this.width) {
        sty.width = isNum(this.width) ? `${this.width}px` : this.width;
      }
      if (this.height) {
        sty.height = isNum(this.height) ? `${this.height}px` : this.height;
      }
      if (this.radius) {
        style.overflow = "hidden";
        style.borderRadius = isNum(this.radius)
          ? `${this.radius}px`
          : this.radius;
      }
      return sty;
    },
  },
  watch: {
    src() {
      this.loading = true;
      this.error = false;
    },
  },
  created() {
    const { $Lazyload } = this;
    if ($Lazyload) {
      $Lazyload.$on("loaded", this.onLazyLoaded);
      $Lazyload.$on("error", this.onLazyLoadError);
    }
  },
  beforeDestroy() {
    const { $Lazyload } = this;
    if ($Lazyload) {
      $Lazyload.$off("loaded", this.onLazyLoaded);
      $Lazyload.$off("error", this.onLazyLoadError);
    }
  },
  methods: {
    onLoad(e) {
      this.loading = false;
      this.$emit("load", e);
    },
    onError(e) {
      this.loading = false;
      this.error = true;
      this.$emit("error", e);
    },
    //对懒加载加载中和加载出错做处理：开始
    onLazyLoaded({ el }) {
      if (el === this.$refs["image"] && this.loading) {
        this.onLoad();
      }
    },
    onLazyLoadError({ el }) {
      if (el === this.$refs["image"] && !this.error) {
        this.onError();
      }
    },
    //对懒加载加载中和加载出错做处理：结束
    onClick(e) {
      this.$emit("click", e);
    },
    /**
     * @description
     * 生成加载提示或者加载失败提示
     */
    genPlaceholder() {
      const { $slots, loadingIcon, errorIcon } = this;
      if (this.loading && this.showLoading) {
        return (
          <div class={bem("loading")}>
            {$slots["loading"] || (
              // <m-icon name={loadingIcon} class={bem("loading-icon")}></m-icon>
              <MLoading type="spinner"></MLoading>
            )}
          </div>
        );
      }
      if (this.error && this.showError) {
        return (
          <div class={bem("error")}>
            {$slots["error"] || (
              <m-icon name={errorIcon} class={bem("error-icon")}></m-icon>
            )}
          </div>
        );
      }
    },
    genImg() {
      const { error, fit, src, alt, lazyLoad, onError, onLoad } = this;
      const imgProps = {
        class: bem("image"),
        attrs: {
          alt: alt,
        },
        style: {
          /**contain	保持宽高缩放图片，使图片的长边能完全显示出来
              cover	保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边
              fill	拉伸图片，使图片填满元素
              none	保持图片原有尺寸
              scale-down	取none或contain中较小的一个*/
          objectFit: fit,
        },
        on: {
          error: onError,
          load: onLoad,
        },
      };
      if (error) {
        return;
      }
      if (lazyLoad) {
        return <img ref="image" vLazy={src} {...imgProps} />;
      }
      return <img src={src} {...imgProps}></img>;
    },
  },
  render() {
    return (
      <div
        class={bem({ round: this.rounded })}
        style={this.style}
        onClick={this.onClick}
      >
        {this.genImg()}
        {this.genPlaceholder()}
      </div>
    );
  },
};
