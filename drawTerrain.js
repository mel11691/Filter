import { width, height, terrain, yangMin, yangMax, yinMin, yinMax, yangSlider, yinSlider, yangMinInput, yangMaxInput, yinMinInput, yinMaxInput } from './main.js';

const canvas = document.getElementById("terrainCanvas");
const ctx = canvas.getContext("2d");
const cellSize = canvas.width / width;

// Code moved from main.js
// Draw the terrain visualization
function drawTerrain() {
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

// Debug Console
function areSlidersExclusivelyWithinShape() {
    console.log("yangStart:", yangStart, "yangEnd:", yangEnd);
    console.log("yinStart:", yinStart, "yinEnd:", yinEnd);
    console.log("yinRangeStart:", yinRangeStart, "yinRangeEnd:", yinRangeEnd);
    console.log("yangRangeStart:", yangRangeStart, "yangRangeEnd:", yangRangeEnd);
}
areSlidersExclusivelyWithinShape();
}

export { drawTerrain };
// Code moved from main.js
// Add event listeners for keyup on input fields
yangMinInput.addEventListener("keyup", handleInputKey);
yangMaxInput.addEventListener("keyup", handleInputKey);
yinMinInput.addEventListener("keyup", handleInputKey);
yinMaxInput.addEventListener("keyup", handleInputKey);

function handleInputKey(event) {
    if (event.key === "Enter") {
        updateYangSlider();
        updateYinSlider();
    } else if (event.key === "Delete") {
        event.target.value = "";
    }
}

// Update sliders and redraw terrain when input values change
yangMinInput.addEventListener("input", () => {});
yangMaxInput.addEventListener("input", () => {});
yinMinInput.addEventListener("input", () => {});
yinMaxInput.addEventListener("input", () => {});

yangSlider.noUiSlider.on("update", (values, handle) => {
    if (handle === 0) {
        yangMinInput.value = Math.round(values[0]);
    } else {
        yangMaxInput.value = Math.round(values[1]);
    }
    drawTerrain();
});

yinSlider.noUiSlider.on("update", (values, handle) => {
    if (handle === 0) {
        yinMinInput.value = Math.round(values[0]);
    } else {
        yinMaxInput.value = Math.round(values[1]);
    }
    drawTerrain();
});

function updateYangSlider() {
    const min = parseInt(yangMinInput.value);
    const max = parseInt(yangMaxInput.value);
    yangSlider.noUiSlider.set([min, max]);
}

function updateYinSlider() {
    const min = parseInt(yinMinInput.value);
    const max = parseInt(yinMaxInput.value);
    yinSlider.noUiSlider.set([min, max]);
}
