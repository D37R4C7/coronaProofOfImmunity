import Vue from "vue";
import Vuex from "vuex";

import patient from "./modules/patient";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    patient
  }
});
