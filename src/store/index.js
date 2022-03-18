/*
 * @Author: linglingling
 */
import { createStore } from 'vuex'
import common from './modules/common'
import userInfo from './modules/userInfo'

const store = createStore({
    modules: {
        common,
        userInfo
    }
})

export default store
