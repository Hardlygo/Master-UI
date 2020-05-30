/*
 * @Author: PENGZY
 * @since: 2020-05-28 09:59:13
 * @lastTime: 2020-05-28 14:36:50
 * @LastAuthor: Do not edit
 * @FilePath: \rx-guilind:\workspace\JS\prescription-ann-v2\src\components\m-icon\index.js
 * @moto: Be Curious!
 * @message: 
 */
import "./index.styl"
export default {
    name: 'MIcon',
    props: {
        name: {
            type: String,
            require: true
        },
        className: {
            type: String,
            default: ""
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
            console.log(`#icon-${this.name}`)
            return `#icon-${this.name}`
        },
        svgClass() {
            return this.className ? ('svg-icon ' + this.className) : ('svg-icon');
        }
    },
    render(h) {
        const iconProps = {
            class: [this.svgClass],
            attrs: {
                ...this.attrs,
                'aria-idden': true
            },
            on: this.listeners
        };
        const useProps = {
            attrs: {
                'xlink:href': this.iconName
            }
        };

        return (<svg {...iconProps}> <use {...useProps} /></svg>)

    }
}
