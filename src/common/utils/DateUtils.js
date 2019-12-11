export default {
  patterns: {
    PATTERN_ERA: 'G', //Era 标志符 Era strings. For example: 'AD' and 'BC'
    PATTERN_YEAR: 'y', //年
    PATTERN_MONTH: 'M', //月份
    PATTERN_DAY_OF_MONTH: 'd', //月份的天数
    PATTERN_HOUR_OF_DAY1: 'k', //一天中的小时数（1-24）
    PATTERN_HOUR_OF_DAY0: 'H', //24小时制，一天中的小时数（0-23）
    PATTERN_MINUTE: 'm', //小时中的分钟数
    PATTERN_SECOND: 's', //秒
    PATTERN_MILLISECOND: 'S', //毫秒
    PATTERN_DAY_OF_WEEK: 'E', //一周中对应的星期，如星期一，周一
    PATTERN_DAY_OF_YEAR: 'D', //一年中的第几天
    PATTERN_DAY_OF_WEEK_IN_MONTH: 'F', //一月中的第几个星期(会把这个月总共过的天数除以7,不够准确，推荐用W)
    PATTERN_WEEK_OF_YEAR: 'w', //一年中的第几个星期
    PATTERN_WEEK_OF_MONTH: 'W', //一月中的第几星期(会根据实际情况来算)
    PATTERN_AM_PM: 'a', //上下午标识
    PATTERN_HOUR1: 'h', //12小时制 ，am/pm 中的小时数（1-12）
    PATTERN_HOUR0: 'K', //和h类型
    PATTERN_ZONE_NAME: 'z', //时区名
    PATTERN_ZONE_VALUE: 'Z', //时区值
    PATTERN_WEEK_YEAR: 'Y', //和y类型
    PATTERN_ISO_DAY_OF_WEEK: 'u',
    PATTERN_ISO_ZONE: 'X'
  },
  week: {
    'ch': {
      '0': '\u65e5',
      '1': '\u4e00',
      '2': '\u4e8c',
      '3': '\u4e09',
      '4': '\u56db',
      '5': '\u4e94',
      '6': '\u516d'
    },
    'en': {
      '0': 'Sunday',
      '1': 'Monday',
      '2': 'Tuesday',
      '3': 'Wednesday',
      '4': 'Thursday',
      '5': 'Friday',
      '6': 'Saturday'
    }
  },
  //获取当前时间
  getCurrentTime: function () {
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth() + 1
    var day = today.getDate()
    var hours = today.getHours()
    var minutes = today.getMinutes()
    var seconds = today.getSeconds()
    var timeString = year + '-' + month + '-' + day + '-' + hours + ':' + minutes + ':' + seconds
    return timeString
  },
  /*
   * 比较时间大小
   * time1>time2 return 1
   * time1<time2 return -1
   * time1==time2 return 0
   */
  compareTime: function (time1, time2) {
    if (Date.parse(time1.replace(/-/g, '/')) > Date.parse(time2.replace(/-/g, '/'))) {
      return 1
    } else if (Date.parse(time1.replace(/-/g, '/')) < Date.parse(time2.replace(/-/g, '/'))) {
      return -1
    } else if (Date.parse(time1.replace(/-/g, '/')) === Date.parse(time2.replace(/-/g, '/'))) {
      return 0
    }
  },
  //是否闰年
  isLeapYear: function (year) {
    return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
  },
  //获取某个月的天数，从0开始
  getDaysOfMonth: function (year, month) {
    return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
  },
  getDaysOfMonth2: function (year, month) {
    // 将天置为0，会获取其上个月的最后一天
    month = parseInt(month) + 1
    var date = new Date(year, month, 0)
    return date.getDate()
  },
  /*距离现在几天的日期：负数表示今天之前的日期，0表示今天，整数表示未来的日期
   * 如-1表示昨天的日期，0表示今天，2表示后天
   */
  fromToday: function (days) {
    var today = new Date()
    today.setDate(today.getDate() + days)
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    return date
  },
  /**
   * 日期时间格式化
   * @param {Object} dateTime 需要格式化的日期时间
   * @param {String} pattern 格式化的模式，如yyyy-MM-dd hh(HH):mm:ss.S a k K E D F w W z Z
   */
  formt: function (dateTime, pattern) {
    var date = new Date(dateTime)
    if (pattern == null || /^\s*$/.test(pattern)) {
      return date.toLocaleString()
    }
    return pattern.replace(/([a-z])\1*/ig, function (matchStr, group1) {
      var replacement = ''
      let hours24 = ''
      switch (group1) {
        case this.patterns.PATTERN_ERA: //G
          break
        case this.patterns.PATTERN_WEEK_YEAR: //Y
        case this.patterns.PATTERN_YEAR: //y
          replacement = date.getFullYear()
          break
        case this.patterns.PATTERN_MONTH: //M
          var month = date.getMonth() + 1
          replacement = (month < 10 && matchStr.length >= 2) ? '0' + month : month
          break
        case this.patterns.PATTERN_DAY_OF_MONTH: //d
          var days = date.getDate()
          replacement = (days < 10 && matchStr.length >= 2) ? '0' + days : days
          break
        case this.patterns.PATTERN_HOUR_OF_DAY1: //k(1~24)
          hours24 = date.getHours()
          replacement = hours24
          break
        case this.patterns.PATTERN_HOUR_OF_DAY0: //H(0~23)
          hours24 = date.getHours()
          replacement = (hours24 < 10 && matchStr.length >= 2) ? '0' + hours24 : hours24
          break
        case this.patterns.PATTERN_MINUTE: //m
          var minutes = date.getMinutes()
          replacement = (minutes < 10 && matchStr.length >= 2) ? '0' + minutes : minutes
          break
        case this.patterns.PATTERN_SECOND: //s
          var seconds = date.getSeconds()
          replacement = (seconds < 10 && matchStr.length >= 2) ? '0' + seconds : seconds
          break
        case this.patterns.PATTERN_MILLISECOND: //S
          var milliSeconds = date.getMilliseconds()
          replacement = milliSeconds
          break
        case this.patterns.PATTERN_DAY_OF_WEEK: //E
          var day = date.getDay()
          replacement = this.week['ch'][day]
          break
        case this.patterns.PATTERN_DAY_OF_YEAR: //D
          replacement = this.dayOfTheYear(date)
          break
        case this.patterns.PATTERN_DAY_OF_WEEK_IN_MONTH: //F
          days = date.getDate()
          replacement = Math.floor(days / 7)
          break
        case this.patterns.PATTERN_WEEK_OF_YEAR: //w
          days = this.dayOfTheYear(date)
          replacement = Math.ceil(days / 7)
          break
        case this.patterns.PATTERN_WEEK_OF_MONTH: //W
          days = date.getDate()
          replacement = Math.ceil(days / 7)
          break
        case this.patterns.PATTERN_AM_PM: //a
          hours24 = date.getHours()
          replacement = hours24 < 12 ? '\u4e0a\u5348' : '\u4e0b\u5348'
          break
        case this.patterns.PATTERN_HOUR1: //h(1~12)
          var hours12 = date.getHours() % 12 || 12 //0转为12
          replacement = (hours12 < 10 && matchStr.length >= 2) ? '0' + hours12 : hours12
          break
        case this.patterns.PATTERN_HOUR0: //K(0~11)
          hours12 = date.getHours() % 12
          replacement = hours12
          break
        case this.patterns.PATTERN_ZONE_NAME: //z
          replacement = this.getZoneNameValue(date)['name']
          break
        case this.patterns.PATTERN_ZONE_VALUE: //Z
          replacement = this.getZoneNameValue(date)['value']
          break
        case this.patterns.PATTERN_ISO_DAY_OF_WEEK: //u
          break
        case this.patterns.PATTERN_ISO_ZONE: //X
          break
        default:
          break
      }
      return replacement
    })
  },
  /**
   * 计算一个日期是当年的第几天
   * @param {Object} date
   */
  dayOfTheYear: function (date) {
    var obj = new Date(date)
    var year = obj.getFullYear()
    var month = obj.getMonth() //从0开始
    var days = obj.getDate()
    var daysArr = [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    for (var i = 0; i < month; i++) {
      days += daysArr[i]
    }
    return days
  },
  //获得时区名和值
  getZoneNameValue: function (dateObj) {
    var date = new Date(dateObj)
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    var arr = date.toString().match(/([A-Z]+)([-+]\d+:?\d+)/)
    var obj = {
      'name': arr[1],
      'value': arr[2]
    }
    return obj
  }
}
