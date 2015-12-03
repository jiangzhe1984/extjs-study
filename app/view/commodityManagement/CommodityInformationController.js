Ext.define('TutorialApp.view.commodityManagement.CommodityInformationController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.commodityInformationC',

    searchCommodityInformation:function(){
        var firstClassification = Ext.getCmp('firstClassification').getValue();
        var secondClassification = Ext.getCmp('secondClassification').getValue();
        var thirdClassification = Ext.getCmp('thirdClassification').getValue();
        Ext.Msg.alert('message',firstClassification+"||"+secondClassification+"||"+thirdClassification);
    }

});