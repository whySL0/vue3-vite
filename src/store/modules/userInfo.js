/*
 * @Author: linglingling
 */
const userInfo = {
    namespaced: true,

    state: () => ({
        userId: '123456'
    }),
    getters: {
        userId: state => state.userId
    },
    mutations: {
        SET_USERID: (state, userId) => {
            state.userId = userId;
        }
    },
    actions: {
       
    }
}

export default userInfo