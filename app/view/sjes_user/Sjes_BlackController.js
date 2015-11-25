var sjesBlack_states = Ext.create('Ext.data.Store', {
    fields: ['userType', 'name'],
    data : [
        // {"userMgrType":"1400", "name":"超级管理员"},
        {"blackType":"01", "name":"01"},
        {"blackType":"02", "name":"02"},
        {"blackType":"03", "name":"03"},
        {"blackType":"04", "name":"04"},
        {"blackType":"05", "name":"05"}
    ]
});

Ext.define('Ext.ux.limitType.ComboBox', {
    extend:'Ext.form.ComboBox',
    id:'sjesBlackTypeCB',
    alias: 'widget.sjesUserType',
    fieldLabel: '限制类型',
    store: sjesBlack_states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'userType',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});


Ext.define('TutorialApp.view.sjes_user.Sjes_BlackController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.sjesblack',

    addBlackRecord: function(){
        Ext.create('Ext.window.Window', {
            id: 'blackAddForm',

            requires: [
                'Ext.form.Panel',
                'Ext.form.field.Text',
                'Ext.layout.container.Fit',
                'Ext.toolbar.Fill',
                'Ext.toolbar.TextItem'
            ],

            bodyPadding: 10,
            title: '新增',
            closable: true,
            autoShow: true,
            width: 450,
            height:600,
            layout: 'fit',
            modal: true,//它背后的东西都会被遮罩
            items: {
                xtype: 'form',
                reference: 'form',
                bodyPadding: 10,
                defaultType: 'textfield',

                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'right',
                    labelWidth: 100
                },
                items: [{
                    xtype: "container",
                    layout: "hbox",
                    items: [
                        {
                            xtype: "textfield",
                            id:"username",
                            name: "username",
                            fieldLabel: "用户名",
                            allowBlank: false,
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            margin: '5 5 10 5'
                        },
                        {
                            xtype: "button",
                            text: '查找用户',
                            margin: '5 5 5 5',
                            handler: function () {

                                Ext.create('Ext.data.Store', {
                                    storeId: 'simpsonsStore',
                                    fields:['id', 'username','email','cardNum' ,'mobile'],
                                   // model: 'TutorialApp.model.sjes_user.Sjes_User',

                                    autoLoad: true,

                                    pageSize: 10, // items per page

                                    proxy: {
                                        type: 'ajax',
                                        url: 'resources/data/Sjes_User.json',
                                        //url: '/role/list',
                                        reader: {
                                            type: 'json',
                                            successProperty: 'success',
                                            rootProperty: 'items',
                                            totalProperty: 'total'
                                        }
                                    }
                                });

                                Ext.define('SjesBlack.UserBackToolbar', {
                                    extend:'Ext.toolbar.Toolbar',
                                    xtype: 'sjes_blackToolbar',
                                    renderTo: document.body,
                                    width   : 500,
                                    items: [

                                        {
                                            xtype    : 'textfield',
                                            name     : '用户',
                                            emptyText: '用户'
                                        },
                                        {
                                            xtype:'button',
                                            text:'查询',
                                            iconCls : 'icon-search'
                                        }
                                    ]
                                });

                                Ext.create('Ext.grid.Panel', {
                                    id:'Simpsons',
                                    store: Ext.data.StoreManager.lookup('simpsonsStore'),
                                    columns: [
                                        {
                                            text: '用户名',
                                           // flex: 1,
                                            width:120,
                                            align: 'center',
                                            dataIndex: 'username'
                                        }, {
                                            text: '手机号',
                                            //flex: 1,
                                            width:120,
                                            align: 'center',
                                            dataIndex: 'mobile'
                                        }, {
                                            text: '邮箱',
                                            //flex: 1,
                                            width:120,
                                            align: 'center',
                                            dataIndex: 'email'
                                        }, {
                                            text: '会员卡',
                                            //flex: 1,
                                            width:120,
                                            align: 'center',
                                            dataIndex: 'cardNum'
                                        },{
                                            text:"带回",
                                            width:120,
                                            align:"center",
                                            xtype:'actioncolumn',//这里就是放置按钮的地方
                                            items: [{
                                                iconCls : 'icon-ok',
                                               // icon: 'extjs-build/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                                                tooltip: 'Edit',
                                                handler: function(grid, rowIndex, colIndex) {
                                                    var rec = grid.getStore().getAt(rowIndex);
                                                    Ext.getCmp('email').setValue(rec.get('email'));
                                                    Ext.getCmp('custNum').setValue(rec.get('cardNum'));
                                                    Ext.getCmp('username').setValue(rec.get('username'));
                                                    Ext.getCmp('mobile').setValue(rec.get('mobile'));

                                                    Ext.getCmp('blackUser_searchWindow').close();
                                                }
                                            }]
                                        }
                                    ],
                                    height: 400,
                                    width: 600,
                                    renderTo: Ext.getBody(),
                                    dockedItems: [{
                                                xtype: 'pagingtoolbar',
                                                dock: 'bottom',
                                                store: Ext.data.StoreManager.lookup('simpsonsStore'),
                                                displayInfo: true
                                            },{
                                                 xtype: 'sjes_blackToolbar'
                                             }]
                                });



                                Ext.create('Ext.window.Window', {
                                    id:'blackUser_searchWindow',
                                    title: '查找用户',
                                    height: 400,
                                    width: 600,
                                    layout: 'fit',
                                    modal: true,//它背后的东西都会被遮罩
                                    items: {
                                        xtype: Ext.getCmp('Simpsons')
                                    }
                                }).show();

                            }
                        }
                    ]
                },{
                    xtype: "textfield",
                    id:"mobile",
                    name: "mobile",
                    fieldLabel: "手机号",
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    margin: '5 5 10 5'
                },{
                    xtype: "textfield",
                    id:"email",
                    name: "email",
                    fieldLabel: "邮箱",
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    margin: '5 5 10 5'
                },{
                    xtype: "textfield",
                    id:"custNum",
                    name: "custNum",
                    fieldLabel: "会员卡",
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    margin: '5 5 10 5'
                },{
                    xtype: "textfield",
                    id:"lastLoginIp",
                    name: "lastLoginIp",
                    fieldLabel: "最近访问IP",
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    margin: '5 5 10 5'
                },{
                    xtype: "textfield",
                    id:"lastLoginTime",
                    name: "lastLoginTime",
                    fieldLabel: "最近访问时间",
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    margin: '5 5 10 5'
                },{
                    xtype     : 'textareafield',
                    grow      : true,
                    name      : 'reason',
                    fieldLabel: '黑名单理由',
                    anchor    : '100%',
                    height:100,
                    margin: '5 5 10 5'
                },{
                        xtype: 'sjesUserType'
                }],
                buttons: [{
                    xtype: 'tbtext',
                    html: '错误',
                    style: 'color:red',
                    hidden: true
                }, '->', {
                    text: '提交',
                    handler: function(){

                    }
                }]
            }
        });
    },

    editBlackRecord: function(){
        Ext.Msg.alert('message','edit');
    },

    removeBlackRecord: function(){
        Ext.Msg.alert('message','remove');
    },

    viewBlackRecord: function(){
        Ext.Msg.alert('message','view');
    },

    searchBlack: function(){
        Ext.Msg.alert('message','search');
    }
});