var store = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
        url: 'resources/data/LeftTree.json'
    },
    root: {
        text: 'All',
        id: 'all',
        expanded: true
    }
});

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
        },
    listeners:{
        scope:this,
        checkchange : function (node, checked) {

           // Ext.Msg.alert("确定","你点击的是"+node.id+"||"+node.get("text"));


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
