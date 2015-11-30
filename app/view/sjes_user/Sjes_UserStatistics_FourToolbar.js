/**
 * 用户统计页面查询工具栏，第四行
 */
Ext.define('TutorialApp.view.sjes_user.Sjes_UserStatistics_FourToolbar', {
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
            fieldLabel: '账户余额区间:',
            xtype: 'textfield'
        },'--',
        {
            xtype: 'textfield'
        }
    ]
});