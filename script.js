const gridContainer = document.querySelector('#grid-container');
const gridSlider = document.querySelector('#grid-slider');
const gridSizeText = document.querySelector('#grid-size-text');
const btnToggleGridLines = document.querySelector('#btn-toggle-gridlines');
const btnToggleRainbow = document.querySelector('#btn-toggle-rainbow');
const btnToggleShading = document.querySelector('#btn-toggle-shading');

let isGridLinesToggled = false;
let isRainbowToggled = false;
let defaultGridSize = 16;
let hue = 0;

createGrid(defaultGridSize);

gridSlider.addEventListener('input', () => createGrid(gridSlider.value));
btnToggleGridLines.addEventListener('click', () => toggleGridLines());
btnToggleRainbow.addEventListener('click', () => toggleRainbow());
btnToggleShading.addEventListener('click', () => toggleShading());

function getRandomHueStep() {
  // Generate a small random step to change the hue, ensuring smooth transitions
  return Math.floor(Math.random() * 30) - 15; // Small change in hue (-15 to +15)
}

function changeHue() {
  hue = (hue + 2) % 360; // Increment the hue and loop back after 360
  return `hsl(${hue}, 100%, 50%)`; // Return the HSL color string with full saturation and 50% lightness
}

function colorBox(gridItem, color) {
  if (!isRainbowToggled) {
    gridItem.style.backgroundColor = color;
  }
  else {
    // gridItem.style.backgroundColor = `rgb(${Math.random()*256}, ${Math.random()*256}, ${Math.random()*256})`;
    const newColor = changeHue();
    gridItem.style.backgroundColor = newColor;
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





