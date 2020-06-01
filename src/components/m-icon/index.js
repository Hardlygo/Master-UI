/*
 * @Author: PENGZY
 * @since: 2020-05-28 09:59:13
 * @lastTime: 2020-06-01 15:29:16
 * @LastAuthor: Do not edit
 * @FilePath: \rx-guilind:\workspace\pzy\Master-UI\src\components\m-icon\index.js
 * @moto: Be Curious!
 * @message: 
 */
import "./index.styl"
function isImage(name) {
    return name ? name.indexOf('/') !== -1 : false;
}
function isModule(o) {
    //判断是否是require进来的
    return Object.prototype.toString.call(o) === '[object Module]';
}
function isNum(val) {
    const param = `${val}`
    return /^\d+(\.\d+)?$/.test(param);
}
export default {
    name: 'MIcon',
    props: {
        name: {
            require: true,
            validator: function (value) {
                // 这个值必须匹配字符串或者require对象
               return typeof(value)=='string'||isModule(value)||isImage(val);
            }
        },
        className: {
            type: String,
            default: ""
        },
        size: {
            type: [String, Number],
            default: 14
        },
        color: {
            type: String,
            default: '#707070'
        }
    },
    computed: {
        listeners() {
            return {
                ...this.$listeners
            }
        },
        attrs() {
            return {
                ...this.$attrs
            }
        },
        iconName() {
            return `#icon-${this.name}`
        },
        svgClass() {
            return this.className ? ('m-icon ' + this.className) : ('m-icon');
        },
        computedSize() {
            return isNum(this.size) ? `${this.size}px` : this.size
        }
    },
    methods: {
        onClick(e) {
            this.$emit('click', e)
        }

    },
    render(h) {
        let iconProps = {
            class: [this.svgClass],
            style: {
                color: this.color,
                fontSize: this.computedSize,
            },
            attrs: {
                ...this.attrs,
            },
            on: {
                ...this.listeners,
                click: this.onClick
            }
        };
        //require引入的是[object Module]类型，先判断是require引入还是路径引入（require.default方式也算路径引入）
        const imageIcon = isModule(this.name) || isImage(this.name);
        if (imageIcon) {
            return (<div {...iconProps}><img class={'m-icon_image'} src={isModule(this.name)?this.name.default:this.name} /></div>)
        }
        iconProps.attrs['aria-idden'] = true
        const useProps = {
            attrs: {
                'xlink:href': this.iconName
            }
        };

        return (<svg {...iconProps}> <use {...useProps} /></svg>)

    }
}
