import { terrain, currentLevel, yinRangeStart, yinRangeEnd, yangRangeStart, yangRangeEnd } from './terrainData.js';

const canvas = document.getElementById("terrainCanvas");
const ctx = canvas.getContext("2d");
const cellSize = canvas.width / width;

// Draw the terrain visualization
function drawTerrain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const cell = terrain[x][y];
            const withinYangRange = cell.yang >= yangRangeStart && cell.yang <= yangRangeEnd;
            const withinYinRange = cell.yin >= yinRangeStart && cell.yin <= yinRangeEnd;
            const color = withinYangRange && withinYinRange ? "lightgreen" : "white";
            ctx.fillStyle = color;
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

export { drawTerrain };
