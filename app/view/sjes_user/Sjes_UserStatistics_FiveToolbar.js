
Ext.define('TutorialApp.view.sjes_user.Sjes_UserStatistics_FiveToolbar', {
    extend:'Ext.toolbar.Toolbar',
    renderTo: document.body,
    width   : 500,
    items: [
        {
            xtype: 'panel',
            margin: '5 5 5 15',//上右下左
            html:'<font color="red">提示:组合条件筛选会进行大量的数据库查询,请按需进行谨慎操作.该过程时间较长,请耐心等待。</font>'
        },{
            // xtype: 'button', // default for Toolbars
            text: '查询',
            iconCls : 'icon-search',
            handler:function(){
                alert(Ext.getCmp('statistics_sex').getValue());
            }
        }
    ]
});