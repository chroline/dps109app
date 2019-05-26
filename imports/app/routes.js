import Home from '../pages/Home.vue'
import Teacher from '../pages/Teacher.vue'
import School from '../pages/School.vue'

export default [
  { path: '/', component: Home, name: "Home", meta: { transitionName: `slide` }, },
  { path: '/teacher', component: Teacher, name: "Teacher", meta: { transitionName: `slide` }, },
  { path: '/school', component: School, name: "School", meta: { transitionName: `slide` }, },
]