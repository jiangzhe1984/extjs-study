Ext.define('TutorialApp.view.main.ContentPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-contentPanel',

    bind: {
        title: '{contentTitle}'
    },
    renderTo: document.body,
    items: [{
        title: 'Home',
        itemId: 'home',
        items: [{
            xtype: 'app-personnelMain'
        }],
        closable:true
    }/*, {
        title: 'Users',
        html: 'Users',
        itemId: 'users',
       // hidden: true,
        closable:true
    }, {
        title: 'Tickets',
        html: 'Tickets',
        itemId: 'tickets',
        closable:true
    }*/]
});

