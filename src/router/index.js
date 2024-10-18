import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlboView from '../views/AlboView.vue'
import ArchivedView from '../views/ArchivedView.vue'
import store from "@/store"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/archiviati',
    name: 'archiviati',
    component: ArchivedView
  },
  {
    path: "/albo",
    name: "albo",
    component: AlboView
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  if(store.state.loggedperson == "" && to.name != "home"){
    next({name: "home"})
  }
  else{
    next()
  }
})


export default router
