//南
Ext.define('TutorialApp.view.main.SouthPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-southPanel',
    bodyPadding: 5,  // Don't want content to crunch against the borders
    width: 300,
    //title: '三江网购管理平台',
    //bodyStyle:'background:red;padding:10px;',
    dockedItems : [
        {
        xtype : Ext.create('TutorialApp.view.main.SouthToolbar',{//工具栏
            //url : '/currentUser'

        })
    }],
    renderTo: Ext.getBody()
});