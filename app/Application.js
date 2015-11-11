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

 /*   init: function (app) {
        //Ext.Ajax.setCors(true);
        Ext.Ajax.on({
            beforerequest: function (conn, opts, eOpts) {
                opts.url = TutorialApp.Config.api.host + opts.url;
                Ext.Msg.alert('message',opts.url);
            },
            requestexception: function (conn, res, opts, eOpts) {
                switch (res.status) {
                    case 401:
                        Ext.Msg.alert('message','ok');
                        break;
                    default:
                        Ext.Msg.alert('message','服务器宕机了, 请联系管理员!');
                        break;
                }
            }
        })
    },*/


    launch: function () {

        // It's important to note that this type of application could use
        // any type of storage, i.e., Cookies, LocalStorage, etc.
        var loggedIn;

        // Check to see the current value of the localStorage key
        loggedIn = localStorage.getItem("TutorialLoggedIn");

        // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view
        Ext.create({
            xtype: loggedIn ? 'app-main' : 'login'
        });

       /* Ext.create('Ext.Window',{
            title:'Anchor layout',
            width:400,
            height:400,
            layout:'anchor',
            plain: true,
            items:[
                Ext.create('Ext.panel.Panel',{
                    title:'panel1',
                    height:100,
                    anchor:'-50',
                    html:'高度等于100，宽度= 容器宽度-50'
                }),
                Ext.create('Ext.panel.Panel',{
                    title:'panel2',
                    height:100,
                    anchor:'50%',
                    html:'高度等于100，宽度=容器的宽度*50%'
                }),
                Ext.create('Ext.panel.Panel',{
                    title:'panel3',
                    anchor:'-10,-200',
                    html:'高度等于容器高度-10,宽度等于容器宽度-200'
                })
            ]

        }).show();*/

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