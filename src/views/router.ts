import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import Settings from './Settings.vue'

const routes = [
  {
      path: '/',
      component: Home
  },
  {
      path: '/settings',
      component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
