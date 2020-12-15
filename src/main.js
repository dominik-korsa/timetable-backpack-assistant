import Vue from 'vue';
import vuetifyPlugin from './plugins/vuetify';
import App from './app.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  vuetify: vuetifyPlugin,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
