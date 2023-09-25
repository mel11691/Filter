// Define the heart shape (level 2)
const width = 30;
const height = 30;

// Scaling factor; larger values make the heart smaller, smaller values make it larger
const scaleFactor = 0.15;

// Cleave factor; larger values will make the cleave more pronounced
const cleaveFactor = 0.3;

export const heartShape = {
    isPointInShape: (x, y) => {
        // Center of the heart
        const centerX = width / 2;
        const centerY = height / 2;

        // Transform coordinates to make (centerX, centerY) the origin and apply scaling
        const gridX = (x - centerX) * scaleFactor;
        const gridY = (y - centerY) * scaleFactor;

        // Flip the heart shape by negating gridY
        const flippedGridY = -gridY;

        // Use the modified heart equation to determine if the point is inside the heart
        const inHeart = Math.pow(gridX, 2) + Math.pow(flippedGridY, 2) - 1 - cleaveFactor * Math.pow(gridX, 2) * flippedGridY;
        return Math.pow(inHeart, 3) <= Math.pow(gridX, 2) * Math.pow(flippedGridY, 3);
    }
};
