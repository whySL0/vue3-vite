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
            component: () => import( /* webpackChunkName: "IndexIndex" */ '@/views/index.vue')
        },
        {
            path: '/login',
            component: () => import( /* webpackChunkName: "LoginLogin" */ '@/views/login.vue')
        }
    ]
})