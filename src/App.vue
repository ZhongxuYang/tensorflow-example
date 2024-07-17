<script setup lang="ts">
import HomeHeader from '~/components/layout/HomeHeader.vue'
</script>

<template>
  <div class="home">
    <HomeHeader />
    <router-view />
  </div>
</template>

<style lang="postcss" scoped>
.home{
  @apply w-full h-full bg-blue-100 flex flex-col;
}
</style>
