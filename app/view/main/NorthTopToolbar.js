function logout(){
    window.location.href= '/logout';
}

Ext.define('TutorialApp.view.main.NorthTopToolbar', {
    extend:'Ext.toolbar.Toolbar',
    renderTo: document.body,
    width   : 500,
    style: 'background-color:#46A3FF;',
    listeners : {
        render : function(view, eOpts){
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
                    northRight.html = '<style> a:link {text-decoration: none;}a:visited {text-decoration: none;}a:hover {text-decoration: none;}a:active {text-decoration: none;}</style><font size="3" color="white">欢迎'+result.fullname+'！<a href="JavaScript:logout()">退出</a></font>';
                    northRight.bodyStyle = 'background-color:#46A3FF;';
                    view.add(northRight);


                }
            });
        }
    }

});