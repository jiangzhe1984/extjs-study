/**
 * 黑名单列表
 */
Ext.define('TutorialApp.view.sjes_user.Sjes_Black', {
    extend: 'Ext.grid.Panel',
    xtype: 'sjes_blacklist',
    id: 'sjes_black_list',
    requires: [
        'TutorialApp.store.sjes_user.Sjes_Black'
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
        var store = Ext.create('TutorialApp.store.sjes_user.Sjes_Black');//创建store实例
        this.store = store;
        me.columns = [
           // {xtype: 'rownumberer'},
            {
                text: '用户名',
                flex: 1,
                align: 'center',
                dataIndex: 'username'
            },{
                text: '手机',
                flex: 1,
                align: 'center',
                dataIndex: 'mobile'
            }, {
                text: '邮箱',
                flex: 1,
                align: 'center',
                dataIndex: 'email'
            }, {
                text: '会员卡（惠用户）',
                flex: 1,
                align: 'center',
                dataIndex: 'custNum'
            },  {
                text: '最近访问IP地址',
                flex: 1,
                align: 'center',
                dataIndex: 'lastLoginIp'
            }, {
                text: '黑名单时间',
                flex: 1,
                align: 'center',
                dataIndex: 'createTime'
            }, {
                text: '黑名单理由',
                flex: 1,
                align: 'center',
                dataIndex: 'reason'
            }, {
                text: '限制类型',
                flex: 1,
                align: 'center',
                dataIndex: 'limitType'
            }/*,{
                text:"操作",
                width:130,
                align:"center",
                xtype:'actioncolumn',//这里就是放置按钮的地方
                width:50,
                items: [{
                    icon: 'extjs-build/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                    tooltip: 'Edit',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        alert(rec.get('username'));
                    }
                }]
            }*/
        ];
        me.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:store,
            displayInfo: true
        },{
            xtype : Ext.create('TutorialApp.view.sjes_user.Sjes_BlackTopToolbar',{//工具栏
                url : '/toolbar'

            })
        }];
        me.callParent();
    }
});
