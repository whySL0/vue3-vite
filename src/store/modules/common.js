/*
 * @Author: linglingling
 */

const common = {
    namespaced: true,
    state: () => ({
        device: 'pc',
        skin: 'blue'
    }),
    mutations: {
        SET_SKIN: (state, skin) => {
            state.skin = skin;
        }
    },
    getters: {
        skin: state => state.skin
    },
    actions: {

    }
}

export default common
