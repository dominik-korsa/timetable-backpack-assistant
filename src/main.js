import Vue from 'vue';
import vuetifyPlugin from './plugins/vuetify';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  vuetify: vuetifyPlugin,
  render: (h) => h(App),
}).$mount('#app');
