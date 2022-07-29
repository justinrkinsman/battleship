const ship = require('./ship.js');
const calculateShipLength = require('./calculateShipLength.js');

function gameboard(length) {
    let currentShip = ship(length)
    let rows = []
    let cols = []
    const createGameboard = (row = 10, col = 10) => {
        for (let i = 0; i < row; i++){
            rows.push('x')
        }
        for (let i = 0; i < col; i++){
            cols.push('x')         
        }
        return {rows, cols}
    }
    const receiveAttack = () => {
        return 'attack'
    }
    return {
        receiveAttack, createGameboard
    }
}

/*
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++){
        let grid = document.createElement('div');
        grid.className = 'grid';
        container.appendChild(grid);
        }
        document.getElementById('container').style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    }
    const cell = document.querySelectorAll('.grid');
for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('mouseover', function onmouseover(event) {
        event.target.style.backgroundColor = 'black';
    });
}
});
*/

module.exports = gameboard