function ship(length) {
    let shipLength = calculateShipLength(length)
    return {
        shipLength,
        hit() {
            return 'took a hit'
        },
        isSunk() {
            return false
        }
    }
}

function calculateShipLength(array) {
    let arr = []
    for (let i = 0; i < array; i++){
        arr.push(i)
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

let newShip = ship(5)
console.log(newShip)
let player = shipNames()
console.log(player.carrier)