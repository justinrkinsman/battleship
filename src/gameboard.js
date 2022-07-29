const ship = require('./ship.js');
//const calculateShipLength = require('./calculateShipLength.js');

function gameboard(length) {
    let currentShip = ship(length)
    const createGrid = () => {
        let grid = {
            0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
        return grid
    }
    const receiveAttack = () => {
        return 'attack'
    }
    const placeShip = () => {
        let getGrid = gameboard()
        let grid = getGrid.createGrid()
        return grid
    }
    return {
        receiveAttack, createGrid, placeShip
    }
}

module.exports = gameboard