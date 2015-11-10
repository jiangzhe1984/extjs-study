Ext.define('TutorialApp.model.Personnel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'email',  type: 'string'},
        {name: 'phone',  type: 'string'}
    ]
});