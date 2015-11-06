
Ext.define('TutorialApp.view.main.Navigation', {
    extend: 'Ext.tree.Panel',//继承treepanel
    xtype: 'app-navigation',
    rootVisible: false,
    useArrows: true,
    hideHeaders: true,
    width: 250,
    minWidth: 100,
    split: true,
    collapsible: true,
    columns:[{
        xtype: 'treecolumn',
        flex: 1,
        dataIndex: 'text'
    }],
    store:'main.Navigation',
    bind: {
        //store: '{navigationStore}',//绑定store
        title: '{navigationTitle}'
    }
});