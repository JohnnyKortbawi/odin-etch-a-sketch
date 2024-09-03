const gridContainer = document.querySelector('#grid-container');
const gridSlider = document.querySelector('#grid-slider');
const gridSizeText = document.querySelector('#grid-size-text');
const btnToggleGridLines = document.querySelector('#btn-toggle-gridlines');
const btnToggleRainbow = document.querySelector('#btn-toggle-rainbow');
const btnToggleShading = document.querySelector('#btn-toggle-shading');

let isGridLinesToggled = false;
let isRainbowToggled = false;
let defaultGridSize = 16;
createGrid(defaultGridSize);

gridSlider.addEventListener('input', () => createGrid(gridSlider.value));
btnToggleGridLines.addEventListener('click', () => toggleGridLines());
btnToggleRainbow.addEventListener('click', () => toggleRainbow());
btnToggleShading.addEventListener('click', () => toggleShading());

function getRandomHueStep() {
  // Generate a small random step to change the hue, ensuring smooth transitions
  return Math.floor(Math.random() * 30) - 15; // Small change in hue (-15 to +15)
}

function getNextColor(prevHue) {
  // Adjust the hue slightly for the next color
  let newHue = (prevHue + getRandomHueStep()) % 360;
  if (newHue < 0) newHue += 360; // Ensure hue stays in the 0-360 range
  const saturation = 70; // Set a fixed saturation for vivid colors
  const lightness = 50;  // Set a fixed lightness for balanced brightness
  return `hsl(${newHue}, ${saturation}%, ${lightness}%)`;
}

function cycleColorOnHover(gridItem) {
  // Initialize with a random hue
  let currentHue = Math.floor(Math.random() * 360);
  
  gridItem.addEventListener('mouseenter', () => {
    // Get the next color based on the current hue
    const nextColor = getNextColor(currentHue);
    // Apply the color with a smooth transition
    gridItem.style.backgroundColor = nextColor;
    
    // Update the current hue for the next transition
    currentHue = (currentHue + getRandomHueStep()) % 360;
  });
}

function colorBox(gridItem, color) {
  if (!isRainbowToggled) {
    gridItem.style.backgroundColor = color;
  }
  else {
    gridItem.style.backgroundColor = `rgb(${Math.random()*256}, ${Math.random()*256}, ${Math.random()*256})`;
    console.log(gridItem.style.backgroundColor);
  } 
}

function toggleGridLines () {
  isGridLinesToggled = !isGridLinesToggled;
  btnToggleGridLines.classList.toggle('toggled');
  document.querySelectorAll('.grid-box').forEach(
    (gridItem) => {
      gridItem.classList.toggle('toggled');
    }
  )
}

function toggleRainbow () {
  isRainbowToggled = !isRainbowToggled;
  btnToggleRainbow.classList.toggle('toggled');
}

function toggleShading() {
  btnToggleShading.classList.toggle('toggled');
}

function createGrid(gridSize) {
  gridSizeText.textContent = `${gridSize} x ${gridSize}`;
  gridContainer.replaceChildren();

  // Creating grid of divs
  for (let i = 0; i < gridSize; i++) {
    let gridRow = document.createElement('div');
    gridRow.classList.add('grid-row');
    
    for (let j = 0; j < gridSize; j++) {
      let gridBox = document.createElement('div');
      if(isGridLinesToggled) {
        gridBox.classList.toggle('toggled');
      }
      gridBox.classList.add('grid-box');

      gridBox.addEventListener('mouseenter', () => colorBox(gridBox, 'black'));
      gridRow.appendChild(gridBox);
    }
    
    gridContainer.appendChild(gridRow);
}
}





