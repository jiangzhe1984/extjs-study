Ext.define('TutorialApp.view.main.TopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-topToolbar',

    renderTo: document.body,
    width   : 500,
    items: [
        {
            // xtype: 'button', // default for Toolbars
            text: '新增',
            iconCls : 'icon-plus-sign-alt',
            listeners: {
                click: 'addRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '修改',
            iconCls : 'icon-edit',
            listeners: {
                click: 'editRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '删除',
            iconCls : 'icon-remove',
            listeners: {
                click: 'removeRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '显示',
            iconCls : 'icon-eye-open',
            listeners: {
                click: 'viewRecord'
            }
        },
       /* {
            xtype: 'splitbutton',
            text : 'Split Button'
        },*/
        // begin using the right-justified button container
        '->', // same as { xtype: 'tbfill' }
        {
            xtype    : 'textfield',
            name     : 'field1',
            emptyText: 'enter search term'
        }, {
            // xtype: 'button', // default for Toolbars
            text: '查询',
            iconCls : 'icon-search'
        }/*,
        // add a vertical separator bar between toolbar items
        '-', // same as {xtype: 'tbseparator'} to create Ext.toolbar.Separator
        'text 1', // same as {xtype: 'tbtext', text: 'text1'} to create Ext.toolbar.TextItem
        { xtype: 'tbspacer' },// same as ' ' to create Ext.toolbar.Spacer
        'text 2',
        { xtype: 'tbspacer', width: 50 }, // add a 50px space
        'text 3'*/
    ]
});