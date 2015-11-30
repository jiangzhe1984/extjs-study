/**
 * 用户统计页面查询工具栏，第三行
 */
Ext.define('TutorialApp.view.sjes_user.Sjes_UserStatistics_ThreeToolbar', {
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
            fieldLabel: '用户积分区间:',
            xtype: 'textfield'
        },'--',
        {
            xtype: 'textfield'
        },{
            xtype: 'panel',
            margin: '2 5 5 15',//上右下左
            html:'<input type="checkbox" id="" value=""/>'
        },
        {
            fieldLabel: '累计消费区间:',
            xtype: 'textfield'
        },'--',
        {
            xtype: 'textfield'
        }
    ]
});