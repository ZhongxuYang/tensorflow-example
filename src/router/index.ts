import {createRouter, createWebHashHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/handpose',
  },
  {
    path: '/handpose',
    name: 'Handpose',
    component: () => import('~/components/Handpose.vue'),
  },
  {
    path: '/hand-pose-detection',
    name: 'HandPoseDetection',
    component: () => import('~/components/HandPoseDetection.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory('/tensorflow'),
  routes,
})
export default router
