import VueRouter from 'vue-router';
import Auth from './components/Auth.vue';
import Main from './components/Main.vue';

import AuthSuccess from './components/AuthSuccess.vue';
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/main', component: Main },
    { path: '/auth', component: Auth },
    { path: '/profile', component: AuthSuccess }
  ]
});
export default router;