/**
 * 积分Model
 */
Ext.define('TutorialApp.model.sjes_user.Sjes_Integal', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'integalTime', type: 'string'},//积分日期
        {name: 'integalNum',  type: 'int'},//积分数量
        {name: 'integalType',  type: 'string'},//　积分类型
        {name: 'integalSource',  type: 'string'},//　积分来源
        {name: 'remarks',  type: 'string'}//备注
    ]
});