Ext.define('TutorialApp.view.orderManagement.OrderToExamineThreeToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-orderToExamineTopToolbar',
    // controller: 'orderToExamineC',
    renderTo: document.body,
    width   : 500,
    items: [

        {
            iconCls : 'icon-thumbs-up',
            text:'批量通过',
            handler:function(){
                Ext.Msg.alert('message','查询');
            }
        },
        {
            iconCls : 'icon-thumbs-down',
            text:'批量取消',
            handler:function(){
                Ext.Msg.alert('message','查询');
            }
        }
    ]

});