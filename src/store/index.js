import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import _ from 'lodash';

Vue.use(Vuex);

const vuexPersistence = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ storage: state.storage }),
});

export default new Vuex.Store({
  state: {
    storage: {
      dark: false,
      history: [],
      subjectColors: false,
      showRoom: true,
      showGroupName: true,
      showTeacher: false,
    },
    classes: null,
  },
  mutations: {
    setDark (state, dark) { state.storage.dark = dark; },
    setHistory (state, history) { state.storage.history = history; },
    setClasses (state, classes) { state.classes = classes; },
    setSubjectColors (state, enable) { state.storage.subjectColors = enable; },
    setShowRoom (state, show) { state.storage.showRoom = show; },
    setShowGroupName (state, show) { state.storage.showGroupName = show; },
    setShowTeacher (state, show) { state.storage.showTeacher = show; },
  },
  actions: {
    addHistoryEntry ({ commit, state }, { url, name }) {
      const history = _.uniqBy(
        _.orderBy(
          [{ url, timestamp: Date.now(), name }, ...state.storage.history],
          ['timestamp'],
          ['desc'],
        ),
        'url',
      ).slice(0, 5);
      commit('setHistory', history);
    },
  },
  modules: {
  },
  plugins: [vuexPersistence.plugin],
});
