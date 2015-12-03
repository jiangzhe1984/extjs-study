var payType_states = Ext.create('Ext.data.Store', {
    fields: ['payType', 'name'],
    data : [
        {"payType":"1", "name":"货到付款"},
        {"payType":"2", "name":"在线支付"}
    ]
});






Ext.define('Ext.ux.toExaminePayType.ComboBox', {
    extend:'Ext.form.ComboBox',
    id:'toExamine_payTypeCB',
    alias: 'widget.toExaminePayType',
    fieldLabel: '支付类型',
    store: payType_states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'payType',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});

Ext.define('TutorialApp.view.orderManagement.OrderToExamineTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-orderToExamineTopToolbar',
   // controller: 'orderToExamineC',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            xtype: 'toExaminePayType'
        },
        {
            fieldLabel: '订单号:',
            xtype: 'textfield'
        },
        {
            fieldLabel: '支付时间:',
            xtype: 'datefield',
            anchor: '100%',
            emptyText: '请选择年月日'
        },'--',
        {
            xtype: 'datefield',
            anchor: '100%',
            emptyText: '请选择年月日'
        }
    ]

});