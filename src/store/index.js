import Vue from 'vue'
import Vuex from 'vuex'
import City from './City'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
	  City,
	  user
  }
})
