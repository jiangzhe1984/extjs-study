/**
 * This view is an example list of people.
 */

Ext.define('TutorialApp.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    requires: [
        'TutorialApp.store.Personnel',
        'TutorialApp.view.login.Login'
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

                        Ext.create('Ext.window.Window', {

                            requires: [
                                'Ext.form.Panel',
                                'Ext.form.field.Text',
                                'Ext.layout.container.Fit',
                                'Ext.toolbar.Fill',
                                'Ext.toolbar.TextItem'
                            ],


                            bodyPadding: 10,
                            title: '查看',
                            closable: true,
                            autoShow: true,
                            width: 350,
                            layout: 'fit',

                            items: {
                                xtype: 'form',
                                reference: 'form',
                                bodyPadding: 10,
                                defaultType: 'textfield',

                                fieldDefaults: {
                                    anchor: '100%',
                                    labelAlign: 'right',
                                    labelWidth: 40
                                },
                                items: [{
                                    fieldLabel: 'Name',
                                    name: 'name',
                                    itemId: 'name',
                                    allowBlank: false,
                                    bind: rec.get('name')
                                }, {
                                    fieldLabel: 'Email',
                                    name: 'email',
                                    inputType: 'email',
                                    allowBlank: false,
                                    bind: rec.get('email')
                                }, {
                                    fieldLabel: 'Phone',
                                    name: 'phone',
                                    inputType: 'phone',
                                    allowBlank: false,
                                    bind: rec.get('phone')
                                }]/*,
                                buttons: [{
                                    xtype: 'tbtext',
                                    html: '账户不存在或者密码错误',
                                    style: 'color:red',
                                    hidden: true
                                }, '->', {
                                    text: '登录',
                                    reference: 'login',
                                    formBind: true,
                                    handler: 'onLoginClick'
                                }]*/
                            }
                        });

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
