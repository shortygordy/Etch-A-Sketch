const cellContainer = document.querySelector('#cell-container');
const button = document.querySelector('button');
const slider = document.querySelector('.slider');
const output = document.getElementById("gridSizeDisplay");


//FUNCTIONS
function generateGrid(rows) {
    //remove all cells if they exist
    while (cellContainer.firstChild) {
        cellContainer.removeChild(cellContainer.lastChild);
    }

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
}

function changeCellsOnHover() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(div => {
        div.addEventListener('mouseenter', () => {
            div.style.backgroundColor = 'black';
        });
    });
}

//initialize grid size output to 16 and generate 16x16 grid;
output.innerHTML = slider.value;
generateGrid(16);

//have cells animate one mouse hover
changeCellsOnHover();

//on every slider adjustment, output updated grid size and generate new grid
slider.oninput = function() {
    output.innerHTML = this.value;
    generateGrid(this.value);
    changeCellsOnHover();
};