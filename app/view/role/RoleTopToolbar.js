Ext.define('TutorialApp.view.role.RoleTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-roleTopToolbar',
     controller: 'rolec',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            // xtype: 'button', // default for Toolbars
            text: '新增',
            iconCls : 'icon-plus-sign-alt',
            listeners: {
                click: 'addRoleRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '修改',
            iconCls : 'icon-edit',
            listeners: {
                click: 'editRoleRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '删除',
            iconCls : 'icon-remove',
            listeners: {
                click: 'removeRoleRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '显示',
            iconCls : 'icon-eye-open',
            listeners: {
                click: 'viewRoleRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '关联权限',
            iconCls : 'icon-key',
            listeners: {
                click: 'authAction'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '分配角色',
            iconCls : 'icon-group',
            listeners: {
                click: 'roleAction'
            }
        },
        '->',
        {
            xtype    : 'textfield',
            id       : 'search_role_name',
            emptyText: '快速检索'
        }, {
            // xtype: 'button', // default for Toolbars
            text: '查询',
            iconCls : 'icon-search',
            handler: function(){
                var search_role_name = Ext.getCmp('search_role_name').getValue();
                var role_store = Ext.getCmp('role_list').store;

                role_store.on('beforeload', function (store, options) {
                    var new_params = { name: search_role_name};
                    Ext.apply(role_store.proxy.extraParams, new_params);
                });
              //  role_store.filter('name', search_role_name);
                role_store.load();
            }
        }
    ]
});