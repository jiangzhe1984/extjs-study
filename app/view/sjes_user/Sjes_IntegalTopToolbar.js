/**
 * 积分工具栏
 */
Ext.define('TutorialApp.view.sjes_user.Sjes_IntegalTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-sjesIntegalTopToolbar',
    controller: 'sjesIntegal',
    renderTo: document.body,
    width   : 500,
    listeners : {
        render : function(view, eOpts){
            var url = view.url;
            Ext.Ajax.request({
                url : url,
                success : function(response, options){

                    var result = Ext.decode(response.responseText);

                    var searchSjesIntegalUser = new Object();
                    searchSjesIntegalUser.xtype = "textfield";
                    searchSjesIntegalUser.id = "search_integal_username";
                    searchSjesIntegalUser.emptyText = "用户名";

                    view.add(searchSjesIntegalUser);

                    var searchSjesIntegalMobile = new Object();
                    searchSjesIntegalMobile.xtype = "textfield";
                    searchSjesIntegalMobile.id = "search_integal_usermobile";
                    searchSjesIntegalMobile.emptyText = "手机号";

                    view.add(searchSjesIntegalMobile);

                    var searchSjesIntegalEmail = new Object();
                    searchSjesIntegalEmail.xtype = "textfield";
                    searchSjesIntegalEmail.id = "search_integal_useremail";
                    searchSjesIntegalEmail.emptyText = "邮箱";

                    view.add(searchSjesIntegalEmail);

                    var searchSjesIntegalCard = new Object();
                    searchSjesIntegalCard.xtype = "textfield";
                    searchSjesIntegalCard.id = "search_integal_usercard";
                    searchSjesIntegalCard.emptyText = "会员卡";

                    view.add(searchSjesIntegalCard);


                    var searchButton = new Object();
                    searchButton.xtype = "button";
                    searchButton.text = "查询";
                    searchButton.iconCls = "icon-search";
                    var searchListener = new Object();
                    searchListener.click = "searchIntegal";
                    searchButton.listeners = searchListener;
                    view.add(searchButton);

                }
            });
        }
    }
});