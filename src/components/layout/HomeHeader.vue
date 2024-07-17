<template>
  <div :class="`home-header ${bgColor}`">
    <div class="flex justify-between">
      <ul class="links">
        <li v-for="it in dataList" :key="it.path" :title="it.description">
          <router-link :to="it.path">
            {{ it.title }}
          </router-link>
        </li>
      </ul>

      <div>
        <a :href="currentData?.doc" target="_blank" class="text-blue-500">Document</a>
      </div>
    </div>
    <div class="text-center text-gray-400">
      <span v-if="loading" class="text-orange-500">○ Loading...</span>
      <span v-else class="text-green-500">● Ready</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoadModel from '~/hooks/useLoadModel'

const { loading } = useLoadModel()

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
]

const currentData = computed(() => dataList.find(it => it.path === route.path))
const bgColor = computed(() => loading.value ? ['bg-orange-100'] : ['bg-green-100'])
</script>

<style lang="postcss" scoped>
.home-header {
  @apply sticky top-0 left-0 p-2 z-50;

  .links {
    @apply flex justify-center;

    a {
      @apply bg-blue-200 text-white py-1 px-2 mx-1 rounded transition-all;

      &.router-link-active {
        @apply bg-blue-700;
      }
    }
  }
}
</style>
