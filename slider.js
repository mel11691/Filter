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
