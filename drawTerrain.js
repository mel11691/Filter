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
// Initialize the noUiSliders after the rest of the code
const yangMinInput = document.getElementById("yangMin");
const yangMaxInput = document.getElementById("yangMax");
const yinMinInput = document.getElementById("yinMin");
const yinMaxInput = document.getElementById("yinMax");

const yangSlider = document.getElementById("yangSlider");
const yinSlider = document.getElementById("yinSlider");

const yangStart = 1;
const yangEnd = 100;
const yinStart = 1;
const yinEnd = 100;

noUiSlider.create(yangSlider, {
    start: [yangStart, yangEnd],
    connect: true,
    range: {
        'min': yangStart,
        'max': yangEnd
    },
    step: 1,
    format: {
        to: value => Math.round(value),
        from: value => value
    }
});

noUiSlider.create(yinSlider, {
    start: [yinStart, yinEnd],
    connect: true,
    range: {
        'min': yinStart,
        'max': yinEnd
    },
    step: 1,
    format: {
        to: value => Math.round(value),
        from: value => value
    }
});

// Set initial values for input fields
yangMinInput.value = yangStart;
yangMaxInput.value = yangEnd;
yinMinInput.value = yinStart;
yinMaxInput.value = yinEnd;
