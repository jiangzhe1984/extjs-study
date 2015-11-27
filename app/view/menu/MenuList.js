/**
 * 菜单列表
 */

Ext.define('TutorialApp.view.menu.Menu', {
    extend: 'Ext.grid.Panel',
    xtype: 'menulist',
    id: 'menu_list',
    requires: [
        'TutorialApp.store.Menu',
        'TutorialApp.view.menu.MenuTopToolbar'
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
        var store = Ext.create('TutorialApp.store.Menu');//创建store实例
        this.store = store;
        me.columns = [
            {
                text: '菜单名称',
                flex: 1,
                align: 'center',
                dataIndex: 'text'
            }/*,  {
                text: '是否是父菜单',
                flex: 1,
                align: 'center',
                dataIndex: 'parent'
            }*/,  {
                text: '功能模块地址',
                flex: 1,
                align: 'center',
                dataIndex: 'url'
            }, {
                text: '父菜单',
                flex: 1,
                align: 'center',
                dataIndex: 'parentMenu'
            }
        ];
        me.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:store,
            displayInfo: true
        },{
            xtype : Ext.create('TutorialApp.view.menu.MenuTopToolbar',{//工具栏
                url : '/toolbar'
            })
        }/*{
         xtype: 'app-orgTopToolbar',
         dock: 'top'
         }*/];
        me.callParent();
    }
});
