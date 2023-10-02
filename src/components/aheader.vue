<template>
  <div>
    <el-header>
      <el-row type="flex" class="row-bg"   justify="center">
        <el-col :span="8">
          <img src="../img/uyunlogo.svg" alt="">
          <a href="">浏览</a>
          <img src="../img/qita.svg" alt="">
        </el-col>
        <el-col :span="8" style="justify-content: center;">
          
            <input type="text" placeholder="Search" class="searchipt">
            <a class="NavSearch" ><img class="searchall" src="../../public/search.png" alt=""></a>
        
        </el-col>
        
        <el-col :span="8"  style=" justify-content: flex-end;" >
          <div class="user-show" v-if="userfo"  >
            <a href="" class="login">登录</a>
            <a href="" class="register">注册</a>
            <img class="userimg" src="../../public/imguser.png">
          </div>
          <div v-else class="user-show">
            <img class="userimg" :src="'http://localhost:8080'+this.$store.state.userInfo.avatar">
            <a href="" class="Coretext">{{ this.$store.state.userInfo.user }}</a>
          </div>
        </el-col>
      </el-row>
     
    </el-header>
  </div>
</template>

<script>
import bus from '../Bus.js'
import { mapState } from "vuex"
export default {
  data(){
    return{
    }
  },
  created(){
    // console.log(this.$route,'\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')
    //   bus.on('sdata',(data)=>{
    //     // 接收数据
    //   })
  },
  computed: {
    userfo(){
      return this.$store.state.loginStatus
    }
    
  },
  methods:{
    
  }
}
</script>

<style scoped>


.el-header {
  background: #18181B;
  color: #fff;
  text-align: left;
  height: 50px;
  line-height: 50px;
}
.el-col .searchall{
  width: 25px;
  height:25px;
  padding: 4px 1px;
  display: inline-block;
}
.el-row {
  margin-bottom: 20px;

}

.el-col {
  height: 50px;
  display: flex;
}
.el-col .NavSearch{
  width: 34px;
  height: 36px;
  line-height: 36px;
  background-color: #2F2F35;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  margin-top: 7px;
}
.el-col .searchipt{
  width: 356px;
  height: 32px;
  padding: 0px;
  color: #fff;
  border: 0px;
  outline: none;
  margin-top: 7px;
  background-color: #18181B;
  border:2px solid #333;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  text-indent: 10px;
}
.el-col img{
  width: 40px;
  height: 40px;
  padding: 0.3rem;
  
}
.el-col a{
  width: 80px;
  height: 50px;
  color: #bf94ff;
  text-align: center;
  font-family:(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  display: block;
  
}
.el-col .user-show{
  display: flex;
}
.el-col .user-show .login{
  width: 46px;
  height: 30px;
  background: #2F2F35;
  color: #efeff1;
  border-radius: 5px;
  font-size: 14px;
  line-height: 30px;
  margin: 10px 10px 0px;
}
.el-col .user-show .Coretext{ 
  height: 30px;
  background: #2F2F35;
  color: #efeff1;
  border-radius: 5px;
  font-size: 14px;
  line-height: 30px;
  margin: 10px 10px 0px;
}
.el-col .user-show .register{
  width: 46px;
  height: 30px;
  background: #2F2F35;
  color: #efeff1;
  border-radius: 5px;
  font-size: 14px;
  line-height: 30px;
  margin-top: 10px;
  background-color: #772CE8;
}
.el-col .user-show .userimg{
  width: 30px;
  height: 30px;
  margin-top: 4px;
}
</style>
