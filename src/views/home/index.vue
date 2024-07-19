<script lang="ts">
export default {name: 'HomeIndex'}
</script>

<template>
  <div class="home">
    <a
      class="logo"
      href="https://www.tensorflow.org/"
      target="_blank"
    >
      <img
        src="/tensorflow.svg"
        alt=""
      >
    </a>
    <VueTabs
      :data="modelTypeList"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import VueTabs from '~/components/common/VueTabs.vue'
import type {Tab} from '~/components/common/VueTabs.vue'
import {useRouter} from 'vue-router'

const modelTypeList = [
  {
    name: 'Images',
    value: 'Images',
  },
  {
    name: 'Audio',
    value: 'Audio',
    disabled: true,
  },
  {
    name: 'Text',
    value: 'Text',
    disabled: true,
  },
  {
    name: 'Depth Estimation',
    value: 'Depth Estimation',
    disabled: true,
  },
  {
    name: 'General Utilities',
    value: 'General Utilities',
    disabled: true,
  },
]

const router = useRouter()
const handleChange = (tab: Tab) => router.push({name: tab.value})
</script>

<style lang="postcss" scoped>
.home{
  @apply w-full h-full flex flex-col justify-center items-center bg-green-100;
  .logo{
    @apply inline-block w-1/12 m-8;
  }
}
</style>
