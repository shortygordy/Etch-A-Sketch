//GRAB ELEMENTS
const cellContainer = document.querySelector('#cell-container');
const slider = document.querySelector('.slider');
const output = document.getElementById("gridSizeDisplay");
const colorPicker = document.querySelector('#colorPicker');
const colorButton = document.querySelector('#colorMode');
const rainbowButn = document.querySelector('#rainbow');
const eraseButton = document.querySelector('#eraser');
const sktchButton = document.querySelector('#sketch');
const clearButton = document.querySelector('#clearGrid');

//ADD EVENT LISTENERS
colorPicker.addEventListener('input', updateColor);
colorButton.addEventListener('click', updateButton);
rainbowButn.addEventListener('click', updateButton);
eraseButton.addEventListener('click', updateButton);
sktchButton.addEventListener('click', updateButton);
clearButton.addEventListener('click', reloadGrid);

//DECLARE CONSTANTS
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'Color mode';
const DEFAULT_COLOR = 'black';

//DECLARE VARIABLES
let buttonType = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let mouseDown = false;

//LISTEN FOR MOUSE UP/DOWN EVENTS AND SET MOUSEDOWN ACCORDINGLY
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//on every slider adjustment, output updated grid size and generate new grid
slider.onmousemove = (e) => { output.innerHTML = `${e.target.value} x ${e.target.value}`; };
slider.onchange = (e) => {
    currentSize = e.target.value;
    reloadGrid();
};

//initialize grid size output to 16 and generate 16x16 grid;
window.onload = () => { generateGrid(DEFAULT_SIZE); };

//FUNCTIONS
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
    drawCell();
}

function drawCell() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(div => {
        div.addEventListener('mousedown', changeColor);
        div.addEventListener('mouseover', changeColor);
    });
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return;
    } else if (buttonType === 'Color mode') {
        e.target.style.backgroundColor = currentColor;
        e.target.style.opacity = 1;
    } else if (buttonType === 'Rainbow mode') {
        e.target.style.backgroundColor = getRandomColor();
        e.target.style.opacity = 1;
    } else if (buttonType === 'Eraser') {
        e.target.style.backgroundColor = 'aliceblue';
        e.target.style.opacity = 1;
    } else if (buttonType === 'Sketch mode') {
        sketchMode(e);
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function sketchMode(e) {

    e.target.style.backgroundColor = currentColor;

    //if the cell has never been entered
    if (e.target.cellHasBeenEntered === undefined) {
        e.target.cellHasBeenEntered = true;
        e.target.style.opacity = 0.1;
        //if cell has been entered before, but it is not fully opaque
    } else if (e.target.style.opacity < 1) {
        e.target.style.opacity = Number(e.target.style.opacity) + 0.1;
        //if cell is ready to be fully opaque
    } else {
        e.target.style.opacity = 1;
    }
}

function reloadGrid() {
    clearGrid();
    generateGrid(currentSize);
}

function clearGrid() {

    //remove all cells if they exist
    cellContainer.innerHTML = '';
}

function updateColor(e) {
    currentColor = e.target.value;
}

function updateButton(e) {
    colorButton.classList.remove('selected');
    rainbowButn.classList.remove('selected');
    sktchButton.classList.remove('selected');
    eraseButton.classList.remove('selected');

    buttonType = e.target.textContent;
    e.target.classList.add('selected');
}