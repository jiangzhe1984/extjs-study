Ext.define('TutorialApp.Application', {
    extend: 'Ext.app.Application',

    name: 'TutorialApp',

    stores: [
        // TODO: add global / shared stores here
    ],

    views: [
        'TutorialApp.view.login.Login',
        'TutorialApp.view.main.Main',
        'TutorialApp.view.personnel.PersonnelMain',
        'TutorialApp.Config'

    ],

  /*  init: function (app) {
        //Ext.Ajax.setCors(true);
        Ext.Ajax.on({
            beforerequest: function (conn, opts, eOpts) {

                opts.url = TutorialApp.Config.api.host + opts.url;

            },
            requestexception: function (conn, res, opts, eOpts) {
                switch (res.status) {
                    case 401:

                        break;
                    default:
                        TutorialApp.Msg.systemError('服务器宕机了, 请联系管理员!');
                        break;
                }
            }
        })
    },*/


    launch: function () {

        // TODO - Launch the application
     /*   Ext.Ajax.request({
            url: '/me',
            success: function (res, opts) {

            },
            failure: function (res, opts) {

            }
        });*/

       /* // It's important to note that this type of application could use
        // any type of storage, i.e., Cookies, LocalStorage, etc.
        var loggedIn;

        // Check to see the current value of the localStorage key
        loggedIn = localStorage.getItem("TutorialLoggedIn");

        // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view
        Ext.create({
            xtype: loggedIn ? 'app-main' : 'login'
        });*/

        Ext.create({
            xtype: 'app-main'
        });

    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});