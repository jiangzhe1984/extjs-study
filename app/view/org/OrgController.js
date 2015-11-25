
var orgStore = Ext.create('Ext.data.TreeStore', {
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
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入部门名称'
                }, {
                    fieldLabel: '部门编号',
                    name: 'orgNum',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入部门编号'
                }, /*{
                    fieldLabel: '部门管理员',
                    name: 'manager'
                    //allowBlank: false,
                  //  emptyText: '请输入管理员'
                },*/ {
                    fieldLabel: '父部门',
                    id: 'addParentOrgName',
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    disabled:true
                },{
                    xtype: 'hiddenfield', //hiddenfield
                    name: 'parentOrg',
                    id: 'addParentOrg',
                    value:''
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
                                    id       : 'search_orgTree',
                                    emptyText: '快速检索'
                                }, {
                                    // xtype: 'button', // default for Toolbars
                                    text: '查询',
                                    iconCls : 'icon-search',
                                    handler: function(){
                                        var search_orgTree = Ext.getCmp('search_orgTree').getValue();
                                        var deptTree = Ext.getCmp('orgTree_id');
                                        var root = deptTree.getRootNode();

                                        root.cascade(function(node){

                                            if( node.get('text').indexOf('red') != -1){
                                                node.set('text',node.get('text').substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<')));
                                            }

                                            if(node.get('leaf') && node.get('text').indexOf(search_orgTree) >= 0){
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
                            id: 'orgTree_id',
                            width: 200,
                            height: 200,
                            store: orgStore,
                            rootVisible: false,
                            renderTo: Ext.getBody(),
                            dockedItems: [{
                                xtype: toolbar,
                                dock: 'top'
                            }],
                            listeners:{
                                scope:this,
                                itemclick :  function (record, node) {

                                   // if(node.get('leaf')){
                                        var deptName = node.get('text');
                                        if( deptName.indexOf('red') != -1){
                                            deptName = deptName.substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<'));
                                        }

                                        Ext.getCmp('addParentOrg').setValue(node.getId());
                                        Ext.getCmp('addParentOrgName').setValue(deptName);

                                        Ext.getCmp('userDept_searchWindow').close();

                                   // }
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
                                xtype: Ext.getCmp('orgTree_id')
                            },
                            listeners:{
                                close : function(){
                                    var deptTree = Ext.getCmp('orgTree_id');
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
                                    if(result.state == "success"){
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
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择部门!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{
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
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            bind: selection[0].get('orgName')
                        }, {
                            fieldLabel: '部门编号',
                            name: 'orgNum',
                            inputType: 'orgNum',
                            allowBlank: false,
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            bind: selection[0].get('orgNum')
                        }, /*{
                            fieldLabel: '部门管理员',
                            name: 'manager',
                            inputType: 'manager',
                            allowBlank: false,
                            bind: selection[0].get('manager')
                        },*/ {
                            fieldLabel: '父部门',
                            id: 'editParentOrgName',
                            inputType: 'parentOrg',
                            allowBlank: false,
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            disabled:true,
                            bind: selection[0].get('parentOrg')
                        },{
                            xtype: 'hiddenfield', //hiddenfield
                            name: 'parentOrg',
                            id: 'editParentOrg',
                            value:selection[0].get('parentOrgId')
                        },{
                            xtype: 'button',
                            text: '查找部门',
                            handler: function(){

                                var editToolbar = Ext.create('Ext.toolbar.Toolbar', {
                                    renderTo: document.body,
                                    width   : 500,
                                    items: [
                                        {
                                            xtype    : 'textfield',
                                            id       : 'search_editOrgTree',
                                            emptyText: '快速检索'
                                        }, {
                                            // xtype: 'button', // default for Toolbars
                                            text: '查询',
                                            iconCls : 'icon-search',
                                            handler: function(){
                                                var search_editOrgTree = Ext.getCmp('search_editOrgTree').getValue();
                                                var deptTree = Ext.getCmp('orgTreeEdit_id');
                                                var root = deptTree.getRootNode();

                                                root.cascade(function(node){

                                                    if( node.get('text').indexOf('red') != -1){
                                                        node.set('text',node.get('text').substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<')));
                                                    }

                                                    if(node.get('leaf') && node.get('text').indexOf(search_editOrgTree) >= 0){
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
                                    id: 'orgTreeEdit_id',
                                    width: 200,
                                    height: 200,
                                    store: orgStore,
                                    rootVisible: false,
                                    renderTo: Ext.getBody(),
                                    dockedItems: [{
                                        xtype: editToolbar,
                                        dock: 'top'
                                    }],
                                    listeners:{
                                        scope:this,
                                        itemclick :  function (record, node) {

                                            // if(node.get('leaf')){
                                            var deptName = node.get('text');
                                            if( deptName.indexOf('red') != -1){
                                                deptName = deptName.substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<'));
                                            }

                                            Ext.getCmp('editParentOrg').setValue(node.getId());
                                            Ext.getCmp('editParentOrgName').setValue(deptName);

                                            Ext.getCmp('orgEdit_searchWindow').close();

                                            // }
                                        }
                                    }
                                });

                                Ext.create('Ext.window.Window', {
                                    id:'orgEdit_searchWindow',
                                    title: '查找部门',
                                    height: 600,
                                    width: 400,
                                    layout: 'fit',
                                    modal: true,//它背后的东西都会被遮罩
                                    items: {
                                        xtype: Ext.getCmp('orgTreeEdit_id')
                                    },
                                    listeners:{
                                        close : function(){
                                            var deptTree = Ext.getCmp('orgTreeEdit_id');
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
                            fieldLabel: '描述',
                            name: 'description',
                            inputType: 'description',
                            //allowBlank: false,
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
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择部门!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{
                //创建panel
                var panel = new Ext.Panel({
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
            }).show();
        }

    },

    searchOrg: function(){
        var search_org_name = Ext.getCmp('search_org_name').getValue();
        var org_store = Ext.getCmp('org_list').store;

        org_store.on('beforeload', function (store, options) {
            var new_params = { orgName: search_org_name};
            Ext.apply(org_store.proxy.extraParams, new_params);
        });
        //  role_store.filter('name', search_org_name);
        org_store.load();
    }


});