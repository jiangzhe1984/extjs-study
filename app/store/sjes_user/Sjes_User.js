/**
 * 电商注册用户Store
 */
var itemsPerPage = 10;//每页显示多少条
Ext.define('TutorialApp.store.sjes_user.Sjes_User', {
    extend: 'Ext.data.Store',

    alias: 'store.sjes_user', //设置store别名

    model: 'TutorialApp.model.sjes_user.Sjes_User',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',//跨域交互的代理JsonP
        url: 'resources/data/Sjes_User.json',
        //url: '/role/list',
        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



