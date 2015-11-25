/**
 * 用户列表
 */
Ext.define('TutorialApp.view.sjes_user.Sjes_UserStatistics', {
    extend: 'Ext.grid.Panel',
    xtype: 'userstatistics',
    id: 'userstatistics_list',
    requires: [
        'TutorialApp.store.sjes_user.Sjes_UserStatistics'
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
        var store = Ext.create('TutorialApp.store.sjes_user.Sjes_UserStatistics');//创建store实例
        this.store = store;
        me.columns = [
           // {xtype: 'rownumberer'},
            {
                text: '用户名',
                width: 180,
                align: 'center',
                dataIndex: 'username'
            }, {
                text: '注册时间',
                width: 180,
                align: 'center',
                dataIndex: 'createdDate'
            }, {
                text: '最后登录时间',
                width: 180,
                align: 'center',
                dataIndex: 'lastLoginTime'
            }, {
                text: '用户类型',
                width: 100,
                align: 'center',
                dataIndex: 'userType',
                renderer: function(value){
                    return value == 1 ? '三江会员' : '三江惠用户';
                }
            }, {
                text: '账户余额',
                //flex: 1,
                width: 100,
                align: 'center',
                dataIndex: 'accountBalance'
            }, {
                text: '累计消费',
                width: 100,
                align: 'center',
                dataIndex: 'cumulativeConsumption'
            }, {
                text: '累计优惠',
                width: 100,
                align: 'center',
                dataIndex: 'cumulativeDiscount'
            }, {
                text: '有效期',
                width: 220,
                align: 'center',
                dataIndex: 'dateLine'
            },{
                text:"详细资料",
                width:130,
                align:"center",
                xtype:'actioncolumn',//这里就是放置按钮的地方
                items: [{
                    iconCls : 'icon-eye-open',
                    tooltip: '详细资料',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        alert(rec.get('username'));
                    }
                }]
            }
        ];
        me.dockedItems = [/*{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:store,
            displayInfo: true
        },*/{
            xtype : Ext.create('TutorialApp.view.sjes_user.Sjes_UserStatistics_TopToolbar',{//工具栏
                url : '/toolbar'

            })
        },{
            xtype : Ext.create('TutorialApp.view.sjes_user.Sjes_UserStatistics_TwoToolbar',{//工具栏
                url : '/toolbar'

            })
        },{
            xtype : Ext.create('TutorialApp.view.sjes_user.Sjes_UserStatistics_ThreeToolbar',{//工具栏
                url : '/toolbar'

            })
        },{
            xtype : Ext.create('TutorialApp.view.sjes_user.Sjes_UserStatistics_FourToolbar',{//工具栏
                url : '/toolbar'

            })
        },{
            xtype : Ext.create('TutorialApp.view.sjes_user.Sjes_UserStatistics_FiveToolbar',{//工具栏
                url : '/toolbar'

            })
        },{
            xtype : Ext.create('TutorialApp.view.sjes_user.Sjes_UserStatistics_SixToolbar',{//工具栏
                url : '/toolbar'

            })
        }];
        me.callParent();
    }
});
