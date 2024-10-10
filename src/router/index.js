import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'lista',
    component: HomeView
  },
  {
    path: '/archiviati',
    name: 'archiviati',
    component: () => import('../views/ArchivedView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
