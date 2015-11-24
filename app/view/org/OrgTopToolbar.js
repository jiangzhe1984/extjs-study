Ext.define('TutorialApp.view.org.OrgTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-orgTopToolbar',
    controller: 'orgc',
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
                        if(authority == 'ORG_SAVE'){
                            var add = new Object();
                            add.text = "新增";
                            add.iconCls = "icon-plus-sign-alt";
                            var addListener = new Object();
                            addListener.click = "addOrgRecord";
                            add.listeners = addListener;
                            view.add(add);

                            var update = new Object();
                            update.text = "修改";
                            update.iconCls = "icon-edit";
                            var updateListener = new Object();
                            updateListener.click = "editOrgRecord";
                            update.listeners = updateListener;
                            view.add(update);

                        }

                        if(authority == 'ORG_DELETE'){
                            var del = new Object();
                            del.text = "删除";
                            del.iconCls = "icon-remove";
                            var delListener = new Object();
                            delListener.click = "removeOrgRecord";
                            del.listeners = delListener;
                            view.add(del);
                        }

                    });

                    var viewRole = new Object();
                    viewRole.text = "显示";
                    viewRole.iconCls = "icon-eye-open";
                    var viewListener = new Object();
                    viewListener.click = "viewOrgRecord";
                    viewRole.listeners = viewListener;
                    view.add(viewRole);


                    view.add('->');

                    var searchText = new Object();
                    searchText.xtype = "textfield";
                    searchText.id = "search_org_name";
                    searchText.emptyText = "部门名称";

                    view.add(searchText);

                    var searchButton = new Object();
                    searchButton.xtype = "button";
                    searchButton.text = "查询";
                    searchButton.iconCls = "icon-search";
                    var searchListener = new Object();
                    searchListener.click = "searchOrg";
                    searchButton.listeners = searchListener;
                    view.add(searchButton);
                }
            });
        }
    }

    //searchOrg
 /*   items: [
        {
            // xtype: 'button', // default for Toolbars
            text: '新增',
            iconCls : 'icon-plus-sign-alt',
            listeners: {
                click: 'addOrgRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '修改',
            iconCls : 'icon-edit',
            listeners: {
                click: 'editOrgRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '删除',
            iconCls : 'icon-remove',
            listeners: {
                click: 'removeOrgRecord'
            }
        },
        {
            // xtype: 'button', // default for Toolbars
            text: '显示',
            iconCls : 'icon-eye-open',
            listeners: {
                click: 'viewOrgRecord'
            }
        },
        '->',
        {
            xtype    : 'textfield',
            id       : 'search_org_name',
            emptyText: '快速检索'
        }, {
            // xtype: 'button', // default for Toolbars
            text: '查询',
            iconCls : 'icon-search',
            handler: function(){
                var search_org_name = Ext.getCmp('search_org_name').getValue();
                var org_store = Ext.getCmp('org_list').store;

                org_store.on('beforeload', function (store, options) {
                    var new_params = { orgName: search_org_name};
                    Ext.apply(org_store.proxy.extraParams, new_params);
                });
                //  role_store.filter('name', search_org_name);
                org_store.load();
            }
        }
    ]*/
});