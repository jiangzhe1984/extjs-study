var verificationReason_states = Ext.create('Ext.data.Store', {
    fields: ['payType', 'name'],
    data : [
        {"verificationReason":"1", "name":"当天购买订单数超量"},
        {"verificationReason":"2", "name":"当天购买订单总金额超量"},
        {"verificationReason":"3", "name":"单品数量过大"},
        {"verificationReason":"4", "name":"首次订单"}
    ]
});


Ext.define('Ext.ux.verificationReasonStatus.ComboBox', {
    extend:'Ext.form.ComboBox',
    id:'verificationReasonStatusCB',
    alias: 'widget.verificationReasonStatus',
    fieldLabel: '待审核原因',
    store: verificationReason_states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'verificationReason',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});

Ext.define('TutorialApp.view.orderManagement.OrderToExamineTwoToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-orderToExamineTopToolbar',
   // controller: 'orderToExamineC',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            fieldLabel: '手 机 号:',
            xtype: 'textfield'
        },
        {
            fieldLabel: '会员ID:',
            xtype: 'textfield'
        },
        {
            xtype:'verificationReasonStatus'
        },
        {
            iconCls : 'icon-search',
            text:'查询',
            handler:function(){
                Ext.Msg.alert('message','查询');
            }
        }
    ]

});