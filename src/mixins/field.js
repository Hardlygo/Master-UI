//field校验的mixins

/**
 * @description 提供field校验的mixins
 * @export
 * 
 */
export function ValidateMixin() {
    //返回一个vue组件包含属性的对象，用于混入到源对象
    return {
     
      data() {
        return {
            //校验不通过
            validateFailed :false,
            //错误信息
            validateMessage :""
        };
      },
    };
  }