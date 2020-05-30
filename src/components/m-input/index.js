/*
 * @Author: PENGZY
 * @since: 2020-05-15 11:52:41
 * @lastTime: 2020-05-29 10:53:29
 * @LastAuthor: Do not edit
 * @FilePath: \rx-guilind:\workspace\JS\prescription-ann-v2\src\components\m-input\index.js
 * @moto: Be Curious!
 * @message: 
 */

import "./index.styl"
export default {
    name: 'm-input',
    data() {
        return {
            focused: false
        }
    },
    props: {
        readonly: Boolean,
        clearable: Boolean,
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'text',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['text', 'password', 'textarea', 'tel', 'digit', 'number'].indexOf(value) !== -1
            }
        },
        label: {
            type: String
        },
        value: {
            type: [String, Number]
        },
        placeholder: {
            type: String
        }
    },
    computed: {
        showClear() {
            return (
                this.clearable &&
                this.focused &&
                this.value !== '' &&
                !this.readonly
            );
        },

    },
    methods: {
        onChange(e) {
            this.$emit("change", e);
        },
        onFocus(e) {
            this.focused = true;
            this.$emit("focus", e);
        },
        onBlur(e) {
            this.focused = false;
            this.$emit("blur", e);
        },
        onInput(e) {
            // not update v-model when composing
            if (e.target.composing) {
                return;
            }
            this.$emit('input', this.format(e.target));
        },
        onClickRightIcon(event) {
            this.$emit('click-right-icon', event);
        },
        onClear(e) {
            console.log(2222)
            e.preventDefault()
            this.$emit('input', '');
            this.$emit('clear', e);
        },
        onClickRightBtn(e) {
            this.$emit('clickRightBtn', e);
        },
        genRightIcon() {
            const slots = this.$slots;
            const showRightIcon = slots['right-icon'];
            if (showRightIcon) {
                return (
                    <div class={'input-item-right-icon'} onClick={this.onClickRightIcon}>
                        {slots['right-icon']}
                    </div>
                );
            }
        },
        genRightBtn() {
            const slots = this.$slots;
            const showRightBtn = slots['button'];
            if (showRightBtn) {
                return (
                    <div class={'input-item-right-btn'} onClick={this.onClickRightBtn}>
                        {slots['button']}
                    </div>
                );
            }
        },
        genLabel() {
            if (this.label) {
                return <div {...{ class: ['input-item-label'] }}>
                    <span style={{
                    }}>{this.label}</span></div>
            }
        },
        format(target = this.$refs.input) {
            if (!target) {
                return;
            }

            let { value } = target;
            const { formatNumber } = this;
            // const { maxlength } = this;

            // native maxlength not work when type is number
            // if (isDef(maxlength) && value.length > maxlength) {
            //     value = value.slice(0, maxlength);
            //     target.value = value;
            // }

            if (this.type === 'number' || this.type === 'digit') {
                const originValue = value;
                const allowDot = this.type === 'number';

                value = formatNumber(value, allowDot);

                if (value !== originValue) {
                    target.value = value;
                }
            }

            if (this.formatter) {
                const originValue = value;

                value = this.formatter(value);

                if (value !== originValue) {
                    target.value = value;
                }
            }

            return value;
        },
        /**
         * 
         * @param {*} value 
         * @param {*} allowDot 
         * @description 对输入的数字做处理
         */
        formatNumber(value, allowDot) {
            const { trimExtraChar } = this
            if (allowDot) {
                value = trimExtraChar(value, '.', /\./g);
            } else {
                value = value.split('.')[0];
            }
            value = trimExtraChar(value, '-', /-/g);
            const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
            return value.replace(regExp, '');
        },
        trimExtraChar(value, char, regExp) {
            const index = value.indexOf(char);
            if (index === -1) {
                return value;
            }
            if (char === '-' && index !== 0) {
                return value.slice(0, index);
            }
            return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
        },
    },
    render() {
        const { type } = this;
        const inputProps = {
            ref: 'input',
            attrs: {
                ...this.$attrs,
                disabled: this.disabled,
                readonly: this.readonly,
                placeholder: this.placeholder,
            },
            on: {
                input: this.onInput,
                change: this.onChange,
                focus: this.onFocus,
                blur: this.onBlur,
            },
            domProps: {
                value: this.value,
            },
            // add model directive to skip IME composition
            directives: [
                {
                    name: 'model',
                    value: this.value,
                },
            ],
        }

        let inputType = type;
        let inputMode;

        // type="number" is weired in iOS, and can't prevent dot in Android
        // so use inputmode to set keyboard in mordern browers
        //带小数
        if (type === 'number') {
            inputType = 'text';
            inputMode = 'decimal';
        }
        //整数
        if (type === 'digit') {
            inputType = 'tel';
            inputMode = 'numeric';
        }

        return (<div {...{ class: ['input-item'] }}>
            {this.genLabel()}
            <div {...{ class: ['input-item-body'] }}>
                <input  {...{ class: ['input-item-field'] }} {...inputProps} type={inputType} inputmode={inputMode} ></input>
                {this.showClear && (<m-icon {...{ class: ['clear'] }} name="delete" onTouchstart={this.onClear} style={{ 'margin': '0 6px' }} />)}
            </div>
            {this.genRightIcon()}
            {this.genRightBtn()}
        </div>);
    },
}