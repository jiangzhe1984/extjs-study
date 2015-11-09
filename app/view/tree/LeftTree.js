var store = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: true,
        children: [
            { id:'detention',text: 'detention', leaf: true },
            { id:'homework',text: 'homework', expanded: true, children: [
                { id:'homework[0]', text: 'book report', leaf: true },
                { id:'homework[1]',text: 'algebra', leaf: true}
            ] },
            { id:'buy lottery tickets',text: 'buy lottery tickets', leaf: true }
        ]
    }
});

Ext.define('TutorialApp.view.tree.LeftTree',{
        extend:'Ext.tree.Panel',
        xtype:'app-leftTree',
        title: 'Simple Tree',
        width: 200,
        height: 150,
        store: store,
        rootVisible: false,
        renderTo: Ext.getBody(),
        bind: {
            title: '{navigationTitle}'
        }
});
