<script lang="ts">
export default {name: 'HandposeComponent'}
</script>

<template>
  <div className="flex items-center justify-center w-full flex-grow">
    <div className="ml-auto mr-auto relative w-[1280px] h-[720px]">
      <Webcam
        ref="webcamRef"
        class="w-full h-full absolute"
      />
      <canvas
        ref="canvasRef"
        class="w-full h-full top-0 left-0 absolute z-10"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import '@tensorflow/tfjs-backend-webgl'
import * as handpose from '@tensorflow-models/handpose'
import {HandPose} from '@tensorflow-models/handpose'
import Webcam from './common/VueWebcam.vue'
import {drawPose} from '~/utils/drawing-for-handpose'
import useLoadModel from '~/hooks/useLoadModel'

const {resetLoading, loaded} = useLoadModel()
resetLoading()

const webcamRef = ref<InstanceType<typeof Webcam>>()
const canvasRef = ref<HTMLCanvasElement>()

const loadHandpose = async () => {
  const net = await handpose.load()

  setInterval(() => {
    detectHand(net)
  }, 1)
}

const detectHand = async (net: HandPose) => {
  const webcam = webcamRef.value
  const canvas = canvasRef.value
  if (typeof webcam !== 'undefined' && webcam !== null && webcam.video!.readyState === 4) {
    const video = webcam.video
    const videoWidth: number = video!.videoWidth
    const videoHeight: number = video!.videoHeight

    video.width = videoWidth
    video.height = videoHeight

    canvas!.width = videoWidth
    canvas!.height = videoHeight

    const ctx = canvas!.getContext('2d') as CanvasRenderingContext2D

    const hand = await net.estimateHands(video)
    loaded()
    drawPose(hand, ctx)
  }
}

onMounted(loadHandpose)

</script>

<style lang="postcss">

</style>
