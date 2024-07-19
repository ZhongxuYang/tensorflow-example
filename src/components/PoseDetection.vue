<template>
  <div class="flex items-center justify-center w-full flex-grow">
    <div class="ml-auto mr-auto relative w-[1280px] h-[720px]">
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
import {ref, onMounted, onUnmounted} from 'vue'
import * as tf from '@tensorflow/tfjs'
import {PoseDetector, Keypoint} from '@tensorflow-models/pose-detection'
import * as poseDetection from '@tensorflow-models/pose-detection'
import '@tensorflow/tfjs-backend-webgl'
import Webcam from './common/VueWebcam.vue'
import useLoadModel from '~/hooks/useLoadModel'

const {resetLoading, loaded} = useLoadModel()
resetLoading()

const webcamRef = ref<InstanceType<typeof Webcam>>()
const canvasRef = ref<HTMLCanvasElement>()

const model = poseDetection.SupportedModels.MoveNet
const DEFAULT_LINE_WIDTH = 2
const DEFAULT_RADIUS = 4
const SCORE_THRESHOLD = 0.5

let detector: PoseDetector, requestID: number // requestAnimationFrame

const loadHandpose = async () => {
  detector = await poseDetection.createDetector(model)
  startDetect()
}

const startDetect = async () => {
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

    // 检测画布动作
    const poses = await detector.estimatePoses(video, {
      flipHorizontal: false, // 是否水平翻转
      maxPoses: 1, // 最大检测人数
      // scoreThreshold: 0.5, // 置信度
      // nmsRadius: 20, // 非极大值抑制
    })
    loaded()
    // 画第一个人的姿势 poses[0]
    // 画点
    drawKeypoints(ctx, poses[0].keypoints)
    // 画骨骼
    drawSkeleton(ctx, poses[0].keypoints)
    // 一帧执行一次  可替换为setTimeout方案: setTimeout(()=>startDetect(),1000/16)
    requestID = requestAnimationFrame(() => startDetect())
  }
}

// 画点
function drawKeypoints(ctx: CanvasRenderingContext2D, keypoints: Keypoint[]) {
  // keypointInd 主要按left middle right  返回索引，left是单数索引，right是双数索引，打印一下你就知道了
  const keypointInd = poseDetection.util.getKeypointIndexBySide(model)
  ctx.strokeStyle = 'White'
  ctx.lineWidth = DEFAULT_LINE_WIDTH

  ctx.fillStyle = 'Red'
  for (const i of keypointInd.middle) {
    drawKeypoint(ctx, keypoints[i])
  }

  ctx.fillStyle = 'Green'
  for (const i of keypointInd.left) {
    drawKeypoint(ctx, keypoints[i])
  }

  ctx.fillStyle = 'Orange'
  for (const i of keypointInd.right) {
    drawKeypoint(ctx, keypoints[i])
  }
}
function drawKeypoint(ctx: CanvasRenderingContext2D, keypoint: Keypoint) {
  // If score is null, just show the keypoint.
  const score = keypoint.score ?? 1

  if (score >= SCORE_THRESHOLD) {
    const circle = new Path2D()
    circle.arc(keypoint.x, keypoint.y, DEFAULT_RADIUS, 0, 2 * Math.PI)
    ctx.fill(circle)
    ctx.stroke(circle)
  }
}
// 画骨架
function drawSkeleton(ctx: CanvasRenderingContext2D, keypoints: Keypoint[]) {
  // Each poseId is mapped to a color in the color palette.
  const color = 'White'

  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.lineWidth = DEFAULT_LINE_WIDTH

  poseDetection.util.getAdjacentPairs(model).forEach(([i, j]) => {
    const kp1 = keypoints[i]
    const kp2 = keypoints[j]

    // If score is null, just show the keypoint.
    const score1 = kp1.score ?? 1
    const score2 = kp2.score ?? 1

    if (score1 >= SCORE_THRESHOLD && score2 >= SCORE_THRESHOLD) {
      ctx.beginPath()
      ctx.moveTo(kp1.x, kp1.y)
      ctx.lineTo(kp2.x, kp2.y)
      ctx.stroke()
    }
  })
}

onMounted(async () => {
  await tf.setBackend('webgl')
  loadHandpose()
})
onUnmounted(() => {
  detector?.dispose()
  cancelAnimationFrame(requestID)
})
</script>

<style lang="postcss">

</style>
