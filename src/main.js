import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import App from './App.vue';
import router from './router';
import './components/alertMessage/bus';
import currencyFilter from './components/filters/currency';
import { ValidationProvider } from 'vee-validate';
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.component('ValidationProvider', ValidationProvider);

axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  // console.log('to', to, 'from', from, 'next', next);
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_PATH}/api/user/check`;

    axios.post(api).then(res => {
      console.log('check if login', res.data.success);
      if (res.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
