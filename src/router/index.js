/*
 * @Author: linglingling
 */
import { createRouter, createWebHashHistory } from 'vue-router'
export default createRouter({
    // createWebHashHistory() 为hash模式
    // createWebHistory() 为history模式
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('views/index.vue')
        },
        {
            path: '/login',
            component: () => import('views/login.vue')
        }
    ]
})