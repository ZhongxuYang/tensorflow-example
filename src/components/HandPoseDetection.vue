<template>
  <div className="flex items-center justify-center h-screen w-full bg-blue-100">
    <div className="ml-auto mr-auto relative w-[1280px] h-[720px]">
      <Webcam ref="webcamRef" className="w-full h-full absolute" />
      <canvas ref="canvasRef" className="w-full h-full top-0 left-0 absolute z-10" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-converter';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import Webcam from './VueWebcam.vue'
import {drawHand} from '~/utils/drawing-for-hand-pose-detection'

const webcamRef = ref<Webcam>(null);
const canvasRef = ref<HTMLCanvasElement>(null);

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const loadHandpose = async () => {
  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: 'mediapipe', // or 'tfjs',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
    modelType: 'full'
  }
  const net: object = await handPoseDetection.createDetector(model, detectorConfig)

  setInterval(() => {
    detectHand(net);
  }, 1);
};

const detectHand = async (net: any) => {
  const webcam = webcamRef.value;
  const canvas = canvasRef.value;
  if (typeof webcam !== 'undefined' && webcam !== null && webcam.video!.readyState === 4) {
    const video: any = webcam.video;
    const videoWidth: number = video!.videoWidth;
    const videoHeight: number = video!.videoHeight;

    video.width = videoWidth;
    video.height = videoHeight;

    canvas!.width = videoWidth;
    canvas!.height = videoHeight;

    const hands = await net.estimateHands(video)
    console.log(hands)
    drawHand(hands, canvas!.getContext('2d'));
  }
};

onMounted(loadHandpose)

</script>

<style lang="postcss">

</style>
