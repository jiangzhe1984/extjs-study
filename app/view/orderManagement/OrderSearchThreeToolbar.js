
Ext.define('TutorialApp.view.orderManagement.OrderSearchThreeToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-orderSearchTopToolbar',
    controller: 'orderSearchC',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            fieldLabel: '订单号:',
            xtype: 'textfield'
        },
        {
            fieldLabel: '关联订单号:',
            xtype: 'textfield'
        },
        {
            fieldLabel: '手 机 号:',
            xtype: 'textfield'
        },
        {
            fieldLabel: '会 员 ID:',
            xtype: 'textfield'
        },
        {
            text:'查询',
            handler:function(){
                 Ext.Msg.alert('message','查询');
            }
        }

    ]

});