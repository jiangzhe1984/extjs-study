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
            xtype: 'app-personnelMain'//主页
        }],
        closable:true
    }/*, {
        title: 'Logout',
        xtype: 'button',
        text: 'Logout',
        margin: '10 0',
        handler: function(){
            window.location.href= '/logout';
        }
    }, {
        title: 'Tickets',
        html: 'Tickets',
        itemId: 'tickets',
        closable:true
    }*/]
});

