var itemsPerPage = 10;
Ext.define('TutorialApp.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel', //设置store别名

    model: 'TutorialApp.model.Personnel',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',
        url: 'resources/data/Personnel.json',
        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



