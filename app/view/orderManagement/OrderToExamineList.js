var cancelReason_states = Ext.create('Ext.data.Store', {
    fields: ['cancelReason', 'name'],
    data : [
        {"cancelReason":"1", "name":"理由1"},
        {"cancelReason":"2", "name":"理由2"}
    ]
});

Ext.define('Ext.ux.cancelReason.ComboBox', {
    extend:'Ext.form.ComboBox',
    id:'cancelReasonCB',
    alias: 'widget.cancelReason',
    fieldLabel: '取消理由',
    store: cancelReason_states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'cancelReason',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});

var ban_states = Ext.create('Ext.data.Store', {
    fields: ['cancelReason', 'name'],
    data : [
        {"ban":"禁止购买", "name":"禁止购买"},
        {"ban":"禁止购买", "name":"禁止购买"}
    ]
});

Ext.define('Ext.ux.ban.ComboBox', {
    extend:'Ext.form.ComboBox',
    id:'banCB',
    alias: 'widget.ban',
    fieldLabel: '',
    store: ban_states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'ban',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});



//销售总金额
function saleAmount(id){
    Ext.create('Ext.data.Store', {
        storeId: 'orderGoodsDetailStore',
        fields:['id', 'encodingManagement','commodityEncoding','commodityName' ,'sellingPrice','memberPrice','number','participateInTheActivityName'],
        // model: 'TutorialApp.model.sjes_user.Sjes_User',

        autoLoad: true,

        pageSize: 10, // items per page

        proxy: {
            type: 'ajax',
            url: 'resources/data/OrderGoodsDetail.json',
            //url: '/role/list',
            reader: {
                type: 'json',
                successProperty: 'success',
                rootProperty: 'items',
                totalProperty: 'total'
            }
        }
    });

    Ext.define('OrderGoodsDetail.Toolbar', {
        extend:'Ext.toolbar.Toolbar',
        xtype:'orderGoodsDetailTB',
        renderTo: document.body,
        items: [
            {
                xtype:'panel',
                html:'商品明细'
            }
        ]
    });

    Ext.create('Ext.grid.Panel', {
        id:'orderGoodsDetail',
        store: Ext.data.StoreManager.lookup('orderGoodsDetailStore'),
        columnLines: true, // 加上表格线
        columns: [
            {
                text: '管理编码',
                flex: 1,
                // width:100,
                align: 'center',
                dataIndex: 'encodingManagement'
            }, {
                text: '商品编码',
                flex: 1,
                // width:100,
                align: 'center',
                dataIndex: 'commodityEncoding'
            }, {
                text: '商品名称',
                //flex: 1,
                width:255,
                align: 'center',
                dataIndex: 'commodityName'
            }, {
                text: '销售价',
                flex: 1,
                //  width:100,
                align: 'center',
                dataIndex: 'sellingPrice'
            }, {
                text: '会员价',
                flex: 1,
                //width:100,
                align: 'center',
                dataIndex: 'memberPrice'
            }, {
                text: '数量',
                //flex: 1,
                width:50,
                align: 'center',
                dataIndex: 'number'
            }, {
                text: '参与活动名称',
                flex: 1,
                // width:100,
                align: 'center',
                dataIndex: 'participateInTheActivityName'
            }
        ],
        height: 400,
        width: 700,
        renderTo: Ext.getBody(),
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: Ext.data.StoreManager.lookup('orderGoodsDetailStore'),
            displayInfo: true
        }/*,{
         xtype: 'orderGoodsDetailTB'
         }*/]
    });



    Ext.create('Ext.window.Window', {
        id:'orderGoodsDetail_Window',
        title: '商品明细',
        height: 400,
        width: 1000,
        layout: 'fit',
        modal: true,//它背后的东西都会被遮罩
        items: {
            xtype: Ext.getCmp('orderGoodsDetail')
        }
    }).show();


}


//订单优惠总金额  Total amount of orders
function benefitAmount(id){
    Ext.create('Ext.data.Store', {
        storeId: 'totalAmountStore',
        fields:['id', 'preferentialType','activityId','activityName' ,'ticketNumber','commodityName','preferentialPrice','purchaseQuantity','assessedAmount'],
        // model: 'TutorialApp.model.sjes_user.Sjes_User',

        autoLoad: true,

        pageSize: 10, // items per page

        proxy: {
            type: 'ajax',
            url: 'resources/data/TotalAmount.json',
            //url: '/role/list',
            reader: {
                type: 'json',
                successProperty: 'success',
                rootProperty: 'items',
                totalProperty: 'total'
            }
        }
    });

    Ext.define('TotalAmount.Toolbar', {
        extend:'Ext.toolbar.Toolbar',
        xtype:'totalAmountTB',
        renderTo: document.body,
        items: [
            {
                xtype:'panel',
                html:'订单优惠明细'
            }
        ]
    });


    Ext.create('Ext.grid.Panel', {
        id:'totalAmount',
        store: Ext.data.StoreManager.lookup('totalAmountStore'),
        features: [{
            ftype: 'groupingsummary',
            hideGroupedHeader: false,
            enableGroupingMenu: false
        }, {
            ftype: 'summary',
            dock: 'bottom'
        }],
        columnLines: true, // 加上表格线
        columns: [
            {
                text: '优惠类型',
                flex: 1,
                // width:100,
                align: 'center',
                dataIndex: 'preferentialType',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return '合计'
                }
            }, {
                text: '活动ID',
                flex: 1,
                // width:100,
                align: 'center',
                dataIndex: 'activityId'
            }, {
                text: '活动名称',
                //flex: 1,
                width:200,
                align: 'center',
                dataIndex: 'activityName'
            }, {
                text: '券号',
                flex: 1,
                //  width:100,
                align: 'center',
                dataIndex: 'ticketNumber'
            }, {
                text: '商品名称',
                // flex: 1,
                width:200,
                align: 'center',
                dataIndex: 'commodityName'
            }, {
                text: '优惠单价',
                flex: 1,
                align: 'center',
                dataIndex: 'preferentialPrice',
                renderer: function(value, metaData, record){
                    return '￥'+value;
                }
            }, {
                text: '购买数量',
                width:80,
                align: 'center',
                dataIndex: 'purchaseQuantity'
            }, {
                text: '分摊金额',
                flex: 1,
                // width:100,
                align: 'center',
                summaryType: 'sum',
                dataIndex: 'assessedAmount',
                renderer: function(value, metaData, record){
                    return '￥'+value;
                },
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return '￥'+value;
                }
            }
        ],
        height: 400,
        width: 1000,
        renderTo: Ext.getBody(),
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: Ext.data.StoreManager.lookup('totalAmountStore'),
            displayInfo: true
        }/*,{
         xtype: 'orderGoodsDetailTB'
         }*/]
    });


    Ext.create('Ext.window.Window', {
        id:'totalAmount_Window',
        title: '订单优惠明细',
        height: 400,
        width: 1000,
        layout: 'fit',
        modal: true,//它背后的东西都会被遮罩
        items: {
            xtype: Ext.getCmp('totalAmount')
        }
    }).show();
}


//订单支付明细
function payAmount(id){
    //创建panel
    var panel = new Ext.Panel({
        width: 200,
        height: 500,
        frame: true
    });
    //创建数据显示模板
    var template = new Ext.XTemplate(
        '<table>',
        '<tpl for="kids">',     // interrogate the kids property within the data
        '<tr><td>{key}:</td><td>{value}</td>',
        '</tr></tpl>',
        '</table>'

    );

    //获取数据
    Ext.Ajax.request({
        url: '/payAmount',
        method: 'get',
        //params: { id: 2},
        success: function (response, options) {
            var responseJson = Ext.util.JSON.decode(response.responseText);
            template.compile();
            template.overwrite(panel.body, responseJson);
        },
        failure: function () {
            alert('系统出错，请联系管理人员！');
        }
    });

    Ext.create('Ext.window.Window', {
        title: '订单支付明细',
        height: 500,
        width: 400,
        layout: 'fit',
        items: {
            xtype: panel
        }
    }).show();
}


/**
 * 订单审核列表
 */
Ext.define('TutorialApp.view.orderManagement.OrderToExamineList', {
    extend: 'Ext.grid.Panel',
    xtype: 'orderToExamine_list',
    id: 'order_toExamine_list',

    columnLines: true,

    multiSelect : true,//能够多选记录


    selType: "checkboxmodel",//使用复选框来选择行

    selModel: {
        injectCheckbox: 0,
        mode: "SIMPLE",     //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true     //只能通过checkbox选择
    },


    initComponent:function(){
        var me = this;
        var store = Ext.create('TutorialApp.store.orderManagement.OrderToExamine');//创建store实例
        this.store = store;
        me.columns = [
            {
                text: '订单号',
                flex: 1,
                align: 'center',
                dataIndex: 'id'
            }, {
                text: '会员ID',
                flex: 1,
                align: 'center',
                dataIndex: 'memberId',
                renderer: function(value, metaData, record) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            }, {
                text: '收货人',
                flex: 1,
                align: 'center',
                dataIndex: 'consignee'
            }, {
                text: '手机号',
                flex: 1,
                align: 'center',
                dataIndex: 'telphone',
                renderer: function(value, metaData, record) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }

            }, {
                text: '收货地址',
                flex: 1,
                align: 'center',
                dataIndex: 'sendAddress',
                renderer: function(value, metaData, record){
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                  /*  var view = me.getView();
                    Ext.create('Ext.tip.ToolTip', {
                        // The overall target element.
                        target: view.el,
                        // Each grid row causes its own separate show and hide.
                        delegate: view.itemSelector,
                        // Moving within the row should not hide the tip.
                        trackMouse: true,
                        // Render immediately so that tip.body can be referenced prior to the first show.
                        renderTo: Ext.getBody(),
                        listeners: {
                            // Change content dynamically depending on which element triggered the show.
                            beforeshow: function updateTipBody(tip) {
                                tip.update(view.getRecord(tip.triggerElement).get('sendAddress'));
                            }
                        }
                    });
                    return value;*/
                }


            }, {
                text: '所属商场',
                flex: 1,
                align: 'center',
                dataIndex: 'ownMarket',
                renderer: function(value, metaData, record) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            }, {
                text: '下单来源',
                flex: 1,
                align: 'center',
                dataIndex: 'orderSource'
            }, {
                xtype: 'numbercolumn',
                format:'0.00',
                text: '销售总金额',
                flex: 1,
                align: 'center',
                dataIndex: 'saleAmount',
                renderer: function(value, metaData, record){
                    return '<a href=\"JavaScript:saleAmount('+record.get('id')+')\"/>￥'+value+'</a>';
                }

            }, {
                xtype: 'numbercolumn',
                format:'0.00',
                text: '优惠总金额',
                flex: 1,
                align: 'center',
                dataIndex: 'benefitAmount',
                renderer: function(value, metaData, record){
                    return '<a href=\"JavaScript:benefitAmount('+record.get('id')+')\"/>￥'+value+'</a>';
                }
            }, {
                xtype: 'numbercolumn',
                format:'0.00',
                text: '运费',
                flex: 1,
                align: 'center',
                dataIndex: 'transportAmount',
                renderer: function(value){
                    return '￥'+value;
                }
            }, {
                xtype: 'numbercolumn',
                format:'0.00',
                text: '支付总金额',
                flex: 1,
                align: 'center',
                dataIndex: 'payAmount',
                renderer: function(value, metaData, record){
                    return '<a href=\"JavaScript:payAmount('+record.get('id')+')\"/>￥'+value+'</a>';
                }
            }, {
                text: '支付时间',
                flex: 1,
                align: 'center',
                dataIndex: 'payDate',
                renderer: function(value, metaData, record) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            }, {
                text: '支付类型',
                flex: 1,
                align: 'center',
                dataIndex: 'payType'
            }, {
                text: '待审核原因',
                flex: 1,
                align: 'center',
                dataIndex: 'verificationReason',
                renderer: function(value, metaData, record){
                    var reason = null;
                    switch(value){
                        case 1: reason = '当天购买订单数超量'; break;
                        case 2: reason = '当天购买订单总金额超量'; break;
                        case 3: reason = '单品数量过大'; break;
                        case 4: reason = '首次订单'; break;
                    }
                    metaData.tdAttr = 'data-qtip="' + reason + '"';

                    return reason;
                }
            },{
                text:"操作",
                width:130,
                align:"center",
                xtype:'actioncolumn',//这里就是放置按钮的地方
                width:50,
                items: [{
                    iconCls : 'icon-thumbs-up',
                    tooltip: '通过',
                    handler: function(grid, rowIndex, colIndex) {
                        Ext.Msg.confirm('温馨提示', '确定要通过吗?', function (choice) {
                            if (choice === 'yes') {
                                Ext.Msg.alert('温馨提示','通过');
                            }
                        }, this);
                      /*  var rec = grid.getStore().getAt(rowIndex);
                        alert(rec.get('username'));*/

                    }
                },{
                    iconCls : 'icon-thumbs-down',
                    tooltip: '取消',
                    handler: function(grid, rowIndex, colIndex) {
                        Ext.create('Ext.window.Window', {
                            id: 'menuUpdateForm',

                            requires: [
                                'Ext.form.Panel',
                                'Ext.form.field.Text',
                                'Ext.layout.container.Fit',
                                'Ext.toolbar.Fill',
                                'Ext.toolbar.TextItem'
                            ],

                            bodyPadding: 10,
                            title: '温馨提示',
                            closable: true,
                            autoShow: true,
                            width: 450,
                            height:300,
                            layout: 'fit',
                            modal: true,//它背后的东西都会被遮罩
                            items: {
                                xtype: 'form',
                                reference: 'form',
                                bodyPadding: 10,
                                defaultType: 'textfield',

                                fieldDefaults: {
                                    anchor: '100%',
                                    labelAlign: 'right',
                                    labelWidth: 80
                                },
                                items: [{
                                    xtype: 'cancelReason'
                                }, {
                                    xtype     : 'textareafield',
                                    fieldLabel: "备注",
                                    grow      : true,
                                    name      : 'note',
                                    anchor    : '100%',
                                    height:  80
                                },{
                                    xtype: "container",
                                    layout: "hbox",
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '2 5 5 15',//上右下左
                                            html:'<input type="checkbox" id="" value=""/>将该用户加至黑名单'
                                        },
                                        {
                                            xtype:'ban'
                                        }
                                    ]
                                }],
                                buttons: [{
                                    xtype: 'tbtext',
                                    html: '错误',
                                    style: 'color:red',
                                    hidden: true
                                }, '->', {
                                    text: '提交',
                                    handler: function(){

                                    }
                                },{
                                    text: '取消',
                                    handler: function(){

                                    }
                                }]
                            }
                        });
                        /*  var rec = grid.getStore().getAt(rowIndex);
                         alert(rec.get('username'));*/
                    }
                }]
            }
        ];
        me.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:store,
            displayInfo: true
        },{
            xtype : Ext.create('TutorialApp.view.orderManagement.OrderToExamineTopToolbar',{//工具栏
                //url : '/toolbar'
            })
        },{
            xtype : Ext.create('TutorialApp.view.orderManagement.OrderToExamineTwoToolbar',{//工具栏
                //url : '/toolbar'
            })
        },{
            xtype : Ext.create('TutorialApp.view.orderManagement.OrderToExamineThreeToolbar',{//工具栏
                //url : '/toolbar'
            })
        }];
        me.callParent();
    }


});
