const gridContainer = document.querySelector('#grid-container');
const gridSlider = document.querySelector('#grid-slider');
const gridSizeText = document.querySelector('#grid-size-text');
const btnToggleGridLines = document.querySelector('#btn-toggle-gridlines');

defaultGridSize = 16;
createGrid(defaultGridSize);

gridSlider.addEventListener('change', () => createGrid(gridSlider.value));

btnToggleGridLines.addEventListener('click', () => toggleGridLines());

function toggleGridLines () {

}

function colorBox(gridItem, color) {
  gridItem.style.backgroundColor = color;
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
      gridBox.classList.add('grid-box');

      gridBox.addEventListener('mouseenter', () => colorBox(gridBox, 'black'));
      gridRow.appendChild(gridBox);
    }
    
    gridContainer.appendChild(gridRow);
}
}




