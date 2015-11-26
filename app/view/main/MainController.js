/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TutorialApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    control: {
        'app-leftTree': {//组件别名，表示要控制的是该组件
            selectionchange: 'onTreeNavSelectionChange'
        }
    },


    onTreeNavSelectionChange:function(selModel, records){
        var record = records[0];

       var tabs = this.getView().down('app-contentPanel');

       if(record.get('leaf')){
           var resourceTab = null;
           for(var i=0;i<tabs.items.length;i++){
             if(record.get('text') == tabs.items.get(i).title){
                 resourceTab = tabs.items.get(i);
                 break;
             }
           }

           if(resourceTab != null){
               tabs.setActiveTab(resourceTab);
           }else{
               var tab = tabs.add({
                   title: record.get('text'),
                   xtype : record.get('url'),
                   closable:true
               });

               tabs.setActiveTab(tab);
           }

       }

    },

   onItemSelected: function (sender, record) {
      // alert(record.get('name'));
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {

        }
    }

 /*   addRecord: function(){

    },

    editRecord: function(){
        var grid = this.getView().down('mainlist');
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

    removeRecord: function(){

    },

    viewRecord: function(){

    }*/


    /*
    onClickButton: function () {
        // Remove the localStorage key/value
        localStorage.removeItem('TutorialLoggedIn');

        // Remove Main View
        this.getView().destroy();

        // Add the Login Window
        Ext.create({
            xtype: 'login'
        });
    }*/
});
