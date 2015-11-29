/**
 * 部门Store
 */
var itemsPerPage = 10;//每页显示多少条
Ext.define('TutorialApp.store.Org', {
    extend: 'Ext.data.Store',

    alias: 'store.org', //设置store别名

    model: 'TutorialApp.model.Org',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',//跨域交互的代理JsonP
       // url: 'resources/data/Org.json',
       url: '/org/list',
        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



