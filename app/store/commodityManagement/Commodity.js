/**
 * 商品Store
 */
var itemsPerPage = 10;
Ext.define('TutorialApp.store.commodityManagement.Commodity', {
    extend: 'Ext.data.Store',

    alias: 'store.commodity', //设置store别名

    model: 'TutorialApp.model.commodityManagement.Commodity',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',
        //url: 'resources/data/Commodity.json',
        url: '/sjes_product/informationList',
        reader: {
            type: 'json',
            //successProperty: 'success',
            rootProperty: 'content',
            totalProperty: 'total'
        }
    }
});



