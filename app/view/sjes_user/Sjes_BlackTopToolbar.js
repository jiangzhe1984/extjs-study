Ext.define('TutorialApp.view.sjes_user.Sjes_BlackTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-sjesblackTopToolbar',
    controller: 'sjesblack',
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
                        if(authority == 'BLACK_SAVE'){
                             var add = new Object();
                             add.text = "新增";
                             add.iconCls = "icon-plus-sign-alt";
                             var addListener = new Object();
                             addListener.click = "addBlackRecord";
                             add.listeners = addListener;
                             view.add(add);

                            var update = new Object();
                            update.text = "修改";
                            update.iconCls = "icon-edit";
                            var updateListener = new Object();
                            updateListener.click = "editBlackRecord";
                            update.listeners = updateListener;
                            view.add(update);

                        }

                        if(authority == 'BLACK_DELETE'){
                                    var del = new Object();
                             del.text = "删除";
                             del.iconCls = "icon-remove";
                             var delListener = new Object();
                             delListener.click = "removeBlackRecord";
                             del.listeners = delListener;
                             view.add(del);
                        }

                    });

                    var viewRole = new Object();
                    viewRole.text = "显示";
                    viewRole.iconCls = "icon-eye-open";
                    var viewListener = new Object();
                    viewListener.click = "viewBlackRecord";
                    viewRole.listeners = viewListener;
                    view.add(viewRole);


                    view.add('->');

                    var searchBlackUsername = new Object();
                    searchBlackUsername.xtype = "textfield";
                    searchBlackUsername.id = "search_black_username";
                    searchBlackUsername.emptyText = "用户名";

                    view.add(searchBlackUsername);

                    var searchBlackMobile = new Object();
                    searchBlackMobile.xtype = "textfield";
                    searchBlackMobile.id = "search_black_usermobile";
                    searchBlackMobile.emptyText = "手机号";

                    view.add(searchBlackMobile);

                    var searchBlackEmail = new Object();
                    searchBlackEmail.xtype = "textfield";
                    searchBlackEmail.id = "search_black_useremail";
                    searchBlackEmail.emptyText = "邮箱";

                    view.add(searchBlackEmail);

                    var searchBlackUsercard = new Object();
                    searchBlackUsercard.xtype = "textfield";
                    searchBlackUsercard.id = "search_black_usercard";
                    searchBlackUsercard.emptyText = "会员卡";

                    view.add(searchBlackUsercard);


                    var searchButton = new Object();
                    searchButton.xtype = "button";
                    searchButton.text = "查询";
                    searchButton.iconCls = "icon-search";
                    var searchListener = new Object();
                    searchListener.click = "searchBlack";
                    searchButton.listeners = searchListener;
                    view.add(searchButton);
                }
            });
        }
    }
});