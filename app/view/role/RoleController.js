
//人员关联当前角色
function Addsel(){
    var grid = Ext.getCmp('role_list');//获取角色列表
    var selection = grid.getSelectionModel().getSelection();

    var a=document.getElementById("sel1");
    if(a.selectedIndex<0){
        Ext.Msg.alert("message","请选择人员");
        return false;
    }

    var removeCount = 0;
    for(var i=0;i<a.length;i++){
        if(a.options[i-removeCount].selected){

            userRoleRelation(true,selection[0].getId(),a.options[i-removeCount].value);//用户与角色关联

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



//取消人员和角色的关联
function Delsel(){

    var grid = Ext.getCmp('role_list');
    var selection = grid.getSelectionModel().getSelection();

    var b=document.getElementById("sel2");
    if(b.selectedIndex<0){
        Ext.Msg.alert("message","请选择人员");
        return false;
    }

    var removeCount = 0;

    for(var i=0;i<b.length;i++){
        if(b.options[i-removeCount].selected){

            userRoleRelation(false,selection[0].getId(),b.options[i-removeCount].value);//取消关联

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

//关联
function userRoleRelation(isAdd,roleId,aclUserId){
    Ext.Ajax.request({
        url:'/roleUser/relation',
        params: {'isAdd':isAdd,'roleId':roleId,'aclUserId':aclUserId},
        // async: false,
        method: 'post',
        success: function(response, opts){
            var obj = Ext.decode(response.responseText);
            if(obj.state == 'success'){

            }else{
                Ext.Msg.alert('出错了');
            }

        }
    });
}
//取消关联
function relation(checked,roleId,authorityId){
    Ext.Ajax.request({
        url:'/roleauthority/relation',
        params: {'checked':checked,'roleId':roleId,'authorityId':authorityId},
        // async: false,
        method: 'post',
        success: function(response, opts){
            var obj = Ext.decode(response.responseText);
            if(obj.state == 'success'){

            }else{
                Ext.Msg.alert('出错了');
            }

        }
    });
}
//角色控制器
Ext.define('TutorialApp.view.role.RoleController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rolec',
    //添加
    addRoleRecord: function(){
        var grid = Ext.getCmp('role_list');//角色列表
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
                    beforeLabelTextTpl: [
                        '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                    ],
                    emptyText: '请输入角色名称'
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
                        if (form.isValid()) {//表单符合条件才能提交
                            Ext.Ajax.request({
                                url:'/role/save',
                                params: {'name':formValues["name"],displayref: formValues["displayref"],'description':formValues["description"]},
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
//修改
    editRoleRecord: function(){
        var grid = Ext.getCmp('role_list');//角色列表

        var selection = grid.getSelectionModel().getSelection();//选中对象
        if(selection.length == 0) {//必须选中
            Ext.Msg.alert('message','请选择角色!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{
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
                            beforeLabelTextTpl: [
                                '<span style="color:#ff0000;font-weight:bold" data-qtip="必填选项">*</span>'
                            ],
                            allowBlank: false,
                            bind: selection[0].get('name')
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

                                if (form.isValid()) {
                                    Ext.Ajax.request({
                                        url:'/role/update',
                                        params: {'id':selection[0].getId(),'name':formValues["name"],displayref: formValues["displayref"],'description':formValues["description"]},
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
    removeRoleRecord: function(){
        var grid = Ext.getCmp('role_list'), selection = grid
            .getSelectionModel().getSelection();
        var message = '',ids = '';

        if (selection.length == 1) // 如果只选择了一条
            ids = selection[0].get('id'),
            message = ' 『' + selection[0].get('name') + '』 吗?';

        else if(selection.length == 0){
            Ext.Msg.alert('message','请选择角色!');
        }else { // 选择了多条记录
            message = '<ol>';
            Ext.Array.each(grid.getSelectionModel().getSelection(), function(record) {
                message += '<li>' + record.get('name') + '</li>';
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
                        url:'/role/remove',
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
    viewRoleRecord: function(){
        var grid = Ext.getCmp('role_list'), selection = grid
            .getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择角色!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{ Ext.create('Ext.window.Window', {
                title: '显示',
                height: 200,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'panel',
                    html: '<table><tr><td>角色名称</td><td>'+selection[0].get('name') +'</td></tr><tr><td>显示名称</td><td>'+selection[0].get('displayref') +'</td></tr><tr><td>描述</td><td>'+selection[0].get('description') +'</td></tr></table>'

                }
            }).show();
        }

    },
//关联与权限关联
    authAction: function(){
        var grid = Ext.getCmp('role_list');
        var selection = grid.getSelectionModel().getSelection();

        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择角色!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{

      /* authTreeId.store.proxy = new Ext.data.proxy.Proxy({ type: 'ajax',url:authUrl});*/
               //加载权限树
                var store = Ext.create('Ext.data.TreeStore', {
                    proxy: {
                        type: 'ajax',
                        url: '/role/authTreeForRole?role='+selection[0].getId()
                    },
                    root: {
                        text: 'All',
                        id: 'all',
                        expanded: true
                    }
                });

                Ext.create('Ext.tree.Panel',{
                    id: 'authTree_id',
                    width: 200,
                    height: 200,
                    store: store,
                    rootVisible: false,
                    renderTo: Ext.getBody(),
                    listeners:{
                        scope:this,
                        checkchange : function (node, checked) {//监听勾选事件

                            //当该节点有子节点时，将所有子节点选中
                            if (!node.get("leaf") && !node.get("parent") ){

                                if(checked){
                                    node.cascade(function(node){
                                        node.set('checked', true);
                                    });
                                }else{
                                    node.cascade(function(node){
                                        node.set('checked', false);
                                    });
                                }

                                node.cascade(function(node){
                                    if(node.get("leaf")){
                                        relation(checked,selection[0].getId(),node.getId().split('&')[1]);

                                    }

                                });

                            }else{
                                //获得父节点
                                var pNode = node.parentNode;
                                for (; pNode != null; pNode = pNode.parentNode) {
                                    pNode.set("checked", true);
                                }
                                relation(checked,selection[0].getId(),node.getId().split('&')[1]);

                            }

                        }
                    }
                });

        Ext.create('Ext.window.Window', {
            title: '关联权限',
            height: 600,
            width: 400,
            layout: 'fit',
            modal: true,//它背后的东西都会被遮罩
            items: {
                xtype: Ext.getCmp('authTree_id')
            }
        }).show();

        }
    },
//用户与角色关联
    roleAction: function(){
        var grid = Ext.getCmp('role_list');

        var selection = grid.getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择角色!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{
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
                close : function(){//监听窗口关闭事件
                    var deptTree = Ext.getCmp('deptTree');//获取权限树
                    var root = deptTree.getRootNode();//获取根节点

                    root.cascade(function(node){
                        if(node.getId() != 'all'){
                            node.collapse(true);
                            var text = node.get('text');
                            if(text.indexOf('red') != -1){//标红内容恢复原样

                                node.set('text',text.substring(text.indexOf('>')+1,text.lastIndexOf('<')));
                            }
                            document.sel.res.options.length=0;
                            document.sel.res1.options.length=0;
                        }

                    });
                }
            }
        }).show();}
    },
//查询
    searchRole: function(){
        var search_role_name = Ext.getCmp('search_role_name').getValue();
        var role_store = Ext.getCmp('role_list').store;

        role_store.on('beforeload', function (store, options) {//向后台提交前添加查询条件
            var new_params = { name: search_role_name};
            Ext.apply(role_store.proxy.extraParams, new_params);
        });
        //  role_store.filter('name', search_role_name);
        role_store.load();
    }
});