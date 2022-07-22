import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'PageIndex',
    component: () => import('@/views/Index/index.vue')
  },
  {
    path: '/detail',
    name: 'PageDetail',
    component: () => import('@/views/Detail/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
