// app config

export const COOKIE = {
  KEY_TOKEN: 'access_token',
  KEY_USER: 'nbuser',
  KEY_PERMISSION: 'nb-permission',
  MAX_AGE: 1000 * 60 * 60 * 24 // ms
}

export const WECHAT = {
  appId: 'wxb4259197ca391129',
  nonceStr: 'nonce-str-for-nb-insurance-h5',
  jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
}

export const MOCK_USER = {
  id: '000-111-222-333',
  username: 'mock-user-001',
  name: '王艾琳',
  gender: '女',
  mobile: '18612360426'
}
export const MOCK_TOKEN = 'hk019810-2572-443c-8c7c-0574f30b058720aa2877-hk01-44c1-b987-ba4380b72a02'
export const MOCK_PRODUCT = '康健一生（多倍保）'

//policy status
export const POLICY_STATE = {
  POLICY_INIT: "保单初始化",
  POLICY_UNDERWRITING_ING: "核保中",
  POLICY_UNDERWRITING_SUCCESS: "核保成功",
  POLICY_UNDERWRITING_FAIL: "核保失败",
  POLICY_PAYMENT_WAITING: "待付款",
  POLICY_PAYMENT_SUCCESS: "付款成功",
  POLICY_PAYMENT_FAIL: "付款失败",
  POLICY_UNDERWRITE_ING: "承保中",
  POLICY_UNDERWRITE_SUCCESS: "承保成功",
  POLICY_UNDERWRITE_FAIL: "承保失败",
  POLICY_CANCEL: "已取消",
  POLICY_SURRENDER_ING: "退保中",
  POLICY_SURRENDER_SUCCESS: "退保成功",
  POLICY_SURRENDER_FAIL: "退保失败",
  POLICY_FINISHED: "已结束"
};

// 结果类型
export const RESULT_TYPE = {
  FAIL: 0,
  SUCCESS: 1,
  WARN: 2,
  CALL: 3
};

export const RELATION_ENUM = {
  RELATION_SELF: "RELATION_SELF",//本人
  RELATION_MATE: "RELATION_MATE",//配偶
  RELATION_PARENTS: "RELATION_PARENTS",//父母
  RELATION_CHILDREN: "RELATION_CHILDREN",//子女
};

export const BENEFICIARY = {
  BENEFICIARY_TYPE_STATUTORY: "BENEFICIARY_TYPE_STATUTORY",//法定
  BENEFICIARY_TYPE_ORDER: "BENEFICIARY_TYPE_ORDER",//顺位
  BENEFICIARY_TYPE_AVERAGE: "BENEFICIARY_TYPE_AVERAGE", //均分
  BENEFICIARY_TYPE_RATE: "BENEFICIARY_TYPE_RATE",//比例
};

export const DURATION_TYPE = {
  DURATION_TYPE_ONCE: "DURATION_TYPE_ONCE",//一次性交
  DURATION_TYPE_ONCEMORE: "DURATION_TYPE_ONCEMORE", //多次交
};

export default {
  COOKIE,
  POLICY_STATE,
  RESULT_TYPE,
  RELATION_ENUM,
  BENEFICIARY,
  DURATION_TYPE,
}
