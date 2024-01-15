

export const setupTooltip = (canvas, popup, cellSize, terrain) => {
    // Add event listeners for mousemove
    canvas.addEventListener("mousemove", (e) => {
      const x = Math.floor(e.offsetX / cellSize);
      const y = Math.floor(e.offsetY / cellSize);
      const yangValue = terrain[x][y].yang;
      const yinValue = terrain[x][y].yin;
      popup.innerHTML = `Yang: ${yangValue}<br>Yin: ${yinValue}`;
      popup.style.left = `${e.clientX + 10}px`;
      popup.style.top = `${e.clientY}px`;
      popup.style.display = "block";
    });
  
    // Add mouseout event listener to hide the tooltip
    canvas.addEventListener("mouseout", () => {
      popup.style.display = "none";
    });
  };
  
  // Debug Console
export function areSlidersExclusivelyWithinShape(yangStart, yangEnd, yinStart, yinEnd, yinRangeStart, yinRangeEnd, yangRangeStart, yangRangeEnd) {
  console.log("yangStart:", yangStart, "yangEnd:", yangEnd);
  console.log("yinStart:", yinStart, "yinEnd:", yinEnd);
  console.log("yinRangeStart:", yinRangeStart, "yinRangeEnd:", yinRangeEnd);
  console.log("yangRangeStart:", yangRangeStart, "yangRangeEnd:", yangRangeEnd);
}