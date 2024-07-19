<template>
  <div class="tabs-container">
    <div class="tabs">
      <div
        v-for="it in data"
        :key="it.value"
        class="tabs-item"
        :class="{ active: active === it.value, disabled: it.disabled }"
      >
        <button
          :disabled="it.disabled"
          @click="handleClick(it)"
        >
          {{ it.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Tab {
  name: string
  value: string
  disabled?: boolean
}
interface Props {
  active: string | number | undefined
  data: Tab[]
}
withDefaults(defineProps<Props>(), {
  active: '',
  data: () => [],
})
const emits = defineEmits(['change'])

const handleClick = (it: Tab) => emits('change', it)
</script>

<style lang="postcss">
.tabs-container{
  .tabs {
    @apply flex;
    &-item{
      @apply block text-purple-700 py-1 px-2 m-1 rounded transition-all;
      &.active,
      &:hover:not(.disabled) {
        @apply bg-purple-700 text-white shadow;
      }
      &.disabled {
        @apply cursor-not-allowed opacity-50;
        button{
          @apply cursor-not-allowed;
        }
      }
    }
  }
}
</style>
