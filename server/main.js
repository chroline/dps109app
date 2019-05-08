import Vue from 'vue'
import { VueSSR } from 'meteor/akryum:vue-ssr'
import CreateApp from '../imports/app/config'
import App from '../imports/app/App.vue'

VueSSR.createApp = CreateApp;