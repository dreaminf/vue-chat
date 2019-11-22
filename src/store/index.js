import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist"; //vuex 持久化存储的一个插件
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";
const vueLocal = new VuexPersistence({
  storage: window.localStorage
});
// 创建一个 store。创建过程直截了当——仅需要提供一个初始 state 对象和一些 mutation：
export default new Vuex.Store({
  state: {
    loading: false,
    sending: false,
    error: null,
    user: null,
    reconnect: false,
    activeRoom: null,
    rooms: [],
    users: [],
    messages: [],
    userTyping: null
  },
  getters: {
    hasError: state => (state.error ? true : false)
  },
  mutations,
  actions,
  plugins: [vueLocal.plugin],

  modules: {},
  strict: debug // 严格模式  true || false
});
