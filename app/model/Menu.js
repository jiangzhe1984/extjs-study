/**
 * 菜单Model
 */
Ext.define('TutorialApp.model.Menu', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'expanded', type: 'boolean'},//是否打开  true:是，false：否
        {name: 'parent',  type: 'boolean'},//是否是父菜单 true:是，false：否
        {name: 'leaf',  type: 'boolean'}, //是否是子菜单 true:是，false：否
        {name: 'url',  type: 'string'},//菜单地址
        {name: 'parentMenu',  type: 'string'}//父菜单名称
    ]
});