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


function findByKeyWordFiler(node, event){
    var treepanel = Ext.getCmp('treepanel');
    Ext.Msg.alert('message',treepanel);
    //Ext.Msg.alert('message',event);
  //  var node=treepanel.getNodeById('grouped-grid');
    // treepanel.expandPath(node.getPath())
   // treepanel.getSelectionModel().select(node);
  //  node.fireEvent('click',node);
}

Ext.define('TutorialApp.view.tree.DeptTree', {
    extend:'Ext.tree.Panel',
    id:'treepanel',
    xtype:'app-deptTree',
    requires: [
        'TutorialApp.view.personnel.RoleUserTopToolbar'
    ],
    width: 300,
    height: 600,
    store: store,
    rootVisible: false,
    renderTo: Ext.getBody(),
   /* tbar:[' ',
        new Ext.form.TextField({
            width:150,
            emptyText:'快速检索',
            enableKeyEvents: true,
            listeners:{
                keyup:function(node, event) {
                    findByKeyWordFiler(node, event);
                },
                scope: this
            }
        })
    ]*!/*/
    dockedItems: [{
        xtype: 'app-roleUserTopToolbar',
        dock: 'top'
    }]
});