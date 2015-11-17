


Ext.define('TutorialApp.view.org.OrgController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.orgc',

    addOrgRecord: function(){
        var grid = Ext.getCmp('org_list');
        Ext.create('Ext.window.Window', {
            id: 'orgSaveForm',

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
                    fieldLabel: '部门名称',
                    name: 'orgName',
                    itemId: 'orgName',
                    allowBlank: false,
                    emptyText: '请输入部门名称'
                }, {
                    fieldLabel: '部门编号',
                    name: 'orgNum',
                    allowBlank: false,
                    emptyText: '请输入部门编号'
                }, {
                    fieldLabel: '部门管理员',
                    name: 'manager'
                    //allowBlank: false,
                  //  emptyText: '请输入管理员'
                }, {
                    fieldLabel: '父部门',
                    name: 'parentOrg'
                   // allowBlank: false,
                   // emptyText: '请输入父部门'
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
                        var saveForm = Ext.getCmp('orgSaveForm');
                        var form = this.up('form').getForm();
                        var formValues = form.getValues();
                        if (form.isValid()) {
                            Ext.Ajax.request({
                                url:'/org/save',
                                params: {'orgName':formValues["orgName"],orgNum: formValues["orgNum"],manager: formValues["manager"],parentOrg: formValues["parentOrg"],'description':formValues["description"]},
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
    editOrgRecord: function(){
        var grid = Ext.getCmp('org_list');

        var selection = grid.getSelectionModel().getSelection();
        switch(selection.length){
            case 0: Ext.Msg.alert('message','请选择部门!'); break;
            default:
                Ext.create('Ext.window.Window', {
                    id: 'orgUpdateForm',

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
                            fieldLabel: '部门名称',
                            name: 'orgName',
                            itemId: 'orgName',
                            allowBlank: false,
                            bind: selection[0].get('orgName')
                        }, {
                            fieldLabel: '部门编号',
                            name: 'orgNum',
                            inputType: 'orgNum',
                            allowBlank: false,
                            bind: selection[0].get('orgNum')
                        }, {
                            fieldLabel: '部门管理员',
                            name: 'manager',
                            inputType: 'manager',
                            allowBlank: false,
                            bind: selection[0].get('manager')
                        }, {
                            fieldLabel: '父部门',
                            name: 'parentOrg',
                            inputType: 'parentOrg',
                            allowBlank: false,
                            bind: selection[0].get('parentOrg')
                        }, {
                            fieldLabel: '描述',
                            name: 'description',
                            inputType: 'description',
                            allowBlank: false,
                            bind: selection[0].get('description')
                        }],
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
                                        url:'/org/update',
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

    removeOrgRecord: function(){
        var grid = Ext.getCmp('org_list'), selection = grid
            .getSelectionModel().getSelection();
        var message = '',ids = '';

        if (selection.length == 1) // 如果只选择了一条
            ids = selection[0].get('id'),
                message = ' 『' + selection[0].get('orgName') + '』 吗?';

        else if(selection.length == 0){
            Ext.Msg.alert('message','请选择部门!');
        }else { // 选择了多条记录
            message = '<ol>';
            Ext.Array.each(grid.getSelectionModel().getSelection(), function(record) {
                message += '<li>' + record.get('orgName') + '</li>';
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
                        url:'/org/remove',
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

    viewOrgRecord: function(){
        var grid = Ext.getCmp('org_list'), selection = grid
            .getSelectionModel().getSelection();
        switch(selection.length){
            case 0 :Ext.Msg.alert('message','请选择部门!'); break;
            default:
                //创建panel
                var panel = new Ext.Panel({
                    title: 'Ajax与数据显示',
                    width: 200,
                    height: 200,
                    frame: true
                });
                //创建数据显示模板
                var template = new Ext.XTemplate(
                    '<table  id="template">',
                    '<tr><td>部门名称:</td><td>{orgName}</td></tr>',
                    '<tr><td>部门编号:</td><td>{orgNum}</td></tr>',
                    '</table>'
                );

                //获取数据
                            Ext.Ajax.request({
                                 url: '/org/viewById',
                                method: 'post',
                               params: { id: selection[0].get('id')},
                                success: function (response, options) {
                                  /* for (i in options) {
                                            alert('options参数名称:' + i);
                                            alert('options参数[' + i + ']的值：' + options[i]);
                                       }*/
                                   var responseJson = Ext.util.JSON.decode(response.responseText);
                                   template.compile();
                                    template.overwrite(panel.body, responseJson);
                               },
                               failure: function () {
                                   alert('系统出错，请联系管理人员！');
                               }
                           });

                Ext.create('Ext.window.Window', {
                title: '显示',
                height: 200,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: panel
                    //html: '<table><tr><td>部门名称</td><td>'+selection[0].get('orgName') +'</td></tr><tr><td>部门编号</td><td>'+selection[0].get('orgNum') +'</td></tr><tr><td>部门管理员</td><td>'+selection[0].get('manager') +'</td></tr><tr><td>父部门</td><td>'+selection[0].get('parentOrg') +'</td></tr><tr><td>描述</td><td>'+selection[0].get('description') +'</td></tr></table>'

                }
            }).show(); break;
        }

    }
});