/**
 * 商品Model
 */
Ext.define('TutorialApp.model.commodityManagement.Commodity', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'goodsId', type: 'int'},// 主商品ID
        {name: 'erpGoodsId', type: 'int'},// 对应ERP GoodsID
        {name: 'goodsCode', type: 'string'}, // 商品内码(顺序号)
        {name: 'sn', type: 'string'},// 商品编码
        {name: 'barCode', type: 'string'},// 商品条码
        {name: 'name', type: 'string'},// 商品名称
        {name: 'salePrice', type: 'number'},// 销售价
        {name: 'memberPrice', type: 'number'},// 会员价
        {name: 'weight', type: 'string'},// 商品重量
        {name: 'place', type: 'string'},// 商品产地
        {name: 'source', type: 'string'},// 商品来源, 枚举(自营/联营)
        {name: 'sales', type: 'int'},// 销量
        {name: 'hits', type: 'int'},// 点击数
        {name: 'isBargains', type: 'boolean'},// 是否是惠商品
        {name: 'transportType', type: 'int'},//商品运输类型 常温:0 冷藏/冷冻:1 保热:2
        {name: 'categoryId', type: 'int'},// 商品分类Id
        {name: 'brandId', type: 'int'},//品牌ID
        {name: 'brandName', type: 'string'},//品牌名称
        {name: 'status', type: 'int'},// 0/1/2; 正常销售/下架停售/未审核
        {name: 'displaySales', type: 'int'},// 展示销量
        {name: 'erpProductId', type: 'int'},// ERP产品ID
        {name: 'adSlogan', type: 'string'},// 广告语
        {name: 'isPromotionParticular', type: 'boolean'},// 是否是促销例
        {name: 'introduction', type: 'string'},// 介绍
        {name: 'createDate', type: 'string'},//  创建时间
        {name: 'updateDate', type: 'string'}//  更新时间

    ]
});