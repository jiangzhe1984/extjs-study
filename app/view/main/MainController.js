/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TutorialApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    control: {
        'app-navigation': {//组件别名，表示要控制的是该组件
            selectionchange: 'onTreeNavSelectionChange'
        }
    },

    routes: {
        ':id': {
            action: 'handleRoute',//执行跳转
            before: 'beforeHandleRoute'//路由跳转前操作
        }
    },

    onTreeNavSelectionChange: function (selModel, records) {
        var record = records[0];
        if (record) {
            this.redirectTo(record.getId());
        }
    },

    beforeHandleRoute: function (id, action) {
        var me = this,
            mainView = me.getView(),
            navigationTree = mainView.down('app-navigation'),
            store = navigationTree.getStore(),
            node = store.getNodeById(id);

        if (node) {
            action.resume();
        }else if(store.getCount() === 0){
            //在store load事件中判断节点，避免store数据未加载情况
            store.on('load', function () {
                node = store.getNodeById(id);
                if (node) {
                    action.resume();
                }else {
                    Ext.Msg.alert('路由跳转失败', '找不到id为' + id + ' 的组件');
                    action.stop();
                }
            });
        }else {
            Ext.Msg.alert('路由跳转失败', '找不到id为' + id + ' 的组件');
            action.stop();
        }
    },

    handleRoute: function (id) {
        var me = this,
            mainView = me.getView(),
            navigationTree = mainView.down('app-navigation'),
            contentPanel = mainView.down('app-contentPanel'),
            store = navigationTree.getStore(),
            node = store.getNodeById(id),
            className,cmp,ViewClass;

        //响应路由，左侧树定位到相应节点
        navigationTree.getSelectionModel().select(node);
        navigationTree.getView().focusNode(node);

        //响应路由，改变右侧panel内容
        contentPanel.removeAll(true);
        if (node.isLeaf()) {
            className = Ext.ClassManager.getNameByAlias('widget.' + id);
            ViewClass = Ext.ClassManager.get(className);
            cmp = new ViewClass();
            contentPanel.add(cmp);
        }
        var text = node.get('text'),
            title = node.isLeaf() ? (node.parentNode.get('text') + ' - ' + text) : text;
        contentPanel.setTitle(title);
        document.title = document.title.split(' - ')[0] + ' - ' + text;
    },

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    onClickButton: function () {
        // Remove the localStorage key/value
        localStorage.removeItem('TutorialLoggedIn');

        // Remove Main View
        this.getView().destroy();

        // Add the Login Window
        Ext.create({
            xtype: 'login'
        });
    }
});
