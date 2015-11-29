/**
 * 权限资源Model
 */
Ext.define('TutorialApp.model.Authority', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'authorityname', type: 'string'},//权限名称
        {name: 'authoritytype',  type: 'int'},//权限类型 1:列表，2:保存，3:删除
        {name: 'displayref',  type: 'string'},//显示名称
        {name: 'description', type: 'string'}//描述
    ]
});