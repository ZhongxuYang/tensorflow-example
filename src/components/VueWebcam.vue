<template>
  <video ref="videoRef" autoplay playsinline />
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'

const videoRef = ref()

function userMedia() {
  return navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia || null;
}

const startRecord = () => {
  if (userMedia()) {
    var constraints = {
      video: true,
      audio: false
    };
    var media = navigator.getUserMedia(constraints, function (stream) {
      var v = videoRef.value
      var url = window.URL || window.webkitURL;
      v.srcObject = stream;
      v.play();
    }, function (error) {
      console.log("ERROR");
      console.log(error);
    });
  } else {
    console.log("不支持");
  }
}

onMounted(startRecord)

defineExpose({
  video: videoRef,
})
</script>