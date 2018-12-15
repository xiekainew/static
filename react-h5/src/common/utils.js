// utils
import moment from 'moment'
import {get} from 'lodash'
const proxy = require('@package').proxy

/*
const hostMap = {
  'ish5.newbanker.cn': 'is.newbanker.cn',
  'ish5-dev.newbanker.cn': 'is-dev.newbanker.cn',
  'ish5-internal.newbanker.cn': 'ish5-internal.newbanker.cn'
}
*/

export const createArray = (start = 0, end = 100) => {
  let arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
};

export const money = (value, returnObj = false) => {
  value = parseFloat(value)
  let ret = null
  if (value >= 100000000) {
    ret = {
      unit: '亿',
      value: value / 100000000
    }
  } else if (value >= 10000000 && value < 100000000) {
    ret = {
      unit: '千万',
      value: value / 10000000
    }
  } else if (value >= 10000 && value < 10000000) {
    ret = {
      unit: '万',
      value: value / 10000
    }
  } else {
    ret = {
      unit: '',
      value: value
    }
  }
  return returnObj ? ret : `${ret.value}${ret.unit}`
};

// 处理图片返回地址
export const img = url => {
  if (!url) return null
  let replace = `//${window.location.host.replace('ish5', 'is')}/`
  if (process.env.NODE_ENV === 'development') {
    let target = get(proxy, '/api.target', null)
    if (target) {
      replace = target.replace('/api', '/')
    }
    replace = replace.replace('ish5', 'is')
  }

  return url.replace('file/', replace)
};

// 验证手机号(应产品要求，只需要校验1开头的11位数字)
export const isMobile = mobile => {
  if (!mobile) return false;
  return (/^1\d{10}$/.test(mobile));
};

export const classNames = (...args) => {
  return args[0].join(' ')
};

//去掉字符串所有空格
export const trim = str => {
  return str.replace(/\s*/g, "");
};


//http://www.cnblogs.com/Shaina/archive/2012/05/10/2494123.html
//验证身份证号并获取出生日期
export const getBirthdayByIdNo = iIdNo => {
  var tmpStr = "";
  var strReturn = "";
  iIdNo = trim(iIdNo);
  if ((iIdNo.length !== 15) && (iIdNo.length !== 18)) {
    strReturn = "输入的身份证号位数错误";
    return strReturn;
  }
  if (iIdNo.length === 15) {
    tmpStr = iIdNo.substring(6, 12);
    tmpStr = "19" + tmpStr;
    tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
    return tmpStr;
  }
  else {
    tmpStr = iIdNo.substring(6, 14);
    tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
    return tmpStr;
  }
};

//判断是否是合法的日期1992-08-12
export  const isValidDate = dateString =>{
  if (!dateString) return false;
  return (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(((0[1-9])|([1-2][0-9])|(3[0-1])))$/.test(dateString));

}

// date => 1990-08-15
export const getAge = date => {
  let $now = moment().toArray() // [2017, 7, 29, 19, 9, 16, 468]
  let now = {
    year: $now[0],
    month: $now[1],
    day: $now[2]
  }
  let $birth = moment(date).toArray()
  let birth = {
    year: $birth[0],
    month: $birth[1],
    day: $birth[2]
  }
  let age = now.year - birth.year
  if (now.month < birth.month) {
    age = age - 1
  } else if (now.month === birth.month) {
    if (now.day > birth.day) {
      age = age - 1
    }
  }
  return age <= 0 ? 0 : age
}
