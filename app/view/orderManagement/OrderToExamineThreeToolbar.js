Ext.define('TutorialApp.view.orderManagement.OrderToExamineThreeToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-orderToExamineTopToolbar',
    // controller: 'orderToExamineC',
    renderTo: document.body,
    width   : 500,
    items: [

        {
            iconCls : 'icon-thumbs-up',
            text:'批量通过',
            handler:function(){
<<<<<<< HEAD
                Ext.Msg.confirm('温馨提示', '确定要通过吗?', function (choice) {
                    if (choice === 'yes') {
                        Ext.Msg.alert('温馨提示','通过');
                    }
                }, this);
=======
                Ext.Msg.alert('message','查询');
>>>>>>> origin/master
            }
        },
        {
            iconCls : 'icon-thumbs-down',
            text:'批量取消',
            handler:function(){
<<<<<<< HEAD
                Ext.Msg.confirm('温馨提示', '确定要取消吗?', function (choice) {
                    if (choice === 'yes') {
                        Ext.Msg.alert('温馨提示','取消');
                    }
                }, this);
=======
                Ext.Msg.alert('message','查询');
>>>>>>> origin/master
            }
        }
    ]

});