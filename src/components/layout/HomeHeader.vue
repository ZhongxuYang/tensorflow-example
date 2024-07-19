<template>
  <div class="home-header">
    <div class="flex justify-between items-center">
      <VueTabs
        :active="route.name as string"
        :data="dataList"
        @change="handleChange"
      />

      <div class="urls">
        <router-link to="/home">
          Home
        </router-link>
        <a
          :href="currentData?.doc"
          target="_blank"
        >Document</a>
        <a
          href="https://github.com/ZhongxuYang/tensorflow"
          target="_blank"
        >Github</a>
      </div>
    </div>
    <div class="text-center mt-2 text-gray-400">
      <span
        v-if="loading"
        class="text-orange-600"
      >○ Loading...</span>
      <span
        v-else
        class="text-green-600"
      >● Ready</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import useLoadModel from '~/hooks/useLoadModel'
import VueTabs from '~/components/common/VueTabs.vue'
import type {Tab} from '~/components/common/VueTabs.vue'

const {loading} = useLoadModel()

const route = useRoute()
const router = useRouter()

const dataList = [
  {
    value: 'Handpose',
    name: 'Single handed',
    description: '手部姿势检测（单手）',
    doc: 'https://github.com/tensorflow/tfjs-models/tree/master/handpose',
  },
  {
    value: 'HandPoseDetection',
    name: 'Multi handed',
    description: '手部姿势检测（多手）',
    doc: 'https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection',
  },
  {
    value: 'PoseDetection',
    name: 'Pose',
    description: '姿势检测',
    doc: 'https://github.com/tensorflow/tfjs-models/tree/master/pose-detection',
  },
  {
    value: 'PoseDetectionLocal',
    name: 'Pose(Local)',
    description: '姿势检测（本地模型）',
    doc: 'https://github.com/tensorflow/tfjs-models/tree/master/pose-detection',
  },
]
const handleChange = (it: Tab) => router.push({name: it.value})

const currentData = computed(() => dataList.find(it => it.value === route.name))
</script>

<style lang="postcss" scoped>
.home-header {
  @apply sticky top-0 left-0 p-2 z-50;

  .urls {
    @apply text-purple-700 font-bold;
    a {
      @apply inline-block mx-1;
    }
  }
}
</style>
