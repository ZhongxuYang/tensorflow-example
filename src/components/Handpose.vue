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
import * as handpose from '@tensorflow-models/handpose';
import Webcam from './VueWebcam.vue'
import {drawHand} from './utilities/drawing'

const webcamRef = ref<Webcam>(null);
const canvasRef = ref<HTMLCanvasElement>(null);

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const loadHandpose = async () => {
  const net: object = await handpose.load();

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

    const hand = await net.estimateHands(video);

    drawHand(hand, canvas!.getContext('2d'));
  }
};

onMounted(loadHandpose)

</script>

<style lang="postcss">

</style>
