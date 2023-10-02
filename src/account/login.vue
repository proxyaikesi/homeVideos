<template>
    <div class="passport-modal">
        <div class="tv-login">
            <div class="tv-cont">
                <img src="../../public/userlogo.png" alt="">
                <h4>登录 Tv Media</h4>
            </div>
        </div>

        <div class="iptuser">
            <p>用户名</p>
            <input v-bind:class="{ iptline: isActive,  }" @focus="iptfocus" @blur="iptblur" type="text"
                v-model="username"
                @mouseenter="mouseenter($event)"
                @mouseleave="mouseleave($event)"
                >
        </div>

        <div class="iptpswd">
            <p>密码</p>
            <input v-bind:class="{iptline: isActive, }" @focus="pswdfocus" @blur="pswdblur" type="password"
                v-model="password"
                @mouseenter="mouseenter($event)"
                @mouseleave="mouseleave($event)"
                >
                <!-- <input v-bind:class="{ pswdline: pswdActive, line: pswdLine }" @focus="pswdfocus" @blur="pswdblur" type="text"
                v-model="password"
                @mouseenter="mouseenter($event)"
                @mouseleave="mouseleave($event)"> -->
                
        </div>

        <div class="login" @click="submitForm">登录</div>
        <div class="regbottom" @click="linkreg">没有账户？ 注册</div>

        <!-- <h2>vuex 中数据{{ $store.state.vuserid }}</h2>
            <h3>计算属性获取显示{{ getid }}</h3>
            <button @click="increment">increment</button> -->

    </div>
</template>
  
<script>
import axios from 'axios';
import qs from 'qs'
import bus from '../Bus.js'
import { mapMutations } from "vuex";

import store from '@/store/index'
export default {
    data() {
        return {
            username: '',
            password: '',
            isActive: false,
            isLine: false,
            pswdActive: false,
            pswdLine: false,
            reg: /^[a-zA-Z0-9]{6,12}$/,
        }
    },
    created() {

    },
    computed: {
        getid() {
            return this.$store.state.vuserid
        },

    },
    methods: {
        ...mapMutations(["user_login"]),
        mouseenter($event){
            if(!this.isActive ){
                // console.log($event.currentTarget.className=" iptline",'1111111111111111111');
                // console.log($event.currentTarget.className=" pswdline",'1111111111111111111');
            }else{
                // console.log($event.currentTarget.className="active");
                // console.log($event.currentTarget.className=" active",'1111111111111111111');

            }
           
        },
        mouseleave($event){
            // if(this.isActive == false){
            //     console.log($event.currentTarget.className="",'删除active');
            //     // console.log($event.currentTarget.className="",'删除active');
            // }
        },
        increment() {
            this.$store.state.vuserid += 1
        },
        iptfocus() {
            this.isActive = !this.isActive
        },
        iptblur() {
           
            this.isActive = !this.isActive
        },
        pswdfocus() {
            this.pswdActive = !this.pswdActive
          

        },
        pswdblur() {
            this.pswdActive = !this.pswdActive
        },
        submitForm() {
            let params = {
                user: this.username,
                pswd: this.password
            }
            if (this.reg.test(params.user)) {
                if (this.reg.test(params.pswd)) {
                    axios.post('http://localhost:3000/login', qs.stringify(params)).then(res => {
                        let data = res.data
                        console.log('datadatadatadatadatadata',data);
                        if (data.code == 0) {
                            this.$message.error(data.data.msg);
                        } else if (data.code == 2) {
                            this.$message.error(data.data.msg);
                        } else if (data.code == 1) {
                            this.user_login(res.data);
                            this.$message({
                                message: '登陆成功',
                                type: 'success'
                            });
                            this.$router.push({
                                name: 'Index'
                            })
                        }
                    })
                } else {
                    this.$message({
                        message: '请输入六到十二以上密码',
                        type: 'warning'
                    });
                }
            } else {
                this.$message({
                    message: '请输入六到十二以上账号',
                    type: 'warning'
                });
            }
        },
        linkreg() {
            this.$router.push({
                name: 'Register'
            })
        }

    },
    mounted() {
        console.log('this', this);
    }
}
</script>
  
<style scoped>
.active{
    box-shadow: inset 0 0 0 2px hsla(240,8%,88%,.4) !important;
}
.tv-login {
    width: 440px;
    height: 55px;
    margin: 0 auto 0;
    display: flex;
    flex-direction: column;
}

.tv-login .tv-cont {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.tv-login .tv-cont h4 {
    margin: 0px;
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    margin-left: 20px;
}

.tv-login .tv-cont img {
    width: 50px;
    height: 50px;
}

.passport-modal {
    width: 440px;
    height: 340px;
    position: absolute;
    background: #18181B;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 30px;
}

.iptuser input {
    width: 440px;
    height: 30px;
    padding: 0px;
    border-radius: 3px;
    border: 0px;
    box-shadow: inset 0 0 0 1px hsla(240,8%,88%,.4);
    background-color: #18181B;
    outline: none;
    text-indent: 0px;
    color:#fff;
}

p {
    width: 440px;
    margin: 22px auto 8px;
    text-align: left;
    color: #f7f7f8;
    font-weight: 800;
    font-size: 13px;
}

.iptpswd input {
    width: 440px;
    height: 30px;
    padding: 0px;
    border-radius: 3px;
    border: 0px;
    box-shadow: inset 0 0 0 0.4px #dedee3;
    background-color: #18181B;
    outline: none;
    text-indent: 0px;
    color:#fff;
}

.iptline {
    outline: 4px solid #A970FF !important;
    border: 5px solid red;
}

.pswdline {
    outline: 4px solid #A970FF !important;
    border: 5px solid red;
}
/* 
.iptuser input:hover {
    box-shadow: inset 0 0 0 1.3px #dedee3;
} */

.iptpswd input:hover {
    box-shadow: inset 0 0 0 1.3px #dedee3;
}

.login {
    width: 440px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    margin: 30px auto 0px;
    background: #232328;
    opacity: 0.5;
    font-size: 13px;
    color: #adadb8;
    font-weight: 600;
    cursor: pointer;
}

.regbottom {
    width: 440px;
    height: 30px;
    line-height: 30px;
    color: #bf94ff;
    font-size: 13px;
    font-weight: 600;
    margin: 20px auto 0px;
    border-radius: 5px;
    cursor: pointer;
}

.regbottom:hover {
    background: #35353B;
    border-radius: 5px;
    color: #fff;
}
</style>
  