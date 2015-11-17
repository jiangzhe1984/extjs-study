Ext.define('TutorialApp.view.user.UserTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-userTopToolbar',
    controller: 'userc',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            // xtype: 'button', // default for Toolbars
            text: '新增',
            iconCls : 'icon-plus-sign-alt',
            listeners: {
                click: 'addUserRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '修改',
            iconCls : 'icon-edit',
            listeners: {
                click: 'editUserRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '删除',
            iconCls : 'icon-remove',
            listeners: {
                click: 'removeUserRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '显示',
            iconCls : 'icon-eye-open',
            listeners: {
                click: 'viewUserRecord'
            }
        },
        '->',
        {
            xtype    : 'textfield',
            id       : 'search_user_name',
            emptyText: '快速检索'
        }, {
            // xtype: 'button', // default for Toolbars
            text: '查询',
            iconCls : 'icon-search',
            handler: function(){
                var search_user_name = Ext.getCmp('search_user_name').getValue();
                var user_store = Ext.getCmp('user_list').store;

                user_store.on('beforeload', function (store, options) {
                    var new_params = { username: search_user_name};
                    Ext.apply(user_store.proxy.extraParams, new_params);
                });
                //  role_store.filter('name', search_org_name);
                user_store.load();
            }
        }
    ]
});