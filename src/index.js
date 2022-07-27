function ship(length) {
    return {
        length,
        hit() {
            return 'took a hit'
        },
        isSunk() {
            return false
        }
    }
}

let newShip = ship(5)
console.log(newShip)