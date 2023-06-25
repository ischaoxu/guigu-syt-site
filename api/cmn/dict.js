import request from "~/utils/request.js"
const api_name = '/front/cmn/dict'

export default {
    getDict(dictTypeId) {
        return request({
            url: `${api_name}/findDictList/${dictTypeId}`,
            method: "get"
        })
    },
    
    
}