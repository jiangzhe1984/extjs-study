/**
 * This view is an example list of people.
 */

Ext.define('TutorialApp.view.personnel.Personnel', {
    extend: 'Ext.grid.Panel',
    xtype: 'personnellist',

    requires: [
        'TutorialApp.store.Personnel',
        'TutorialApp.view.personnel.PersonnelTopToolbar'
    ],

    columnLines: true,

    multiSelect : true,//能够多选记录

    initComponent:function(){
        var me = this;
        var store = Ext.create('TutorialApp.store.Personnel');//创建store实例
        this.store = store;
        me.columns = [

            {
                text: 'Name',
                flex: 1,
                align: 'center',
                dataIndex: 'name'
            }, {
                text: 'Email',
                flex: 1,
                align: 'center',
                dataIndex: 'email'
            }, {
                text: 'Phone',
                flex: 1,
                align: 'center',
                dataIndex: 'phone'
            }
        ];
        me.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:store,
            displayInfo: true
        },{
            xtype: 'app-personnelTopToolbar',
            dock: 'top'
        }];
        me.callParent();
    }
});
