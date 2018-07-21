import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import login from '../component/login/login.vue';
import management from '../component/management/management.vue';
import clients from '../component/clients/clients.vue';
import clientsDetails from '../component/clients/clientsDetails.vue';
import products from '../component/products/products.vue';
import supplier from '../component/supplier/supplier.vue';
import personnel from '../component/personnel/personnel.vue';
import setting from '../component/setting/setting.vue';
import kinds from '../component/kinds/kinds.vue';

console.log(login)

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'login',
    component: login
  }, {
    path: '/management',
    name: 'management',
    component: management,
    children: [{
        path: 'clients',
        component: clients,
        name: 'clients'
      },
      {
        path: 'products',
        component: products,
        name: 'products'
      },
      {
        path: 'supplier',
        component: supplier,
        name: 'supplier'
      },
      {
        path: 'personnel',
        component: personnel,
        name: 'personnel'
      }, {
        path: 'clientsDetails',
        component: clientsDetails,
        name: 'clientsDetails'
      }, {
        path: 'setting',
        component: setting,
        name: 'setting'
      }, {
        path: 'kinds',
        component: kinds,
        name: 'kinds'
      }
    ]
  }]
})

export default router;
