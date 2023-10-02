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

        import { visualizer } from './drawTerrain.js';
        

        // Define shapes for each level: starShape, smileyShape, jackolanternShape, wheelShape, sharkShape, saturnShape, leopardShape
        const levels = [circleShape, squareShape, heartShape];

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



// Function to generate terrain for the current level
function generateTerrain() {
    console.log("Generating terrain for level " + currentLevel);
    const currentShape = levels[currentLevel];


yinRangeStart = Math.floor(Math.random() * 78) + 1;
yinRangeEnd = yinRangeStart + 20;
yangRangeStart = Math.floor(Math.random() * 78) + 1;
yangRangeEnd = yangRangeStart + 20;
yinRangeStart = Math.max(2, yinRangeStart); // Ensures yinRangeStart is at least 2
yangRangeStart = Math.max(2, yangRangeStart); // Ensures yangRangeStart is at least 2
    
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

const resetSliders = visualizer(ctx, canvas, terrain, yinRangeStart, yinRangeEnd, yangRangeStart, yangRangeEnd);
    resetSliders();


// Event listener for the "Next Level" button
document.getElementById("nextLevelButton").addEventListener("click", () => {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        generateTerrain();
        resetSliders();
    }
});

// Event listener for the "Previous Level" button
document.getElementById("prevLevelButton").addEventListener("click", () => {
    if (currentLevel > 0) {
        currentLevel--;
        generateTerrain();
        resetSliders();
    }
});


// Code moved to popup.js
import { setupTooltip } from './Tooltip.js';
setupTooltip(canvas, popup, cellSize, terrain);
