import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

// firebaseを利用するためのコード
// Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      var firebaseConfig = {
        apiKey: "AIzaSyCNxcoQvq7XU1NarHaoAkOjmTWSmnwgQVo",
        authDomain: "teamb-coffee-app.firebaseapp.com",
        projectId: "teamb-coffee-app",
        storageBucket: "teamb-coffee-app.appspot.com",
        messagingSenderId: "949894088160",
        appId: "1:949894088160:web:27317cb35237d3e4299785",
        measurementId: "G-Z58W7H83XL"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
