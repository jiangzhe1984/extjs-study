/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */

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

// The data store containing the list of states
var states = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data : [
        {"abbr":"AL", "name":"Alabama"},
        {"abbr":"AK", "name":"Alaska"},
        {"abbr":"AZ", "name":"Arizona"}
        //...
    ]
});


// Create the combo box, attached to the states data store
Ext.define('Ext.ux.ComboBox', {
    extend:'Ext.form.ComboBox',
    alias: 'widget.combobox',
    fieldLabel: 'Choose State',
    store: states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'abbr',
    // all of your config options
    listeners:{
        //scope: yourScope,
        'select': function(obj){
             alert(obj.getValue());
        }
    }
});

Ext.define('Ext.ux.CustomSpinner', {
    extend: 'Ext.form.field.Spinner',
    alias: 'widget.customspinner',

    // override onSpinUp (using step isn't neccessary)
    onSpinUp: function() {
        var me = this;
        if (!me.readOnly) {
            var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
            me.setValue((val + me.step) + ' Pack');
        }
    },

    // override onSpinDown
    onSpinDown: function() {
        var me = this;
        if (!me.readOnly) {
            var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
            if (val <= me.step) {
                me.setValue('Dry!');
            } else {
                me.setValue((val - me.step) + ' Pack');
            }
        }
    }
});


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
                },{
                    xtype: 'datefield',
                    anchor: '100%',
                    fieldLabel: 'From',
                    name: 'from_date',
                    maxValue: new Date()  // limited to the current date or prior
                }, {
                    xtype: 'datefield',
                    anchor: '100%',
                    fieldLabel: 'To',
                    name: 'to_date',
                    value: new Date()  // defaults to today
                },{
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Two Columns',
                    // Arrange checkboxes into two columns, distributed vertically
                    columns: 2,
                    vertical: true,
                    items: [
                        { boxLabel: 'Item 1', name: 'cb', inputValue: '1' },
                        { boxLabel: 'Item 2', name: 'cb', inputValue: '2', checked: true },
                        { boxLabel: 'Item 3', name: 'cb', inputValue: '3' },
                        { boxLabel: 'Item 4', name: 'cb', inputValue: '4' },
                        { boxLabel: 'Item 5', name: 'cb', inputValue: '5' },
                        { boxLabel: 'Item 6', name: 'cb', inputValue: '6' }
                    ]
                },{
                    xtype: 'radiogroup',
                    fieldLabel: 'Two Columns',
                    // Arrange radio buttons into two columns, distributed vertically
                    columns: 2,
                    vertical: true,
                    items: [
                        { boxLabel: 'Item 1', name: 'rb', inputValue: '1' },
                        { boxLabel: 'Item 2', name: 'rb', inputValue: '2', checked: true},
                        { boxLabel: 'Item 3', name: 'rb', inputValue: '3' },
                        { boxLabel: 'Item 4', name: 'rb', inputValue: '4' },
                        { boxLabel: 'Item 5', name: 'rb', inputValue: '5' },
                        { boxLabel: 'Item 6', name: 'rb', inputValue: '6' }
                    ]
                }],  bbar: [
                    {
                        text: 'Smaller Size',
                        handler: function() {
                            var radio1 = Ext.getCmp('radio1'),
                                radio2 = Ext.getCmp('radio2'),
                                radio3 = Ext.getCmp('radio3');

                            //if L is selected, change to M
                            if (radio2.getValue()) {
                                radio1.setValue(true);
                                return;
                            }

                            //if XL is selected, change to L
                            if (radio3.getValue()) {
                                radio2.setValue(true);
                                return;
                            }

                            //if nothing is set, set size to S
                            radio1.setValue(true);
                        }
                    },
                    {
                        text: 'Larger Size',
                        handler: function() {
                            var radio1 = Ext.getCmp('radio1'),
                                radio2 = Ext.getCmp('radio2'),
                                radio3 = Ext.getCmp('radio3');

                            //if M is selected, change to L
                            if (radio1.getValue()) {
                                radio2.setValue(true);
                                return;
                            }

                            //if L is selected, change to XL
                            if (radio2.getValue()) {
                                radio3.setValue(true);
                                return;
                            }

                            //if nothing is set, set size to XL
                            radio3.setValue(true);
                        }
                    },
                    '-',
                    {
                        text: 'Select color',
                        menu: {
                            indent: false,
                            items: [
                                {
                                    text: 'Blue',
                                    handler: function() {
                                        var radio = Ext.getCmp('radio4');
                                        radio.setValue(true);
                                    }
                                },
                                {
                                    text: 'Grey',
                                    handler: function() {
                                        var radio = Ext.getCmp('radio5');
                                        radio.setValue(true);
                                    }
                                },
                                {
                                    text: 'Black',
                                    handler: function() {
                                        var radio = Ext.getCmp('radio6');
                                        radio.setValue(true);
                                    }
                                }
                            ]
                        }
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
                        var saveForm = Ext.getCmp('personnelSaveForm');
                        var form = this.up('form').getForm();
                        var formValues = form.getValues();
                        var model = Ext.create(grid.getStore().model);
                        model.set('id',formValues["rb"]);
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
                        },{
                            xtype: 'customspinner',
                            fieldLabel: 'How Much Beer?',
                            step: 6
                        },{
                            xtype: 'combobox'
                        },{
                            xtype     : 'textareafield',
                            grow      : true,
                            name      : 'message',
                            fieldLabel: 'Message',
                            anchor    : '100%'
                        },{
                            xtype: 'timefield',
                            name: 'in',
                            fieldLabel: 'Time In',
                            minValue: '6:00 AM',
                            maxValue: '8:00 PM',
                            increment: 30,
                            anchor: '100%'
                        }, {
                            xtype: 'timefield',
                            name: 'out',
                            fieldLabel: 'Time Out',
                            minValue: '6:00 AM',
                            maxValue: '8:00 PM',
                            increment: 30,
                            anchor: '100%'
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
            layout: 'column',
            autoscroll : true,
            modal: true,//它背后的东西都会被遮罩
            items: [
                {
                    xtype: 'app-deptTree',
                    autoscroll : true,
                    collapsible: true   // make collapsible
                },
                {
                    xtype: 'panel',
                    html: htmlValue,
                    collapsible: true   // make collapsible
            }],
            listeners:{
                close : function(){
                    var deptTree = Ext.getCmp('deptTree');
                    var root = deptTree.getRootNode();

                    root.cascade(function(node){
                        if(node.getId() != 'all'){
                            node.collapse(true);
                            var text = node.get('text');
                            if(text.indexOf('<font color=red>') != -1){
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
