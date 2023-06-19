import request from '@/utils/request'
export default {
    //生成订单
    submitOrder(scheduleId, patientId) {
        return request({
            url: `/front/order/orderInfo/auth/submitOrder/${scheduleId}/${patientId}`,
            method: 'post'
        })
    },
    //订单详情
    getOrder(orderId) {
        return request({
            url: `/front/order/orderInfo/auth/getOrder/${orderId}`,
            method: `get`
        })
    },
    //订单列表
    getList() {
        return request({
            url: `/front/order/orderInfo/auth/list`,
            method: `get`
        })
    },
}