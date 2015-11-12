/**
 * 角色Model
 */
Ext.define('TutorialApp.model.Role', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'displayref',  type: 'string'},
        {name: 'description',  type: 'string'}
    ]
});