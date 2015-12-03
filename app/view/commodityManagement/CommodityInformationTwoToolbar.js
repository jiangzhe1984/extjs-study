
Ext.define('TutorialApp.view.commodityManagement.CommodityInformationTwoToolbar', {
    extend:'Ext.toolbar.Toolbar',
    id:'cTwoToolbar',
    controller: 'commodityInformationC',
    renderTo: document.body,
    width   : 500,
    items: [
       {
            id:'spzt',
            text: '商品状态',
            menu: {
                indent: false,
                items: [
                    {
                      xtype:'hiddenfield',
                      id:'commodityStatus'
                    },
                    {
                        text: '所有',
                        handler: function() {
                            Ext.getCmp('spzt').setText('所有');
                            Ext.getCmp('commodityStatus').setValue(null);
                        }
                    },

                    {
                        text: '正常销售',
                        handler: function() {
                            Ext.getCmp('spzt').setText('正常销售');
                            Ext.getCmp('commodityStatus').setValue('0');
                        }
                    },
                    {
                        text: '下架停售',
                        handler: function() {
                            Ext.getCmp('spzt').setText('下架停售');
                            Ext.getCmp('commodityStatus').setValue('1');
                        }
                    },
                    {
                        text: '未审核',
                        handler: function() {
                            Ext.getCmp('spzt').setText('未审核');
                            Ext.getCmp('commodityStatus').setValue('2');
                        }
                    }
                ]
            }
        }, '-',
        {
            id:'spmc',
            text: '商品名称',
            menu: {
                indent: false,
                items: [
                    {
                        xtype:'hiddenfield',
                        id:'idOrNameOrCode'
                    },
                    {
                        text: '商品名称',
                        handler: function() {
                            Ext.getCmp('spmc').setText('商品名称');
                            Ext.getCmp('idOrNameOrCode').setValue('name');
                        }
                    },
                    {
                        text: '商品ID',
                        handler: function() {
                            Ext.getCmp('spmc').setText('商品ID');
                            Ext.getCmp('idOrNameOrCode').setValue('id');
                        }
                    },
                    {
                        text: '商品编码',
                        handler: function() {
                            Ext.getCmp('spmc').setText('商品编码');
                            Ext.getCmp('idOrNameOrCode').setValue('sn');
                        }
                    }
                ]
            }
        },{
            xtype: 'textfield',
            id:'commodity_search_value'
        }, {
            text: '查询',
            iconCls : 'icon-search',
            handler:function(){
                var firstClassification = Ext.getCmp('firstClassification').getValue();
                var secondClassification = Ext.getCmp('secondClassification').getValue();
                var thirdClassification = Ext.getCmp('thirdClassification').getValue();
                var status = Ext.getCmp('commodityStatus').getValue();
                var idOrNameOrCode = Ext.getCmp('idOrNameOrCode').getValue();
                var commodity_search_value = Ext.getCmp('commodity_search_value').getValue();

                var commodityInformation_store = Ext.getCmp('commodityInformation_list').store;

                commodityInformation_store.on('beforeload', function (store, options) { //提交到后台前添加查询条件

                    var new_params = new Object();
                    new_params.status = status;
                    switch(idOrNameOrCode){
                        case 'name':new_params.name = commodity_search_value; break;
                        case 'id': new_params.id = commodity_search_value;break;
                        case 'sn': new_params.sn = commodity_search_value;break;
                    }

                    //var new_params = { status: status};
                    Ext.apply(commodityInformation_store.proxy.extraParams, new_params);
                });

                commodityInformation_store.load();
            }

        }
    ]


});