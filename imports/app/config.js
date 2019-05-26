import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";

import App from "./App.vue";
import routes from "./routes";

import "vuetify/dist/vuetify.min.css";
import "prevent-pull-refresh";

function createApp() {
  const router = new VueRouter({
    mode: "history",
    routes
  });

  Vue.use(VueRouter);
  Vue.use(Vuetify);

  Vue.component("back-button", {});

  const vue = new Vue({
    el: "#app",
    router,
    methods: {},
    ...App
  });

  window.router = router;
  window.vue = vue;
}

export default createApp;
