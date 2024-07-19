<template>
  <div class="home-header">
    <div class="flex justify-between items-center">
      <ul class="links">
        <li
          v-for="it in dataList"
          :key="it.path"
          :title="it.description"
        >
          <router-link :to="it.path">
            {{ it.title }}
          </router-link>
        </li>
      </ul>

      <div class="urls">
        <a
          :href="currentData?.doc"
          target="_blank"
        >Document</a>
        <!-- <a href="https://github.com/ZhongxuYang/tensorflow" target="_blank">Github</a> -->
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
import {useRoute} from 'vue-router'
import useLoadModel from '~/hooks/useLoadModel'

const {loading} = useLoadModel()

const route = useRoute()

const dataList = [
  {
    path: '/handpose',
    title: 'Single handed',
    description: '手部姿势检测（单手）',
    doc: 'https://github.com/tensorflow/tfjs-models/tree/master/handpose',
  },
  {
    path: '/hand-pose-detection',
    title: 'Multi handed',
    description: '手部姿势检测（多手）',
    doc: 'https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection',
  },
  {
    path: '/pose-detection',
    title: 'Pose',
    description: '姿势检测',
    doc: 'https://github.com/tensorflow/tfjs-models/tree/master/pose-detection',
  },
  {
    path: '/pose-detection-local',
    title: 'Pose(Local)',
    description: '姿势检测（本地模型）',
    doc: 'https://github.com/tensorflow/tfjs-models/tree/master/pose-detection',
  },
]

const currentData = computed(() => dataList.find(it => it.path === route.path))
</script>

<style lang="postcss" scoped>
.home-header {
  @apply sticky top-0 left-0 p-2 z-50;

  .links, .urls {
    @apply flex flex-wrap;

    a {
      @apply block text-purple-700 py-1 px-2 m-1 rounded transition-all;
      &.router-link-active, &:hover {
        @apply bg-purple-700 text-white shadow;
      }
    }
  }
  .urls {
    @apply font-bold;
  }
}
</style>
