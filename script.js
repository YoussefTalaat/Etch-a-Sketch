const gridContainer = document.getElementById('grid-container');
const resetButton = document.getElementById('reset');
const defaultButton = document.getElementById('default');
const randomButton = document.getElementById('random');
const darkenButton = document.getElementById('darken');
const sizeSlider = document.getElementById('grid-size');
const sizeDisplay = document.getElementById('size-display');

let currentMode = 'default';
let currentSize = 16; // Default grid size

function createGrid(size) {
    gridContainer.innerHTML = ''; // Clear the grid

    const gridSize = Math.min(gridContainer.clientWidth, 600); // Maximum grid size
    const itemSize = gridSize / size; // Calculate the size of each grid item

    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        // Set the dimensions of each grid item
        gridItem.style.width = `${itemSize}px`;
        gridItem.style.height = `${itemSize}px`;

        gridItem.addEventListener('mouseover', changeColor);
        gridContainer.appendChild(gridItem);
    }
}

function changeColor(e) {
    if (currentMode === 'default') {
        e.target.style.backgroundColor = '#333';
    } else if (currentMode === 'random') {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        e.target.style.backgroundColor = "#" + randomColor;
    } else if (currentMode === 'darken') {
        let currentColor = e.target.style.backgroundColor;
        if (!currentColor || currentColor === 'rgb(255, 255, 255)') {
            currentColor = 'rgb(229, 229, 229)';
        }
        let [r, g, b] = currentColor.match(/\d+/g).map(Number);
        r = Math.max(0, r - 25);
        g = Math.max(0, g - 25);
        b = Math.max(0, b - 25);
        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
}

function resetGrid() {
    // Clear all colors
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.style.backgroundColor = 'white'; // Reset to default white color
    });
}

// Handle size slider input
sizeSlider.addEventListener('input', (e) => {
    currentSize = e.target.value;
    sizeDisplay.textContent = `${currentSize} x ${currentSize}`;
    createGrid(currentSize);
});

resetButton.addEventListener('click', resetGrid);
defaultButton.addEventListener('click', () => currentMode = 'default');
randomButton.addEventListener('click', () => currentMode = 'random');
darkenButton.addEventListener('click', () => currentMode = 'darken');

// Initial grid creation
createGrid(currentSize);
