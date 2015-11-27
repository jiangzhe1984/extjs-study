/**
 * 权限资源Store
 */
var itemsPerPage = 10;
Ext.define('TutorialApp.store.Authority', {
    extend: 'Ext.data.Store',

    alias: 'store.authority', //设置store别名

    model: 'TutorialApp.model.Authority',

    autoLoad: true,

    pageSize: itemsPerPage, // items per page

    proxy: {
        type: 'ajax',//跨域交互的代理JsonP
        // url: 'resources/data/Authority.json',
        url: '/authority/list',
        reader: {
            type: 'json',
            successProperty: 'success',
            rootProperty: 'items',
            totalProperty: 'total'
        }
    }
});



