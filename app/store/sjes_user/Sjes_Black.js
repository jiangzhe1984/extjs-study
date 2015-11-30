/**
 * 黑名单Store
 */
var itemsPerPage = 10;//每页显示多少条
Ext.define('TutorialApp.store.sjes_user.Sjes_Black', {
    extend: 'Ext.data.Store',

    alias: 'store.sjes_user', //设置store别名

    model: 'TutorialApp.model.sjes_user.Sjes_Black',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',
        url: 'resources/data/Sjes_Black.json',
        //url: '/role/list',
        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



