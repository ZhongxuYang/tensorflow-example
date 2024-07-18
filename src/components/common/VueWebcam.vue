<template>
  <video
    ref="videoRef"
    autoplay
    playsinline
  />
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'

const videoRef = ref()

function userMedia() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia || (navigator as any).msGetUserMedia || null
}

const startRecord = () => {
  if (userMedia()) {
    const constraints = {
      video: true,
      audio: false,
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(
        (stream) => {
          const v = videoRef.value
          v.srcObject = stream
          v.play()
        },
      )
      .catch(
        (error) => console.log(error),
      )
  } else {
    console.log('不支持')
  }
}

onMounted(startRecord)

defineExpose({
  video: videoRef,
})
</script>
