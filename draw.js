const canvas = document.getElementById("terrainCanvas");
const ctx = canvas.getContext("2d");
const yangSlider = document.getElementById("yangSlider");
const yinSlider = document.getElementById("yinSlider");

// Define the terrain size
const width = 30;
const height = 30;
const cellSize = canvas.width / width;

// Draw the terrain visualization
export function drawTerrain(terrain, yinSlider, yangSlider) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const cell = terrain[x][y];
            const withinYangRange = cell.yang >= yangMin && cell.yang <= yangMax;
            const withinYinRange = cell.yin >= yinMin && cell.yin <= yinMax;
            const color = withinYangRange && withinYinRange ? "lightgreen" : "white";
            ctx.fillStyle = color;
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    const yangValues = yangSlider.noUiSlider.get();
    const yinValues = yinSlider.noUiSlider.get();

    const yangStart = parseInt(yangValues[0]);
    const yangEnd = parseInt(yangValues[1]);
    const yinStart = parseInt(yinValues[0]);
    const yinEnd = parseInt(yinValues[1]);
    
    //Color terrain
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const withinYangRange = terrain[x][y].yang >= yangStart && terrain[x][y].yang <= yangEnd;
            const withinYinRange = terrain[x][y].yin >= yinStart && terrain[x][y].yin <= yinEnd;
            const color = withinYangRange && withinYinRange ? "lightgreen" : "white";
            ctx.fillStyle = color;
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}