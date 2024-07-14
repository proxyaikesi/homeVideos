import { createStore } from "vuex";
// import createPersistedState from "vuex-persistedstate";
import { loginApi, verifyToken } from "../api/auth"; // 注意: 这里确保 loginApi 的导入路径正确
export default createStore({
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || "",
    isAuthenticated: false,
  }),

  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    clearToken(state) {
      state.token = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setUser(state, user) {
      state.user = user;
    },
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
    },
  },
  actions: {
    async login({ commit }, { username, password, type }) {
      const response = await loginApi(username, password, type);
      commit("setToken", response.data.token);
      commit("setUser", response.data.user);
    },
    async verifyToken({ commit }) {
      try {
        const response = await verifyToken();
        if (response.data.valid) {
          commit("setAuthenticated", true);
        } else {
          commit("clearToken");
        }
      } catch (error) {
        commit("clearToken");
        throw error; // 可以选择抛出错误供调用者处理
      }
    },
    logout({ commit }) {
      commit("clearToken");
    },
  },

  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
});
