import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";

import element from "element-plus";
import "element-plus/theme-chalk/index.css";
import store from "./store/index";
// import "./axios.js"; // 引入 axios.js
import locale from "element-plus/dist/locale/zh-cn.mjs";

async function init() {
  try {
    // 在应用启动时验证令牌
    await store.dispatch("verifyToken");
  } catch (error) {
    console.error("Token verification failed:", error);
  }

  // 创建并挂载 Vue 实例
  const app = createApp(App);

  // app.use(store).use(router).use(element, { locale }).mount("#app");
  app.use(store).use(router).use(element).mount("#app");
}

// 调用初始化函数
init();
