const width = 30;
const height = 30;

// Define the star shape (level 3)
const centerX = width / 2;
const centerY = height / 2;
const outerRadius = width / 2;
const innerRadius = outerRadius / 2;
const vertices = [];

for (let point = 0; point < 5; point++) {
    let outerAngle = 2 * Math.PI * point / 5 - Math.PI / 2;
    let innerAngle = 2 * Math.PI * (point + 0.5) / 5 - Math.PI / 2;

    vertices.push({
        x: centerX + outerRadius * Math.cos(outerAngle),
        y: centerY + outerRadius * Math.sin(outerAngle)
    });

    vertices.push({
        x: centerX + innerRadius * Math.cos(innerAngle),
        y: centerY + innerRadius * Math.sin(innerAngle)
    });
}

export const starShape = {
    name: "star",
    isPointInShape: (x, y) => {
        let inside = false;
        for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            let xi = vertices[i].x, yi = vertices[i].y;
            let xj = vertices[j].x, yj = vertices[j].y;

            let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }
};
