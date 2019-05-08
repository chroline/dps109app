import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes'

function createApp () {
  const router = new VueRouter({
    mode: 'history',
    routes,
  });

  if(Meteor.isClient) {
    window.router = router;
  }

  // sync the router with the vuex store.
  // this registers `store.state.route`

  // Apollo

  Vue.use(VueRouter);

  return {
    app: new Vue({
      el: '#app',
      router,
      ...App,
    }),
    router,
  }
}

export default createApp
