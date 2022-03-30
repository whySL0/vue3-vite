import axios from "axios"

// 引入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 引入element的message弹框
import Message from 'element-plus'

const SuccessStatus = 200
const SuccessCode = 0;

const service = axios.create({
        baseURL: import.meta.env.VITE_BASE_API + import.meta.env.VITE_CORS_API,
        timeout: 15000,
        // 跨域访问时，允许保存cookie
        withCredentials: true 
})

service.interceptors.request.use(
        config => {
                console.debug('axios config: ', config)
                if(!config.noNProgress){
                        NProgress.start() 
                }
                return config;
        },
        error => {
                return Promise.reject(error)
        }
)

service.interceptors.response.use(
        res => {
                NProgress.done()
                if(res.config.responseType === 'blob'){
                        return res;
                }
                const { code, message, data} = res.data; 
                if(res.status === SuccessStatus && code === SuccessCode) {
                        return Promise.resolve(res.data)
                } else {
                        Message({
                                message,
                                type: 'error'
                        })
                        return Promise.reject(res)
                }
        },
        error => {
                NProgress.done()
                return Promise.reject(error)
        }
)
export default service;