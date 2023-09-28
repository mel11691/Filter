
const canvas = document.getElementById("terrainCanvas");
        const ctx = canvas.getContext("2d");
        const popup = document.getElementById("popup")

        // Define the terrain size
        const width = 30;
        const height = 30;
        const cellSize = canvas.width / width;

        import  {circleShape} from './shapes/circle.js';
        import {squareShape} from './shapes/square.js';
        import {heartShape} from './shapes/heart.js';
        import {starShape} from './shapes/star.js';


        // Define shapes for each level: , smileyShape, jackolanternShape, wheelShape, sharkShape, saturnShape, leopardShape
        const levels = [circleShape, squareShape, heartShape, starShape];

        // Define the current level (0 for circle, 1 for square)
        let currentLevel = 0;

        // Define the terrain array in the global scope
        let terrain = [];
        
// Declare variables for Yin and Yang ranges
let yinRangeStart = Math.floor(Math.random() * 78) + 1;
let yinRangeEnd = yinRangeStart + 20;
let yangRangeStart = Math.floor(Math.random() * 78) + 1;
let yangRangeEnd = yangRangeStart + 20;
yinRangeStart = Math.max(2, yinRangeStart); // Ensures yinRangeStart is at least 2
yangRangeStart = Math.max(2, yangRangeStart); // Ensures yangRangeStart is at least 2



// Code moved to drawTerrain.js



// Event listener for the "Next Level" button
document.getElementById("nextLevelButton").addEventListener("click", () => {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        generateTerrain();
    }
});

// Event listener for the "Previous Level" button
document.getElementById("prevLevelButton").addEventListener("click", () => {
    if (currentLevel > 0) {
        currentLevel--;
        generateTerrain();
    }
});

// Function to generate terrain for the current level
function generateTerrain() {
    const currentShape = levels[currentLevel];

    // Reset slider values
    yangMinInput.value = yangStart;
    yangMaxInput.value = yangEnd;
    yinMinInput.value = yinStart;
    yinMaxInput.value = yinEnd;
    yangSlider.noUiSlider.set([yangStart, yangEnd]);
    yinSlider.noUiSlider.set([yinStart, yinEnd]);

    

    // Generate new random Yin and Yang ranges
    yinRangeStart = Math.floor(Math.random() * 78) + 1;
    yinRangeEnd = yinRangeStart + 20;
    yangRangeStart = Math.floor(Math.random() * 78) + 1;
    yangRangeEnd = yangRangeStart + 20;
    
    // Generate terrain data
    terrain = [];

    for (let x = 0; x < width; x++) {
        terrain[x] = [];
        for (let y = 0; y < height; y++) {
            let yin, yang
        
            // Check if the point (x, y) is within the boundaries of the current shape
            if (currentShape.isPointInShape(x, y)) {
                // Generate Yin and Yang values based on shape boundaries
                const yin = Math.floor(Math.random() * (yinRangeEnd - yinRangeStart + 1)) + yinRangeStart;
                const yang = Math.floor(Math.random() * (yangRangeEnd - yangRangeStart + 1)) + yangRangeStart;
                terrain[x][y] = { yin, yang };
            } else {
                // Determine the values to match based on whether it's yin or yang outside the circle
                if (Math.random() < 0.5) {
                    // Match Yin value with a random Yin value inside the circle
                    yin = Math.floor(Math.random() * (yinRangeEnd - yinRangeStart + 1)) + yinRangeStart;
                    yang = Math.random() < 0.5 
                        ? Math.floor(Math.random() * (100 - yangRangeEnd)) + yangRangeEnd + 1 
                        : Math.floor(Math.random() * (yangRangeStart - 1) + 1);
                } else {
                    // Match Yang value with a random Yang value inside the circle
                    yang = Math.floor(Math.random() * (yangRangeEnd - yangRangeStart + 1)) + yangRangeStart;
                    yin = Math.random() < 0.5 
                        ? Math.floor(Math.random() * (100 - yinRangeEnd)) + yinRangeEnd + 1  
                        : Math.floor(Math.random() * (yinRangeStart - 1) + 1);
                }

                terrain[x][y] = { yin, yang };
            }
        }
    }
}

// Initialize the terrain for the first level (circle)
generateTerrain();

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

// Code moved to popup.js
import { setupTooltip } from './UI.js';
setupTooltip(canvas, popup, cellSize, terrain);

// Initial terrain draw
drawTerrain();
