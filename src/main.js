/*
 * @Author: linglingling
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import store from './store/index'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')

// TODO: axios请求的封装
// TODO:  搬迁活动2.0代码
// TODO:  eslint husky 自动校验加好
