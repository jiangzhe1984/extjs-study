
Ext.define('TutorialApp.view.sjes_user.Sjes_UserStatistics_SixToolbar', {
    extend:'Ext.toolbar.Toolbar',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            xtype: 'panel',
            margin: '5 5 5 15',//上右下左
            html:'<font color="red">提示:符合条件的用户供XXXX,如下仅显示前50条供参考。</font>'
        },{
            // xtype: 'button', // default for Toolbars
            text: '导出查询结果为excel',
            iconCls : 'icon-signin'
        }
    ]
});