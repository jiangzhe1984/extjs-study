/**
 * 用户Store
 */
var itemsPerPage = 10;//每页显示多少条
Ext.define('TutorialApp.store.User', {
    extend: 'Ext.data.Store',

    alias: 'store.User', //设置store别名

    model: 'TutorialApp.model.User',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',//跨域交互的代理JsonP
       // url: 'resources/data/User.json',
        url: '/user/list',
        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



