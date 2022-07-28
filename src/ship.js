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
            if (shipLength.includes(0)){
                return false
            }
            if (!shipLength.includes(0)){
                return true
            }
        }
    }
}

module.exports = ship;