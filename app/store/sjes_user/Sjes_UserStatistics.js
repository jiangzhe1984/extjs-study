/**
 * 用户统计Store
 */
var itemsPerPage = 50;//每页显示多少条
Ext.define('TutorialApp.store.sjes_user.Sjes_UserStatistics', {
    extend: 'Ext.data.Store',

    alias: 'store.sjes_user', //设置store别名

    model: 'TutorialApp.model.sjes_user.Sjes_User',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',
        url: 'resources/data/Sjes_UserStatistics.json',
        //url: '/role/list',
        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



