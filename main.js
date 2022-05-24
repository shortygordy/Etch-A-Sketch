const cellContainer = document.querySelector('#cell-container');
const button = document.querySelector('button');

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

//EVENT LISTENERS
button.addEventListener('click', mainFunc);

//MAIN FUNCTION
function mainFunc() {
    generateGrid(16);
}