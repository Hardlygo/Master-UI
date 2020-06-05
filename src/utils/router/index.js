export function route(router, config) {
  const { to, url, replace } = config;
  debugger
  //判断使用哪种方法跳转
  if (to && router) {
    const promise = router[replace ? "replace" : "push"](to);

    /* istanbul ignore else */
    if (promise && promise.catch) {
      promise.catch((err) => {
        /* istanbul ignore if */
        if (err && err.name !== "NavigationDuplicated") {
          throw err;
        }
      });
    }
  } else if (url) {
    replace ? location.replace(url) : (location.href = url);
  }
}

export function functionalRoute(vue) {
  //   console.log(vue && vue.$router, vue.$props);
  route(vue && vue.$router, vue.$props);
  //   route(vue.parent && vue.parent.$router, vue.$props);
}
