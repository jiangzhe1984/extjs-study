var store = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
        url: 'resources/data/AuthTree.json'
    },
    root: {
        text: 'All',
        id: 'all',
        expanded: true
    }
});

Ext.define('TutorialApp.view.tree.AuthTree',{
    extend:'Ext.tree.Panel',
    xtype:'app-authTree',
    width: 200,
    height: 200,
    store: store,
    rootVisible: false,
    renderTo: Ext.getBody(),
    listeners:{
        scope:this,
        checkchange : function (node, checked) {

            //当该节点有子节点时，将所有子节点选中
            if (!node.get("leaf")){
                if(checked){
                    node.cascade(function(node){
                        node.set('checked', true);
                    });
                }else{
                    node.cascade(function(node){
                        node.set('checked', false);
                    });
                }

            }else{
                //获得父节点
                var pNode = node.parentNode;
                for (; pNode != null; pNode = pNode.parentNode) {
                    pNode.set("checked", true);
                }
            }

        }
    }
});
