<script setup lang="ts">
import {computed} from 'vue'
import HomeHeader from '~/components/layout/HomeHeader.vue'
import useLoadModel from '~/hooks/useLoadModel'

const {loading} = useLoadModel()
const bgColor = computed(() => loading.value ? ['bg-orange-100'] : ['bg-green-100'])
</script>

<template>
  <div :class="`home ${bgColor}`">
    <HomeHeader />
    <router-view />
  </div>
</template>

<style lang="postcss" scoped>
.home{
  @apply w-full h-full flex flex-col transition-all duration-300;
}
</style>
