/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TutorialApp.view.personnel.PersonnelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.personnel',


    addPersonnelRecord: function(){

        var grid = this.getView().down('personnellist');
        Ext.create('Ext.window.Window', {
            id: 'personnelSaveForm',

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
                    fieldLabel: '姓名',
                    name: 'name',
                    itemId: 'name',
                    allowBlank: false,
                    emptyText: '请输入姓名'
                }, {
                    fieldLabel: '邮箱',
                    name: 'email',
                    inputType: 'email',
                    allowBlank: false,
                    emptyText: '请输入邮箱'
                }, {
                    fieldLabel: '电话',
                    name: 'phone',
                    inputType: 'phone',
                    allowBlank: false,
                    emptyText: '请输入电话'
                }],
                buttons: [{
                    xtype: 'tbtext',
                    html: '错误',
                    style: 'color:red',
                    hidden: true
                }, '->', {
                    text: '保存',
                    handler: function(){
                        var saveForm = Ext.getCmp('personnelSaveForm');
                        var form = this.up('form').getForm();
                        var formValues = form.getValues();
                        var model = Ext.create(grid.getStore().model);
                        model.set('name',formValues["name"]);
                        model.set('email',formValues["email"]);
                        model.set('phone',formValues["phone"]);
                        grid.getStore().insert(0, model);
                        saveForm.close();
                    }
                }]
            }
        });
    },
//不能为空
    editPersonnelRecord: function(){
        var grid = this.getView().down('personnellist');
        var selection = grid.getSelectionModel().getSelection();
        switch(selection.length){
            case 0: Ext.Msg.alert('message','请选择数据!'); break;
            default:
                Ext.create('Ext.window.Window', {
                    id: 'personnelUpdateForm',

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
                            fieldLabel: '姓名',
                            name: 'name',
                            itemId: 'name',
                            allowBlank: false,
                            bind: selection[0].get('name')
                        }, {
                            fieldLabel: '邮箱',
                            name: 'email',
                            inputType: 'email',
                            allowBlank: false,
                            bind: selection[0].get('email')
                        }, {
                            fieldLabel: '电话',
                            name: 'phone',
                            inputType: 'phone',
                            allowBlank: false,
                            bind: selection[0].get('phone')
                        }],
                        buttons: [{
                            xtype: 'tbtext',
                            html: '错误',
                            style: 'color:red',
                            hidden: true
                        }, '->', {
                            text: '修改',
                            handler: function(){

                                var updateForm = Ext.getCmp('personnelUpdateForm');
                                var form = this.up('form').getForm();
                                var formValues = form.getValues();
                                selection[0].set('name',formValues["name"]);
                                selection[0].set('email',formValues["email"]);
                                selection[0].set('phone',formValues["phone"]);
                               /* grid.getStore().update(selection[0],false,function(){
                                    updateForm.close();
                                });*/
                                form.updateRecord(selection[0]);
                              //  grid.getStore().commitChanges();
                                updateForm.close();

                            }
                        }]
                    }
                });
                break;
        }

    },

    removePersonnelRecord: function(){
        var grid = this.getView().down('personnellist'), selection = grid
            .getSelectionModel().getSelection(), message = '';
        if (selection.length == 1) // 如果只选择了一条
            message = ' 『' + selection[0].get('name') + '』 吗?';
        else if(selection.length == 0){
            Ext.Msg.alert('message','请选择数据!');
        }else { // 选择了多条记录
            message = '<ol>';
            Ext.Array.each(grid.getSelectionModel().getSelection(), function(record) {
                message += '<li>' + record.get('name') + '</li>';
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

    viewPersonnelRecord: function(){
        var grid = this.getView().down('personnellist'), selection = grid
            .getSelectionModel().getSelection();
        switch(selection.length){
            case 0 :Ext.Msg.alert('message','请选择数据!'); break;
            default: Ext.create('Ext.window.Window', {
                title: '显示',
                height: 200,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'panel',
                    html: '<table><tr><td>姓名</td><td>'+selection[0].get('name') +'</td></tr><tr><td>邮箱</td><td>'+selection[0].get('email') +'</td></tr><tr><td>电话</td><td>'+selection[0].get('phone') +'</td></tr></table>'

                }
            }).show(); break;
        }

    },

    authAction: function(){
        Ext.create('Ext.window.Window', {
            title: '权限',
            height: 600,
            width: 400,
            layout: 'fit',
            modal: true,//它背后的东西都会被遮罩
            items: {
                xtype: 'app-authTree'

            }
        }).show();
    }

});
