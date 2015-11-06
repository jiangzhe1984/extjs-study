Ext.define('TutorialApp.view.main.Header', {
    extend: 'Ext.Container',
    xtype: 'app-header',//别名，在Main.js使用该组件时，可以直接用别名
    cls:'app-header',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    items:[{
        xtype: 'component',
        cls: 'app-header-logo'
    },{
        xtype: 'component',
        cls: 'app-header-title',
        html: 'Extjs6.0实例',
        flex: 1
    }]
});
