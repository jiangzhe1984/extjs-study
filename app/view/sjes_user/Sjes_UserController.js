
//自定义正则表达式
Ext.define('Override.form.field.VTypes', {
    override: 'Ext.form.field.VTypes',

    // vtype validation function
    mobile: function(value) {
        return this.mobileRe.test(value);
    },
    idCard: function(value) {
        return this.idCardRe.test(value);
    },
    // RegExp for the value to be tested against within the validation function
    mobileRe: /^1\d{10}$/i,
    mobileText: '手机号不符合规定',
    idCardRe:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/,
    idCardText: '身份证号码不符合规定'
});
/**
 * 商城用户控制器
 */
Ext.define('TutorialApp.view.sjes_user.Sjes_UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.sjes_userc',

    //查看用户
    viewSjesUserRecord: function(){
        var grid = Ext.getCmp('sjes_user_list'), selection = grid
            .getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('温馨提示','请选择用户!');
        }else if(selection.length > 1){
            Ext.Msg.alert('温馨提示','一次操作一条!');
        }else{

            //创建panel
          var panel = new Ext.Panel({
                width: 200,
                height: 200,
                frame: true
            });
            //创建数据显示模板
            var template = new Ext.XTemplate(
                '<table  id="template" border="1">',
                '<tr><td width="100">用户名</td><td width="200">{username}</td></tr>',
                '<tr><td>昵称</td><td>{nickname}</td></tr>',
                '<tr><td>邮箱</td><td>{email}</td></tr>',
                '<tr><td>手机号</td><td>{mobile}</td></tr>',
                '<tr><td>性别</td>',
                '<tpl switch="sex">',
                '<tpl case="0">',
                '<td>男</td>',
                '<tpl default>',
                '<td>女</td>',
                '</tpl>',
                '</tr>',
                '<tr><td>生日</td><td>{birthday}</td></tr>',
                '<tr><td>会员卡号</td><td>{cardNum}</td></tr>',
                '<tr><td>会员卡有效期</td><td>{dateLine}</td></tr>',
                '<tr><td>感兴趣的分类</td><td>{categories}</td></tr>',
                '<tr><td>虚拟会员卡号</td>{virtualCardNum}<td></td></tr>',
                '<tr><td>是否激活</td>',

                    '<tpl if="this.isEnable(enable)">',
                    '<td>是</td>',
                    '<tpl else>',
                    '<td>否</td>',
                    '</tpl>',

                '</tr>',
                '<tr><td>生成时间</td><td>{createdDate}</td></tr>',
                '<tr><td>更新时间</td><td>{updatedDate}</td></tr>',
                '</table>',
                {
                    // XTemplate configuration:
                    disableFormats: true,
                    // member functions:
                    isEnable: function(enable){
                        return enable;
                    },
                    isBaby: function(age){
                        return age < 1;
                    }
                }
            );

            //获取数据
            Ext.Ajax.request({
                url: '/sjes_users/viewUser',
                method: 'post',
                params: { username: selection[0].get('username')},
                success: function (response, options) {
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
                height: 400,
                width: 300,
                layout: 'fit',
                items: {
                    xtype: panel
                }
            }).show();
        }
    },
    //修改
    editSjesUserRecord: function(){
        var grid = Ext.getCmp('sjes_user_list'), selection = grid
            .getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择用户!');
        }else if(selection.length > 1) {
            Ext.Msg.alert('message', '一次操作一条!');
        }else{
            Ext.create('Ext.window.Window', {
                id: 'sjesUserUpdateForm',

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
                height:300,
                layout: 'fit',
                modal: true,//它背后的东西都会被遮罩
                items: {
                    xtype: 'form',
                    reference: 'form',
                  //  url: '/sjes_users/updateUser',
                    bodyPadding: 10,
                    defaultType: 'textfield',

                    fieldDefaults: {
                        anchor: '100%',
                        labelAlign: 'right',
                        labelWidth: 80
                    },
                    items: [ {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                            {
                                xtype: "textfield",
                                id:"mobile",
                                name: "mobile",
                                fieldLabel: "认证手机",
                                allowBlank: false,
                                emptyText: "电话或手机号码",
                                readOnly:true,
                                bind: selection[0].get('mobile'),
                                vtype:'mobile',
                                margin: '5 5 10 5'
                            },
                            {
                                xtype: "button",
                                text: '修改',
                                margin: '5 5 5 5',
                                handler: function () {
                                  Ext.getCmp("mobile").setReadOnly(false);
                                }
                            }
                        ]
                    }, {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                            {   xtype: "textfield",
                                id:"email",
                                name: "email",
                                fieldLabel: "认证邮箱",
                                allowBlank: false,
                                readOnly:true,
                                emptyText: "认证邮箱",
                                margin: '5 5 10 5',
                                vtype: 'email',
                                bind: selection[0].get('email')
                            },
                            {
                                xtype: "button",
                                text: '修改',
                                margin: '5 5 5 5',
                                handler: function () {
                                    Ext.getCmp("email").setReadOnly(false);
                                }
                            }
                        ]
                    }, {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                            {
                                xtype: "textfield",
                                id:"cardNum",
                                name: "cardNum",
                                fieldLabel: "用户身份证",
                                allowBlank: false,
                                readOnly:true,
                                emptyText: "用户身份证" ,
                                vtype:'idCard',
                                margin: '5 5 10 5',
                                bind: selection[0].get('cardNum')
                            },
                            {
                                xtype: "button",
                                text: '修改',
                                margin: '5 5 5 5',
                                handler: function () {
                                    Ext.getCmp("cardNum").setReadOnly(false);
                                }
                            }
                        ]
                    },/*{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'username',
                        value: selection[0].get('username')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'nickname',
                        value: selection[0].get('nickname')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'email',
                        value: selection[0].get('email')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'password',
                        value: selection[0].get('password')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'pwdStrength',
                        value: selection[0].get('pwdStrength')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'mobile',
                        value: selection[0].get('mobile')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'sex',
                        value: selection[0].get('sex')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'birthday',
                        value: selection[0].get('birthday')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'cardNum',
                        value: selection[0].get('cardNum')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'categories',
                        value: selection[0].get('categories')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'dateLine',
                        value: selection[0].get('dateLine')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'virtualCardNum',
                        value: selection[0].get('virtualCardNum')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'portraitPath',
                        value: selection[0].get('portraitPath')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'enable',
                        value: selection[0].get('enable')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'createdDate',
                        value: selection[0].get('createdDate')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'updatedDate',
                        value: selection[0].get('updatedDate')
                    },{
                        xtype: 'hiddenfield', //hiddenfield
                        name: 'id',
                        value: selection[0].getId()
                    },*/{
                        xtype: 'panel',
                        margin: '5 5 5 15',//上右下左
                        html:'<font color="red">用户信息请谨慎修改！！</font>'
                    }],
                    buttons: [{
                        xtype: 'tbtext',
                        html: '错误',
                        style: 'color:red',
                        hidden: true
                    }, '->', {
                        text: '提交',
                        handler: function(){
                            var updateForm = Ext.getCmp('sjesUserUpdateForm');
                            var form = this.up('form').getForm();
                            var formValues = form.getValues();

                            if (form.isValid()) {

                              /*  form.submit({
                                    success: function(form, action) {
                                        updateForm.close();
                                        var current = grid.store.currentPage;
                                        grid.store.loadPage(current);
                                        //Ext.Msg.alert('Success', action.result.msg);
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result.msg);
                                    }
                                });*/

                                Ext.Ajax.request({
                                    url:'/sjes_users/updateUser',
                                    params: {'id':selection[0].getId(),'username':selection[0].get('username'),'mobile':formValues["mobile"],email: formValues["email"],'cardNum':formValues["cardNum"]},
                                    // async: false,
                                    method: 'post',
                                    success: function(response){

                                        var result = Ext.decode(response.responseText);

                                        if(result == 1){
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

    searchSjesUser:function(){
        var search_sjes_username = Ext.getCmp('search_sjes_username').getValue();
        var search_sjes_usermobile = Ext.getCmp('search_sjes_usermobile').getValue();
        var search_sjes_useremail = Ext.getCmp('search_sjes_useremail').getValue();
        var search_sjes_usercard = Ext.getCmp('search_sjes_usercard').getValue();
        var sjes_user_store = Ext.getCmp('sjes_user_list').store;

        sjes_user_store.on('beforeload', function (store, options) { //提交到后台前添加查询条件
            var new_params = { username: search_sjes_username,mobile: search_sjes_usermobile,email: search_sjes_useremail,cardNum: search_sjes_usercard};
            Ext.apply(sjes_user_store.proxy.extraParams, new_params);
        });
        //  role_store.filter('name', search_org_name);
        sjes_user_store.load();
    }
});