var viewHtml = '<table>'
viewHtml += '<tr><td>用户名</td><td></td></tr>';
viewHtml += '<tr><td>昵称</td><td></td></tr>';
viewHtml += '<tr><td>邮箱</td><td></td></tr>';
viewHtml += '<tr><td>密码</td><td></td></tr>';
viewHtml += '<tr><td>密码强度</td><td></td></tr>';
viewHtml += '<tr><td>手机号</td><td></td></tr>';
viewHtml += '<tr><td>性别</td><td></td></tr>';
viewHtml += '<tr><td>生日</td><td></td></tr>';
viewHtml += '<tr><td>会员卡号</td><td></td></tr>';
viewHtml += '<tr><td>会员卡有效期</td><td></td></tr>';
viewHtml += '<tr><td>虚拟会员卡号</td><td></td></tr>';
viewHtml += '<tr><td>头像路径</td><td></td></tr>';
viewHtml += '<tr><td>是否激活</td><td></td></tr>';
viewHtml += '<tr><td>生成时间</td><td></td></tr>';
viewHtml += '<tr><td>更新时间</td><td></td></tr>';
viewHtml += '</table>';

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
            Ext.Msg.alert('message','请选择用户!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{Ext.create('Ext.window.Window', {
                title: '显示',
                height: 200,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'panel',
                    html: '<table><tr><td>用户名</td><td>13958203381</td></tr><tr><td>手机号</td><td>13958203381</td></tr><tr><td>邮箱</td><td>wubin@sanjiang365.com</td></tr></table>'

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
                height:300,
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
                                id:"idCard",
                                name: "idCard",
                                fieldLabel: "用户身份证",
                                allowBlank: false,
                                readOnly:true,
                                emptyText: "用户身份证" ,
                                vtype:'idCard',
                                margin: '5 5 10 5',
                                bind: '330203198012012141'
                            },
                            {
                                xtype: "button",
                                text: '修改',
                                margin: '5 5 5 5',
                                handler: function () {
                                    Ext.getCmp("idCard").setReadOnly(false);
                                }
                            }
                        ]
                    },{
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

                        }
                    }]
                }
            });
        }

    }
});