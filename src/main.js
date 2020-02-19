import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

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
      console.log(res.data);
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
