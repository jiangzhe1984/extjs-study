
function cascade(menuId,array,category,nextCategoryId,nextArray,view,nextChildMenu,nextMenu){


    var lysp = new Object();
    lysp.id = category.id;
    lysp.text = category.text;
    lysp.handler = function() {
        Ext.getCmp('thirdClassification').setValue('');
        Ext.getCmp(menuId).setText(category.text);
        Ext.getCmp('secondClassification').setValue(category.text);
        nextArray.length = 0;
        view.remove(Ext.getCmp(nextCategoryId));
        Ext.each(category.items, function(childCategory) {
            thirdCascade(nextCategoryId, nextArray,childCategory);
        });
        nextChildMenu.items = nextArray;
        nextMenu.menu = nextChildMenu;
        view.add(nextMenu);
    };

    array.push(lysp);
}


function thirdCascade(menuId,array,category){

    var lysp = new Object();
    lysp.id = category.id;
    lysp.text = category.text;
    lysp.handler = function() {
        Ext.getCmp(menuId).setText(category.text);
        Ext.getCmp('thirdClassification').setValue(category.text);
    };

    array.push(lysp);
}



Ext.define('TutorialApp.view.commodityManagement.CommodityInformationTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    controller: 'commodityInformationC',
    renderTo: document.body,
    width   : 500,
    listeners : {
        render : function(view, eOpts){


            var url = view.url;
            Ext.Ajax.request({
                url : url,
                success : function(response, options){

                    var result = Ext.decode(response.responseText);

                    var oneMenu = new Object();
                    oneMenu.id = 'firstCategory';
                    oneMenu.text = '一层分类';

                    var twoMenu = new Object();
                    twoMenu.id = 'sencondCategory';
                    twoMenu.text = '二层分类';

                    var threeMenu = new Object();
                    threeMenu.id = 'thirdCategory';
                    threeMenu.text = '三层分类';

                    var oneChildMenu = new Object();
                    oneChildMenu.indent = false;
                    var oneArray = new Array();

                    var twoChildMenu = new Object();
                    twoChildMenu.indent = false;
                    var twoArray = new Array();

                    var threeChildMenu = new Object();
                    threeChildMenu.indent = false;
                    var threeArray = new Array();

                    var layerClassification = new Object();
                    layerClassification.id = 'firstClassification';
                    layerClassification.xtype = 'hiddenfield';
                    oneArray.push(layerClassification);

                    var secondClassification = new Object();
                    secondClassification.id = 'secondClassification';
                    secondClassification.xtype = 'hiddenfield';
                    oneArray.push(secondClassification);

                    var thirdClassification = new Object();
                    thirdClassification.id = 'thirdClassification';
                    thirdClassification.xtype = 'hiddenfield';
                    oneArray.push(thirdClassification);

                    Ext.each(result, function(category){

                        var lysp = new Object();
                        lysp.id = category.id;
                        lysp.text = category.text;
                        lysp.handler = function() {
                            twoArray.length = 0;
                            view.remove(Ext.getCmp('sencondCategory'));
                            threeArray.length = 0;
                            view.remove(Ext.getCmp('thirdCategory'));
                            Ext.getCmp('firstCategory').setText(category.text);
                            Ext.getCmp('firstClassification').setValue(category.text);
                            Ext.getCmp('secondClassification').setValue('');
                            Ext.getCmp('thirdClassification').setValue('');

                            Ext.each(category.items, function(childCategory){
                                cascade('sencondCategory',twoArray,childCategory,'thirdCategory',threeArray,view,threeChildMenu,threeMenu);
                            });

                            twoChildMenu.items = twoArray;
                            twoMenu.menu = twoChildMenu;
                            view.add(twoMenu);

                        };

                        oneArray.push(lysp);
                    });

                    oneChildMenu.items = oneArray;
                    oneMenu.menu = oneChildMenu;
                    view.add(oneMenu);
                    view.add('-');
                    view.add(twoMenu);

                }
            });

        }
    }


});