const width = 30;
const height = 30;

// Define the smiley shape
const centerX = width / 2;
const centerY = height / 2;
const faceRadius = width / 3;
const eyeRadius = faceRadius / 5;
const mouthRadius = faceRadius / 2;

// Define the eyes
const leftEyeCenter = { x: centerX - faceRadius / 3, y: centerY - faceRadius / 3 };
const rightEyeCenter = { x: centerX + faceRadius / 3, y: centerY - faceRadius / 3 };

// Define the mouth
const mouthCenter = { x: centerX, y: centerY + faceRadius / 3 };

export const smileyShape = {
    name: "smiley",
    isPointInShape: (x, y) => {
        // Check if the point is within the face
        let inFace = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(faceRadius, 2);

        // Check if the point is within the eyes
        let inLeftEye = Math.pow(x - leftEyeCenter.x, 2) + Math.pow(y - leftEyeCenter.y, 2) <= Math.pow(eyeRadius, 2);
        let inRightEye = Math.pow(x - rightEyeCenter.x, 2) + Math.pow(y - rightEyeCenter.y, 2) <= Math.pow(eyeRadius, 2);

        // Check if the point is within the mouth
        let inMouth = y >= mouthCenter.y && Math.pow(x - mouthCenter.x, 2) + Math.pow(y - mouthCenter.y, 2) <= Math.pow(mouthRadius, 2);

        // The point is in the shape if it's within the face but not within the eyes or mouth
        return inFace && !inLeftEye && !inRightEye && !inMouth;
    }
};
