
// Initialize the noUiSliders

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

import { drawTerrain } from "./draw.js";

export function sliderCreate(){
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
}

export const inputInitalValue = () => {
// Set initial values for input fields
yangMinInput.value = yangStart;
yangMaxInput.value = yangEnd;
yinMinInput.value = yinStart;
yinMaxInput.value = yinEnd;
}

export const inputUpdate = () => {
// Update sliders and redraw terrain when input values change
yangMinInput.addEventListener("input", () => {});
yangMaxInput.addEventListener("input", () => {});
yinMinInput.addEventListener("input", () => {});
yinMaxInput.addEventListener("input", () => {});

// Add event listeners for keyup on input fields
yangMinInput.addEventListener("keyup", handleInputKey);
yangMaxInput.addEventListener("keyup", handleInputKey);
yinMinInput.addEventListener("keyup", handleInputKey);
yinMaxInput.addEventListener("keyup", handleInputKey);

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

function handleInputKey(event) {
    if (event.key === "Enter") {
        updateYangSlider();
        updateYinSlider();
    } else if (event.key === "Delete") {
        event.target.value = "";
    }
}
}

export const sliderUpdate = (terrain, yinSlider, yangSlider, yangRangeStart, yangRangeEnd, yinRangeStart, yinRangeEnd) => {
yangSlider.noUiSlider.on("update", (values, handle) => {
    if (handle === 0) {
        yangMinInput.value = Math.round(values[0]);
    } else {
        yangMaxInput.value = Math.round(values[1]);
    }
    drawTerrain(terrain, yinSlider, yangSlider);
    console.log("yangStart:", yangMinInput.value, "yangEnd:", yangMaxInput.value);
    console.log("yangRangeStart:", yangRangeStart, "yangRangeEnd:", yangRangeEnd);
});


yinSlider.noUiSlider.on("update", (values, handle) => {
    if (handle === 0) {
        yinMinInput.value = Math.round(values[0]);
    } else {
        yinMaxInput.value = Math.round(values[1]);
    }
    drawTerrain(terrain, yinSlider, yangSlider);
    console.log("yinStart:", yinMinInput.value, "yinEnd:", yinMaxInput.value);
    console.log("yinRangeStart:", yinRangeStart, "yinRangeEnd:", yinRangeEnd);
});
  }

export const resetValues = () => {
 // Reset slider values
 yangMinInput.value = yangStart;
 yangMaxInput.value = yangEnd;
 yinMinInput.value = yinStart;
 yinMaxInput.value = yinEnd;
 yangSlider.noUiSlider.set([yangStart, yangEnd]);
 yinSlider.noUiSlider.set([yinStart, yinEnd]);
}
