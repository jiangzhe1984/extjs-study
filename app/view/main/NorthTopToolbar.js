//退出操作
function logout(){
    window.location.href= '/logout';
}

//修改密码操作
function updatePwd(){
    Ext.create('Ext.window.Window', {
        id: 'pwdUpdateForm',

        requires: [
            'Ext.form.Panel',
            'Ext.form.field.Text',
            'Ext.layout.container.Fit',
            'Ext.toolbar.Fill',
            'Ext.toolbar.TextItem'
        ],


        bodyPadding: 10,
        title: '修改密码',
        closable: true,
        autoShow: true,
        width: 350,
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
                labelWidth: 40
            },
            items: [{
                fieldLabel: '旧密码',
                name: 'oldPwd',
                allowBlank: false,
                emptyText: '请输入旧密码'
            }, {
                fieldLabel: '新密码',
                name: 'newPwd',
                allowBlank: false,
                emptyText: '请输入新密码'
            }
            ],
            buttons: [{
                xtype: 'tbtext',
                html: '错误',
                style: 'color:red',
                hidden: true
            }, '->', {
                text: '修改',
                handler: function(){
                    var saveForm = Ext.getCmp('pwdUpdateForm');
                    var form = this.up('form').getForm();
                    var formValues = form.getValues();
                    if (form.isValid()) {
                        Ext.Ajax.request({
                            url:'/updatePwd',
                            params: {'oldPwd':formValues["oldPwd"],newPwd: formValues["newPwd"]},
                            // async: false,
                            method: 'post',
                            success: function(response){
                                var result = Ext.decode(response.responseText);
                                if(result.state == "success"){
                                    Ext.Msg.alert('message','修改成功');
                                    saveForm.close();
                                }else if(result.state == "atypism"){
                                    Ext.Msg.alert('message','输入的旧密码错误');
                                }else{
                                    Ext.Msg.alert('message','出错了');
                                }
                            }
                        });

                    }


                }
            }]
        }
    });
}
//工具栏
Ext.define('TutorialApp.view.main.NorthTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    renderTo: document.body,
    width   : 500,
    style: 'background-color:#46A3FF;',//背景色
    listeners : {
        render : function(view, eOpts){ //加载事件
            var url = view.url;
            Ext.Ajax.request({
                url : url,
                success : function(response, options){

                    var result = Ext.decode(response.responseText);

                    var northLeft = new Object();
                    northLeft.xtype = 'panel';
                    northLeft.html = '<font size="5" color="white">三江网购管理平台</font>';
                    northLeft.margin = '20 5 5 5';
                    northLeft.bodyStyle = 'background-color:#46A3FF;';
                    view.add(northLeft);

                    view.add('->');

                    var northRight = new Object();
                    northRight.xtype = 'panel';
                    northRight.html = '<style> a:link {text-decoration: none;}a:visited {text-decoration: none;}a:hover {text-decoration: none;}a:active {text-decoration: none;}</style><font size="3" color="white">欢迎你,'+result.fullname+'！<a href="JavaScript:logout()">退出</a></font>';
                    northRight.bodyStyle = 'background-color:#46A3FF;';
                    view.add(northRight);

                    var northUpdatePwd = new Object();
                    northUpdatePwd.xtype = 'panel';
                    northUpdatePwd.html = '<font size="3" color="white"><a href="JavaScript:updatePwd()">修改密码</a></font>';
                    northUpdatePwd.bodyStyle = 'background-color:#46A3FF;';
                    view.add(northUpdatePwd);


                }
            });
        }
    }

});