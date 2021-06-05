import * as qs from 'qs';

// object to form-urlencoded string
export function getQueryString(object) {
  return qs.stringify(object, { indices: false });
}

// location.search to object
export function getURLParams() {
  return qs.parse(location.search.slice(1));
}

function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

//通过身份证号码判断出生年月日
export const getBirthdayFromId = function (id) {
  let temp = id;
  let result;
  //十五位身份证
  if (/^\d{15}$/g.test(temp)) {
    let year = '19' + temp.substr(6, 2);
    let month = temp.substr(8, 2);
    let date = temp.substr(10, 2);
    result = `${year}-${month}-${date}`;
  } else {
    let year = temp.substr(6, 4);
    let month = temp.substr(10, 2);
    let date = temp.substr(12, 2);
    result = `${year}-${month}-${date}`;
  }
  return new Date(result);
};

//通过身份证号码判断男性还是女性，男性返回M，女性返回F
//支持15位和18位
//15位最后一位奇数为男性，偶数为女性
//18位倒数第二位奇数为男性，偶数为女性
export const getGenderFromId = function (id) {
  let temp = id;
  //十五位身份证
  if (/^\d{15}$/g.test(temp)) {
    let a = temp[temp.length - 1];
    if (a % 2 == 0) {
      return 'F';
    } else {
      return 'M';
    }
  } else {
    //十八位身份证
    let b = temp[temp.length - 2];
    if (b % 2 == 0) {
      return 'F';
    } else {
      return 'M';
    }
  }
};

//验证身份证是否合法
export const isValidId = function (id) {
  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  };
  var tip = '';
  var pass = true;

  if (
    !id ||
    !/^(\d{15}|\d{17}[\dxX])$/.test(id) ||
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/i.test(id)
  ) {
    tip = '身份证号格式错误';
    pass = false;
  } else if (!city[id.substr(0, 2)]) {
    tip = '地址编码错误';
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (id.length == 18) {
      id = id.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = id[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != id[17]) {
        tip = '校验位错误';
        pass = false;
      }
    }
  }
  return pass;
};

export const setTitle = (title = '') => {
  document.title = title;
};

export const isValidPhone = (tel = '') => {
  return /^1[3|4|5|8|7|9][0-9]\d{8}$/.test(tel);
};

export const isValidSMSCode = (code = '') => {
  return /^\d{6}$/.test(code);
};
