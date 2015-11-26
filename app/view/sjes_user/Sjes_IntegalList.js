/**
 * 积分列表
 */
Ext.define('TutorialApp.view.sjes_user.Sjes_Integal', {
    extend: 'Ext.grid.Panel',
    xtype: 'sjes_integallist',
    id: 'sjes_integal_list',
    requires: [
        'TutorialApp.store.sjes_user.Sjes_Integal'
    ],

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
        var store = Ext.create('TutorialApp.store.sjes_user.Sjes_Integal');//创建store实例
        this.store = store;
        me.columns = [
            // {xtype: 'rownumberer'},
            {
                text: '积分日期',
                flex: 1,
                align: 'center',
                dataIndex: 'integalTime'
            },{
                text: '积分数量',
                flex: 1,
                align: 'center',
                dataIndex: 'integalNum'
            }, {
                text: '积分类型',
                flex: 1,
                align: 'center',
                dataIndex: 'integalType'
            }, {
                text: '积分来源',
                flex: 1,
                align: 'center',
                dataIndex: 'integalSource'
            },  {
                text: '备注',
                flex: 1,
                align: 'center',
                dataIndex: 'remarks'
            },{
             text:"操作",
             width:130,
             align:"center",
             xtype:'actioncolumn',//这里就是放置按钮的地方
             width:50,
             items: [{
                 iconCls : 'icon-eye-open',
             tooltip: '显示',
             handler: function(grid, rowIndex, colIndex) {
             var rec = grid.getStore().getAt(rowIndex);
                 Ext.create('Ext.window.Window', {
                     title: '显示',
                     height: 200,
                     width: 400,
                     layout: 'fit',
                     items: {
                         xtype: 'panel',
                         html: '<table><tr><td>积分日期</td><td>'+rec.get('integalTime') +'</td></tr><tr><td>积分数量</td><td>'+rec.get('integalNum')+'</td></tr><tr><td>积分类型</td><td>'+rec.get('integalType')+'</td></tr><tr><td>积分来源</td><td>'+rec.get('integalSource') +'</td></tr><tr><td>备注</td><td>'+rec.get('remarks') +'</td></tr></table>'

                     }
                 }).show();
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
            xtype : Ext.create('TutorialApp.view.sjes_user.Sjes_IntegalTopToolbar',{//工具栏
                url : '/toolbar'

            })
        }];
        me.callParent();
    }
});
