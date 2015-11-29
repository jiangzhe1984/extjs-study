/**
 * 积分Store
 */
var itemsPerPage = 10;//每页显示多少条
Ext.define('TutorialApp.store.sjes_user.Sjes_Integal', {
    extend: 'Ext.data.Store',

    alias: 'store.sjes_integal', //设置store别名

    model: 'TutorialApp.model.sjes_user.Sjes_Integal',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',
        url: 'resources/data/Sjes_Integal.json',
        //url: '/role/list',
        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



