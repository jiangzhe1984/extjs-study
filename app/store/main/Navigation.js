Ext.define('TutorialApp.store.main.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',
    storeId:'navigation',
    proxy: {
        type: 'ajax',
        url: 'resources/data/Navigation.json'
    },
    root: {
        text: 'All',
        id: 'all',
        expanded: true
    }
});
