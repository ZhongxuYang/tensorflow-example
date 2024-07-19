import {Pose} from '@tensorflow-models/pose-detection'

enum KeypointName {
  nose = 'nose',
  left_eye = 'left_eye',
  right_eye = 'right_eye',
  left_ear = 'left_ear',
  right_ear = 'right_ear',
  left_shoulder = 'left_shoulder',
  right_shoulder = 'right_shoulder',
  left_elbow = 'left_elbow',
  right_elbow = 'right_elbow',
  left_wrist = 'left_wrist',
  right_wrist = 'right_wrist',
  left_hip = 'left_hip',
  right_hip = 'right_hip',
  left_knee = 'left_knee',
  right_knee = 'right_knee',
  left_ankle = 'left_ankle',
  right_ankle = 'right_ankle',
}

export function isPoseRightHandUp(pose: Pose): boolean {
  // Access the keypoints of the detected pose
  const keypoints = pose.keypoints

  // Find the right shoulder and right wrist keypoints
  const rightShoulder = keypoints.find(keypoint => keypoint.name === KeypointName.right_shoulder)
  const rightWrist = keypoints.find(keypoint => keypoint.name === 'rightWrist')

  // Check if the right wrist is above the right shoulder
  if (rightWrist && rightShoulder && rightWrist.y < rightShoulder.y) {
    // Right hand is raised
    return true
  }

  return false
}

export function isPoseLeftHandUp(pose: Pose): boolean {
  // Access the keypoints of the detected pose
  const keypoints = pose.keypoints

  // Find the left shoulder and left wrist keypoints
  const leftShoulder = keypoints.find(keypoint => keypoint.name === KeypointName.left_shoulder)
  const leftWrist = keypoints.find(keypoint => keypoint.name === KeypointName.left_wrist)

  // Check if the left wrist is above the left shoulder
  if (leftWrist && leftShoulder && leftWrist.y < leftShoulder.y) {
    // Left hand is raised
    return true
  }

  return false
}

export function isPoseBothHandsUp(pose: Pose): boolean {
  // Access the keypoints of the detected pose
  const keypoints = pose.keypoints

  // Find the right shoulder, right wrist, left shoulder, and left wrist keypoints
  const rightShoulder = keypoints.find(keypoint => keypoint.name === KeypointName.right_shoulder)
  const rightWrist = keypoints.find(keypoint => keypoint.name === KeypointName.right_wrist)
  const leftShoulder = keypoints.find(keypoint => keypoint.name === KeypointName.left_shoulder)
  const leftWrist = keypoints.find(keypoint => keypoint.name === KeypointName.left_wrist)

  // Check if both the right and left wrists are above their respective shoulders
  if (
    rightWrist && rightShoulder && rightWrist.y < rightShoulder.y &&
    leftWrist && leftShoulder && leftWrist.y < leftShoulder.y
  ) {
    // Both hands are raised
    return true
  }

  return false
}

export function poseJudge(pose: Pose): string {
  if (isPoseBothHandsUp(pose)) {
    return 'both'
  } else if (isPoseLeftHandUp(pose)) {
    return 'left'
  } else if (isPoseRightHandUp(pose)) {
    return 'right'
  } else {
    return 'none'
  }
}
