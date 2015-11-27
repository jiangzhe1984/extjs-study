
var menuStore = Ext.create('Ext.data.TreeStore', {
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

Ext.define('TutorialApp.view.menu.MenuController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.menuc',

    addMenuRecord: function(){
        var grid = Ext.getCmp('menu_list');
        Ext.create('Ext.window.Window', {
            id: 'menuSaveForm',

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
                    fieldLabel: '菜单名称',
                    name: 'text',
                    itemId: 'text',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入菜单名称'
                },{
                    xtype: 'radiogroup',
                    fieldLabel: '是否默认打开',
                    columns: 2,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    vertical: true,
                    items: [
                        { boxLabel: '是', name: 'expanded', inputValue: '1' },
                        { boxLabel: '否', name: 'expanded', inputValue: '0', checked: true}
                    ]
                },{
                    xtype: 'radiogroup',
                    fieldLabel: '是否是父菜单',
                    columns: 2,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    vertical: true,
                    items: [
                        { boxLabel: '是', name: 'isParent', inputValue: '1' },
                        { boxLabel: '否', name: 'isParent', inputValue: '0', checked: true}
                    ]
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: '是否是子菜单',
                    columns: 2,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    vertical: true,
                    items: [
                        { boxLabel: '是', name: 'leaf', inputValue: '1' },
                        { boxLabel: '否', name: 'leaf', inputValue: '0', checked: true}
                    ]
                } , {
                    fieldLabel: '功能模块地址',
                    name: 'url',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入地址'
                }, {
                    fieldLabel: '父菜单',
                    id: 'addParentMenuname',
                    allowBlank: false,
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    disabled:true
                },{
                    xtype: 'hiddenfield',
                    name: 'parentMenu',
                    id: 'addParentMenu',
                    value: ''
                },{
                    xtype: 'button',
                    text: '查找菜单',
                    handler: function(){

                        var addToolbar = Ext.create('Ext.toolbar.Toolbar', {
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
                                        var menuTree = Ext.getCmp('menuTreeAdd_id');
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
                            id: 'menuTreeAdd_id',
                            width: 200,
                            height: 200,
                            store: menuStore,
                            rootVisible: false,
                            renderTo: Ext.getBody(),
                            dockedItems: [{
                                xtype: addToolbar,
                                dock: 'top'
                            }],
                            listeners:{
                                scope:this,
                                itemclick :  function (record, node) {

                                   // if(node.get('leaf')){
                                        var menuName = node.get('text');
                                        if( menuName.indexOf('red') != -1){
                                            menuName = menuName.substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<'));
                                        }

                                        Ext.getCmp('addParentMenu').setValue(node.getId());
                                        Ext.getCmp('addParentMenuname').setValue(menuName);

                                        Ext.getCmp('menuAdd_searchWindow').close();

                                  //  }
                                }
                            }
                        });

                        Ext.create('Ext.window.Window', {
                            id:'menuAdd_searchWindow',
                            title: '查找菜单',
                            height: 600,
                            width: 400,
                            layout: 'fit',
                            modal: true,//它背后的东西都会被遮罩
                            items: {
                                xtype: Ext.getCmp('menuTreeAdd_id')
                            },
                            listeners:{
                                close : function(){
                                    var menuTree = Ext.getCmp('menuTreeAdd_id');
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
                        var saveForm = Ext.getCmp('menuSaveForm');
                        var form = this.up('form').getForm();
                        var formValues = form.getValues();
                        if (form.isValid()) {
                            Ext.Ajax.request({
                                url:'/menu/save',
                                params: {'text':formValues["text"],expanded: formValues["expanded"],isParent: formValues["isParent"],leaf: formValues["leaf"],'url':formValues["url"],'parentMenu':formValues["parentMenu"]},
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
    editMenuRecord: function(){
        var grid = Ext.getCmp('menu_list');

        var selection = grid.getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择菜单!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{
            Ext.create('Ext.window.Window', {
                id: 'menuUpdateForm',

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
                        fieldLabel: '菜单名称',
                        name: 'text',
                        itemId: 'text',
                        allowBlank: false,
                        beforeLabelTextTpl: [
                            '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                        ],
                        bind: selection[0].get('text')
                    },{
                        xtype: 'radiogroup',
                        id: 'expanded',
                        fieldLabel: '是否默认打开',
                        columns: 2,
                        beforeLabelTextTpl: [
                            '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                        ],
                        vertical: true,
                        items: [
                            { boxLabel: '是', name: 'expanded', inputValue: '1' },
                            { boxLabel: '否', name: 'expanded', inputValue: '0'}
                        ],
                        listeners:{
                            beforerender:function(){
                                if(true == selection[0].get('expanded')){
                                    Ext.getCmp('expanded').items.get(0).setValue(true);
                                }else{
                                    Ext.getCmp('expanded').items.get(1).setValue(true);
                                }
                            }
                        }
                    }, {
                        xtype: 'radiogroup',
                        id: 'isParent',
                        fieldLabel: '是否是父菜单',
                        columns: 2,
                        beforeLabelTextTpl: [
                            '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                        ],
                        vertical: true,
                        items: [
                            { boxLabel: '是', name: 'isParent', inputValue: '1' },
                            { boxLabel: '否', name: 'isParent', inputValue: '0' }
                        ],
                        listeners:{
                            beforerender:function(){
                                if(true == selection[0].get('parent')){
                                    Ext.getCmp('isParent').items.get(0).setValue(true);
                                }else{
                                    Ext.getCmp('isParent').items.get(1).setValue(true);
                                }
                            }
                        }
                    }, {
                        xtype: 'radiogroup',
                        id: 'leaf',
                        fieldLabel: '是否是子菜单',
                        columns: 2,
                        beforeLabelTextTpl: [
                            '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                        ],
                        vertical: true,
                        items: [
                            { boxLabel: '是', name: 'leaf', inputValue: '1' },
                            { boxLabel: '否', name: 'leaf', inputValue: '0' }
                        ],
                        listeners:{
                            beforerender:function(){
                                if(true == selection[0].get('leaf')){
                                    Ext.getCmp('leaf').items.get(0).setValue(true);
                                }else{
                                    Ext.getCmp('leaf').items.get(1).setValue(true);
                                }
                            }
                        }
                    },  {
                        fieldLabel: '功能模块地址',
                        name: 'url',
                        inputType: 'url',
                        allowBlank: false,
                        beforeLabelTextTpl: [
                            '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                        ],
                        bind: selection[0].get('url')
                    }, {
                        fieldLabel: '父菜单',
                        allowBlank: false,
                        id: 'editParentMenuName',
                        disabled:true,
                        beforeLabelTextTpl: [
                            '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                        ],
                        bind: selection[0].get('parentMenu')
                    },{
                        xtype: 'hiddenfield',
                        name: 'parentMenu',
                        id: 'editParentMenu',
                        value: selection[0].get('parentMenuId')
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
                                        id       : 'search_edit_menuTree',
                                        emptyText: '快速检索'
                                    }, {
                                        // xtype: 'button', // default for Toolbars
                                        text: '查询',
                                        iconCls : 'icon-search',
                                        handler: function(){
                                            var search_edit_menuTree = Ext.getCmp('search_edit_menuTree').getValue();
                                            var menuTree = Ext.getCmp('menuTreeEdit_id');
                                            var root = menuTree.getRootNode();

                                            root.cascade(function(node){

                                                if( node.get('text').indexOf('red') != -1){
                                                    node.set('text',node.get('text').substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<')));
                                                }

                                                if(node.get('leaf') && node.get('text').indexOf(search_edit_menuTree) >= 0){
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
                                store: menuStore,
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
                                        var menuName = node.get('text');
                                        if( menuName.indexOf('red') != -1){
                                            menuName = menuName.substring(node.get('text').indexOf('>')+1,node.get('text').lastIndexOf('<'));
                                        }

                                        Ext.getCmp('editParentMenu').setValue(node.getId());
                                        Ext.getCmp('editParentMenuName').setValue(menuName);

                                        Ext.getCmp('menuEdit_searchWindow').close();

                                        //  }
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

                            var updateForm = Ext.getCmp('menuUpdateForm');
                            var form = this.up('form').getForm();
                            var formValues = form.getValues();

                            if (form.isValid()) {
                                Ext.Ajax.request({
                                    url:'/menu/update',
                                    params: {'id':selection[0].getId(),'text':formValues["text"],expanded: formValues["expanded"],isParent: formValues["isParent"],leaf: formValues["leaf"],'url':formValues["url"],'parentMenu':formValues["parentMenu"]},
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

    removeMenuRecord: function(){
        var grid = Ext.getCmp('menu_list'), selection = grid
            .getSelectionModel().getSelection();
        var message = '',ids = '';

        if (selection.length == 1) // 如果只选择了一条
            ids = selection[0].get('id'),
                message = ' 『' + selection[0].get('text') + '』 吗?';

        else if(selection.length == 0){
            Ext.Msg.alert('message','请选择菜单!');
        }else { // 选择了多条记录
            message = '<ol>';
            Ext.Array.each(grid.getSelectionModel().getSelection(), function(record) {
                message += '<li>' + record.get('text') + '</li>';
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
                        url:'/menu/remove',
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

    viewMenuRecord: function(){
        var grid = Ext.getCmp('menu_list'), selection = grid
            .getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择菜单!');
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
                '<tr><td>菜单名称:</td><td>{text}</td></tr>',
                '<tr><td>地址:</td><td>{url}</td></tr>',
                '</table>'
            );

            //获取数据
            Ext.Ajax.request({
                url: '/menu/viewById',
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

    searchMenu: function(){
        var search_menu_name = Ext.getCmp('search_menu_name').getValue();
        var menu_store = Ext.getCmp('menu_list').store;

        menu_store.on('beforeload', function (store, options) {
            var new_params = { text: search_menu_name};
            Ext.apply(menu_store.proxy.extraParams, new_params);
        });
        //  role_store.filter('name', search_org_name);
        menu_store.load();
    }


});