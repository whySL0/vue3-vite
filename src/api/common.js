import { getRequest, postRequest } from '@/utils/axios/index'


export const loginByUsername = (data) => {
        return postRequest(`/user/massage/user/login/p_account`,data)
}

export const getUserInfo = () => {
        return getRequest('/user/massage/user/login/p_info')
}

export function getwKPrizeList() {
        return getRequest(`/cust/WkPrizeConfig/l_fndWkPrizeConfigList` )
}

export function getTable(data) {
        return postRequest(`/cust/wkCustSurvey/l_fndWkCustSurList`, data)
}