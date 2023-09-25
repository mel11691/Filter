// Define the star shape (level 3)
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

        // Use the star equation to determine if the point is inside the star
        const inStar = Math.abs(Math.sin(5 * Math.atan2(gridY, gridX))) < 0.5;
        return inStar;
    }
};
