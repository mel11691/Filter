// Define the square shape (level 1) 
export const squareShape = {
    name: 'square',
    isPointInShape: (x, y) => {
        // Define square boundaries (adjust as needed)
        const minX = 10;
        const maxX = 20;
        const minY = 10;
        const maxY = 20;
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }
};
