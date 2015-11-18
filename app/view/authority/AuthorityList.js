/**
 * 权限资源列表
 */

Ext.define('TutorialApp.view.authority.Authority', {
    extend: 'Ext.grid.Panel',
    xtype: 'authoritylist',
    id: 'authority_list',
    requires: [
        'TutorialApp.store.Authority',
        'TutorialApp.view.authority.AuthorityTopToolbar'
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
        var store = Ext.create('TutorialApp.store.Authority');//创建store实例
        this.store = store;
        me.columns = [
            {
                text: '权限名称',
                flex: 1,
                align: 'center',
                dataIndex: 'authorityname'
            }, {
                text: '权限类型',
                flex: 1,
                align: 'center',
                dataIndex: 'authoritytype'
            }, {
                text: '显示名称',
                flex: 1,
                align: 'center',
                dataIndex: 'displayref'
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
            xtype : Ext.create('TutorialApp.view.authority.AuthorityTopToolbar',{//工具栏
                url : '/role/toolbar'
            })
        }/*{
         xtype: 'app-orgTopToolbar',
         dock: 'top'
         }*/];
        me.callParent();
    }
});
