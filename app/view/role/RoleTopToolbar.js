//角色工具栏
Ext.define('TutorialApp.view.role.RoleTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-roleTopToolbar',
     controller: 'rolec',
    renderTo: document.body,
    width   : 500,
    listeners : {
        render : function(view, eOpts){
            var url = view.url;
            Ext.Ajax.request({
                url : url,
                success : function(response, options){

                    var result = Ext.decode(response.responseText);
                    //循环当前用户的所有权限
                    Ext.each(result, function(authority){
                       if(authority == 'ROLE_SAVE'){
                           var add = new Object();
                           add.text = "新增";
                           add.iconCls = "icon-plus-sign-alt";
                           var addListener = new Object();
                           addListener.click = "addRoleRecord";
                           add.listeners = addListener;
                           view.add(add);

                           var update = new Object();
                           update.text = "修改";
                           update.iconCls = "icon-edit";
                           var updateListener = new Object();
                           updateListener.click = "editRoleRecord";
                           update.listeners = updateListener;
                           view.add(update);

                       }

                        if(authority == 'ROLE_DELETE'){
                            var del = new Object();
                            del.text = "删除";
                            del.iconCls = "icon-remove";
                            var delListener = new Object();
                            delListener.click = "removeRoleRecord";
                            del.listeners = delListener;
                            view.add(del);
                        }

                        if(authority == 'ROLE_CONFIGURE'){
                            var auth = new Object();
                            auth.text = "关联权限";
                            auth.iconCls = "icon-key";
                            var authListener = new Object();
                            authListener.click = "authAction";
                            auth.listeners = authListener;
                            view.add(auth);

                            var role_user = new Object();
                            role_user.text = "分配角色";
                            role_user.iconCls = "icon-group";
                            var role_userListener = new Object();
                            role_userListener.click = "roleAction";
                            role_user.listeners = role_userListener;
                            view.add(role_user);
                        }

                    });

                    var viewRole = new Object();
                    viewRole.text = "显示";
                    viewRole.iconCls = "icon-eye-open";
                    var viewListener = new Object();
                    viewListener.click = "viewRoleRecord";
                    viewRole.listeners = viewListener;
                    view.add(viewRole);


                   view.add('->');

                    var searchText = new Object();
                    searchText.xtype = "textfield";
                    searchText.id = "search_role_name";
                    searchText.emptyText = "角色名称";

                    view.add(searchText);

                    var searchButton = new Object();
                    searchButton.xtype = "button";
                    searchButton.text = "查询";
                    searchButton.iconCls = "icon-search";
                    var searchListener = new Object();
                    searchListener.click = "searchRole";
                    searchButton.listeners = searchListener;
                    view.add(searchButton);
                }
            });
        }
    }
/*  items: [
      {
          // xtype: 'button', // default for Toolbars
          text: '新增',
          iconCls : 'icon-plus-sign-alt',
          listeners: {
              click: 'addRoleRecord'
          }
      },
      {
          // xtype: 'button', // default for Toolbars
          text: '修改',
          iconCls : 'icon-edit',
          listeners: {
              click: 'editRoleRecord'
          }
      },
      {
          // xtype: 'button', // default for Toolbars
          text: '删除',
          iconCls : 'icon-remove',
          listeners: {
              click: 'removeRoleRecord'
          }
      },
      {
          // xtype: 'button', // default for Toolbars
          text: '显示',
          iconCls : 'icon-eye-open',
          listeners: {
              click: 'viewRoleRecord'
          }
      },
      {
          // xtype: 'button', // default for Toolbars
          text: '关联权限',
          iconCls : 'icon-key',
          listeners: {
              click: 'authAction'
          }
      },
      {
          // xtype: 'button', // default for Toolbars
          text: '分配角色',
          iconCls : 'icon-group',
          listeners: {
              click: 'roleAction'
          }
      },
      '->',
      {
          xtype    : 'textfield',
          id       : 'search_role_name',
          emptyText: '快速检索'
      }, {
          // xtype: 'button', // default for Toolbars
          text: '查询',
          iconCls : 'icon-search',
         listeners: {
         click: 'searchRole'
         }
      }
  ]*/
});