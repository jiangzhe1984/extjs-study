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
    id:'userMgrTypeCB',
    alias: 'widget.userMgrType',
    fieldLabel: '用户类型',
    store: states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'userMgrType',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});


//部门树store
var store = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
        url: '/org/orgTree'
    },
    root: {
        text: '所有部门',
        id: 'all',
        expanded: false
    }
});

//自定义正则表达式
Ext.define('Override.form.field.VTypes', {
    override: 'Ext.form.field.VTypes',

    // vtype validation function
    mobile: function(value) {
        return this.mobileRe.test(value);
    },
    idCard: function(value) {
        return this.idCardRe.test(value);
    },
    // RegExp for the value to be tested against within the validation function
    mobileRe: /^1\d{10}$/i,
    mobileText: '请输入手机号',
    idCardRe:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/,
    idCardText: '身份证号码不符合规定'
});
/**
 * 系统用户控制器
 */
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
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入用户名'
                }, {
                    fieldLabel: '密码',
                    name: 'password',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入密码'
                }, {
                    fieldLabel: '全名',
                    name: 'fullName',
                     allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                     emptyText: '请输入全名'
                }, {
                    fieldLabel: '所属部门',
                    id: 'addOrgName',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入所属部门',
                    disabled:true

                },{
                    xtype: 'hiddenfield', //hiddenfield
                    name: 'org',
                    id: 'addOrg',
                    value: ''
                },{
                    xtype: 'button',
                    text: '查找部门',
                    handler: function(){

                        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
                            renderTo: document.body,
                            width   : 500,
                            items: [
                                {
                                    xtype    : 'textfield',
                                    id       : 'search_userdeptTree',
                                    emptyText: '快速检索'
                                }, {
                                    // xtype: 'button', // default for Toolbars
                                    text: '查询',
                                    iconCls : 'icon-search',
                                    handler: function(){
                                        var search_deptTree = Ext.getCmp('search_userdeptTree').getValue();
                                        var deptTree = Ext.getCmp('userDeptTree_id');
                                        var root = deptTree.getRootNode();//获取根节点

                                        root.cascade(function(node){//循环节点

                                            if( node.get('text').indexOf('red') != -1){
                                                node.set('text',node.get('text').substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<')));
                                            }

                                            if(node.get('leaf') && node.get('text').indexOf(search_deptTree) >= 0){//符合查询条件打开节点
                                                node.set('text',"<font color=red>"+node.get('text')+"</font>");
                                                node.parentNode.expand(true);
                                                node.expand(true);
                                            }

                                        });
                                    }

                                }
                            ]
                        });


                        Ext.create('Ext.tree.Panel',{
                            id: 'userDeptTree_id',
                            width: 200,
                            height: 200,
                            store: store,
                            rootVisible: false,
                            renderTo: Ext.getBody(),
                            dockedItems: [{
                                xtype: toolbar,
                                dock: 'top'
                            }],
                            listeners:{
                                scope:this,
                                itemclick :  function (record, node) {

                                    if(node.get('leaf')){
                                        var deptName = node.get('text');
                                        if( deptName.indexOf('red') != -1){
                                            deptName = deptName.substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<'));
                                        }
                                        //内容带回
                                        Ext.getCmp('addOrg').setValue(node.getId());
                                        Ext.getCmp('addOrgName').setValue(deptName);

                                        Ext.getCmp('userDept_searchWindow').close();

                                    }
                                }
                            }
                        });

                        Ext.create('Ext.window.Window', {
                            id:'userDept_searchWindow',
                            title: '查找部门',
                            height: 600,
                            width: 400,
                            layout: 'fit',
                            modal: true,//它背后的东西都会被遮罩
                            items: {
                                xtype: Ext.getCmp('userDeptTree_id')
                            },
                            listeners:{
                                close : function(){
                                    var deptTree = Ext.getCmp('userDeptTree_id');
                                    var root = deptTree.getRootNode();

                                    root.cascade(function(node){
                                        if(node.getId() != 'all'){
                                            node.collapse(true);
                                            var text = node.get('text');
                                            if(text.indexOf('red') != -1){

                                                node.set('text',text.substring(text.indexOf('>')+1,text.lastIndexOf('<')));
                                            }

                                        }

                                    });
                                }
                            }
                        }).show();
                    }
                }, {
                    fieldLabel: '手机号',
                    name: 'mobile',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入手机号',
                    vtype: 'mobile'
                }, {
                    xtype: 'userMgrType',
                    name: 'userMgrType',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ]
                }, {
                    xtype: 'datefield',
                    anchor: '100%',
                    fieldLabel: '过期时间',
                    name: 'expiredDate',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入过期时间',
                    value: new Date()
                }, {
                    fieldLabel: '描述',
                    name: 'description',
                    //allowBlank: false,
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
//修改
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
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            bind: selection[0].get('username')
                        }, {
                            fieldLabel: '密码',
                            name: 'password',
                            allowBlank: false,
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            bind: selection[0].get('password')
                        }, {
                            fieldLabel: '全名',
                            name: 'fullName',
                            allowBlank: false,
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            bind: selection[0].get('fullName')
                        }, {
                            fieldLabel: '所属部门',
                            id: 'editOrgName',
                            allowBlank: false,
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            bind: selection[0].get('org'),
                            disabled:true
                        }, {
                            xtype: 'hiddenfield', //hiddenfield
                            name: 'org',
                            id: 'editOrg',
                            value: selection[0].get('orgId')
                        }, {
                            xtype: 'button',
                            text: '查找部门',
                            handler: function(){

                                var editToolbar = Ext.create('Ext.toolbar.Toolbar', {
                                    renderTo: document.body,
                                    width   : 500,
                                    items: [
                                        {
                                            xtype    : 'textfield',
                                            id       : 'search_editUserdeptTree',
                                            emptyText: '快速检索'
                                        }, {
                                            // xtype: 'button', // default for Toolbars
                                            text: '查询',
                                            iconCls : 'icon-search',
                                            handler: function(){
                                                var search_editUserdeptTree = Ext.getCmp('search_editUserdeptTree').getValue();
                                                var deptTree = Ext.getCmp('userDeptTreeEdit_id');
                                                var root = deptTree.getRootNode();

                                                root.cascade(function(node){

                                                    if( node.get('text').indexOf('red') != -1){
                                                        node.set('text',node.get('text').substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<')));
                                                    }

                                                    if(node.get('leaf') && node.get('text').indexOf(search_editUserdeptTree) >= 0){
                                                        node.set('text',"<font color=red>"+node.get('text')+"</font>");
                                                        node.parentNode.expand(true);
                                                        node.expand(true);
                                                    }

                                                });
                                            }

                                        }
                                    ]
                                });

                                Ext.create('Ext.tree.Panel',{
                                    id: 'userDeptTreeEdit_id',
                                    width: 200,
                                    height: 200,
                                    store: store,
                                    rootVisible: false,
                                    renderTo: Ext.getBody(),
                                    dockedItems: [{
                                        xtype: editToolbar,
                                        dock: 'top'
                                    }],
                                    listeners:{
                                        scope:this,
                                        itemclick :  function (record, node) {

                                            if(node.get('leaf')){
                                                var deptName = node.get('text');

                                                if( deptName.indexOf('red') != -1){
                                                    deptName = deptName.substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<'));
                                                }
                                                //内容带回
                                                Ext.getCmp('editOrg').setValue(node.getId());
                                                Ext.getCmp('editOrgName').setValue(deptName);

                                                Ext.getCmp('userDeptEdit_searchWindow').close();

                                            }
                                        }
                                    }
                                });

                                Ext.create('Ext.window.Window', {
                                    id:'userDeptEdit_searchWindow',
                                    title: '查找部门',
                                    height: 600,
                                    width: 400,
                                    layout: 'fit',
                                    modal: true,//它背后的东西都会被遮罩
                                    items: {
                                        xtype: Ext.getCmp('userDeptTreeEdit_id')
                                    },
                                    listeners:{
                                        close : function(){
                                            var deptTree = Ext.getCmp('userDeptTreeEdit_id');
                                            var root = deptTree.getRootNode();

                                            root.cascade(function(node){
                                                if(node.getId() != 'all'){
                                                    node.collapse(true);
                                                    var text = node.get('text');
                                                    if(text.indexOf('red') != -1){

                                                        node.set('text',text.substring(text.indexOf('>')+1,text.lastIndexOf('<')));
                                                    }
                                                }

                                            });
                                        }
                                    }
                                }).show();
                            }
                        }, {
                            fieldLabel: '手机号',
                            name: 'mobile',
                            allowBlank: false,
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            bind: selection[0].get('mobile'),
                            vtype: 'mobile'
                        }, {
                            xtype: 'userMgrType',
                            name: 'userMgrType',
                            allowBlank: false,
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            listeners:{
                                beforerender:function(){
                                  Ext.getCmp('userMgrTypeCB').setValue(selection[0].get('userMgrType')); //设置 combo 值（显示值）
                                  //  combo.clearValue();                 //清除 combo 值

                                }
                            }
                        }, {
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: '过期时间',
                            name: 'expiredDate',
                            allowBlank: false,
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            emptyText: '请输入过期时间',
                            format: 'm/d/Y',
                            //value: selection[0].get('expiredDate')
                            value:selection[0].get('expiredDate').split(" ")[0]
                        }, {
                            fieldLabel: '描述',
                            name: 'description',
                           // allowBlank: false,
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
    //删除
    removeUserRecord: function(){
        var grid = Ext.getCmp('user_list'), selection = grid
            .getSelectionModel().getSelection();
        var message = '',ids = '';

        if (selection.length == 1) // 如果只选择了一条
            ids = selection[0].get('id'),
                message = ' 『' + selection[0].get('username') + '』 吗?';

        else if(selection.length == 0){
            Ext.Msg.alert('message','请选择用户!');
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
    //查看
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
    //查询
    searchUser: function(){
        var search_user_name = Ext.getCmp('search_user_name').getValue();
        var user_store = Ext.getCmp('user_list').store;

        user_store.on('beforeload', function (store, options) { //提交到后台前添加查询条件
            var new_params = { username: search_user_name};
            Ext.apply(user_store.proxy.extraParams, new_params);
        });
        //  role_store.filter('name', search_org_name);
        user_store.load();
    }
});