interface fingerLookupType {
  thumb: [number, number, number, number, number];
  indexFinger: [number, number, number, number, number];
  middleFinger: [number, number, number, number, number];
  ringFinger: [number, number, number, number, number];
  pinky: [number, number, number, number, number];
}

const fingerLookupIndices: fingerLookupType = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
}; // for rendering each finger as a polyline

export const drawHand: Function = (predictions: any, ctx: CanvasRenderingContext2D) => {
  if (predictions.length > 0) {
    /*eslint array-callback-return: "off"*/
    predictions.map((prediction: any) => {
      const { landmarks } = prediction;

      Object.keys(fingerLookupIndices).map((finger: string) => {
        const fingerIndices = fingerLookupIndices[finger as keyof fingerLookupType];

        for (let k = 0; k < fingerIndices.length - 1; k++) {
          // Get pairs of joints
          const firstJointIndex = fingerIndices[k];
          const secondJointIndex = fingerIndices[k + 1];

          // Draw path
          ctx.beginPath();
          ctx.moveTo(landmarks[firstJointIndex][0], landmarks[firstJointIndex][1]);
          ctx.lineTo(landmarks[secondJointIndex][0], landmarks[secondJointIndex][1]);
          ctx.strokeStyle = '#34eb37';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      landmarks.map((landmark: [number, number, number]) => {
        const [x, y] = landmark;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#eb3434';
        ctx.fill();
      });
    });
  }
};
