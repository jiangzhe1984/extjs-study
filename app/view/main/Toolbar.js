 Ext.define('TutorialApp.view.main.Toolbar', {
     extend:'Ext.toolbar.Toolbar',
     xtype:'app-toolbar',
    renderTo: document.body,
    width   : 700,
    items: [
        {
            text: 'Example Button'
        }
    ]
});