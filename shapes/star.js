// Define the star shape hi (level 3)
const width = 30;
const height = 30;

// Scaling factor; larger values make the star smaller, smaller values make it larger
const scaleFactor = 0.10;

export const starShape = {
    isPointInShape: (x, y) => {
        // Define the vertices of the star
        const vertices = [
            [width / 2, 0],
            [width, height],
            [0, height / 2],
            [width, height / 2],
            [0, height]
        ];

        // Calculate the area of the star
        const starArea = calculateArea(vertices[0], vertices[1], vertices[2]) +
                         calculateArea(vertices[0], vertices[2], vertices[3]) +
                         calculateArea(vertices[0], vertices[3], vertices[4]);

        // Calculate the sum of the areas of the triangles formed by the point and each pair of vertices
        const pointArea = calculateArea(vertices[0], vertices[1], [x, y]) +
                          calculateArea(vertices[1], vertices[2], [x, y]) +
                          calculateArea(vertices[2], vertices[3], [x, y]) +
                          calculateArea(vertices[3], vertices[4], [x, y]) +
                          calculateArea(vertices[4], vertices[0], [x, y]);

        // The point is inside the star if the sum of the areas is equal to the area of the star
        return Math.abs(starArea - pointArea) < 0.01;
    }
};
    // Helper function to calculate the area of a triangle given its vertices
    calculateArea: (v1, v2, v3) => {
        return 0.5 * Math.abs(v1[0]*(v2[1]-v3[1]) + v2[0]*(v3[1]-v1[1]) + v3[0]*(v1[1]-v2[1]));
    }
