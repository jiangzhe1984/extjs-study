function Addsel(){
    var a=document.getElementById("sel1");
    if(a.selectedIndex<0){
        Ext.Msg.alert("message","请选择人员");
        return false;
    }

    var removeCount = 0;
    for(var i=0;i<a.length;i++){
        if(a.options[i-removeCount].selected){
            var pOption = document.createElement("OPTION");
            document.sel.res.options.add(pOption);
            pOption.innerText =a.options[i-removeCount].text;
            pOption.value ==a.options[i-removeCount].value;
            a.options.remove(i-removeCount);
            removeCount++;
        }

    }

    return true;
}




function Delsel(){

    var b=document.getElementById("sel2");
    if(b.selectedIndex<0){
        Ext.Msg.alert("message","请选择人员");
        return false;
    }

    var removeCount = 0;

    for(var i=0;i<b.length;i++){
        if(b.options[i-removeCount].selected){
            var pOption = document.createElement("OPTION");
            document.sel.res1.options.add(pOption);
            pOption.innerText =b.options[i-removeCount].text;
            pOption.value =b.options[i-removeCount].value;
            b.options.remove(i-removeCount);
            removeCount++;
        }

    }

    return true;
}



var htmlValue = "<style> a:link {text-decoration: none;}a:visited {text-decoration: none;}a:hover {text-decoration: none;}a:active {text-decoration: none;}</style>";
htmlValue += "<div align='center'><div  style='width:596px'><form name=\"sel\"><div style=\"float:left; width:200px;\"><span>未选人员</span>";
htmlValue += "<select name=\"res1\" id=sel1 size=30 style=\"width:200px\" multiple></select></div>"
htmlValue += "<div style=\"float: left;padding-top: 100px;\"><a href=\"JavaScript:Addsel()\">选择>></a><br><br><br><a href=\"JavaScript:Delsel()\"><<还原</a></div>";
htmlValue += "<div style=\"float:left;width:200px;\"><span>已选人员</span>";
htmlValue += "<select name=\"res\" id=sel2 size=30 style=\"width:200px\"  multiple>";
htmlValue += "</select></div></form></div></div>";

Ext.define('TutorialApp.view.role.RoleController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rolec',

    addRoleRecord: function(){
        var grid = Ext.getCmp('role_list');
        Ext.create('Ext.window.Window', {
            id: 'roleSaveForm',

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
                    fieldLabel: '角色名称',
                    name: 'name',
                    itemId: 'name',
                    allowBlank: false,
                    emptyText: '请输入角色名称'
                }, {
                    fieldLabel: '显示名称',
                    name: 'displayref',
                    allowBlank: false,
                    emptyText: '请输入显示名称'
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
                        var saveForm = Ext.getCmp('roleSaveForm');
                        var form = this.up('form').getForm();
                        var formValues = form.getValues();
                        var model = Ext.create(grid.getStore().model);
                        model.set('id',3);
                        model.set('name',formValues["name"]);
                        model.set('displayref',formValues["displayref"]);
                        model.set('description',formValues["description"]);
                        grid.getStore().insert(0, model);
                        saveForm.close();
                    }
                }]
            }
        });
    },
//不能为空
    editRoleRecord: function(){
        var grid = Ext.getCmp('role_list');

        var selection = grid.getSelectionModel().getSelection();
        switch(selection.length){
            case 0: Ext.Msg.alert('message','请选择数据!'); break;
            default:
                Ext.create('Ext.window.Window', {
                    id: 'roleUpdateForm',

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
                            fieldLabel: '角色名称',
                            name: 'name',
                            itemId: 'name',
                            allowBlank: false,
                            bind: selection[0].get('name')
                        }, {
                            fieldLabel: '显示名称',
                            name: 'displayref',
                            inputType: 'displayref',
                            allowBlank: false,
                            bind: selection[0].get('displayref')
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

                                var updateForm = Ext.getCmp('roleUpdateForm');
                                var form = this.up('form').getForm();
                                var formValues = form.getValues();
                                selection[0].set('name',formValues["name"]);
                                selection[0].set('displayref',formValues["displayref"]);
                                selection[0].set('description',formValues["description"]);

                                form.updateRecord(selection[0]);

                                updateForm.close();

                            }
                        }]
                    }
                });
                break;
        }

    },

    removeRoleRecord: function(){
        var grid = Ext.getCmp('role_list'), selection = grid
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

    viewRoleRecord: function(){
        var grid = Ext.getCmp('role_list'), selection = grid
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
                    html: '<table><tr><td>角色名称</td><td>'+selection[0].get('name') +'</td></tr><tr><td>显示名称</td><td>'+selection[0].get('displayref') +'</td></tr><tr><td>描述</td><td>'+selection[0].get('description') +'</td></tr></table>'

                }
            }).show(); break;
        }

    },

    authAction: function(){
        Ext.create('Ext.window.Window', {
            title: '关联权限',
            height: 600,
            width: 400,
            layout: 'fit',
            modal: true,//它背后的东西都会被遮罩
            items: {
                xtype: 'app-authTree'

            }
        }).show();
    },

    roleAction: function(){

        Ext.create('Ext.window.Window', {
            title: '分配角色',
            height: 700,
            width: 900,
            layout: 'border',
            autoscroll : true,
            modal: true,//它背后的东西都会被遮罩
            items: [
                {
                    region:'west',
                    xtype: 'app-deptTree',
                    margin: '5 0 0 5',
                    width: 300,
                    layout: 'fit'
                },{
                    xtype: 'panel',
                    html: htmlValue,
                    layout: 'fit',
                    margin: '5 5 0 0'
                }],
            listeners:{
                close : function(){
                    var deptTree = Ext.getCmp('deptTree');
                    var root = deptTree.getRootNode();

                    root.cascade(function(node){
                        if(node.getId() != 'all'){
                            node.collapse(true);
                            var text = node.get('text');
                            if(text.indexOf('red') != -1){

                                node.set('text',text.substring(text.indexOf('>')+1,text.lastIndexOf('<')));
                            }
                            document.sel.res.options.length=0;
                            document.sel.res1.options.length=0;
                        }

                    });
                }
            }
        }).show();
    }
});