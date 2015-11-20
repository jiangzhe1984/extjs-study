Ext.define('TutorialApp.view.authority.AuthorityTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-authorityTopToolbar',
    controller: 'authorityc',
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
                        if(authority == 'AUTHORITY_SAVE'){
                            var add = new Object();
                            add.text = "新增";
                            add.iconCls = "icon-plus-sign-alt";
                            var addListener = new Object();
                            addListener.click = "addAuthorityRecord";
                            add.listeners = addListener;
                            view.add(add);

                         /*   var update = new Object();
                            update.text = "修改";
                            update.iconCls = "icon-edit";
                            var updateListener = new Object();
                            updateListener.click = "editAuthorityRecord";
                            update.listeners = updateListener;
                            view.add(update);*/

                        }

                        if(authority == 'AUTHORITY_DELETE'){
                            var del = new Object();
                            del.text = "删除";
                            del.iconCls = "icon-remove";
                            var delListener = new Object();
                            delListener.click = "removeAuthorityRecord";
                            del.listeners = delListener;
                            view.add(del);
                        }

                    });

                    var viewRole = new Object();
                    viewRole.text = "显示";
                    viewRole.iconCls = "icon-eye-open";
                    var viewListener = new Object();
                    viewListener.click = "viewAuthorityRecord";
                    viewRole.listeners = viewListener;
                    view.add(viewRole);


                    view.add('->');

                    var searchText = new Object();
                    searchText.xtype = "textfield";
                    searchText.id = "search_authority_name";
                    searchText.emptyText = "快速检索";

                    view.add(searchText);

                    var searchButton = new Object();
                    searchButton.xtype = "button";
                    searchButton.text = "查询";
                    searchButton.iconCls = "icon-search";
                    var searchListener = new Object();
                    searchListener.click = "searchAuthority";
                    searchButton.listeners = searchListener;
                    view.add(searchButton);
                }
            });
        }
    }

});