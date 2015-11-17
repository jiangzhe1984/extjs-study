Ext.define('TutorialApp.view.sjes_user.Sjes_UserTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-sjesuserTopToolbar',
    controller: 'sjes_userc',
    renderTo: document.body,
    width   : 500,
    items: [
    /*    {
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
        },*/
        {
            // xtype: 'button', // default for Toolbars
            text: '显示',
            iconCls : 'icon-eye-open',
            listeners: {
                click: 'viewSjesUserRecord'
            }
        },
        '->',
        {
            xtype    : 'textfield',
            id       : 'search_sjes_user_name',
            emptyText: '快速检索'
        }, {
            // xtype: 'button', // default for Toolbars
            text: '查询',
            iconCls : 'icon-search',
            handler: function(){
                var search_sjes_user_name = Ext.getCmp('search_sjes_user_name').getValue();
                var sjes_user_store = Ext.getCmp('sjes_user_list').store;

                sjes_user_store.on('beforeload', function (store, options) {
                    var new_params = { username: search_sjes_user_name};
                    Ext.apply(sjes_user_store.proxy.extraParams, new_params);
                });
                //  role_store.filter('name', search_org_name);
                sjes_user_store.load();
            }
        }
    ]
});