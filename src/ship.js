const calculateShipLength = require('./calculateShipLength.js');

function ship(name, length){
    return {
        name: name,
        lengthArray: calculateShipLength(length),
        hit(number) {
            this.lengthArray[number] = 1
            return this.lengthArray
        },
        isSunk() {
            if (this.lengthArray.includes(0)){
                return false
            }else if (!this.lengthArray.includes(0)){
                return true
            }
        }
    }
}

module.exports = ship;