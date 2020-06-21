import "./index.styl";
import { ParentMixin } from "../../mixins/relation";
import { createNameSpace } from "../../utils/create";
const { bem } = createNameSpace("row");
export default {
  name: "MRow",
  mixins: [ParentMixin("MRow")],
  props: {
    type: String,
    align: String,
    justify: String,
    tag: {
      type: String,
      default: "div",
    },
    gutter: {
      //每一列的间隔
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    //根据gutter来计算子组件的左右padding值
    space() {
      const gutter = Number(this.gutter); //数字化gutter
      if (!gutter) {
        return;
      }
      /**
       * 先把父组件的children按行分为二维数组
       * 在逐行循环，求得每个col的间隔、放到space内，space与children有相同元素个数
       */
      const space = [];
      const groups = [[]]; //二维数组，因为可以有多行，铺满了24列就进入下一行
      let totalSpan = 0;
      this.children.forEach((child, index) => {
        totalSpan += Number(child.cols); //cols为每一个col标签所占栅格布局列数
        if (totalSpan > 24) {
          groups.push([index]); //超过了一行，换行添加一行到底部
          totalSpan -= 24;
        } else {
          groups[groups.length - 1].push(index); //不用换行在末尾加上
        }
      });

      groups.forEach((group) => {
        //求每一个子元素的平均的padding值，一行三列就会有2个间隔，每一列占平均的gutter长度
        const averagePadding = (gutter * (group.length - 1)) / group.length; //这个的gutter为间隔长度
        group.forEach((col, index) => {
          if (index === 0) {
            //每行的开始
            space.push({ right: averagePadding });
          } else {
            const left = gutter - space[index - 1].right; //上一个col的右边padding和当前col的左边padding组成一个gutter间隔
            const right = averagePadding - left;
            space.push({ left, right });
          }
        });
      });
      return space;
    },
  },
  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
  },
  render() {
    const { tag, type, align, justify } = this;
    const flex = type === "flex";
    return (
      <tag
        class={bem({
          flex,
          [`align-${align}`]: flex && align,
          [`justify-${justify}`]: flex && justify,
        })}
        onClick={this.onClick}
      >
        {this.$slots.default}
      </tag>
    );
  },
};
