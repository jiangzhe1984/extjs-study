Ext.define('TutorialApp.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'TutorialApp.view.login.LoginController',
        'TutorialApp.view.loginModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.layout.container.Fit',
        'Ext.toolbar.Fill',
        'Ext.toolbar.TextItem'
    ],

    controller: 'login',
    viewModel: {
        type: "login"
    },

    bodyPadding: 10,
    title: '三江网购',
    closable: false,
    autoShow: true,

    layout: 'fit',

    defaultFocus: 'username',

    items: {
        xtype: 'form',
        reference: 'form',
        bodyPadding: 10,
        defaultType: 'textfield',
        defaults: {
            listeners: {
                specialkey: 'onSpecialkey'
            }
        },
        fieldDefaults: {
            anchor: '100%',
            labelAlign: 'right',
            labelWidth: 40
        },
        items: [{
            fieldLabel: '账户',
            name: 'username',
            itemId: 'username',
            allowBlank: false,
            emptyText: '请输入您的账号',
            bind: '{username}'
        }, {
            fieldLabel: '密码',
            name: 'password',
            inputType: 'password',
            allowBlank: false,
            emptyText: '请输入您的密码',
            bind: '{password}'
        }],
        buttons: [{
            xtype: 'tbtext',
            html: '账户不存在或者密码错误',
            style: 'color:red',
            hidden: true
        }, '->', {
            text: '登录',
            reference: 'login',
            formBind: true,
            handler: 'onLoginClick'
        }]
    }
});