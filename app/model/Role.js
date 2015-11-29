/**
 * 角色Model
 */
Ext.define('TutorialApp.model.Role', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},//角色名称
        {name: 'displayref',  type: 'string'},//显示名称
        {name: 'description',  type: 'string'}//描述
    ]
});