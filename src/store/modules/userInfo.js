/*
 * @Author: linglingling
 */
import { getToken, setToken } from "../../utils/cookie/auth";
const userInfo = {
    namespaced: true,

    state: () => ({
        userId: getToken('userId'),
        userInfo: getToken('userInfo')
    }),
    getters: {
        userId: state => state.userId,
        userInfo: state => JSON.parse(state.userInfo || "{}")
    },
    mutations: {
        SET_USERID: (state, userId) => {
            setToken(userId, 'userId')
            state.userId = userId;
        },
        SET_USERINFO: (state, userInfo) => {
            setToken(JSON.stringify(userInfo), 'userInfo')
            state.userInfo = userInfo;
        }
    },
    actions: {
       
    }
}

export default userInfo