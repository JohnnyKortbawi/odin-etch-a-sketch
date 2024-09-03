const gridContainer = document.querySelector('#grid-container');
const gridSlider = document.querySelector('#grid-slider');
const gridSizeText = document.querySelector('#grid-size-text');
const btnToggleGridLines = document.querySelector('#btn-toggle-gridlines');
const btnToggleRainbow = document.querySelector('#btn-toggle-rainbow');
const btnToggleShading = document.querySelector('#btn-toggle-shading');
const btnReset = document.querySelector('#btn-reset');

let isGridLinesToggled = false;
let isRainbowToggled = false;
let isShadingToggled = false;
let defaultGridSize = 16;
let hue = 0;

createGrid(defaultGridSize);

gridSlider.addEventListener('input', () => createGrid(gridSlider.value));
btnToggleGridLines.addEventListener('click', () => toggleGridLines());
btnToggleRainbow.addEventListener('click', () => toggleRainbow());
btnToggleShading.addEventListener('click', () => toggleShading());
btnReset.addEventListener('click', () => resetGrid());

function changeHue() {
  hue = (hue + 2) % 360; // Increment the hue and loop back after 360
  return `hsl(${hue}, 100%, 50%)`; // Return the HSL color string with full saturation and 50% lightness
}

function colorBox(gridItem, color) {
  if (isRainbowToggled) {
    // gridItem.style.backgroundColor = `rgb(${Math.random()*256}, ${Math.random()*256}, ${Math.random()*256})`;
    const newColor = changeHue();
    gridItem.style.backgroundColor = newColor;
  }
  else if (isShadingToggled) {
    alert("Shading function not added yet!")
  }
  else {
    gridItem.style.backgroundColor = color;
  }
}

function toggleGridLines() {
  isGridLinesToggled = !isGridLinesToggled;
  btnToggleGridLines.classList.toggle('toggled');
  document.querySelectorAll('.grid-box').forEach(
    (gridItem) => {
      gridItem.classList.toggle('toggled');
    }
  )
}

function toggleRainbow() {
  isRainbowToggled = !isRainbowToggled;
  btnToggleRainbow.classList.toggle('toggled');

  if (btnToggleShading.classList.contains('toggled')) {
    btnToggleShading.classList.toggle('toggled');
  }
}

function toggleShading() {
  isShadingToggled = !isShadingToggled;
  btnToggleShading.classList.toggle('toggled');

  if (btnToggleRainbow.classList.contains('toggled')) {
    isRainbowToggled = !isRainbowToggled;
    btnToggleRainbow.classList.toggle('toggled');
  }
}

function resetGrid() {
  let gridBoxes = document.querySelectorAll('.grid-box');
  gridBoxes.forEach((gridItem) => {
    gridItem.style.backgroundColor = 'white';
  })
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
      if (isGridLinesToggled) {
        gridBox.classList.toggle('toggled');
      }
      gridBox.classList.add('grid-box');

      gridBox.addEventListener('mouseenter', () => colorBox(gridBox, 'black'));
      gridRow.appendChild(gridBox);
    }

    gridContainer.appendChild(gridRow);
  }
}





