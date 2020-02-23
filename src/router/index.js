import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login/Login.vue';
import DashBoard from '../components/Dashboard/Dashboard.vue';
import DashProducts from '../components/Dashboard/DashProducts.vue';
import DashOrders from '../components/Dashboard/DashOrders.vue';
import DashCoupons from '../components/Dashboard/DashCoupons.vue';
import Products from '../components/Products/Products.vue';
import CartContent from '../components/Cart/CartContent.vue';
import PageNotFound from '../components/PageNotFound/PageNotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '404',
  },
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
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
      {
        path: 'orders',
        name: 'DashOrders',
        component: DashOrders,
        meta: { requiresAuth: true },
      },
      {
        path: 'coupons',
        name: 'DashCoupons',
        component: DashCoupons,
        meta: { requiresAuth: true },
      },
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  { path: '/cart', name: 'CartContent', component: CartContent },
  {
    path: '/404',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
