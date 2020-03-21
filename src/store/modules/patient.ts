import Axios from "axios";

const state = {
  loggedIn: false,
  krankenkassen: [
    { value: "privat", text: "Privatpatient" },
    { value: "Aok", text: "AOK Rheinland/Hamburg" },
    { value: "barmer", text: "Barmer" },
    { value: "tk", text: "Techniker Krankenkasse (TK)" }
  ],
  tests: [
    { value: "Antikoerper", text: "Antikörpertest" },
    { value: "pcr", text: "PCR" }
  ]
};

const mutations = {
  save: (state: any, payload: any) => {
    Axios.post("http://hackathon.64b.de/test_results", payload, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  },
  loggedIn: (state: any, payload: any) => {
    state.loggedIn = payload;
  },
  load: (state: any, payload: any) => {
    // Axios.get('/api/projects/languages').then(({data}) => {
    //   if (data.data.length) {
    //     state.krankenkassen = data.data;
    //   }
    // }).catch((error: any) => {
    //   console.error(error.stack);
    // });
    //
    // Axios.get('/api/projects/languages').then(({data}) => {
    //   if (data.data.length) {
    //     state.tests = data.data;
    //   }
    // }).catch((error: any) => {
    //   console.error(error.stack);
    // });
  }
};

const actions = {
  loggedIn: ({ commit }: any, payload: any) => {
    commit("loggedIn", payload);
  },
  save: ({ commit }: any, payload: any) => {
    commit("save", payload);
  },
  load: ({ commit }: any, payload: any) => {
    commit("load", payload);
  }
};

const getters = {
  isLoggedIn: (state: any) => {
    return state.loggedIn;
  },
  krankenkassen: (state: any) => {
    return state.krankenkassen;
  },
  tests: (state: any) => {
    return state.tests;
  }
};

const namespaced = true;

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
};
