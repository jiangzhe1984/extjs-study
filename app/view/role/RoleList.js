/**
 * 角色列表
 */

Ext.define('TutorialApp.view.role.Role', {
    extend: 'Ext.grid.Panel',
    xtype: 'rolelist',
    id: 'role_list',
    requires: [
        'TutorialApp.store.Role',
        'TutorialApp.view.role.RoleTopToolbar'
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
        var store = Ext.create('TutorialApp.store.Role');//创建store实例
        this.store = store;
        me.columns = [
          /*  {
                text: 'ID',
                flex: 1,
                align: 'center',
                dataIndex: 'id'
            },*/
            {
                text: '角色名称',//角色列表
                flex: 1,
                align: 'center',
                dataIndex: 'name'
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
            xtype : Ext.create('TutorialApp.view.role.RoleTopToolbar',{//工具栏
                url : '/toolbar'

            })
        }
            /*{
            xtype: 'app-roleTopToolbar',
            dock: 'top'
        }*/];
        me.callParent();
    }
});
