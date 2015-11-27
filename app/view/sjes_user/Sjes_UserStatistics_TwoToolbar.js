
Ext.define('TutorialApp.view.sjes_user.Sjes_UserStatistics_TwoToolbar', {
    extend:'Ext.toolbar.Toolbar',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            xtype: 'panel',
            margin: '2 5 5 15',//上右下左
            html:'<input type="checkbox" id="" value=""/>'
        },
         {
             fieldLabel: '注册时间:',
             xtype: 'datefield',
             anchor: '100%',
             emptyText: '请选择年月日'
        },'--',
        {
            xtype: 'datefield',
            anchor: '100%',
            emptyText: '请选择年月日'
        }, {
            xtype: 'panel',
            margin: '2 5 5 15',//上右下左
            html:'<input type="checkbox" id="" value=""/>'
        },
        {
            fieldLabel: '最后登录时间:',
            xtype: 'datefield',
            anchor: '100%',
            emptyText: '请选择年月日'
        },'--',
        {
            xtype: 'datefield',
            anchor: '100%',
            emptyText: '请选择年月日'
        }
    ]
});