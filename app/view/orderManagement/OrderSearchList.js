
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
 * 订单查询列表
 */
Ext.define('TutorialApp.view.orderManagement.OrderSearch', {
    extend: 'Ext.grid.Panel',
    xtype: 'orderSearch_list',
    id: 'order_search_list',
    requires: [
        'TutorialApp.store.orderManagement.OrderSearch',
        'TutorialApp.view.orderManagement.OrderSearchTopToolbar'
    ],

    columnLines: true,


    initComponent:function(){
        var me = this;
        var store = Ext.create('TutorialApp.store.orderManagement.OrderSearch');//创建store实例
        this.store = store;
        me.columns = [
            {
                text: '订单号',
                flex: 1,
                align: 'center',
                dataIndex: 'id'
            }, {
                text: '关联单号',
                flex: 1,
                align: 'center',
                dataIndex: 'parentId'
            }, /*{
             text: '部门管理员',
             flex: 1,
             align: 'center',
             dataIndex: 'manager'
             },*/ {
                text: '所属商场',
                flex: 1,
                align: 'center',
                dataIndex: 'ownMarket'
            }, {
                text: '会员ID',
                flex: 1,
                align: 'center',
                dataIndex: 'memberId'
            }, {
                text: '收货人',
                flex: 1,
                align: 'center',
                dataIndex: 'consignee'
            }, {
                text: '手机号',
                flex: 1,
                align: 'center',
                dataIndex: 'telphone'
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
                dataIndex: 'payDate'
            }, {
                text: '支付类型',
                flex: 1,
                align: 'center',
                dataIndex: 'payType'
            }, {
                text: '订单状态',
                flex: 1,
                align: 'center',
                dataIndex: 'orderStatus'
            }, {
                text: '物流状态',
                flex: 1,
                align: 'center',
                dataIndex: 'logisticStatus'
            }
        ];
        me.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:store,
            displayInfo: true
        },{
            xtype : Ext.create('TutorialApp.view.orderManagement.OrderSearchTopToolbar',{//工具栏
                //url : '/toolbar'
            })
        },{
            xtype : Ext.create('TutorialApp.view.orderManagement.OrderSearchTwoToolbar',{//工具栏
                //url : '/toolbar'
            })
        },{
            xtype : Ext.create('TutorialApp.view.orderManagement.OrderSearchThreeToolbar',{//工具栏
                //url : '/toolbar'
            })
        },{
            xtype : Ext.create('TutorialApp.view.orderManagement.OrderSearchFourToolbar',{//工具栏
                //url : '/toolbar'
            })
        }];
        me.callParent();
    },

  /*  listeners: {
        select: function (sender, record) {
            // alert(record.get('name'));
            Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
        }
    }*/
});
