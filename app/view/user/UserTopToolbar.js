Ext.define('TutorialApp.view.user.UserTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-userTopToolbar',
    controller: 'userc',
    renderTo: document.body,
    width   : 500,
    listeners : {
        render : function(view, eOpts){
            var url = view.url;
            Ext.Ajax.request({
                url : url,
                success : function(response, options){

                    var result = Ext.decode(response.responseText);

                    Ext.each(result, function(authority){
                        if(authority == 'USER_SAVE'){
                            var add = new Object();
                            add.text = "新增";
                            add.iconCls = "icon-plus-sign-alt";
                            var addListener = new Object();
                            addListener.click = "addUserRecord";
                            add.listeners = addListener;
                            view.add(add);

                            var update = new Object();
                            update.text = "修改";
                            update.iconCls = "icon-edit";
                            var updateListener = new Object();
                            updateListener.click = "editUserRecord";
                            update.listeners = updateListener;
                            view.add(update);

                        }


                        if(authority == 'USER_DELETE'){
                            var del = new Object();
                            del.text = "删除";
                            del.iconCls = "icon-remove";
                            var delListener = new Object();
                            delListener.click = "removeUserRecord";
                            del.listeners = delListener;
                            view.add(del);
                        }

                    });


                    var viewRole = new Object();
                    viewRole.text = "显示";
                    viewRole.iconCls = "icon-eye-open";
                    var viewListener = new Object();
                    viewListener.click = "viewUserRecord";
                    viewRole.listeners = viewListener;
                    view.add(viewRole);


                    view.add('->');

                    var searchText = new Object();
                    searchText.xtype = "textfield";
                    searchText.id = "search_user_name";
                    searchText.emptyText = "用户名";

                    view.add(searchText);

                    var searchButton = new Object();
                    searchButton.xtype = "button";
                    searchButton.text = "查询";
                    searchButton.iconCls = "icon-search";
                    var searchListener = new Object();
                    searchListener.click = "searchUser";
                    searchButton.listeners = searchListener;
                    view.add(searchButton);
                }
            });
        }
    }

    /*items: [
        {
            // xtype: 'button', // default for Toolbars
            text: '新增',
            iconCls : 'icon-plus-sign-alt',
            listeners: {
                click: 'addUserRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '修改',
            iconCls : 'icon-edit',
            listeners: {
                click: 'editUserRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '删除',
            iconCls : 'icon-remove',
            listeners: {
                click: 'removeUserRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '显示',
            iconCls : 'icon-eye-open',
            listeners: {
                click: 'viewUserRecord'
            }
        },
        '->',
        {
            xtype    : 'textfield',
            id       : 'search_user_name',
            emptyText: '快速检索'
        }, {
            // xtype: 'button', // default for Toolbars
            text: '查询',
            iconCls : 'icon-search',
            handler: function(){
                var search_user_name = Ext.getCmp('search_user_name').getValue();
                var user_store = Ext.getCmp('user_list').store;

                user_store.on('beforeload', function (store, options) {
                    var new_params = { username: search_user_name};
                    Ext.apply(user_store.proxy.extraParams, new_params);
                });
                //  role_store.filter('name', search_org_name);
                user_store.load();
            }
        }
    ]*/
});