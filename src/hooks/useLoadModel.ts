import {ref} from 'vue'

const loading = ref(false)

export default function useLoadModel() {
  const resetLoading = () => loading.value = true
  const loaded = () => loading.value = false
  return {
    loading,
    resetLoading,
    loaded,
  }
}
