
import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store/index'
import Register from '../account/register.vue'
import Login from '../account/login.vue'
import Index from '../components/index.vue'
import New from '../components/new/VideoManagement/new.vue'
import Upload from '../components/new/VideoManagement/upload.vue'
import UploadHome from '../components/new/VideoManagement/uploadHome.vue'

 
import videoManage from '../components/new/VideoManagement/videoManage.vue'
import unpublished from '../components/new/VideoManagement/unpublished.vue'
import axios from 'axios';
const routes = [

   {
      path: '/register',
      component: Register,
      meta: {
         title: '注册'
      },
      name: 'Register'
   },
   {
      path: '/login',
      component: Login,
      meta: {
         title: '登录'
      }
   },
   {
      path: '/index',
      component: Index,
      meta: {
         title: '首页',
         show:false,
         keepAlive:true,
      },
      name: 'Index'
   },
   {
      path: '/new',
      component: New,
      meta: {
         title: '我的'
      },
      redirect:'/new/upload',
      children: [
         {
            path: 'upload',
            meta: {
               title: '上传文件aaaaaaaaaaa',
            },
            name:'upload',
            component:Upload,
            props: true
         },
         {
            path:'uploadHome',
            meta:{
               title:'上传视频',
            },
            component:UploadHome,
            name:'uploadHome'
         },
         {
            path:'videoManage',
            meta:{
               title:'视频管理',
               keepAlive:true,
               
            },
            component:videoManage,
            name:'videoManage'
         },
         {
            path:'unpublished',
            meta:{
               title:'未发布'
            },
            component:unpublished,
            name:'unpublished'
         }
      ]
   },
]


const router = createRouter({
   history: createWebHistory(),
   routes,
   mode:'history'
})

router.beforeEach((to, from, next) => {
   if (localStorage.getItem("teaUserInfo")) { // 判断是否登录
      if (to.path != "/" && to.path != "/login") { //判断是否要跳到登录界面
         next();
         document.title = to.meta.title
      } else {
         /**
          * 防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页
          */
         next({
            path: '/index'
         })

      }
   } else {
      next();
   }
})
router.afterEach(() =>{
   if (sessionStorage.getItem('V_id')) {
      axios.post('http://localhost:3000/deleteInfo', {
        params: {
          v_id: sessionStorage.getItem('V_id'),
         //  user_id: store.state.userInfo.userid
          user_id: store.state.userInfo._id
        }
      }).then(() => {
         store.state.projectTitleId = ''
        sessionStorage.clear()
      })
    }
 

})



export default router


