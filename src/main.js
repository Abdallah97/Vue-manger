
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueFirestore from 'vue-firestore';
require('firebase/firestore')
import { fb } from "./fb.js";
Vue.use(VueFirestore, {
    key: 'id',         // the name of the property. Default is '.key'.
    enumerable: true  //  whether it is enumerable or not. Default is true.
});



let app = "";

// eslint-disable-next-line no-unused-vars
fb.auth().onAuthStateChanged(function(user) {
  if (!app) {
    new Vue({
      router,
     vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});