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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/list',
    name: 'List',
    component: List,
    meta: {
      requiresAuth: true,
    },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
