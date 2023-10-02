<template>
    账号<input type="text" v-model="username">
    密码<input type="text" v-model="password">
    <button @click="submitForm">确认注册</button>
    <router-link to="/index" active-class="active">皮蛋编程</router-link>
</template>
  
  <script>
  import axios from 'axios';
  import qs from 'qs'

  export default {
    data(){
        return{
            username:'',
            password:''
        }
    },
    created(){
        
    },
    methods:{
        submitForm(){
            
            // axios.get('http://localhost:3000/list').then(res=>{
            //     console.log(res.data);
            // })
            let params = {
                user:this.username,
                pswd:this.password
            }

            axios.post('http://localhost:3000/register',qs.stringify(params)).then(res=>{
                console.log(res);
                this.$router.push('/login')
            })
        }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  