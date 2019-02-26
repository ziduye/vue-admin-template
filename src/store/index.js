import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    app,
    user
  },
  getters
})

export default store
