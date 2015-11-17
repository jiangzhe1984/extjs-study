// The data store containing the list of states
var states = Ext.create('Ext.data.Store', {
    fields: ['userMgrType', 'name'],
    data : [
        {"userMgrType":"1400", "name":"超级管理员"},
        {"userMgrType":"1401", "name":"普通管理员"},
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
                                    if(result.id != null){
                                        saveForm.close();
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
    },
//不能为空
    editUserRecord: function(){
        var grid = Ext.getCmp('user_list');

        var selection = grid.getSelectionModel().getSelection();
        switch(selection.length){
            case 0: Ext.Msg.alert('message','请选择部门!'); break;
            default:
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

                                var updateForm = Ext.getCmp('orgUpdateForm');
                                var form = this.up('form').getForm();
                                var formValues = form.getValues();

                                if (form.isValid()) {
                                    Ext.Ajax.request({
                                        url:'/user/update',
                                        params: {'id':selection[0].getId(),'orgName':formValues["orgName"],orgNum: formValues["orgNum"],manager: formValues["manager"],parentOrg: formValues["parentOrg"],'description':formValues["description"]},
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
                break;
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
        var grid = Ext.getCmp('org_list'), selection = grid
            .getSelectionModel().getSelection();
        switch(selection.length){
            case 0 :Ext.Msg.alert('message','请选择部门!'); break;
            default: Ext.create('Ext.window.Window', {
                title: '显示',
                height: 200,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'panel',
                    html: '<table><tr><td>部门名称</td><td>'+selection[0].get('orgName') +'</td></tr><tr><td>部门编号</td><td>'+selection[0].get('orgNum') +'</td></tr><tr><td>部门管理员</td><td>'+selection[0].get('manager') +'</td></tr><tr><td>父部门</td><td>'+selection[0].get('parentOrg') +'</td></tr><tr><td>描述</td><td>'+selection[0].get('description') +'</td></tr></table>'

                }
            }).show(); break;
        }

    }
});