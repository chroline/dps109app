import NotFound from '../ui/NotFound.vue'
import Home from '../pages/Home.vue'
import About from '../ui/Page1.vue'

console.log(Home);

export default [
  { path: '/', component: Home, meta: { transitionName: `slide` }, },
  { path: '/page1', component: About, meta: { transitionName: `slide` }, },
  { path: '*', component: NotFound, meta: { transitionName: `slide` }, },
]