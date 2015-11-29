/**
 * 用户Model
 */
Ext.define('TutorialApp.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'username', type: 'string'},//用户名
        {name: 'password',  type: 'string'},//密码
        {name: 'accountEnabled',  type: 'int'},//是否使用中
        {name: 'accountLocked',  type: 'int'},//是否被锁住
        {name: 'expiredDate',  type: 'string'},//过期时间
        {name: 'credentialsExpired',  type: 'int'},//凭证是否过期
        {name: 'fullName',  type: 'string'},//全名
        {name: 'org',   type: 'string'},//所属部门名称
        {name: 'mobile',  type: 'string'},//手机号
        {name: 'userMgrType',  type: 'int'},//用户类型
        {name: 'description',  type: 'string'}//描述
    ]
});