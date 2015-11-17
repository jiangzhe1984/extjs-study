/**
 * Created by xieyuanliang on 10/20/15.
 */
Ext.define('TutorialApp.Msg', {
    singleton: true,

    systemError: function (msg) {
        Ext.Msg.alert('系统错误', msg);
    }
});