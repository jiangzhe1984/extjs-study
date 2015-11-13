/**
 * 角色Store
 */
var itemsPerPage = 10;
Ext.define('TutorialApp.store.Role', {
    extend: 'Ext.data.Store',

    alias: 'store.role', //设置store别名

    model: 'TutorialApp.model.Role',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',//跨域交互的代理JsonP
        //url: 'resources/data/Role.json',
        url: '/role/list',
        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



