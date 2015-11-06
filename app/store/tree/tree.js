Ext.define('TutorialApp.store.Tree', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.tree',
    storeId:'tutorialAppTree',
    root: {
        expanded: true,
        children: [
            { text: 'detention', leaf: true },
            { text: 'homework', expanded: true, children: [
                { text: 'book report', leaf: true },
                { text: 'algebra', leaf: true}
            ] },
            { text: 'buy lottery tickets', leaf: true }
        ]
    }
});