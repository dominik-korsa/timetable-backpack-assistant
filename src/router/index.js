import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/optivum/:url',
    meta: {
      type: 'optivum',
    },
  },
  {
    path: '/optivum/:url/class/:class',
    meta: {
      type: 'optivum',
    },
  },
  {
    path: '/v-lo',
    meta: {
      type: 'v-lo',
    },
  },
  {
    path: '/v-lo/class/:class',
    meta: {
      type: 'v-lo',
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
