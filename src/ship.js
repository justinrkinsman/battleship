const calculateShipLength = require('./calculateShipLength.js');

function ship(length){
    let shipLength = calculateShipLength(length)
    return {
        shipLength,
        hit(number) {
            return shipLength[number]
        },
        isSunk() {
            return false
        }
    }
}

module.exports = ship;