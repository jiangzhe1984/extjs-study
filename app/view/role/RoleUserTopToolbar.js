Ext.define('TutorialApp.view.role.RoleUserTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-roleUserTopToolbar',
   // controller: 'personnel',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            xtype    : 'textfield',
            id       : 'search_deptTree',
            emptyText: '快速检索'
        }, {
            // xtype: 'button', // default for Toolbars
            text: '查询',
            iconCls : 'icon-search',
            handler: function(){
                var search_deptTree = Ext.getCmp('search_deptTree').getValue();
                var deptTree = Ext.getCmp('deptTree');
                var root = deptTree.getRootNode();

                root.cascade(function(node){

                    if( node.get('text').indexOf('red') != -1){
                        node.set('text',node.get('text').substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<')));
                    }

                    if(node.get('leaf') && node.get('text').indexOf(search_deptTree) >= 0){
                        node.set('text',"<font color=red>"+node.get('text')+"</font>");
                        node.parentNode.expand(true);
                        node.expand(true);
                     }

                });
            }

        }
    ]
});