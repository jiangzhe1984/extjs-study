/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TutorialApp.view.personnel.PersonnelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.personnel',


    addPersonnelRecord: function(){
       Ext.MessageBox.alert('message','新增');
    },

    editPersonnelRecord: function(){
        var grid = this.getView().down('personnellist');
        var selection = grid.getSelectionModel().getSelection();

        Ext.create('Ext.window.Window', {

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
            width: 350,
            layout: 'fit',

            items: {
                xtype: 'form',
                reference: 'form',
                bodyPadding: 10,
                defaultType: 'textfield',

                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'right',
                    labelWidth: 40
                },
                items: [{
                    fieldLabel: 'Name',
                    name: 'name',
                    itemId: 'name',
                    allowBlank: false,
                    bind: selection[0].get('name')
                }, {
                    fieldLabel: 'Email',
                    name: 'email',
                    inputType: 'email',
                    allowBlank: false,
                    bind: selection[0].get('email')
                }, {
                    fieldLabel: 'Phone',
                    name: 'phone',
                    inputType: 'phone',
                    allowBlank: false,
                    bind: selection[0].get('phone')
                }],
                buttons: [{
                    xtype: 'tbtext',
                    html: '账户不存在或者密码错误',
                    style: 'color:red',
                    hidden: true
                }, '->', {
                    text: '修改',
                    reference: 'login',
                    formBind: true,
                    handler: 'onLoginClick'
                }]
            }
        });
    },

    removePersonnelRecord: function(){

    },

    viewPersonnelRecord: function(){

    }

});
