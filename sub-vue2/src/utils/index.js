/**
 * 深层数据的集合进行有机合并
 * @param objs 需要合并的 对象集合 （后面的覆盖前面的参数）
 * @returns {{}}
 */
 export const mergtOptions = (...objs) => {
  const res = {}
  const combine = (opt) => {
    for (const prop in opt) {
      // eslint-disable-next-line
      if (opt.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(opt[prop]) === '[object Object]') {
          res[prop] = mergtOptions(res[prop], opt[prop])
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

/*
  前置补0
  @params Str {String} 传入文字
  @num Number {Number} 保留位数
*/
export function addZero(str, num = 2) {
  return (new Array(num + 1).join('0') + str).slice(-num)
}

// 日期格式化
export function parseDate(date, fmt = 'YYYY-MM-DD h:m:s') {
  date = date instanceof Date ? date : new Date(date)
  const obj = {
    Y: date.getFullYear(),
    M: addZero(date.getMonth() + 1),
    D: addZero(date.getDate()),
    h: addZero(date.getHours()),
    m: addZero(date.getMinutes()),
    s: addZero(date.getSeconds()),
  }
  for (const i in obj) {
    fmt = fmt.replace(new RegExp(`${i}+`, 'g'), obj[i])
  }
  return fmt
}