Ext.define('TutorialApp.view.orderManagement.AutoAudit',{
    extend:'Ext.form.Panel',
    xtype: 'autoauditmechanism',
    width: 350,
    // The form will submit an AJAX request to this URL when submitted
    url: '',
    layout: 'anchor',
    defaults: {
        anchor: '50%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{
        xtype: 'radiogroup',
        fieldLabel: '审核原则',
        margin: '5 5 5 5',
        // Arrange radio buttons into two columns, distributed vertically
        columns: 2,
        name:'rule',
        vertical: true,
        items: [
            { boxLabel: '先审后发', name: 'rule', inputValue: '1' },
            { boxLabel: '先发后审', name: 'rule', inputValue: '2', checked: true}
        ],
        listeners:{
            //通过change触发
            change: function(g , newValue , oldValue){
                alert(newValue.rule);
            }
        }
    },{
        xtype: "container",
        layout: "hbox",
        items: [
            {
                xtype: "panel",
                margin: '10 5 5 5',
                html: "审核类型:"
            },
            {
                xtype: "panel",
                margin: '10 5 5 5',
                html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='2'>单个订单同一商品数量>=</font>"
            },
            {
                xtype:'textfield',
                name: 'itemNum',
                width:50,
                height:30,
                allowBlank: false,
                margin: '5 5 5 5'
            },
            {
                xtype: 'panel',
                margin: '10 5 5 5',
                html:'件'
            }
        ]
    },{
        xtype: "container",
        layout: "hbox",
        items: [
            {
                xtype: "panel",
                margin: '10 5 5 5',
                html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='2'>单个订单商品总数量>=</font>"
            },
            {
                xtype:'textfield',
                name: 'itemTotalNum',
                width:50,
                height:30,
                allowBlank: false,
                margin: '5 5 5 5'
            },
            {
                xtype: 'panel',
                margin: '10 5 5 5',
                html:'件'
            }
        ]
    },{
        xtype: "container",
        layout: "hbox",
        items: [
            {
                xtype: "panel",
                margin: '10 5 5 5',
                html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='2'>单个订单总金额>=</font>"
            },
            {
                xtype:'textfield',
                name: 'itemTotalAmount',
                width:50,
                height:30,
                allowBlank: false,
                margin: '5 5 5 5'
            },
            {
                xtype: 'panel',
                margin: '10 5 5 5',
                html:'元'
            }
        ]
    },{
        xtype: "container",
        layout: "hbox",
        items: [
            {
                xtype: "panel",
                margin: '10 5 5 5',
                html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='2'>用户当天购买订单总金额>=</font>"
            },
            {
                xtype:'textfield',
                name: 'orderTotalAmount',
                width:50,
                height:30,
                allowBlank: false,
                margin: '5 5 5 5'
            },
            {
                xtype: 'panel',
                margin: '10 5 5 5',
                html:'元'
            }
        ]
    },{
        xtype: "container",
        layout: "hbox",
        items: [
            {
                xtype: "panel",
                margin: '10 5 5 5',
                html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='2'>用户当天购买订单总数量>=</font>"
            },
            {
                xtype:'textfield',
                name: 'orderTotalNum',
                width:50,
                height:30,
                allowBlank: false,
                margin: '5 5 5 5'
            },
            {
                xtype: 'panel',
                margin: '10 5 5 5',
                html:'元'
            }
        ]
    },{
        xtype: "container",
        layout: "hbox",
        items: [
            {
                xtype: "button",
                margin: '10 5 5 105',
                text: '保存',
                handler: function() {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        form.submit({
                            success: function(form, action) {
                                Ext.Msg.alert('Success', action.result.msg);
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result.msg);
                            }
                        });
                    }
                }
            },
            {
                xtype: "button",
                margin: '10 5 5 55',
                text: '取消',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }
        ]
    }],

    renderTo: Ext.getBody()
})