/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
/**
 * @description
 * 名字后添加modify
 * @param {*} name
 * @param {*} mod
 * @returns
 */
function gen(name, mod) {
  if (!mod) {
    return "";
  }
  //modify是字符串
  if (typeof mod === "string") {
    return ` ${name}--${mod}`;
  }
  //modify是数组
  if (Array.isArray(mod)) {
    return mod.reduce((preSum, cur) => {
      return preSum + gen(name, cur);
    }, "");
  }

  //modify是对象
  return Object.keys(mod).reduce((preSum, cur) => {
    return preSum + (mod[cur] ? gen(name, cur) : "");
  }, "");
}

export function createBEM(name) {
  return function(el, mod) {
    //el只要不是string那就把它看做mod
    if (el && typeof el !== "string") {
      mod = el;
      el = "";
    }
    el = el ? `${name}_${el}` : name;
    return `${el}${gen(el, mod)}`;
  };
}
