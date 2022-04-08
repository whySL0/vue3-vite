<!--
 * @Author: linglingling
-->
<template>
    <div id="login">

        <h1>这里是{{title}}</h1>
        <p>平台：{{device}}</p>
        <p>皮肤：{{skin}}</p>

        <el-form class="login-form"
            ref="loginForm"
            :model="loginForm"
            label-width="0">
            <el-form-item prop="userName">
                <el-input size="medium"
                            v-model="loginForm.userName"
                            auto-complete="off"
                            placeholder="请输入用户名">
                </el-input>
            </el-form-item>
            <el-form-item  prop="password">
                <el-input size="medium"
                        :type="passwordType"
                        auto-complete="off"
                        v-model="loginForm.password"
                        placeholder="请输入密码">
                <!-- <i :class="passwordType == 'password'?'iconfont iconmimabukeshi-kulian' : 'iconfont iconmimakeshihua-xiaolian_yongyuangaoliang'"
                slot="suffix"
                v-if="this.loginForm.password"
                :style="passwordType == 'password'?'color: #C0C4CC' : 'color:#28cccc'"
                @click="showPassword" style="cursor: pointer"></i> -->
                </el-input>
            </el-form-item>
        </el-form>
        
        <el-button type="success" @click="login">登录</el-button>
        <el-button type="success" @click="getInfo">获取用户信息</el-button>
        <el-button type="info" @click="test">test</el-button>


    </div>
</template>
<script>
    import _ from 'lodash';
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapMutations } = createNamespacedHelpers('userInfo')
    const common = createNamespacedHelpers('common')

    import { setToken } from '@/utils/cookie/auth.js'
    import { loginByUsername, getUserInfo, getwKPrizeList } from 'apis/common'
    export default {
        setup() {

        },
        data() {
            return {
                title: '登录页',
                loginForm: {
                    userName: "",
                    password: "",
                    comBm: "",
                },
                passwordType: "password"

            }
        },
        computed: {
            ...mapState({
                userId: state => state.userId
            }),
            ...common.mapGetters(['device', 'skin'])
        },
        mounted() {
            console.log('login', loginByUsername)
        },
        methods: {
            ...mapMutations(['SET_USERID', 'SET_USERINFO']),

            login: _.debounce(async function() {
                try {
                    let res = await loginByUsername(this.loginForm)
                    console.log('loginByUsername', res)
                    setToken(res.data.sessionKey);
                    this.SET_USERID(res.data.id)
                    let userInfo = res.data;
                    delete userInfo.btns;
                    delete userInfo.companys;
                    delete userInfo.power;
                    delete userInfo.menus;
                    this.SET_USERINFO(userInfo);
                    this.$router.push('/')
                } catch(e) {

                }
            }, 1000, {leading: true, trailing: false}),

            getInfo: _.debounce(async function() {
                try {
                    let res = await getUserInfo()
                    consle.log('loginByUsername', res)
                } catch(e) {

                }
            }, 1000, {leading: true, trailing: false}),

            test: _.debounce(async function() {
                try {
                    let res = await getwKPrizeList()
                    consle.log('loginByUsername', res)
                } catch(e) {

                }
            }, 1000, {leading: true, trailing: false}),

            // changeUserId: _.debounce(this.SET_USERID('999999'), 1000, {leading: true, trailing: false}),
        }
    }
</script>
<style lang="scss" scoped>
    #login {
        width: 100vw;
        height: 100vh;
    }
    .login-form {
        width: 300px;
        margin: 0 auto;
    }
</style>