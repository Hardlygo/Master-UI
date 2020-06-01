/*
 * @Author: PENGZY
 * @since: 2020-06-01 09:38:49
 * @lastTime: 2020-06-01 15:34:57
 * @LastAuthor: Do not edit
 * @FilePath: \rx-guilind:\workspace\pzy\Master-UI\src\components\m-cell\index.js
 * @moto: Be Curious!
 * @message: 
 */
export default {
    name: 'MCell',
    data() {
        return {

        }
    },
    props: {
        label: {
            type: [String, Number]
        },
        content: {
            type: [String, Number]
        },
        isLink: Boolean,
        border: Boolean,
        icon: String

    },
    computed: {
        
    },
    methods: {
        genLeftIcon() {
            
        },
        genLabel() {
            const slots = this.$slots;
            if (this.label || slots['label']) {
                return (
                    <div {...{ class: ["m-cell_label"] }}>
                        {slots['label'] ? slots['label'] : this.label}
                    </div>
                );
            }
        },
        genContent() {
            const slots = this.$slots;
            if (this.content || slots['content']) {
                return (
                    <div {...{ class: ["m-cell_content"] }}>
                        {slots['content'] ? slots['content'] : this.content}
                    </div>
                );
            }
        },
        genRightIcon() {
            
        }
    },
    render(h) {
        return (
            <div {...{ class: ['m-cell'] }}>
                {this.genLeftIcon()}
                {this.genLabel()}
                {this.genContent()}
                {this.genRightIcon()}
            </div>
        )
    },
}
