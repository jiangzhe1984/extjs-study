/**
 * Model
 */
Ext.define('TutorialApp.model.sjes_user.Sjes_User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'username', type: 'string'},
        {name: 'nickname',  type: 'string'},
        {name: 'email',  type: 'string'},
        {name: 'password',  type: 'string'},
        {name: 'pwdStrength',  type: 'int'},
        {name: 'mobile',  type: 'string'},
        {name: 'sex',  type: 'int'},
        {name: 'birthday',  type: 'string'},
        {name: 'cardNum',  type: 'string'},
        {name: 'dateLine',  type: 'string'},
        {name: 'virtualCardNum',  type: 'string'},
        {name: 'portraitPath',  type: 'string'},
        {name: 'enable',  type: 'boolean', defaultValue: true},
        {name: 'createdDate',  type: 'string'},
        {name: 'updatedDate',  type: 'string'}
    ]
});