Ext.define('TutorialApp.view.personnel.PersonnelTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-personnelTopToolbar',

    renderTo: document.body,
    width   : 500,
    items: [
        {
            // xtype: 'button', // default for Toolbars
            text: '新增',
            iconCls : 'icon-plus-sign-alt',
            listeners: {
                click: 'addPersonnelRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '修改',
            iconCls : 'icon-edit',
            listeners: {
                click: 'editPersonnelRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '删除',
            iconCls : 'icon-remove',
            listeners: {
                click: 'removePersonnelRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '显示',
            iconCls : 'icon-eye-open',
            listeners: {
                click: 'viewPersonnelRecord'
            }
        },
       /* {
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
        },*/
        /* {
         xtype: 'splitbutton',
         text : 'Split Button'
         },*/
        // begin using the right-justified button container
        '->', // same as { xtype: 'tbfill' }
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