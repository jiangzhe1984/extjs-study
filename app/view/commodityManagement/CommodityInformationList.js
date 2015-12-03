

/**
 *
 商品信息维护列表
 */
Ext.define('TutorialApp.view.commodityManagement.CommodityInformation', {
    extend: 'Ext.grid.Panel',
    xtype: 'commodityInformationList',
    id: 'commodityInformation_list',
    requires: [
        'TutorialApp.store.commodityManagement.Commodity',
        'TutorialApp.view.commodityManagement.CommodityInformationController'
    ],

    columnLines: true,

  /*  multiSelect : true,//能够多选记录


    selType: "checkboxmodel",//使用复选框来选择行

    selModel: {
        injectCheckbox: 0,
        mode: "SIMPLE",     //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true     //只能通过checkbox选择
    },*/

    initComponent:function(){
        var me = this;
        var store = Ext.create('TutorialApp.store.commodityManagement.Commodity');//创建store实例
        this.store = store;
        me.columns = [
            {
                text: '商品ID',
               // flex: 1,
                width:130,
                align: 'center',
                dataIndex: 'id'
            }, {
                text: '商品编码',
                //flex: 1,
                width:130,
                align: 'center',
                dataIndex: 'sn'
            },  {
                text: '商品名称',
               // flex: 1,
                width:530,
                align: 'center',
                dataIndex: 'name',
                renderer: function(value, metaData, record) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            }, {
                text: '商品状态',
               // flex: 1,
                width:200,
                align: 'center',
                dataIndex: 'status',
                renderer: function(value, metaData, record){
                    var status = null;
                    switch(value){
                        case 0: status = '正常销售'; break;
                        case 1: status = '下架停售'; break;
                        case 2: status = '未审核'; break;
                    }

                    return status;
                }
            }, {
                text: '会员价',
                //flex: 1,
                width:130,
                align: 'center',
                dataIndex: 'memberPrice'
            }, {
                text: '零售价',
               // flex: 1,
                width:130,
                align: 'center',
                dataIndex: 'salePrice'
            },{
                text:"操作",
                width:82,
                align:"center",
                xtype:'actioncolumn',//这里就是放置按钮的地方
                items: [{
                    iconCls : 'icon-edit',
                    tooltip: '修  改',
                    handler: function(grid, rowIndex, colIndex) {
                        var firstCategory_states = Ext.create('Ext.data.Store', {
                            fields: ['categoryValue', 'text'],
                            autoLoad: true,
                            proxy: {
                                type: 'ajax',
                                url: 'resources/data/FirstCategory.json',
                                //url: '/user/list',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data'
                                }
                            }
                        });
                        var sencondCategory_states = Ext.create('Ext.data.Store', {
                            fields: ['firstCategory','categoryValue', 'text'],
                            autoLoad: true,
                            proxy: {
                                type: 'ajax',
                                url: 'resources/data/SencondCategory.json',
                                //url: '/user/list',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data'
                                }
                            }
                        });
                        var thirdCategory_states = Ext.create('Ext.data.Store', {
                            fields: ['sencondCategory','categoryValue', 'text'],
                            autoLoad: true,
                            proxy: {
                                type: 'ajax',
                                url: 'resources/data/ThirdCategory.json',
                                //url: '/user/list',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data'
                                }
                            }
                        });


                        // Create the combo box, attached to the states data store
                        Ext.define('Ext.ux.firstCategory.ComboBox', {
                            extend:'Ext.form.ComboBox',
                            id:'firstCategoryCB',
                            alias: 'widget.firstCategory',
                           // fieldLabel: '一层分类',
                            store: firstCategory_states,
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'categoryValue',
                            emptyText : '一层分类',  //提示信息
                            listeners:{
                                //scope: yourScope,
                                'select': function(obj){
                                    var sencondStore = Ext.getCmp('sencondCategoryCB').getStore();
                                    sencondStore.clearFilter();
                                    sencondStore.filter("firstCategory",obj.getValue());
                                }
                            }
                        });

                        Ext.define('Ext.ux.sencondCategory.ComboBox', {
                            extend:'Ext.form.ComboBox',
                            id:'sencondCategoryCB',
                            alias: 'widget.sencondCategory',
                            // fieldLabel: '一层分类',
                            store: sencondCategory_states,
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'categoryValue',
                            emptyText : '二层分类',  //提示信息
                            listeners:{
                                //scope: yourScope,
                                'select': function(obj){
                                    //alert(obj.getValue());
                                }
                            }
                        });

                        Ext.define('Ext.ux.thirdCategory.ComboBox', {
                            extend:'Ext.form.ComboBox',
                            id:'thirdCategoryCB',
                            alias: 'widget.thirdCategory',
                            // fieldLabel: '一层分类',
                            store: thirdCategory_states,
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'categoryValue',
                            emptyText : '三层分类',  //提示信息
                            listeners:{
                                //scope: yourScope,
                                'select': function(obj){
                                    //alert(obj.getValue());
                                }
                            }
                        });



                        Ext.create('Ext.window.Window', {
                            id: 'sjesUserUpdateForm',

                            requires: [
                                'Ext.form.Panel',
                                'Ext.form.field.Text',
                                'Ext.layout.container.Fit',
                                'Ext.toolbar.Fill',
                                'Ext.toolbar.TextItem'
                            ],

                            bodyPadding: 10,
                            title: '修改',
                            closable: true,
                            autoShow: true,
                            width: 600,
                            height:600,
                            layout: 'fit',
                            modal: true,//它背后的东西都会被遮罩
                            items: {
                                xtype: 'form',
                                reference: 'form',
                                bodyPadding: 10,
                                defaultType: 'textfield',

                                fieldDefaults: {
                                    anchor: '100%',
                                    labelAlign: 'right',
                                    labelWidth: 80
                                },
                                items: [ {
                                    xtype: "container",
                                    layout: "hbox",
                                    items: [
                                        {
                                            xtype: "textfield",
                                            name: "mobile",
                                            fieldLabel: "商品名称",
                                            allowBlank: false,
                                            emptyText: "商品名称",
                                            margin: '5 5 10 5'
                                        },
                                        {
                                            xtype: "textfield",
                                            name: "mobile",
                                            fieldLabel: "广告语",
                                            margin: '5 5 10 5'
                                        }
                                    ]
                                },  {
                                    xtype: "container",
                                    layout: "hbox",
                                    items: [
                                        {
                                            xtype: "textfield",
                                            name: "mobile",
                                            fieldLabel: "会员价",
                                            margin: '5 5 10 5'
                                        },
                                        {
                                            xtype: "textfield",
                                            name: "mobile",
                                            fieldLabel: "零售价",
                                            margin: '5 5 10 5'
                                        }
                                    ]
                                },  {
                                    xtype: "container",
                                    layout: "hbox",
                                    items: [
                                        {
                                            xtype: "textfield",
                                            name: "mobile",
                                            fieldLabel: "商品净重",
                                            margin: '5 5 10 5'
                                        },
                                        {
                                            xtype: "textfield",
                                            name: "mobile",
                                            fieldLabel: "商品品牌",
                                            margin: '5 5 10 5'
                                        }
                                    ]
                                },  {
                                    xtype: "textfield",
                                    name: "mobile",
                                    fieldLabel: "商品产地",
                                    margin: '5 5 10 5'
                                },  {
                                    xtype: "panel",
                                    html: "商品分类",
                                    margin: '5 5 10 5'
                                },{
                                    xtype: "container",
                                    layout: "hbox",
                                    items: [
                                        {
                                            xtype: "firstCategory",
                                            name: "mobile"/*,
                                            listeners:{
                                                beforerender:function(){
                                                    Ext.getCmp('userMgrTypeCB').setValue(selection[0].get('userMgrType')); //设置 combo 值（显示值）
                                                    //  combo.clearValue();                 //清除 combo 值

                                                }
                                            }*/
                                        },
                                        {
                                            xtype: "sencondCategory",
                                            name: "mobile"
                                        },
                                        {
                                            xtype: "thirdCategory",
                                            name: "mobile"
                                        }
                                    ]
                                }],
                                buttons: [{
                                    xtype: 'tbtext',
                                    html: '错误',
                                    style: 'color:red',
                                    hidden: true
                                }, '->', {
                                    text: '提交',
                                    handler: function(){

                                    }
                                }]
                            }
                        });
                    }
                },{
                    iconCls : 'icon-eye-open',
                    tooltip: '预  览',
                    handler: function(grid, rowIndex, colIndex) {

                    }
                }]
            }
        ];
        me.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store:store,
            displayInfo: true
        },{
            xtype : Ext.create('TutorialApp.view.commodityManagement.CommodityInformationTopToolbar',{//工具栏
                url : '/category'
            })
        },{
            xtype : Ext.create('TutorialApp.view.commodityManagement.CommodityInformationTwoToolbar',{//工具栏

            })
        }];
        me.callParent();
    }
});
