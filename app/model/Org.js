/**
 * 部门Model
 */
Ext.define('TutorialApp.model.Org', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'orgName', type: 'string'},//部门名称
        {name: 'orgNum',  type: 'string'},//部门编码
        {name: 'manager',  type: 'string'},//部门管理员
        {name: 'parentOrg',  type: 'string'},//父部门名称
        {name: 'description',  type: 'string'}//描述
    ]
});