

Ext.define('TutorialApp.view.main.NorthPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-northPanel',
    bodyPadding: 5,  // Don't want content to crunch against the borders
    width: 300,
    title: 'Filters',
    items: [{
        xtype: 'datefield',
        fieldLabel: 'Start date'
    }, {
        xtype: 'datefield',
        fieldLabel: 'End date'
    }],
    renderTo: Ext.getBody()
});