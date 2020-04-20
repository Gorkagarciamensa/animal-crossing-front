import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    getData: null,
  },
  mutations: {
    get_data: (state, payload) => (state.getData = payload),
  },
  actions: {
    getData(context) {
      fetch("/api/animal-crossing", {
        credentials: "include",
        method: "GET",
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          context.commit("get_data", data);
        })
        .catch((error) => console.log(error));
    },
  },
  getters: {
    getCollections: (state) => state.getData,
  },
  modules: {},
});
