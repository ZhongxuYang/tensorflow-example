// import * as tf from '@tensorflow/tfjs-node';
import * as Model from '@tensorflow-models/handpose'
// import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
// import * as poseDetection from '@tensorflow-models/pose-detection';

// https://www.tensorflow.org/js/guide/save_load?hl=zh-cn
async function saveHandPoseModel() {
  const model = await Model.load()
  // const model = poseDetection.SupportedModels.MoveNet
  // const detector = await poseDetection.createDetector(model);
  await model.save('file://dist/handpose')
}

saveHandPoseModel()
