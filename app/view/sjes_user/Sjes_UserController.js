var viewHtml = '<table>'
viewHtml += '<tr><td>用户名</td><td></td></tr>';
viewHtml += '<tr><td>昵称</td><td></td></tr>';
viewHtml += '<tr><td>邮箱</td><td></td></tr>';
viewHtml += '<tr><td>密码</td><td></td></tr>';
viewHtml += '<tr><td>密码强度</td><td></td></tr>';
viewHtml += '<tr><td>手机号</td><td></td></tr>';
viewHtml += '<tr><td>性别</td><td></td></tr>';
viewHtml += '<tr><td>生日</td><td></td></tr>';
viewHtml += '<tr><td>会员卡号</td><td></td></tr>';
viewHtml += '<tr><td>会员卡有效期</td><td></td></tr>';
viewHtml += '<tr><td>虚拟会员卡号</td><td></td></tr>';
viewHtml += '<tr><td>头像路径</td><td></td></tr>';
viewHtml += '<tr><td>是否激活</td><td></td></tr>';
viewHtml += '<tr><td>生成时间</td><td></td></tr>';
viewHtml += '<tr><td>更新时间</td><td></td></tr>';
viewHtml += '</table>';



Ext.define('TutorialApp.view.sjes_user.Sjes_UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.sjes_userc',


    viewSjesUserRecord: function(){
        var grid = Ext.getCmp('sjes_user_list'), selection = grid
            .getSelectionModel().getSelection();
        switch(selection.length){
            case 0 :Ext.Msg.alert('message','请选择用户!'); break;
            default: Ext.create('Ext.window.Window', {
                title: '显示',
                height: 200,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'panel',
                    html: '<table><tr><td>部门名称</td><td>'+selection[0].get('orgName') +'</td></tr><tr><td>部门编号</td><td>'+selection[0].get('orgNum') +'</td></tr><tr><td>部门管理员</td><td>'+selection[0].get('manager') +'</td></tr><tr><td>父部门</td><td>'+selection[0].get('parentOrg') +'</td></tr><tr><td>描述</td><td>'+selection[0].get('description') +'</td></tr></table>'

                }
            }).show(); break;
        }

    }
});