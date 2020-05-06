import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';


axios.defaults.baseURL = 'http://localhost:3000';

axios.defaults.headers.common = { Authorization: `Bearer ${localStorage.getItem('jwt')}` };

Vue.config.productionTip = false;


new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
