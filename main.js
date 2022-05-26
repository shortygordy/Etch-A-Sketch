//GRAB ELEMENTS
const cellContainer = document.querySelector('#cell-container');
const slider = document.querySelector('.slider');
const output = document.getElementById("gridSizeDisplay");
const colorButton = document.querySelector('#colorMode');
const eraseButton = document.querySelector('#eraser');
const clearButton = document.querySelector('#clearGrid');
const colorPicker = document.querySelector('#colorPicker');
const rainbowButn = document.querySelector('#rainbow');

//ADD EVENT LISTENERS
clearButton.addEventListener('click', reloadGrid);
eraseButton.addEventListener('click', updateButton);
colorButton.addEventListener('click', updateButton);
rainbowButn.addEventListener('click', updateButton);
colorPicker.addEventListener('input', updateColor);
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//DECLARE CONSTANTS
const DEFAULT_SIZE = 16;

//DECLARE VARIABLES
let buttonType = 'Color mode';
let currentColor = 'black';
let currentSize = DEFAULT_SIZE;
let mouseDown = false;


//FUNCTIONS
function clearGrid() {

    //remove all cells if they exist
    cellContainer.innerHTML = '';
}

function generateGrid(rows) {
    let currentRows = 0;
    let requestedRows = rows;

    //loop through requested rows and add row
    while (currentRows < requestedRows) {
        let currentCells = 0;
        const row = document.createElement('div');
        row.classList.add('row');

        //loop through each row and add cell
        while (currentCells < requestedRows) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
            currentCells++;
        }

        cellContainer.appendChild(row);
        currentRows++;
    }

    //draw
    changeCellColor();
}

function reloadGrid() {
    clearGrid();
    generateGrid(currentSize);
}

function updateColor(e) {
    currentColor = e.target.value;
}

function updateButton(e) {
    rainbowButn.classList.remove('selected');
    colorButton.classList.remove('selected');
    eraseButton.classList.remove('selected');

    buttonType = e.target.textContent;
    e.target.classList.add('selected');
}

function changeCellColor() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(div => {
        div.addEventListener('mousedown', clickVsDrag);
        div.addEventListener('mouseover', clickVsDrag);
    });
}

function clickVsDrag(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return;
    } else if (buttonType === 'Color mode') {
        e.target.style.backgroundColor = currentColor;
    } else if (buttonType === 'Eraser') {
        e.target.style.backgroundColor = 'aliceblue';
    }
}

//initialize grid size output to 16 and generate 16x16 grid;
window.onload = () => {
    generateGrid(DEFAULT_SIZE);
};

//on every slider adjustment, output updated grid size and generate new grid
slider.onmousemove = (e) => {
    output.innerHTML = `${e.target.value} x ${e.target.value}`;
};

slider.onchange = (e) => {
    currentSize = e.target.value;
    reloadGrid();
};