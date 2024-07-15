<script setup lang="ts">
const dataList = [
  {
    path: '/handpose',
    title: 'Single handed detection',
  },
  {
    path: '/hand-pose-detection',
    title: 'Multi handed detection',
  },
]
</script>

<template>
  <div class="home">
    <div class="home-header">
      <ul class="links">
        <li v-for="it in dataList" :key="it.path">
          <router-link :to="it.path">
            {{ it.title }}
          </router-link>
        </li>
      </ul>
      <p class="text-center text-gray-400">The detection takes effect only after the model is loaded.</p>
    </div>
    <router-view />
  </div>
</template>

<style lang="postcss" scoped>
.home{
  @apply w-full;
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
