import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookie from 'js-cookie'

Vue.use(Vuex);
export const plugins = [createPersistedState({
  storage: window.sessionStorage,
  reducer(val) {
    return {
      username: val.username,
      authority: val.authority,
    }
  }
})];
export const state = () => ({
  drawer: false,
  items: [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Profile',
      href: '/profile'
    }
  ],
  username: '',
  authority: '',
  topics: [],
});
export const getters = {
  links: (state, getters) => {
    return state.items;
  }
};
export const mutations = {
  setDrawer: (state, payload) => (state.drawer = payload),
  toggleDrawer: state => (state.drawer = !state.drawer),
  setUsername: (state, value) => state.username = value,
  setAuthority: (state, value) => state.authority = value,
  pushTopics: (state, value) => state.topics.push(value),
  setTopics: (state, value) => state.topics= value,
};

