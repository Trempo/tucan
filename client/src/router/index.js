import Vue from 'vue';
import VueRouter from 'vue-router';
import Super from '../views/Super.vue';
import List from '../views/List.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Super',
    component: Super,
  },
  {
    path: '/list',
    name: 'List',
    component: List,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,

  },
];

const router = new VueRouter({
  routes,
});

export default router;
