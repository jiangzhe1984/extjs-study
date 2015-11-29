

//黑名单控制器
Ext.define('TutorialApp.view.sjes_user.Sjes_BlackController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.sjesblack',

    //添加
    addBlackRecord: function(){

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
                                //弹出商城用户列表供选择
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
                                //查询条件工具栏
                                Ext.define('SjesBlack.UserBackToolbar', {
                                    extend:'Ext.toolbar.Toolbar',
                                    xtype: 'sjes_blackToolbar',
                                    renderTo: document.body,
                                    width   : 500,
                                    items: [

                                        {
                                            xtype    : 'textfield',
                                            id:'search_blackUser_name',
                                            emptyText: '用户'
                                        },
                                        {
                                            xtype:'button',
                                            text:'查询',
                                            iconCls : 'icon-search',
                                            handler:function(){
                                                var search_blackUser_name = Ext.getCmp('search_blackUser_name').getValue();//查询条件
                                                var simpsonsStore = Ext.data.StoreManager.lookup('simpsonsStore');


                                                simpsonsStore.filter('username', search_blackUser_name);//过滤条件
                                                simpsonsStore.load();//列表刷新
                                            }
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
                                                tooltip: '带回',
                                                handler: function(grid, rowIndex, colIndex) {//用户带回到黑名单添加表单中
                                                    var rec = grid.getStore().getAt(rowIndex);
                                                    Ext.getCmp('email').setValue(rec.get('email'));
                                                    Ext.getCmp('custNum').setValue(rec.get('cardNum'));
                                                    Ext.getCmp('username').setValue(rec.get('username'));
                                                    Ext.getCmp('mobile').setValue(rec.get('mobile'));

                                                    Ext.getCmp('blackUser_searchWindow').close();//关闭窗口
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
                    xtype: 'sjesUserType',
                    name:'limitType',
                    allowBlank: false
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
//修改
    editBlackRecord: function(){
        var grid = Ext.getCmp('sjes_black_list'), selection = grid
            .getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择黑名单用户!');
        }else if(selection.length > 1) {
            Ext.Msg.alert('message', '一次操作一条!');
        }else{
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

            Ext.create('Ext.window.Window', {
                id: 'blackEditForm',

                requires: [
                    'Ext.form.Panel',
                    'Ext.form.field.Text',
                    'Ext.layout.container.Fit',
                    'Ext.toolbar.Fill',
                    'Ext.toolbar.TextItem'
                ],

                bodyPadding: 10,
                title: '修改',
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
                                margin: '5 5 10 5',
                                bind: selection[0].get('username')
                            },
                            {
                                xtype: "button",
                                text: '查找用户',
                                margin: '5 5 5 5',
                                handler: function () {
                                    //打开商城用户供选择
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
                                    //查询条件工具栏
                                    Ext.define('SjesBlack.UserBackToolbar', {
                                        extend:'Ext.toolbar.Toolbar',
                                        xtype: 'sjes_blackToolbar',
                                        renderTo: document.body,
                                        width   : 500,
                                        items: [

                                            {
                                                xtype    : 'textfield',
                                                id:'search_blackUser_name',
                                                emptyText: '用户'
                                            },
                                            {
                                                xtype:'button',
                                                text:'查询',
                                                iconCls : 'icon-search',
                                                handler:function(){
                                                    var search_blackUser_name = Ext.getCmp('search_blackUser_name').getValue();//查询条件
                                                    var simpsonsStore = Ext.data.StoreManager.lookup('simpsonsStore');


                                                    simpsonsStore.filter('username', search_blackUser_name);//过滤条件
                                                    simpsonsStore.load();//列表刷新
                                                }
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
                                                    tooltip: '带回',
                                                    handler: function(grid, rowIndex, colIndex) {//商城用户带回到黑名单表单中
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
                        margin: '5 5 10 5',
                        bind: selection[0].get('mobile')
                    },{
                        xtype: "textfield",
                        id:"email",
                        name: "email",
                        fieldLabel: "邮箱",
                        allowBlank: false,
                        beforeLabelTextTpl: [
                            '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                        ],
                        margin: '5 5 10 5',
                        bind: selection[0].get('email')
                    },{
                        xtype: "textfield",
                        id:"custNum",
                        name: "custNum",
                        fieldLabel: "会员卡",
                        allowBlank: false,
                        beforeLabelTextTpl: [
                            '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                        ],
                        margin: '5 5 10 5',
                        bind: selection[0].get('custNum')
                    },{
                        xtype: "textfield",
                        id:"lastLoginIp",
                        name: "lastLoginIp",
                        fieldLabel: "最近访问IP",
                        allowBlank: false,
                        beforeLabelTextTpl: [
                            '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                        ],
                        margin: '5 5 10 5',
                        bind: selection[0].get('lastLoginIp')
                    },{
                        xtype: "textfield",
                        id:"lastLoginTime",
                        name: "lastLoginTime",
                        fieldLabel: "最近访问时间",
                        allowBlank: false,
                        beforeLabelTextTpl: [
                            '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                        ],
                        margin: '5 5 10 5',
                        bind: selection[0].get('lastLoginTime')
                    },{
                        xtype     : 'textareafield',
                        grow      : true,
                        name      : 'reason',
                        fieldLabel: '黑名单理由',
                        anchor    : '100%',
                        height:100,
                        margin: '5 5 10 5',
                        bind: selection[0].get('reason')
                    },{
                        xtype: 'sjesUserType',
                        name:'limitType',
                        listeners:{
                            beforerender:function(){

                                Ext.getCmp('sjesBlackTypeCB').setValue(selection[0].get('limitType')); //设置 combo 值（显示值）
                                //  combo.clearValue();                 //清除 combo 值

                            }
                        }
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
        }

    },
    //删除
    removeBlackRecord: function(){
        var grid = Ext.getCmp('sjes_black_list'), selection = grid
            .getSelectionModel().getSelection(), message = '';
        if (selection.length == 1) // 如果只选择了一条
            message = ' 『' + selection[0].get('username') + '』 吗?';
        else if(selection.length == 0){
            Ext.Msg.alert('message','请选择数据!');
        }else { // 选择了多条记录
            message = '<ol>';
            Ext.Array.each(grid.getSelectionModel().getSelection(), function(record) {
                message += '<li>' + record.get('username') + '</li>';
            });
            message += '</ol>';
            message = '以下 ' + selection.length + ' 条记录吗?' + message;
        }

        if(message != ''){
            Ext.Msg.confirm('确定删除', '确定要删除 <strong>列表</strong> 中的' + message, function(btn) {
                if (btn == 'yes') {
                    grid.getStore().remove(grid.getSelectionModel().getSelection());
                    // grid.getStore().sync();
                }
            })
        }
    },
    //查看
    viewBlackRecord: function(){
        var grid = Ext.getCmp('sjes_black_list'), selection = grid
            .getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择黑名单用户!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{ Ext.create('Ext.window.Window', {
            title: '显示',
            height: 200,
            width: 400,
            layout: 'fit',
            items: {
                xtype: 'panel',
                html: '<table><tr><td>用户名</td><td>'+selection[0].get('username') +'</td></tr><tr><td>手机号</td><td>'+selection[0].get('mobile') +'</td></tr><tr><td>邮箱</td><td>'+selection[0].get('email') +'</td></tr><tr><td>会员卡</td><td>'+selection[0].get('custNum') +'</td></tr></table>'

            }
        }).show();
        }
    },
    //查询
    searchBlack: function(){
        Ext.Msg.alert('message','search');
    }
});