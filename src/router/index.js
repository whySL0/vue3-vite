/*
 * @Author: linglingling
 */
import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
    history: createWebHistory(),
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