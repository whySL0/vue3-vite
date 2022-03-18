<!--
 * @Author: linglingling
-->
<template>
    <div id="login">
        <h1>这里是{{title}}</h1>
        <div>{{userId}}</div>
        <el-button type="success" v-on:click="SET_USERID(999999)">更改UserId</el-button>
    </div>
</template>
<script>
import { createApp, onMounted } from 'vue'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapState } = createNamespacedHelpers('userInfo')
export default {
    createApp({
        data() {
            return {
                title: '登录页'
            }
        },
        computed: {
            // userId() {return '123456'}
            ...mapState({
                userId: state => state.userId
            })
        },
        methods: {
            ...mapMutations(['SET_USERID'])
        },
        onMounted() {
            this.SET_USERID('123456')
        }
    }).mount('#login')
}
</script>

