import request from './axios'

export const getRequest = (url, params) => {
        return request({
                method: 'get',
                url: `${url}`,
                params: params,
                headers: {
                        "Accept": "*/*"
                }
        })
};
      
export const postRequest = (url, params) => {
        return request({
                method: 'post',
                url: `${url}`,
                data: params,
                headers: {
                        'Content-Type': 'application/json'
                }
        })
};

export const deleteRequest = (url, params) => {
        return request({
                method: 'delete',
                url: `${url}`,
                data: params
        })
};

export const putRequest = (url, params) => {
        return request({
                method: 'put',
                url: `${url}`,
                data: params
        })
};

export const postFile = (url, params) => {
        return request({
                method: 'post',
                url: `${url}`,
                data: params,
                headers: {
                        'Content-Type': 'multipart/form-data',
                }
        })
};