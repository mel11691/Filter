// Define the square shape (level 1) 
export const squareShape = {
    name: 'square',
    isPointInShape: (x, y) => {
        // Define square boundaries (adjust as needed)
        const minX = 7.5;
        const maxX = 22.5;
        const minY = 7.5;
        const maxY = 22.5;
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }
};
