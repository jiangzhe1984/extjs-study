/**
 * 用户Model
 */
Ext.define('TutorialApp.model.sjes_user.Sjes_User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'username', type: 'string'},//用户名
        {name: 'nickname',  type: 'string'},//昵称
        {name: 'email',  type: 'string'},//　邮箱
        {name: 'mailboxState', type: 'string'},//邮箱状态
        {name: 'password',  type: 'string'},//　密码
        {name: 'pwdStrength',  type: 'int'},//密码强度
        {name: 'mobile',  type: 'string'},//　手机号
        {name: 'mobileStatus',  type: 'string'},//　手机状态
        {name: 'sex',  type: 'int'},//性别
        {name: 'birthday',  type: 'string'},//生日
        {name: 'cardNum',  type: 'string'},//会员卡号
        {name: 'dateLine',  type: 'string'},//会员卡有效期
        {name: 'virtualCardNum',  type: 'string'},//虚拟会员卡号
        {name: 'portraitPath',  type: 'string'},//头像路径
        {name: 'enable',  type: 'boolean', defaultValue: true},//用户是否激活
        {name: 'createdDate',  type: 'string'},//生成时间
        {name: 'updatedDate',  type: 'string'},//更新时间
        {name: 'lastLoginTime', type: 'string'},//最后登录时间
        {name: 'userType', type: 'int'},//用户类型
        {name: 'accountBalance', type: 'int'},//账户余额
        {name: 'cumulativeConsumption', type: 'int'},//累计消费
        {name: 'cumulativeDiscount', type: 'int'},//累计优惠
        {name: 'userSource', type: 'string'},//用户来源
        {name: 'microMallFans', type: 'int'},//微商场粉丝
        {name: 'powderTime', type: 'string'},//加粉时间
        {name: 'openid', type: 'string'},//openid
        {name: 'userIntegral', type: 'int'},//用户积分
        {name: 'coupons', type: 'int'},//优惠券
        {name: 'numberOfComplaints', type: 'int'},//投诉数
        {name: 'lastComplaintTime', type: 'string'},//最近一次投诉时间
        {name: 'commentNumber', type: 'string'},//评论数
        {name: 'noCommentNumber', type: 'string'}//未评论数量

    ]
});