/**
 * 用户Model
 */
Ext.define('TutorialApp.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'username', type: 'string'},
        {name: 'password',  type: 'string'},
        {name: 'accountEnabled',  type: 'int'},
        {name: 'accountLocked',  type: 'int'},
        {name: 'expiredDate',  type: 'string'},
        {name: 'credentialsExpired',  type: 'int'},
        {name: 'fullName',  type: 'string'},
        {name: 'org',   type: 'string'},
        {name: 'mobile',  type: 'string'},
        {name: 'userMgrType',  type: 'int'},
        {name: 'description',  type: 'string'}
    ]
});