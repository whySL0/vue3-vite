/*
 * @Author: linglingling
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import store from './store/index'
import drag from './components/common/drag'
import clickoutside from './components/common/clickoutside'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)


app.directive('clickoutside', clickoutside)
app.directive('drag', drag)



app.mount('#app')




