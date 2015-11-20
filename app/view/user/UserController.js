// The data store containing the list of states
var states = Ext.create('Ext.data.Store', {
    fields: ['userMgrType', 'name'],
    data : [
       // {"userMgrType":"1400", "name":"超级管理员"},
        {"userMgrType":"1401", "name":"系统管理员"},
        {"userMgrType":"1402", "name":"普通用户"}
    ]
});


// Create the combo box, attached to the states data store
Ext.define('Ext.ux.ComboBox', {
    extend:'Ext.form.ComboBox',
    alias: 'widget.userMgrType',
    fieldLabel: '用户类型',
    store: states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'userMgrType',

    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});

Ext.define('TutorialApp.view.user.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.userc',

    addUserRecord: function(){
        var grid = Ext.getCmp('user_list');
        Ext.create('Ext.window.Window', {
            id: 'userSaveForm',

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
            width: 350,
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
                    labelWidth: 40
                },
                items: [{
                    fieldLabel: '用户名',
                    name: 'username',
                    itemId: 'username',
                    allowBlank: false,
                    emptyText: '请输入用户名'
                }, {
                    fieldLabel: '密码',
                    name: 'password',
                    allowBlank: false,
                    emptyText: '请输入密码'
                }, {
                    fieldLabel: '全名',
                    name: 'fullName',
                     allowBlank: false,
                     emptyText: '请输入全名'
                }, {
                    fieldLabel: '所属部门',
                    name: 'org',
                    allowBlank: false,
                    emptyText: '请输入所属部门'
                }, {
                    fieldLabel: '手机号',
                    name: 'mobile',
                    allowBlank: false,
                    emptyText: '请输入手机号'
                }, {
                    xtype: 'userMgrType',
                    name: 'userMgrType'
                }, {
                    xtype: 'datefield',
                    anchor: '100%',
                    fieldLabel: '过期时间',
                    name: 'expiredDate',
                    allowBlank: false,
                    emptyText: '请输入过期时间',
                    value: new Date()
                }, {
                    fieldLabel: '描述',
                    name: 'description',
                    allowBlank: false,
                    emptyText: '请输入描述'
                }
                ],
                buttons: [{
                    xtype: 'tbtext',
                    html: '错误',
                    style: 'color:red',
                    hidden: true
                }, '->', {
                    text: '保存',
                    handler: function(){
                        var saveForm = Ext.getCmp('userSaveForm');
                        var form = this.up('form').getForm();
                        var formValues = form.getValues();
                        if (form.isValid()) {
                            Ext.Ajax.request({
                                url:'/user/save',
                                params: {'username':formValues["username"],password: formValues["password"],expiredDate: formValues["expiredDate"],fullName: formValues["fullName"],mobile: formValues["mobile"],userMgrType: formValues["userMgrType"],org: formValues["org"],'description':formValues["description"]},
                                // async: false,
                                method: 'post',
                                success: function(response){
                                    var result = Ext.decode(response.responseText);
                                    if(result.state == 'success'){
                                        saveForm.close();
                                        grid.getStore().load();
                                    }else{
                                        Ext.Msg.alert('出错了');
                                    }
                                }
                            });

                        }


                    }
                }]
            }
        });
    },
//不能为空
    editUserRecord: function(){
        var grid = Ext.getCmp('user_list');

        var selection = grid.getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择用户!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{
                Ext.create('Ext.window.Window', {
                    id: 'userUpdateForm',

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
                    width: 350,
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
                            labelWidth: 40
                        },
                        items: [{
                            fieldLabel: '用户名',
                            name: 'username',
                            itemId: 'username',
                            allowBlank: false,
                            bind: selection[0].get('username')
                        }, {
                            fieldLabel: '密码',
                            name: 'password',
                            allowBlank: false,
                            bind: selection[0].get('password')
                        }, {
                            fieldLabel: '全名',
                            name: 'fullName',
                            allowBlank: false,
                            bind: selection[0].get('fullName')
                        }, {
                            fieldLabel: '所属部门',
                            name: 'org',
                            allowBlank: false,
                            bind: selection[0].get('org')
                        }, {
                            fieldLabel: '手机号',
                            name: 'mobile',
                            allowBlank: false,
                            bind: selection[0].get('mobile')
                        }, {
                            xtype: 'userMgrType',
                            name: 'userMgrType'
                        }, {
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: '过期时间',
                            name: 'expiredDate',
                            allowBlank: false,
                            emptyText: '请输入过期时间',
                            bind: selection[0].get('expiredDate')
                        }, {
                            fieldLabel: '描述',
                            name: 'description',
                            allowBlank: false,
                            bind: selection[0].get('description')
                        }
                        ],

                        buttons: [{
                            xtype: 'tbtext',
                            html: '错误',
                            style: 'color:red',
                            hidden: true
                        }, '->', {
                            text: '修改',
                            handler: function(){

                                var updateForm = Ext.getCmp('userUpdateForm');
                                var form = this.up('form').getForm();
                                var formValues = form.getValues();

                                if (form.isValid()) {
                                    Ext.Ajax.request({
                                        url:'/user/update',
                                        params: {'id':selection[0].getId(),'username':formValues["username"],password: formValues["password"],expiredDate: formValues["expiredDate"],fullName: formValues["fullName"],mobile: formValues["mobile"],userMgrType: formValues["userMgrType"],org: formValues["org"],'description':formValues["description"]},
                                        // async: false,
                                        method: 'post',
                                        success: function(response){

                                            var result = Ext.decode(response.responseText);
                                            if(result.state = 'success'){
                                                updateForm.close();
                                                var current = grid.store.currentPage;
                                                grid.store.loadPage(current);
                                            }else{
                                                Ext.Msg.alert('出错了');
                                            }
                                        }
                                    });

                                }
                            }
                        }]
                    }
                });

        }

    },

    removeUserRecord: function(){
        var grid = Ext.getCmp('user_list'), selection = grid
            .getSelectionModel().getSelection();
        var message = '',ids = '';

        if (selection.length == 1) // 如果只选择了一条
            ids = selection[0].get('id'),
                message = ' 『' + selection[0].get('username') + '』 吗?';

        else if(selection.length == 0){
            Ext.Msg.alert('message','请选择部门!');
        }else { // 选择了多条记录
            message = '<ol>';
            Ext.Array.each(grid.getSelectionModel().getSelection(), function(record) {
                message += '<li>' + record.get('username') + '</li>';
                if(ids != ''){
                    ids += ','+record.getId();
                }else{
                    ids += record.getId();
                }
            });
            message += '</ol>';
            message = '以下 ' + selection.length + ' 条记录吗?' + message;
        }

        if(message != ''){
            Ext.Msg.confirm('确定删除', '确定要删除 <strong>列表</strong> 中的' + message, function(btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url:'/user/remove',
                        params: {'ids':ids},
                        // async: false,
                        method: 'post',
                        success: function(response, opts){
                            var obj = Ext.decode(response.responseText);
                            if(obj.state == 'success'){
                                grid.getStore().remove(grid.getSelectionModel().getSelection());
                                grid.getStore().load();
                                // grid.getStore().sync();
                            }else{
                                Ext.Msg.alert('出错了');
                            }

                        }
                    });

                }
            })
        }

    },

    viewUserRecord: function(){
        var grid = Ext.getCmp('user_list'), selection = grid
            .getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择用户!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{ Ext.create('Ext.window.Window', {
                title: '显示',
                height: 200,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'panel',
                    html: '<table><tr><td>用户名</td><td>'+selection[0].get('username') +'</td></tr><tr><td>密码</td><td>'+selection[0].get('password') +'</td></tr><tr><td>全名</td><td>'+selection[0].get('fullName') +'</td></tr><tr><td>所属部门</td><td>'+selection[0].get('org') +'</td></tr><tr><td>过期时间</td><td>'+selection[0].get('expiredDate') +'</td></tr><tr><td>手机号</td><td>'+selection[0].get('mobile') +'</td></tr></table>'

                }
            }).show();
        }

    },

    searchUser: function(){
        var search_user_name = Ext.getCmp('search_user_name').getValue();
        var user_store = Ext.getCmp('user_list').store;

        user_store.on('beforeload', function (store, options) {
            var new_params = { username: search_user_name};
            Ext.apply(user_store.proxy.extraParams, new_params);
        });
        //  role_store.filter('name', search_org_name);
        user_store.load();
    }
});