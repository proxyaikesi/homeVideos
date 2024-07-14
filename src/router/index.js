import { createRouter, createWebHistory } from "vue-router";

import store from "@/store/index";
import Register from "@//account/register.vue"; //注册
import Login from "@/account/login.vue"; // 登录
import Index from "@/views/index.vue"; // 首页
import New from "@/components/new/VideoManagement/new.vue"; // 上传
import Upload from "@/components/new/VideoManagement/upload.vue";
import UploadHome from "@/components/new/VideoManagement/uploadHome.vue";

import videoManage from "@/components/new/VideoManagement/videoManage.vue";
import unpublished from "@/components/new/VideoManagement/unpublished.vue";
import PrivacyPolicy from "@/views/PrivacyPolicy.vue"; // 首页简介

const routes = [
  {
    path: "/register",
    component: Register,
    meta: {
      title: "注册",
      guest: true,
    },
    name: "Register",
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录",
      guest: true,
    },
  },
  {
    path: "/introduction",
    component: PrivacyPolicy,
    meta: {
      title: "简介",
    },
  },
  {
    path: "/index",
    component: Index,
    meta: {
      title: "首页",
      show: false,
      keepAlive: true,
    },
    name: "Index",
  },
  {
    path: "/new",
    component: New,
    meta: {
      title: "我的",
      requiresAuth: true, // 个人资料页面需要登录后才能访问
    },
    redirect: "/new/upload",

    children: [
      {
        path: "upload",
        meta: {
          title: "上传文件aaaaaaaaaaa",
        },
        name: "upload",
        component: Upload,
        props: true,
      },
      {
        path: "uploadHome",
        meta: {
          title: "上传视频",
        },
        component: UploadHome,
        name: "uploadHome",
      },
      {
        path: "videoManage",
        meta: {
          title: "视频管理",
          keepAlive: true,
        },
        component: videoManage,
        name: "videoManage",
      },
      {
        path: "unpublished",
        meta: {
          title: "未发布",
        },
        component: unpublished,
        name: "unpublished",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: "history",
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      try {
        await store.dispatch("verifyToken");
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next("/login");
        }
      } catch (error) {
        next("/login");
      }
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (isAuthenticated) {
      next("/new"); // 如果用户已登录，重定向到首页或其他受保护的页面
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
