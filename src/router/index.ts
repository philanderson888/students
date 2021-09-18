import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Students from '../views/Students.vue'
import AddStudent from '../views/AddStudent.vue'
import About from '../views/About.vue'
const routes: Array<RouteRecordRaw> = [
  { path: '/',   name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About  }, 
  { path: '/students', name: 'Students', component: Students }, 
  { path: '/add-student', name: 'AddStudent', component: AddStudent }, 
  { path: '/edit/:id', name: 'edit',  component: () => import(/* webpackChunkName: "edit" */ '../views/EditStudent.vue') }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
