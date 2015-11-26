var store = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
        url: '/menu/loadTree'
    },
    root: {
        text: '所有菜单',
        id: 'all',
        expanded: false
    }
});


Ext.define('TutorialApp.view.authority.AuthorityController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.authorityc',

    addAuthorityRecord: function(){
        var grid = Ext.getCmp('authority_list');
        Ext.create('Ext.window.Window', {
            id: 'authoritySaveForm',

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
                    fieldLabel: '权限名称',
                    name: 'authorityname',
                    itemId: 'authorityname',
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    allowBlank: false,
                    emptyText: '请输入权限名称'
                }, {
                    fieldLabel: '权限类型',
                    name: 'authoritytype',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入权限类型'
                }, {
                    fieldLabel: '显示名称',
                    name: 'displayref',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入显示名称'
                }, {
                    fieldLabel: '描述',
                    name: 'description',
                    //allowBlank: false,
                    emptyText: '请输入描述'
                },{
                    fieldLabel: '所属菜单',
                    id: 'addMenuName',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请选择所属菜单',
                    disabled:true

                },{
                    xtype: 'hiddenfield',
                    name: 'menu',
                    id: 'addMenu',
                    value: ''
                },{
                    xtype: 'button',
                    text: '查找菜单',
                    handler: function(){

                        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
                            renderTo: document.body,
                            width   : 500,
                            items: [
                                {
                                    xtype    : 'textfield',
                                    id       : 'search_menuTree',
                                    emptyText: '快速检索'
                                }, {
                                    // xtype: 'button', // default for Toolbars
                                    text: '查询',
                                    iconCls : 'icon-search',
                                    handler: function(){
                                        var search_menuTree = Ext.getCmp('search_menuTree').getValue();
                                        var menuTree = Ext.getCmp('menuTree_id');
                                        var root = menuTree.getRootNode();

                                        root.cascade(function(node){

                                            if( node.get('text').indexOf('red') != -1){
                                                node.set('text',node.get('text').substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<')));
                                            }

                                            if(node.get('leaf') && node.get('text').indexOf(search_menuTree) >= 0){
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
                            id: 'menuTree_id',
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
                                        var menuName = node.get('text');
                                        if( menuName.indexOf('red') != -1){
                                            menuName = menuName.substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<'));
                                        }

                                        Ext.getCmp('addMenu').setValue(node.getId());
                                        Ext.getCmp('addMenuName').setValue(menuName);

                                        Ext.getCmp('menu_searchWindow').close();

                                    }
                                }
                            }
                        });

                        Ext.create('Ext.window.Window', {
                            id:'menu_searchWindow',
                            title: '查找菜单',
                            height: 600,
                            width: 400,
                            layout: 'fit',
                            modal: true,//它背后的东西都会被遮罩
                            items: {
                                xtype: Ext.getCmp('menuTree_id')
                            },
                            listeners:{
                                close : function(){
                                    var menuTree = Ext.getCmp('menuTree_id');
                                    var root = menuTree.getRootNode();

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
                        var saveForm = Ext.getCmp('authoritySaveForm');
                        var form = this.up('form').getForm();
                        var formValues = form.getValues();
                        if (form.isValid()) {
                            Ext.Ajax.request({
                                url:'/authority/save',
                                params: {'authorityname':formValues["authorityname"],authoritytype: formValues["authoritytype"],displayref: formValues["displayref"],'description':formValues["description"],'menu':formValues["menu"]},
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
    editAuthorityRecord: function(){
        var grid = Ext.getCmp('authority_list');

        var selection = grid.getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择权限!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{
                Ext.create('Ext.window.Window', {
                    id: 'authorityUpdateForm',

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
                            fieldLabel: '权限名称',
                            name: 'authorityname',
                            itemId: 'authorityname',
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            allowBlank: false,
                            bind: selection[0].get('authorityname')
                        }, {
                            fieldLabel: '权限类型',
                            name: 'authoritytype',
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            allowBlank: false,
                            bind: selection[0].get('authoritytype')
                        }, {
                            fieldLabel: '显示名称',
                            name: 'displayref',
                            inputType: 'displayref',
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            allowBlank: false,
                            bind: selection[0].get('displayref')
                        }, {
                            fieldLabel: '描述',
                            name: 'description',
                            inputType: 'description',
                            //allowBlank: false,
                            bind: selection[0].get('description')
                        },{
                            fieldLabel: '所属菜单',
                            id: 'editMenuName',
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            allowBlank: false,
                            emptyText: '请选择所属菜单',
                            disabled:true

                        },{
                            xtype: 'hiddenfield',
                            name: 'menu',
                            id: 'editMenu',
                            value: ''
                        },{
                            xtype: 'button',
                            text: '查找菜单',
                            handler: function(){

                                var editToolbar = Ext.create('Ext.toolbar.Toolbar', {
                                    renderTo: document.body,
                                    width   : 500,
                                    items: [
                                        {
                                            xtype    : 'textfield',
                                            id       : 'search_menuTree',
                                            emptyText: '快速检索'
                                        }, {
                                            // xtype: 'button', // default for Toolbars
                                            text: '查询',
                                            iconCls : 'icon-search',
                                            handler: function(){
                                                var searchEdit_menuTree = Ext.getCmp('searchEdit_menuTree').getValue();
                                                var menuTree = Ext.getCmp('menuTreeEdit_id');
                                                var root = menuTree.getRootNode();

                                                root.cascade(function(node){

                                                    if( node.get('text').indexOf('red') != -1){
                                                        node.set('text',node.get('text').substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<')));
                                                    }

                                                    if(node.get('leaf') && node.get('text').indexOf(searchEdit_menuTree) >= 0){
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
                                    id: 'menuTreeEdit_id',
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
                                                var menuName = node.get('text');
                                                if( menuName.indexOf('red') != -1){
                                                    menuName = menuName.substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<'));
                                                }

                                                Ext.getCmp('editMenu').setValue(node.getId());
                                                Ext.getCmp('editMenuName').setValue(menuName);

                                                Ext.getCmp('menuEdit_searchWindow').close();

                                            }
                                        }
                                    }
                                });

                                Ext.create('Ext.window.Window', {
                                    id:'menuEdit_searchWindow',
                                    title: '查找菜单',
                                    height: 600,
                                    width: 400,
                                    layout: 'fit',
                                    modal: true,//它背后的东西都会被遮罩
                                    items: {
                                        xtype: Ext.getCmp('menuTreeEdit_id')
                                    },
                                    listeners:{
                                        close : function(){
                                            var menuTree = Ext.getCmp('menuTreeEdit_id');
                                            var root = menuTree.getRootNode();

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
                        }],
                        buttons: [{
                            xtype: 'tbtext',
                            html: '错误',
                            style: 'color:red',
                            hidden: true
                        }, '->', {
                            text: '修改',
                            handler: function(){

                                var updateForm = Ext.getCmp('authorityUpdateForm');
                                var form = this.up('form').getForm();
                                var formValues = form.getValues();

                                if (form.isValid()) {
                                    Ext.Ajax.request({
                                        url:'/authority/update',
                                        params: {'id':selection[0].getId(),'authorityname':formValues["authorityname"],authoritytype: formValues["authoritytype"],displayref: formValues["displayref"],'description':formValues["description"],'menu':formValues["menu"]},
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

    removeAuthorityRecord: function(){
        var grid = Ext.getCmp('authority_list'), selection = grid
            .getSelectionModel().getSelection();
        var message = '',ids = '';

        if (selection.length == 1) // 如果只选择了一条
            ids = selection[0].get('id'),
                message = ' 『' + selection[0].get('authorityname') + '』 吗?';

        else if(selection.length == 0){
            Ext.Msg.alert('message','请选择权限!');
        }else { // 选择了多条记录
            message = '<ol>';
            Ext.Array.each(grid.getSelectionModel().getSelection(), function(record) {
                message += '<li>' + record.get('authorityname') + '</li>';
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
                        url:'/authority/remove',
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

    viewAuthorityRecord: function(){
        var grid = Ext.getCmp('authority_list'), selection = grid
            .getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择权限!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{
              Ext.create('Ext.window.Window', {
                title: '显示',
                height: 200,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'panel',
                    html: '<table><tr><td>权限名称</td><td>'+selection[0].get('authorityname') +'</td></tr><tr><td>显示名称</td><td>'+selection[0].get('displayref') +'</td></tr><tr><tr><td>权限类型</td><td>'+selection[0].get('authoritytype') +'</td></tr><tr><td>描述</td><td>'+selection[0].get('description') +'</td></tr></table>'

                }
            }).show();
        }

    },



    searchAuthority: function(){
        var search_authority_name = Ext.getCmp('search_authority_name').getValue();
        var authority_store = Ext.getCmp('authority_list').store;

        authority_store.on('beforeload', function (store, options) {
            var new_params = { authorityname: search_authority_name};
            Ext.apply(authority_store.proxy.extraParams, new_params);
        });
        //  role_store.filter('name', search_role_name);
        authority_store.load();
    }
});