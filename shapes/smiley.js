const width = 30;
const height = 30;

// Define the smiley shape
const centerX = width / 2;
const centerY = height / 2;
const faceRadius = width / 3;
const eyeRadius = faceRadius / 5;

// Define the mouth
const mouthRadius = faceRadius / 1.3;
const mouthCenter = { x: centerX, y: centerY + faceRadius / 10};

// Define the eyes
const leftEyeCenter = { x: centerX - faceRadius / 3, y: centerY - faceRadius / 3 };
const rightEyeCenter = { x: centerX + faceRadius / 3, y: centerY - faceRadius / 3 };

export const smileyShape = {
    name: "smiley",
    isPointInShape: (x, y) => {
        // Check if the point is within the face
        let inFace = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(faceRadius, 2);

        // Check if the point is within the eyes
        let inLeftEye = Math.pow(x - leftEyeCenter.x, 2) + Math.pow(y - leftEyeCenter.y, 2) <= Math.pow(eyeRadius, 2);
        let inRightEye = Math.pow(x - rightEyeCenter.x, 2) + Math.pow(y - rightEyeCenter.y, 2) <= Math.pow(eyeRadius, 2);

        // Define the mouth as a larger circle minus a smaller circle
        const outerMouthRadius = mouthRadius;
        const innerMouthRadius = mouthRadius * 0.8; // Adjust this value as needed for the desired thickness
        let inOuterMouth = Math.pow(x - mouthCenter.x, 2) + Math.pow(y - mouthCenter.y, 2) <= Math.pow(outerMouthRadius, 2);
        let inInnerMouth = Math.pow(x - mouthCenter.x, 2) + Math.pow(y - mouthCenter.y, 2) <= Math.pow(innerMouthRadius, 2);
        let inMouth = inOuterMouth && !inInnerMouth && y >= mouthCenter.y; // Ensure it's the bottom of the outer circle

        // The point is in the shape if it's within the face but not within the eyes or the mouth
        return inFace && !inLeftEye && !inRightEye && !inMouth;
    }
};
