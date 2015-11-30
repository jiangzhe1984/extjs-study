/**
 * 订单审核Store
 */
var itemsPerPage = 10;
Ext.define('TutorialApp.store.orderManagement.OrderToExamine', {
    extend: 'Ext.data.Store',

    alias: 'store.OrderToExamine', //设置store别名

    model: 'TutorialApp.model.orderManagement.Order',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',
        url: 'resources/data/OrderToExamine.json',
        //url: '/user/list',
        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



