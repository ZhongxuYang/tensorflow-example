import {createRouter, createWebHashHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('~/views/home/index.vue'),
  },
  {
    path: '/LayoutModel',
    name: 'LayoutModel',
    component: () => import('~/components/layout/LayoutModel.vue'),
    children: [
      {
        path: '/images',
        name: 'Images',
        component: () => import('~/views/images/index.vue'),
        children: [
          {
            path: '/images/handpose',
            name: 'Handpose',
            component: () => import('~/views/images/Handpose.vue'),
          },
          {
            path: '/images/hand-pose-detection',
            name: 'HandPoseDetection',
            component: () => import('~/views/images/HandPoseDetection.vue'),
          },
          {
            path: '/images/pose-detection',
            name: 'PoseDetection',
            component: () => import('~/views/images/PoseDetection.vue'),
          },
          {
            path: '/images/pose-detection-local',
            name: 'PoseDetectionLocal',
            component: () => import('~/views/images/PoseDetectionLocal.vue'),
          },
        ],
        redirect: '/images/handpose',
      },
      {
        path: '/text',
        name: 'Text',
        component: () => import('~/views/text/index.vue'),
        redirect: '/text/text-toxicity',
        children: [
          {
            path: '/text/text-toxicity',
            name: 'TextToxicity',
            component: () => import('~/views/text/TextToxicity.vue'),
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory('/tensorflow'),
  routes,
})
export default router
