function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr) {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomInt(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

/**
 * @desc 函数防抖
 * @param fn 函数
 * @param wait 延迟执行毫秒数
 */
export function debounce (fn, wait, ...arr) {
  let timer = null
  return () => {
    if (timer) {
      // 如果有一个函数在等待执行 清除定时器 下面重新计时
      clearTimeout(timer)
      timer = null // 清空timer 下次重启定时器
    }
    // 设定时器/重置定时器
    timer = setTimeout(() => {
      fn(...arr) // wait时间后 执行回调 期间再触发debounce 需要重新等待
    }, wait)
  }
}

/**
 * @desc 函数节流:连续触发事件但在n秒内只执行一次函数对于节流有时间戳和定时器两种版本
 * @param fn 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 时间戳版，2 定时器版
 * 时间戳版:在持续触发事件的过程中，函数会立即执行，用户在wait秒内不管执行多少次事件，都会等待wait秒后再执行
 * 定时器版:在触发事件的过程中，不会立即执行，并且每wait秒执行一次，在停止触发事件后还会再执行一次。
 * 时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。
 */
export function throttle (fn, wait, type) {
  if (type === 1) {
    var prev = 0
  } else {
    var timer = null
  }
  return function () {
    const context = this
    const args = arguments
    if (type === 2) {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null
          fn.apply(context, args)
        }, wait)
      }
    } else if (type === 1) {
      const now = Date.now()
      if (now - prev > wait) {
        fn.apply(context, args)
        prev = now
      }
    }
  }
}
