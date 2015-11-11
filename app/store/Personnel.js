var itemsPerPage = 10;
Ext.define('TutorialApp.store.Personnel', {
    extend: 'Ext.data.Store',//Ext.data.JsonPStore

    alias: 'store.personnel', //设置store别名

    model: 'TutorialApp.model.Personnel',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'jsonp',//跨域交互的代理jsonp
      //  url: 'resources/data/Personnel.json',
        url: 'http://localhost:8080/user/findPersonnels',

        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



