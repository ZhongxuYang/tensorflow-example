<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
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
]

const currentData = computed(() => dataList.find(it => it.path === route.path))
</script>

<template>
  <div class="home">
    <div class="home-header">
      <ul class="links">
        <li v-for="it in dataList" :key="it.path" :title="it.description">
          <router-link :to="it.path">
            {{ it.title }}
          </router-link>
        </li>
      </ul>
      <div class="text-center">
        <!-- <div>The detection takes effect only after the model is loaded.</div> -->
        <p>
          doc:
          <a :href="currentData?.doc" class="text-blue-500">{{ currentData?.doc }}</a>
        </p>
        <p class="text-gray-400" v-if="loading">Loading...</p>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="postcss" scoped>
.home{
  @apply w-full h-full bg-blue-100 flex flex-col;
  .home-header{
    @apply sticky top-0 left-0 p-2 bg-blue-200 z-50;
    .links{
      @apply flex justify-center w-full;
      a{
        @apply bg-blue-200 text-white p-1 m-1 rounded;
        &.router-link-active{
          @apply bg-blue-700;
        }
      }
    }
  }
}
</style>
