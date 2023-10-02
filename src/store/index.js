import { createStore } from 'vuex'
const store = createStore({
  state: () => ({
    loginStatus: 'false',
    userInfo: {},
    projectTitleId: [],
  }),
  getters: {
    projectTitleId: state => state.system.projectTitleId,

  },

  mutations: {
    SET_PROJECTTITLEID: (state, projectTitleId) => {
      state.projectTitleId = projectTitleId
    },
    user_login(state, user) {
      state.loginStatus = false;
      console.log('useruseruseruser',user);
      state.userInfo = user.data
      localStorage.setItem('teaUserInfo', JSON.stringify(user.data))
    },

    init_user(state) {
      let userInfo = JSON.parse(localStorage.getItem('teaUserInfo'))
      if (userInfo) {
        state.userInfo = Object.assign(userInfo)
        state.loginStatus = false;
      }
    }
  },
  actions: {

  }

})
export default store