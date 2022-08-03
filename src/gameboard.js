const ship = require('./ship.js');
//const calculateShipLength = require('./calculateShipLength.js');

let createGrid = {
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

function gameboard() {
    let shipLocation = 2
    let emptySpace = 0
    let miss = 3
    let hit = 1
    const placeShip = (shipName, row, column, orientation = 'vertical') => {
        let newShip = shipName.lengthArray
        if (orientation === "horizontal") {
            for (let i = 0; i < newShip.length; i++){
                let newColumn = column + i
                createGrid[row][newColumn] = 2
            }
            }else{
            for (let i = 0; i < newShip.length; i++){
                let newRow = row + i
                createGrid[newRow][column] = 2
            }
            }
        //random placement
        /*const keys = Object.keys(createGrid)
        const prop = keys[Math.floor(Math.random() * keys.length)]
        const keys2 = Object.keys(createGrid[prop])
        const prop2 = keys2[Math.floor(Math.random() * keys2.length)]
        createGrid[prop][prop2] = shipLocation*/
        return createGrid
    }
        let newGrid = createGrid
    const receiveAttack = (row, column) => {
        if (newGrid[row][column] === emptySpace){
            newGrid[row][column] = miss
            console.log(newGrid)
            let item = document.getElementById(`${row}, ${column}`)
            populateGrid(item.id, 'Miss')
            return newGrid
        }else if (newGrid[row][column] === shipLocation){
            newGrid[row][column] = hit
            console.log(newGrid)
            let item = document.getElementById(`${row}, ${column}`)
            populateGrid(item.id, 'Hit')
            return newGrid
        }
    }
    return {
        receiveAttack, createGrid, placeShip
    }
}

module.exports = gameboard