import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes'

function createApp () {
  const router = new VueRouter({
    mode: 'history',
    routes,
  });

  // sync the router with the vuex store.
  // this registers `store.state.route`

  // Apollo

  Vue.use(VueRouter);

  const vue = new Vue({
      el: '#app',
      router,
      ...App,
    })

  if(Meteor.isClient) {
    window.router = router;
    window.vue = vue;
  }

  console.log("yeet");
}

export default createApp
