const ship = require('./ship.js');
const calculateShipLength = require('./calculateShipLength.js');

function gameboard(length) {
    let currentShip = ship(length)
    const createGameboard = (row, col) => {
        for (let i = 0; i < row; i++){

        }
        for (let i = 0; i < col; i++){
            
        }
    }
    const receiveAttack = () => {
        return 'attack'
    }
    return {
        receiveAttack, createGameboard
    }
}


module.exports = gameboard