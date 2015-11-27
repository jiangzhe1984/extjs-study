/**
 * 黑名单Model
 */
Ext.define('TutorialApp.model.sjes_user.Sjes_Black', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'username', type: 'string'},//用户名
        {name: 'userId',  type: 'int'},//用户id
        {name: 'email',  type: 'string'},//　邮箱
        {name: 'mobile',  type: 'string'},//　手机号
        {name: 'custNum',  type: 'string'},//会员卡号
        {name: 'lastLoginIp',  type: 'string'},//最近登录IP
        {name: 'lastLoginTime', type: 'string'},//最近登录时间
        {name: 'reason', type: 'string'},//加入黑名单理由
        {name: 'limitType', type: 'string'},//限制类型
        {name: 'createTime', type: 'string'}//黑名单时间
    ]
});