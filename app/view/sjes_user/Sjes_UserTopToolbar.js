/**
 * 商城用户查询工具栏
 */
Ext.define('TutorialApp.view.sjes_user.Sjes_UserTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-sjesuserTopToolbar',
    controller: 'sjes_userc',
    renderTo: document.body,
    width   : 500,
    listeners : {
        render : function(view, eOpts){
            var url = view.url;
            Ext.Ajax.request({
                url : url,
                success : function(response, options){

                    var result = Ext.decode(response.responseText);
                    //循环当前用户的所有权限加载按钮
                    Ext.each(result, function(authority){
                        if(authority == 'SJESUSER_SAVE'){
                           /* var add = new Object();
                            add.text = "新增";
                            add.iconCls = "icon-plus-sign-alt";
                            var addListener = new Object();
                            addListener.click = "addOrgRecord";
                            add.listeners = addListener;
                            view.add(add);*/

                            var update = new Object();
                            update.text = "修改";
                            update.iconCls = "icon-edit";
                            var updateListener = new Object();
                            updateListener.click = "editSjesUserRecord";
                            update.listeners = updateListener;
                            view.add(update);

                        }

                        if(authority == 'SJESUSER_DELETE'){
                    /*        var del = new Object();
                            del.text = "删除";
                            del.iconCls = "icon-remove";
                            var delListener = new Object();
                            delListener.click = "removeOrgRecord";
                            del.listeners = delListener;
                            view.add(del);*/
                        }

                    });

                    var viewRole = new Object();
                    viewRole.text = "显示";
                    viewRole.iconCls = "icon-eye-open";
                    var viewListener = new Object();
                    viewListener.click = "viewSjesUserRecord";
                    viewRole.listeners = viewListener;
                    view.add(viewRole);


                    view.add('->');

                    var searchSjesUser = new Object();
                    searchSjesUser.xtype = "textfield";
                    searchSjesUser.id = "search_sjes_username";
                    searchSjesUser.emptyText = "用户名";

                    view.add(searchSjesUser);

                    var searchSjesUserMobile = new Object();
                    searchSjesUserMobile.xtype = "textfield";
                    searchSjesUserMobile.id = "search_sjes_usermobile";
                    searchSjesUserMobile.emptyText = "手机号";

                    view.add(searchSjesUserMobile);

                    var searchSjesUserEmail = new Object();
                    searchSjesUserEmail.xtype = "textfield";
                    searchSjesUserEmail.id = "search_sjes_useremail";
                    searchSjesUserEmail.emptyText = "邮箱";

                    view.add(searchSjesUserEmail);

                    var searchSjesUserCard = new Object();
                    searchSjesUserCard.xtype = "textfield";
                    searchSjesUserCard.id = "search_sjes_usercard";
                    searchSjesUserCard.emptyText = "会员卡";

                    view.add(searchSjesUserCard);


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
});