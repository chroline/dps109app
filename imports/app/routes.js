import NotFound from '../ui/NotFound.vue'
import Home from '../ui/Home.vue'
import About from '../ui/Page1.vue'

console.log(Home);

export default [
  { path: '/', component: Home },
  { path: '/page1', component: About },
  { path: '*', component: NotFound },
]