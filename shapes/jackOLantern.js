const width = 30;
const height = 30;

// Define the jack-o-lantern shape
const centerX = width / 2;
const centerY = height / 2;
const faceRadius = width / 3;

// Define the eyes and nose as triangles
const eyeHeight = faceRadius / 3;
const eyeWidth = faceRadius / 3;
const noseHeight = faceRadius / 4;
const noseWidth = faceRadius / 4;

// Define the mouth as a curved shape
const mouthWidth = faceRadius;
const mouthHeight = faceRadius / 3;

export const jackOLanternShape = {
    name: "jack-o-lantern",
    isPointInShape: (x, y) => {
        // Check if the point is within the face
        let inFace = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(faceRadius, 2);

        // Define the eyes and nose as triangles
        let inLeftEye = x >= centerX - eyeWidth && x <= centerX && y >= centerY - eyeHeight && y <= centerY;
        let inRightEye = x >= centerX && x <= centerX + eyeWidth && y >= centerY - eyeHeight && y <= centerY;
        let inNose = x >= centerX - noseWidth / 2 && x <= centerX + noseWidth / 2 && y >= centerY && y <= centerY + noseHeight;

        // Define the mouth as a curved shape (simplified as a rectangle here)
        let inMouth = x >= centerX - mouthWidth / 2 && x <= centerX + mouthWidth / 2 && y >= centerY + faceRadius / 2 && y <= centerY + faceRadius / 2 + mouthHeight;

        // The point is in the shape if it's within the face but not within the eyes, nose, or mouth
        return inFace && !inLeftEye && !inRightEye && !inNose && !inMouth;
    }
};
