function ship(length){
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

module.exports = ship;