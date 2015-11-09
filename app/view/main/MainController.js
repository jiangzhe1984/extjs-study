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

       if(!record.get('isParent')){
           var tab = tabs.add({
               title: record.getId(),
               html : 'Another one',
               closable:true
           });

           tabs.setActiveTab(tab);
       }


    },

   onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {

        }
    },
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
