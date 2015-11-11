Ext.define('TutorialApp.view.personnel.RoleUserTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-roleUserTopToolbar',

    renderTo: document.body,
    width   : 500,
    items: [
        {
            xtype    : 'textfield',
            name     : 'field1',
            emptyText: '快速检索'
        }, {
            // xtype: 'button', // default for Toolbars
            text: '查询',
            iconCls : 'icon-search'
        }
    ]
});