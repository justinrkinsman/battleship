const ship = require('./ship.js');
const calculateShipLength = require('./calculateShipLength.js');

function gameboard(length) {
    let currentShip = ship(length)
    const createGameboard = () => {
        console.log('hello')
    }
    const receiveAttack = () => {
        createGameboard()
        return 'attack'
    }
    return {
        receiveAttack
    }
}


module.exports = gameboard