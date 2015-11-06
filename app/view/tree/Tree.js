Ext.define('TutorialApp.TerritoryRoot', {
    extend: 'Ext.data.TreeModel',
    childType: 'TutorialApp.Territory',
    fields: [{
        name: 'text',
        mapping: 'name'
    }]
});
Ext.define('TutorialApp.Territory', {
    extend: 'Ext.data.TreeModel',
    childType: 'TutorialApp.Country',
    fields: [{
        name: 'text',
        mapping: 'name'
    }]
});
Ext.define('TutorialApp.Country', {
    extend: 'Ext.data.TreeModel',
    childType: 'TutorialApp.City',
    fields: [{
        name: 'text',
        mapping: 'name'
    }]
});
Ext.define('TutorialApp.City', {
    extend: 'Ext.data.TreeModel',
    fields: [{
        name: 'text',
        mapping: 'name'
    }]
});

Ext.define('TutorialApp.view.tree.leftTree',{
    extend: 'Ext.tree.Panel',
    xtype: 'leftTree',
    renderTo: document.body,
    height: 200,
    width: 400,
    title: 'Sales Areas',
    rootVisible: false,
    store: {
        model: 'TutorialApp.TerritoryRoot', // Needs to be this so it knows to create 'Country' child nodes
        root: {
            children: [{
                name: 'Europe, ME, Africa',
                children: [{
                    name: 'UK of GB & NI',
                    children: [{
                        name: 'London',
                        leaf: true
                    }]
                }]
            }, {
                name: 'North America',
                children: [{
                    name: 'USA',
                    children: [{
                        name: 'Redwood City',
                        leaf: true
                    }]
                }]
            }]
        }
    }

});
