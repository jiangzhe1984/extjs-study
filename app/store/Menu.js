/**
 * 菜单Store
 */
var itemsPerPage = 10;
Ext.define('TutorialApp.store.Menu', {
    extend: 'Ext.data.Store',

    alias: 'store.menu', //设置store别名

    model: 'TutorialApp.model.Menu',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',//跨域交互的代理JsonP
        // url: 'resources/data/Menu.json',
        url: '/menu/list',
        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



