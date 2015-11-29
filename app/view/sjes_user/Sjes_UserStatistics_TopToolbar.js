
var sjesUser_states = Ext.create('Ext.data.Store', {
    fields: ['userType', 'name'],
    data : [
        {"userType":"1401", "name":"三江会员"},
        {"userType":"1402", "name":"三江惠用户"}
    ]
});

var sjesUser_sexStates = Ext.create('Ext.data.Store', {
    fields: ['sex', 'name'],
    data : [
        {"sex":"1", "name":"男"},
        {"sex":"2", "name":"女"}
    ]
});


// Create the combo box, attached to the states data store
Ext.define('Ext.ux.userType.ComboBox', {
    extend:'Ext.form.ComboBox',
    id:'sjesUserTypeCB',
    alias: 'widget.sjesUserType',
    fieldLabel: '用户类型',
    store: sjesUser_states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'userType',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});

Ext.define('Ext.ux.userSex.ComboBox', {
    extend:'Ext.form.ComboBox',
     id:'sjesUserSexCB',
    alias: 'widget.sjesUserSex',
    fieldLabel: '性别',
    store: sjesUser_sexStates,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'sex',
    emptyText : '请选择',  //提示信息
    listeners:{
        //scope: yourScope,
        'select': function(obj){
            //alert(obj.getValue());
        }
    }
});
/**
 * 用户统计页面查询工具栏，第一行
 */
Ext.define('TutorialApp.view.sjes_user.Sjes_UserStatistics_TopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    xtype: 'app-SjesUserStatisticsTopToolbar',

    renderTo: document.body,
   // width   : 100,
    items: [
        {
            xtype: 'panel',
            margin: '2 5 5 15',//上右下左
            html:'<input type="checkbox" id="" value=""/>'
        },
        {
         // fieldLabel: '用户类型:',
            id:'statistics_sex',
            xtype: 'sjesUserType'


        }, {
            xtype: 'panel',
            margin: '5 5 5 15',//上右下左
            html:'<input type="checkbox" id="" value=""/>'
        }, {
            fieldLabel: '出生年月日:',
            id:'statistics_birthday',
            xtype: 'datefield',
            anchor: '100%',
            emptyText: '请选择年月日'

        }, {
            xtype: 'panel',
            margin: '5 5 5 15',//上右下左
            html:'<input type="checkbox" id="" value=""/>'
        },{
           // fieldLabel: '性别:',
            xtype: 'sjesUserSex'

        }
    ]
});