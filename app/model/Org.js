/**
 * 部门Model
 */
Ext.define('TutorialApp.model.Org', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'orgName', type: 'string'},
        {name: 'orgNum',  type: 'string'},
        {name: 'manager',  type: 'string'},
        {name: 'parentOrg',  type: 'string'},
        {name: 'description',  type: 'string'}
    ]
});