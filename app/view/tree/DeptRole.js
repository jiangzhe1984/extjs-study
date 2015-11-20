var store = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
       // url: 'resources/data/DeptTree.json'
        url: '/org/orgTree'
    },
    root: {
        text: '所有部门',
        id: 'all',
        expanded: false
    }
});


Ext.define('TutorialApp.view.tree.DeptTree', {
    extend:'Ext.tree.Panel',
    id:'deptTree',
    xtype:'app-deptTree',
    requires: [
        'TutorialApp.view.role.RoleUserTopToolbar'
    ],
    width: 300,
    height: 700,
    store: store,
    rootVisible: false,
    renderTo: Ext.getBody(),
   // collapsible: true,
    dockedItems: [{
        xtype: 'app-roleUserTopToolbar',
        dock: 'top'
    }],

    listeners:{
        scope:this,
        itemclick :  function (record, node) {

            if(node.get('leaf')){

                var grid = Ext.getCmp('role_list');
                var selection = grid.getSelectionModel().getSelection();

                Ext.Ajax.request({
                    url:'/user/userInOrNotInOrg',
                    params: {'roleId':selection[0].getId(),'orgId':node.getId()},
                    // async: false,
                    method: 'post',
                    success: function(response, opts){
                        var obj = Ext.decode(response.responseText);

                        if(obj.state == 'success'){
                            document.sel.res.options.length=0;
                            document.sel.res1.options.length=0;

                             for(var i=0;i<obj.in.length;i++){
                                 document.sel.res.options[document.sel.res.length] = new Option(obj.in[i].username, obj.in[i].id);
                             }
                            for(var i=0;i<obj.notIn.length;i++){
                                document.sel.res1.options[document.sel.res1.length] = new Option(obj.notIn[i].username, obj.notIn[i].id);
                            }
                        }else{
                            Ext.Msg.alert('出错了');
                        }

                    }
                });


            }
        }
    }
});