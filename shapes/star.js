// Define the star shape
const width = 30;
const height = 30;

// Scaling factor; larger values make the star smaller, smaller values make it larger
const scaleFactor = 0.1;

// Thickness factor; larger values make the arms of the star thicker
const thicknessFactor = 0.7;

export const starShape = {
    name: "star",
    isPointInShape: (x, y) => {
        // Center of the star
        const centerX = width / 2;
        const centerY = height / 2;

        // Transform coordinates to make (centerX, centerY) the origin and apply scaling
        const gridX = (x - centerX) * scaleFactor;
        const gridY = (y - centerY) * scaleFactor;

        // Use the equation for a 5-pointed star to determine if the point is inside the star
        const r = Math.sqrt(Math.pow(gridX, 2) + Math.pow(gridY, 2));
        const theta = Math.atan2(gridY, gridX);
        const starEdge = 0.5 * (1 - Math.sin(5 * theta)) + thicknessFactor;
        return r <= starEdge;
    }
};
