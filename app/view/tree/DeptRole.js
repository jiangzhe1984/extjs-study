var store = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
        url: 'resources/data/DeptTree.json'
    },
    root: {
        text: 'All',
        id: 'all',
        expanded: true
    }
});

Ext.define('TutorialApp.view.tree.DeptTree', {
    extend:'Ext.tree.Panel',
    xtype:'app-deptTree',
    width: 300,
    height: 600,
    store: store,
    rootVisible: false,
    renderTo: Ext.getBody()
});