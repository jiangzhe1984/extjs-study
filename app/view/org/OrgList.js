/**
 * 部门列表
 */

Ext.define('TutorialApp.view.org.Org', {
    extend: 'Ext.grid.Panel',
    xtype: 'orglist',
    id: 'org_list',
    requires: [
        'TutorialApp.store.Org',
        'TutorialApp.view.org.OrgTopToolbar'
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
        var store = Ext.create('TutorialApp.store.Org');//创建store实例
        this.store = store;
        me.columns = [
            {
                text: '部门名称',
                flex: 1,
                align: 'center',
                dataIndex: 'orgName'
            }, {
                text: '部门编号',
                flex: 1,
                align: 'center',
                dataIndex: 'orgNum'
            }, {
                text: '部门管理员',
                flex: 1,
                align: 'center',
                dataIndex: 'manager'
            }, {
                text: '父部门',
                flex: 1,
                align: 'center',
                dataIndex: 'parentOrg'
            }, {
                text: '描述',
                flex: 1,
                align: 'center',
                dataIndex: 'description'
            }
        ];
        me.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:store,
            displayInfo: true
        },{
            xtype : Ext.create('TutorialApp.view.org.OrgTopToolbar',{//工具栏
                url : '/toolbar'
            })
        }/*{
            xtype: 'app-orgTopToolbar',
            dock: 'top'
        }*/];
        me.callParent();
    }
});
