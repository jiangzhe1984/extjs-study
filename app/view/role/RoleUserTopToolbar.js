//用户与角色关联窗口中的权限树查询工具条
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
                var search_deptTree = Ext.getCmp('search_deptTree').getValue();//查询条件
                var deptTree = Ext.getCmp('deptTree');
                var root = deptTree.getRootNode();//获取根节点

                root.cascade(function(node){//循环节点

                    if( node.get('text').indexOf('red') != -1){//去除标红，恢复原样
                        node.set('text',node.get('text').substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<')));
                    }

                    if(node.get('leaf') && node.get('text').indexOf(search_deptTree) >= 0){//符合查询条件选中
                        node.set('text',"<font color=red>"+node.get('text')+"</font>");
                        node.parentNode.expand(true);
                        node.expand(true);
                     }

                });
            }

        }
    ]
});