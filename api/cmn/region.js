import request from "~/utils/request.js"
const api_name = '/front/cmn/region'

export default {
    getRegionList(parentCode) {
        return request({
            url:`${api_name}/findRegionList/${parentCode}`,
            method:"get"
        })
    },
    

}