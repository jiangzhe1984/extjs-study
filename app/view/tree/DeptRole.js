var store = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
        url: 'resources/data/DeptTree.json'
    },
    root: {
        text: '所有部门',
        id: 'all',
        expanded: true
    }
});


Ext.define('TutorialApp.view.tree.DeptTree', {
    extend:'Ext.tree.Panel',
    id:'deptTree',
    xtype:'app-deptTree',
    requires: [
        'TutorialApp.view.personnel.RoleUserTopToolbar'
    ],
    width: 300,
    height: 700,
    store: store,
    rootVisible: true,
    renderTo: Ext.getBody(),
   // collapsible: true,
    dockedItems: [{
        xtype: 'app-roleUserTopToolbar',
        dock: 'top'
    }],

    listeners:{
        scope:this,
        itemclick :  function (record, node) {
            if(node.get('leaf')){
                document.sel.res.options.length=0;
                document.sel.res1.options.length=0;
                document.sel.res.options[document.sel.res.length] = new Option('aa', 1);
                document.sel.res1.options[document.sel.res1.length] = new Option('bb',2);
            }
        }
    }
});