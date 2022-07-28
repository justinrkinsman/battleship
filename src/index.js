function ship(length) {
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

function calculateShipLength(array) {
    let arr = []
    for (let i = 0; i < array; i++){
        arr.push(0)
    }
    return arr
}

function shipNames() {
    return {
    carrier: 5,
    battleShip: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
    }
}