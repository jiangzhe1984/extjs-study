Ext.define('TutorialApp.model.Personnel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'email',  type: 'string'},
        {name: 'phone',  type: 'string'}
    ]
});