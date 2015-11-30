var payType_states = Ext.create('Ext.data.Store', {
    fields: ['payType', 'name'],
    data : [
        {"payType":"1", "name":"货到付款"},
        {"payType":"2", "name":"在线支付"}
    ]
});

var orderStatus_states = Ext.create('Ext.data.Store', {
    fields: ['orderStatus', 'name'],
    data : [
        {"orderStatus":"1", "name":"已完成"},
        {"orderStatus":"2", "name":"待支付"},
        {"orderStatus":"3", "name":"待审核"}
    ]
});

var logisticStatus_states = Ext.create('Ext.data.Store', {
    fields: ['logisticStatus', 'name'],
    data : [
        {"logisticStatus":"1", "name":"未收货"},
        {"logisticStatus":"2", "name":"已收货"}
    ]
});


Ext.define('Ext.ux.logisticStatus.ComboBox', {
    extend:'Ext.form.ComboBox',
    id:'logisticStatusCB',
    alias: 'widget.logisticStatus',
    fieldLabel: '物流状态',
    store: logisticStatus_states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'logisticStatus',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});

Ext.define('Ext.ux.payType.ComboBox', {
    extend:'Ext.form.ComboBox',
    id:'payTypeCB',
    alias: 'widget.payType',
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

Ext.define('Ext.ux.orderStatus.ComboBox', {
    extend:'Ext.form.ComboBox',
    id:'orderStatusCB',
    alias: 'widget.orderStatus',
    fieldLabel: '订单状态',
    store: orderStatus_states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'orderStatus',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});

Ext.define('TutorialApp.view.orderManagement.OrderSearchTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-orderSearchTopToolbar',
    controller: 'orderSearchC',
    renderTo: document.body,
    width   : 500,
    items: [

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
        },
        {
            xtype: 'payType'
        },
        {
            xtype: 'orderStatus'

        },
        {
            xtype: 'logisticStatus'

        }
    ]

});