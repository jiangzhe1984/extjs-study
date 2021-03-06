var store = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
         //url: 'resources/data/LeftTree.json'
        url: '/leftTree'
    },
    root: {
        text: 'All',
        id: 'all',
        expanded: false
    }
});
/**
 * 主页面左侧菜单栏加载
 */
Ext.define('TutorialApp.view.tree.LeftTree',{
        extend:'Ext.tree.Panel',
        xtype:'app-leftTree',
        width: 200,
        height: 150,
        store: store,
        rootVisible: false,
        renderTo: Ext.getBody(),
        bind: {
            title: '{navigationTitle}'
        }
});
