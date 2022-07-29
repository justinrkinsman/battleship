const ship = require('./ship.js');
//const calculateShipLength = require('./calculateShipLength.js');

function gameboard(length) {
    let currentShip = ship(length)
    let shipLocation = 2
    let emptySpace = 0
    let miss = 3
    let hit = 1
    /*let findCoordinates = () => {
        const keys = Object.keys(createGrid)
        const prop = keys[Math.floor(Math.random() * keys.length)]
        const keys2 = Object.keys(createGrid[prop])
        const prop2 = keys2[Math.floor(Math.random() * keys2.length)]
        createGrid[prop][prop2] = shipLocation
    }*/
    const createGrid = {
            0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
    const receiveAttack = (row, column) => {
        let location = placeShip()
        let newGrid = createGrid
        if (newGrid[row][column] === emptySpace){
            newGrid[row][column] = miss
            return "Miss"
        }else if (newGrid[row][column] === shipLocation){
            newGrid[row][column] = hit
            return "Direct Hit"
        }
    }
    const placeShip = () => {
        let newGrid = createGrid
        const keys = Object.keys(newGrid)
        const prop = keys[Math.floor(Math.random() * keys.length)]
        const keys2 = Object.keys(newGrid[prop])
        const prop2 = keys2[Math.floor(Math.random() * keys2.length)]
        newGrid[prop][prop2] = shipLocation
        return newGrid
    }
    return {
        receiveAttack, createGrid, placeShip
    }
}

module.exports = gameboard