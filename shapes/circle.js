 
// Define the circle shape (level 0)
            const width = 30;
            const height = 30;
export const circleShape = {
        name: 'circle',
        isPointInShape: (x, y) => {
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 3;
            const distanceToCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            return distanceToCenter <= radius;
    }
};
