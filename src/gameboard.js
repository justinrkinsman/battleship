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


module.exports = gameboard