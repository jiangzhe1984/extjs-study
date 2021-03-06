
Ext.define('TutorialApp.view.orderManagement.OrderSearchController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.orderSearchC'/*,

    viewOrgRecord: function(){
        var grid = Ext.getCmp('order_search_list'), selection = grid
            .getSelectionModel().getSelection();
        if(selection.length == 0) {
            Ext.Msg.alert('message','请选择订单!');
        }else if(selection.length > 1){
            Ext.Msg.alert('message','一次操作一条!');
        }else{
            //创建panel
            var panel = new Ext.Panel({
                width: 200,
                height: 200,
                frame: true
            });
            //创建数据显示模板
            var template = new Ext.XTemplate(
                '<table  id="template">',
                '<tr><td>部门名称:</td><td>{orgName}</td></tr>',
                '<tr><td>部门编号:</td><td>{orgNum}</td></tr>',
                '</table>'
            );

            //获取数据
            Ext.Ajax.request({
                url: '/org/viewById',
                method: 'post',
                params: { id: selection[0].get('id')},
                success: function (response, options) {
                    /!* for (i in options) {
                     alert('options参数名称:' + i);
                     alert('options参数[' + i + ']的值：' + options[i]);
                     }*!/
                    var responseJson = Ext.util.JSON.decode(response.responseText);
                    template.compile();
                    template.overwrite(panel.body, responseJson);
                },
                failure: function () {
                    alert('系统出错，请联系管理人员！');
                }
            });

            Ext.create('Ext.window.Window', {
                title: '显示',
                height: 200,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: panel
                    //html: '<table><tr><td>部门名称</td><td>'+selection[0].get('orgName') +'</td></tr><tr><td>部门编号</td><td>'+selection[0].get('orgNum') +'</td></tr><tr><td>部门管理员</td><td>'+selection[0].get('manager') +'</td></tr><tr><td>父部门</td><td>'+selection[0].get('parentOrg') +'</td></tr><tr><td>描述</td><td>'+selection[0].get('description') +'</td></tr></table>'

                }
            }).show();
        }

    },

    searchOrg: function(){
        var search_org_name = Ext.getCmp('search_org_name').getValue();
        var org_store = Ext.getCmp('org_list').store;

        org_store.on('beforeload', function (store, options) {
            var new_params = { orgName: search_org_name};
            Ext.apply(org_store.proxy.extraParams, new_params);
        });
        //  role_store.filter('name', search_org_name);
        org_store.load();
    }*/


});