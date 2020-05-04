import Vue from 'vue';
import VueRouter from 'vue-router';
import Super from '../views/Super.vue';
import List from '../views/List.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

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
  {
    path: '/register',
    name: 'Register',
    component: Register,

  },
];

const router = new VueRouter({
  routes,
});

export default router;
