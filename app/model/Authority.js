/**
 * 权限资源Model
 */
Ext.define('TutorialApp.model.Authority', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'authorityname', type: 'string'},
        {name: 'authoritytype',  type: 'int'},
        {name: 'displayref',  type: 'string'}
    ]
});