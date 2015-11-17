/**
 * 用户列表
 */
Ext.define('TutorialApp.view.sjes_user.Sjes_User', {
    extend: 'Ext.grid.Panel',
    xtype: 'sjes_userlist',
    id: 'sjes_user_list',
    requires: [
        'TutorialApp.store.sjes_user.Sjes_User',
        'TutorialApp.view.sjes_user.Sjes_UserTopToolbar'
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
        var store = Ext.create('TutorialApp.store.sjes_user.Sjes_User');//创建store实例
        this.store = store;
        me.columns = [
            {xtype: 'rownumberer'},
            {
                text: '用户名',
                flex: 1,
                align: 'center',
                dataIndex: 'username'
            }, {
                text: '昵称',
                flex: 1,
                align: 'center',
                dataIndex: 'nickname'
            }, {
                text: '邮箱',
                flex: 1,
                align: 'center',
                dataIndex: 'email'
            }, {
                text: '密码',
                flex: 1,
                align: 'center',
                dataIndex: 'password'
            }, {
                text: '手机号',
                flex: 1,
                align: 'center',
                dataIndex: 'mobile'
            }, {
                text: '性别',
                flex: 1,
                align: 'center',
                dataIndex: 'sex',
                renderer: function(value){
                    return value == 1 ? '男' : '女';
                }
            }, {
             text: '会员卡号',
             flex: 1,
             align: 'center',
             dataIndex: 'cardNum'
             }, {
                text: '是否激活',
                flex: 1,
                align: 'center',
                dataIndex: 'enable',
                renderer: function(value){
                    return value  ? '是' : '否';
                }
            }
        ];
        me.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:store,
            displayInfo: true
        },{
            xtype: 'app-sjesuserTopToolbar',
            dock: 'top'
        }];
        me.callParent();
    }
});
