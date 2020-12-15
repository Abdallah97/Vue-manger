import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue';
import Projects from "../views/Projects.vue";
import Teams from "../views/Teams.vue";
import {fb} from "../fb.js";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: { requiresAuth: true }
  },
   {
    path: '/teams',
    name: 'Teams',
    component:Teams,
    meta: { requiresAuth: true }
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//auth gaurds
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;
  if (requiresAuth && !currentUser) {
   next('/');
  } else if(requiresAuth && currentUser) {
    next() 
  } else{
    next();
  }
}); 

export default router
