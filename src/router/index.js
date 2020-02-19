import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login/Login.vue';
import DashBoard from '../components/Dashboard/Dashboard.vue';
import DashProducts from '../components/Dashboard/DashProducts.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: 'login',
  },
  {
    path: '/admin',
    name: 'DashBoard',
    component: DashBoard,
    children: [
      {
        path: 'products',
        name: 'DashProducts',
        component: DashProducts,
        meta: { requiresAuth: true },
      },
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ '../views/About.vue'),
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
