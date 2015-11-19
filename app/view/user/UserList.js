/**
 * 用户列表
 */

Ext.define('TutorialApp.view.user.User', {
    extend: 'Ext.grid.Panel',
    xtype: 'userlist',
    id: 'user_list',
    requires: [
        'TutorialApp.store.User',
        'TutorialApp.view.user.UserTopToolbar'
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
        var store = Ext.create('TutorialApp.store.User');//创建store实例
        this.store = store;
        me.columns = [
            {
                text: '用户名',
                flex: 1,
                align: 'center',
                dataIndex: 'username'
            }, {
                text: '密码',
                flex: 1,
                align: 'center',
                dataIndex: 'password'
            }, {
                text: '全名',
                flex: 1,
                align: 'center',
                dataIndex: 'fullName'
            }, {
                text: '所属部门',
                flex: 1,
                align: 'center',
                dataIndex: 'org'
            }, {
                text: '过期时间',
                flex: 1,
                align: 'center',
                dataIndex: 'expiredDate'
            }, {
                text: '手机号',
                flex: 1,
                align: 'center',
                dataIndex: 'mobile'
            }/*, {
                text: '描述',
                flex: 1,
                align: 'center',
                dataIndex: 'description'
            }*/
        ];
        me.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:store,
            displayInfo: true
        },{
            xtype : Ext.create('TutorialApp.view.user.UserTopToolbar',{//工具栏
                url : '/toolbar'
            })
        }/*{
            xtype: 'app-userTopToolbar',
            dock: 'top'
        }*/];
        me.callParent();
    }
});
