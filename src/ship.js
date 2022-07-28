const calculateShipLength = require('./calculateShipLength.js');

function ship(length){
    let shipLength = calculateShipLength(length)
    return {
        shipLength,
        hit(number) {
            shipLength[number] = 1
            return shipLength
        },
        isSunk() {
            return false
        }
    }
}

module.exports = ship;