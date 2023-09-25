// Define the terrain size
const width = 30;
const height = 30;
const cellSize = canvas.width / width;

// Define the terrain array in the global scope
let terrain = [];

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
}

// Initial terrain draw
drawTerrain();
