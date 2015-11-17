Ext.define('TutorialApp.view.org.OrgTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-orgTopToolbar',
    controller: 'orgc',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            // xtype: 'button', // default for Toolbars
            text: '新增',
            iconCls : 'icon-plus-sign-alt',
            listeners: {
                click: 'addOrgRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '修改',
            iconCls : 'icon-edit',
            listeners: {
                click: 'editOrgRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '删除',
            iconCls : 'icon-remove',
            listeners: {
                click: 'removeOrgRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '显示',
            iconCls : 'icon-eye-open',
            listeners: {
                click: 'viewOrgRecord'
            }
        },
        '->',
        {
            xtype    : 'textfield',
            id       : 'search_org_name',
            emptyText: '快速检索'
        }, {
            // xtype: 'button', // default for Toolbars
            text: '查询',
            iconCls : 'icon-search',
            handler: function(){
                var search_org_name = Ext.getCmp('search_org_name').getValue();
                var org_store = Ext.getCmp('org_list').store;

                org_store.on('beforeload', function (store, options) {
                    var new_params = { orgName: search_org_name};
                    Ext.apply(org_store.proxy.extraParams, new_params);
                });
                //  role_store.filter('name', search_org_name);
                org_store.load();
            }
        }
    ]
});