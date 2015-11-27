/**
 * 菜单Model
 */
Ext.define('TutorialApp.model.Menu', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'expanded', type: 'boolean'},
        {name: 'parent',  type: 'boolean'},
        {name: 'leaf',  type: 'boolean'},
        {name: 'url',  type: 'string'},
        {name: 'parentMenu',  type: 'string'}
    ]
});