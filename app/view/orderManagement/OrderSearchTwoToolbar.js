

var orderSource_states = Ext.create('Ext.data.Store', {
    fields: ['orderSource', 'name'],
    data : [
        {"orderSource":"1", "name":"网页"},
        {"orderSource":"2", "name":"网盟"},
        {"orderSource":"3", "name":"Android客户端"},
        {"orderSource":"4", "name":"iPhone客户端"},
        {"orderSource":"5", "name":"iPad客户端"},
        {"orderSource":"6", "name":"wap端"},
        {"orderSource":"7", "name":"微信端"}
    ]
});

var ownMarket_states = Ext.create('Ext.data.Store', {
    fields: ['ownMarket', 'name'],
    data : [
        {"ownMarket":"1", "name":"翠柏商场"},
        {"ownMarket":"2", "name":"实验商场"},
        {"ownMarket":"3", "name":"来福士商场"},
        {"ownMarket":"4", "name":"曙光商场"}
    ]
});

Ext.define('Ext.ux.ownMarket.ComboBox', {
    extend:'Ext.form.ComboBox',
    id:'ownMarketCB',
    alias: 'widget.ownMarket',
    fieldLabel: '所属商场',
    store: ownMarket_states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'ownMarket',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});

Ext.define('Ext.ux.orderSource.ComboBox', {
    extend:'Ext.form.ComboBox',
    id:'orderSourceCB',
    alias: 'widget.orderSource',
    fieldLabel: '下单来源',
    store: orderSource_states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'orderSource',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});



Ext.define('TutorialApp.view.orderManagement.OrderSearchTwoToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-orderSearchTopToolbar',
    controller: 'orderSearchC',
    renderTo: document.body,
    width   : 500,
    items: [

        {
            xtype: 'orderSource'

        },
        {
            xtype: 'ownMarket'

        }
    ]

});