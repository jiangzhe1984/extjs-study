Ext.define('TutorialApp.view.main.TopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-topToolbar',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            // xtype: 'button', // default for Toolbars
            text: 'add',
            iconCls : 'icon-plus-sign-alt',
            handler : function() {

               Ext.Msg.alert('message','add');
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: 'edit',
            iconCls : 'icon-edit'
        },
        {
            // xtype: 'button', // default for Toolbars
            text: 'remove',
            iconCls : 'icon-remove'
        },
        {
            // xtype: 'button', // default for Toolbars
            text: 'view',
            iconCls : 'icon-eye-open'
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
            text: 'search',
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