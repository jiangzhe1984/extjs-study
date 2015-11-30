/**
 * 订单Model
 */
Ext.define('TutorialApp.model.orderManagement.Order', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'parentId', type: 'string'},//父订单号
        {name: 'memberId',  type: 'int'},//会员ID
        {name: 'orderType',  type: 'int'},//　订单类型:1 正常下单; 2 秒杀下单;
        {name: 'exceptionOrder',  type: 'int'},//　异常订单: 1 异常订单;0 正常订单;
        {name: 'telphone',  type: 'string'},//手机号
        {name: 'ownMarket',  type: 'string'},//所属商场
        {name: 'sendAddress', type: 'string'},//送货地址
        {name: 'orderSource', type: 'string'},//订单来源
        {name: 'saleAmount', type: 'number'},//商品总金额
        {name: 'benefitAmount', type: 'number'},//优惠总金额
        {name: 'transportAmount', type: 'number'},//运费
        {name: 'payAmount', type: 'number'},//支付金额
        {name: 'payDate', type: 'string'},//支付时间
        {name: 'totalWeight', type: 'int'},//订单总重量
        {name: 'orderStatus', type: 'string'},//订单状态
        {name: 'logisticStatus', type: 'string'},//物流状态
        {name: 'payType', type: 'string'},//支付类型
        {name: 'rejectAmount', type: 'int'},//舍弃金额
        {name: 'modified', type: 'int'},//是否修改:[0 不需要修改;1 待修改;2 已修改]
        {name: 'modifier', type: 'string'},//修改人
        {name: 'modifiDate', type: 'string'},//修改日期
        {name: 'updateType', type: 'int'},//修改类型
        {name: 'updateReason', type: 'string'},//修改原因
        {name: 'dealer', type: 'string'},//订单处理人
        {name: 'dealDate', type: 'string'},//订单处理日期
        {name: 'unusualReasonType', type: 'int'},//异常原因类型,默认为0[无异常]
        {name: 'unusualReason', type: 'string'},//异常原因
        {name: 'verificationReason', type: 'int'},//待审核原因类型
        {name: 'verifiStatus', type: 'int'},//审核状态
        {name: 'verifiResult', type: 'boolean'},//审核结果:0 不通过;1 通过
        {name: 'cancelReason', type: 'int'},//取消理由选项
        {name: 'note', type: 'string'},//备注
        {name: 'creatBy', type: 'int'},//订单创建人ID
        {name: 'creater', type: 'string'},//订单创建人
        {name: 'createDate', type: 'string'},//订单创建时间
        {name: 'verifier', type: 'string'},//审核人
        {name: 'verifiDate', type: 'string'},//审核时间
        {name: 'spliter', type: 'int'},//拆单人
        {name: 'splitDate', type: 'string'},//拆单时间
        {name: 'consignee', type: 'string'},//收货人
        {name: 'submitOrderDate', type: 'string'},//提交订单时间
        {name: 'cancelOrderDate', type: 'string'}//取消订单时间

    ]
});