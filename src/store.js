import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSidebarVisible: false
  },
  mutations: {
    SHOW_HIDE_SIDEBAR(state) {
      state.isSidebarVisible = !state.isSidebarVisible;
    }
  },
  actions: {
  },
  modules: {
  }
})
