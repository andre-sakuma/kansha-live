import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import router from './router'


const firebaseConfig = {
  
};

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  router,
  vuetify,
  created() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$router.push('/profile')
      }
      else{
        this.$router.push('/main')
      }
     });
    },
  el: '#app',
  render: h => h(App)
}).$mount('#app')
