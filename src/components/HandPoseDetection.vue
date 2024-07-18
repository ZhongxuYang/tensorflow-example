<template>
  <div className="flex items-center justify-center w-full flex-grow">
    <div className="ml-auto mr-auto relative w-[1280px] h-[720px]">
      <Webcam ref="webcamRef" className="w-full h-full absolute" />
      <canvas ref="canvasRef" className="w-full h-full top-0 left-0 absolute z-10" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import '@tensorflow/tfjs-backend-webgl'
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
import {HandDetector} from '@tensorflow-models/hand-pose-detection'
import {MediaPipeHandsMediaPipeModelConfig} from '@tensorflow-models/hand-pose-detection'
import Webcam from './common/VueWebcam.vue'
import {drawPose} from '~/utils/drawing-for-hand-pose-detection'
import useLoadModel from '~/hooks/useLoadModel'

const {resetLoading, loaded} = useLoadModel()
resetLoading()

const webcamRef = ref<InstanceType<typeof Webcam>>()
const canvasRef = ref<HTMLCanvasElement>()

const loadHandpose = async () => {
  const model = handPoseDetection.SupportedModels.MediaPipeHands
  const detectorConfig: MediaPipeHandsMediaPipeModelConfig = {
    runtime: 'mediapipe', // or 'tfjs',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
    modelType: 'full',
  }
  const net: HandDetector = await handPoseDetection.createDetector(model, detectorConfig)

  setInterval(() => {
    detectHand(net)
  }, 1)
}

const detectHand = async (net: HandDetector) => {
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

    const hands = await net.estimateHands(video)
    loaded()
    drawPose(hands, ctx)
  }
}

onMounted(loadHandpose)
</script>

<style lang="postcss">

</style>
