
Ext.define('TutorialApp.view.orderManagement.OrderSearchFourToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-orderSearchTopToolbar',
    controller: 'orderSearchC',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            xtype:'panel',
            html:'<font color="red">共查询到512条结果，销售总额：1951，优惠总额：51，运费总额，支付总额：1900</font>'
        },
        {
            text:'导出数据',
            handler:function(){
                Ext.Msg.alert('message','导出数据');
            }
        }
    ]

});