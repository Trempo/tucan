import Vue from 'vue';
import VueRouter from 'vue-router';
import Super from '../views/Super.vue';
import List from '../views/List.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import passwordReset from '../views/passwordReset.vue';
import emailPwReset from '../views/emailPwReset.vue';
import TechFeed from '../views/feeds/techFeed.vue';
import EconFeed from '../views/feeds/econFeed.vue';
import SportsFeed from '../views/feeds/sportsFeed.vue';
import EntertainmentFeed from '../views/feeds/entertainmentFeed.vue';

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
  {
    path: '/recover',
    name: 'emailPwReset',
    component: emailPwReset,

  },
  {
    path: '/verify/:verifytoken',
    name: 'Verify',
    component: Login,

  },
  {
    path: '/reset/:resettoken',
    name: 'passwordReset',
    component: passwordReset,

  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,

  },
  {
    path: '/tech',
    name: 'TechFeed',
    component: TechFeed,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/econ',
    name: 'EconFeed',
    component: EconFeed,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sports',
    name: 'SportsFeed',
    component: SportsFeed,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/entertainment',
    name: 'EntertainmentFeed',
    component: EntertainmentFeed,
    meta: {
      requiresAuth: true,
    },
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
