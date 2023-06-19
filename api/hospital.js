import request from "~/utils/request.js"
const api_name = '/front/hosp/hospital'

export default {
    getHospitalList(searchObj) {
        return request({
            url: `${api_name}/list`,
            method: "get",
            params: searchObj
        })
    },

    //根据医院编号显示医院详情
    show(hoscode) {
        return request({
            url: `/front/hosp/hospital/show/${hoscode}`,
            method: 'get'
        })
    },

    //根据医院编号显示所有科室
    getDeptList(hoscode) {
        return request({
            url: `/front/hosp/department/getDeptList/${hoscode}`,
            method: 'get'
        })
    },
    //获取可预约排班日期列表
    getBookingScheduleRule(hoscode, depcode) {
        return request({
            url: `/front/hosp/schedule/getBookingScheduleRule/${hoscode}/${depcode}`,
            method: 'get'
        })
    },

    //获取排班数据
    getScheduleList(hoscode, depcode, workDate) {
        return request({
            url: `/front/hosp/schedule/getScheduleList/${hoscode}/${depcode}/${workDate}`,
            method: 'get'
        })
    },
    //获取预约详情
    getScheduleDetail(id) {
        return request({
            url: `/front/hosp/schedule/getScheduleDetail/${id}`,
            method: 'get'
        })
    },
}