// Define the star shape hi (level 3)
const width = 30;
const height = 30;

// Scaling factor; larger values make the star smaller, smaller values make it larger
const scaleFactor = 0.15;

export const starShape = {
    isPointInShape: (x, y) => {
        // Center of the star
        const centerX = width / 2;
        const centerY = height / 2;

        // Transform coordinates to make (centerX, centerY) the origin and apply scaling
        const gridX = (x - centerX) * scaleFactor;
        const gridY = (y - centerY) * scaleFactor;

        // Angle of each segment in radians
        const segmentAngle = 2 * Math.PI / 5;

        // Distance from the center to the point
        const distance = Math.sqrt(gridX ** 2 + gridY ** 2);

        // Angle from the center to the point
        const angle = Math.atan2(gridY, gridX);

        // Determine which segment the point is in
        const segment = Math.floor((angle + Math.PI) / segmentAngle);

        // Determine if the point is inside the pentagon
        const inPentagon = distance <= Math.cos(segment * segmentAngle - Math.PI) / Math.cos(segmentAngle / 2);

        return inPentagon;
    }
};
