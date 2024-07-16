// https://github.com/miniocean404-vue/tool_and_demo_vite_vue3/blob/3aa7c29aad9cf3ebe342054efc8acdbb4ae920ec/src/demo/js/Tensorflow/posenet.vue#L4

// 转成元组
function toTuple({ y, x }: { y: number; x: number }) {
  return [y, x]
}

// 画线段
function drawSegment([ay, ax]: number[], [by, bx]: number[], color: string, scale: number, ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.moveTo(ax * scale, ay * scale)
  ctx.lineTo(bx * scale, by * scale)
  ctx.lineWidth = 4
  ctx.strokeStyle = color
  ctx.stroke()
}

export const drawPose: Function = (predictions: any, ctx: CanvasRenderingContext2D, net) => {
  if (predictions.length > 0) {
    /*eslint array-callback-return: "off"*/
    predictions.map((prediction: any) => {
      const { keypoints } = prediction;
      
      // 画出 17 个关键点
      keypoints.forEach(({position}) => {
        ctx.beginPath()
        ctx.arc(position.x, position.y, 4, 0, 2 * Math.PI)
        ctx.fillStyle = "#f00000"
        ctx.fill()
      })
      // 画出 17 个关键点之间的连线
      // const adjacentKeyPoints = net.getAdjacentKeyPoints(keypoints, 0.3)
      // console.log('🚀🚀🚀 / adjacentKeyPoints', adjacentKeyPoints)
      // adjacentKeyPoints.forEach((point) => {
      //   drawSegment(toTuple(point[0].position), toTuple(point[1].position), "aqua", 1, ctx)
      // })
    });
  }
};
