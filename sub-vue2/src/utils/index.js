/**
 * 深层数据的集合进行有机合并
 * @param objs 需要合并的 对象集合 （后面的覆盖前面的参数）
 * @returns {{}}
 */
 export const objDeepMerge = (...objs) => {
  const res = {}
  const combine = (opt) => {
    for (const prop in opt) {
      // eslint-disable-next-line
      if (opt.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(opt[prop]) === '[object Object]') {
          res[prop] = objDeepMerge(res[prop], opt[prop])
        } else {
          res[prop] = opt[prop]
        }
      }
    }
  }
  objs.map(opts => {
    combine(opts)
  })
  return res
}