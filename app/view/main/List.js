/**
 * This view is an example list of people.
 */

Ext.define('TutorialApp.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    requires: [
        'TutorialApp.store.Personnel'
    ],
    columnLines: true,
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
            },{
                xtype: 'widgetcolumn',
                text:'操作',
                width:150,
                align:'center',
                widget: {
                    width: 90,
                    xtype: 'button',
                    text:'查看',
                    handler: function(btn) {
                        var rec = btn.getWidgetRecord();
                        Ext.Msg.alert("Button clicked", "Hey! " + rec.get('name'));
                    }
                }
            }
        ];
        me.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:store,
            displayInfo: true
        }];
        me.callParent();
    },
    listeners: {
        select: 'onItemSelected'
    }


/*    store: {
        type: 'personnel'
    },

    columns: [
        { text: 'Name',  dataIndex: 'name' },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Phone', dataIndex: 'phone', flex: 1 }
    ],

    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: {
            type: 'personnel'
        },
        dock: 'bottom',
        displayInfo: true
    }],

    listeners: {
        select: 'onItemSelected'
    }*/
});
