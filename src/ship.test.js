const ship = require('./ship.js');
const calculateShipLength = require('./calculateShipLength.js');
const gameboard = require('./gameboard.js')
//const placeShip = require('./placeship.js')

test('Ship Length', () => {
    let shipTest = ship(1)
    let currentShipLength = shipTest.shipLength
    expect(currentShipLength).toEqual([0]);
});

test('Ship Length 2', () => {
    let shipTest = ship(2)
    let shipLength = shipTest.shipLength
    expect(shipLength).toEqual([0, 0]);
});

test('Ship hit', () => {
    let shipTest = ship(5)
    let shipHit = shipTest.hit(4)
    expect(shipHit).toEqual([0, 0, 0, 0, 1]);
});

test('Ship sunk', () => {
    let shipTest = ship(5)
    shipTest.hit(0)
    shipTest.hit(1)
    shipTest.hit(2)
    shipTest.hit(3)
    shipTest.hit(4)
    let shipIsSunk = shipTest.isSunk()
    expect(shipIsSunk).toEqual(true);
});

test('Ship still floats', () => {
    let shipTest = ship(5)
    let shipIsSunk = shipTest.isSunk()
    expect(shipIsSunk).toEqual(false)
})

test('Will return array same length as ship', () => {
    expect(calculateShipLength(5)).toEqual([0, 0, 0, 0, 0])
})

test('Create Gameboard Grid', () => {
    let newGame = gameboard()
    let createThisGrid = newGame.createGrid
    expect(createThisGrid).toEqual({"0": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "7": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "8": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "9": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})
})

test('Random ship placement', () => {
    let ship = gameboard()
    let grid = ship.createGrid
    const keys = Object.keys(grid)
    const prop = keys[Math.floor(Math.random() * keys.length)]
    const keys2 = Object.keys(grid[prop])
    const prop2 = keys2[Math.floor(Math.random() * keys2.length)]
    grid[prop][prop2] = 2
    let grid2 = grid[prop]
    expect(grid2).toEqual(expect.arrayContaining([2]))
})

test('Misfire', () => {
    let shipLocation = 2
    let emptySpace = 0
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
        let newGrid = createGrid
        if (newGrid[row][column] === emptySpace){
            return "Miss"
        }else if (newGrid[row][column] === shipLocation){
            return "Direct Hit"
        }
    }
expect(receiveAttack(0, 0)).toEqual('Miss')
})

test('Direct Hit', () => {
    let shipLocation = 2
    let emptySpace = 0
    const createGrid = {
        0: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        if (createGrid[row][column] === emptySpace){
            return "Miss"
        }else if (createGrid[row][column] === shipLocation){
            return "Direct Hit"
        }
}
expect(receiveAttack(0, 0)).toEqual('Direct Hit')
})

test('Vertical ship placement', () => {
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
    const ships = {
        carrier: 5,
        battleship: 4,
        cruiser: 3,
        submarine: 3,
        destroyer: 2
    }
    const placeShip = (shipName, row, column) => {
        let newShip = ships[shipName]
        for (let i = 0; i < newShip; i++){
            let newRow = row + i
            createGrid[newRow][column] = 2
        }
        return createGrid
    }
    expect(placeShip('battleship', 1, 1)).toEqual({"0": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "1": [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], "2": [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], "3": [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], "4": [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], "5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "7": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "8": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "9": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})
})

test('Horizontal ship placement', () => {
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
    const ships = {
        carrier: 5,
        battleship: 4,
        cruiser: 3,
        submarine: 3,
        destroyer: 2
    }
    const placeShip = (shipName, row, column) => {
        let newShip = ships[shipName]
        for (let i = 0; i < newShip; i++){
            let newColumn = column + i
            createGrid[row][newColumn] = 2
        }
        return createGrid
    }
    expect(placeShip('destroyer', 9, 8)).toEqual({"0": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "7": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "8": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "9": [0, 0, 0, 0, 0, 0, 0, 0, 2, 2]})
})

test('Change ship orientation', () => {
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
    const ships = {
        carrier: 5,
        battleship: 4,
        cruiser: 3,
        submarine: 3,
        destroyer: 2
    }
    const placeShip = (shipName, row, column, orientation = 'vertical') => {
        let newShip = ships[shipName]
        if (orientation === "horizontal") {
        for (let i = 0; i < newShip; i++){
            let newColumn = column + i
            createGrid[row][newColumn] = 2
        }
        }else{
        for (let i = 0; i < newShip; i++){
            let newRow = row + i
            createGrid[newRow][column] = 2
        }
        }
        return createGrid
    }
    expect(placeShip('destroyer', 0, 0, 'horizontal')).toEqual({"0": [2, 2, 0, 0, 0, 0, 0, 0, 0, 0], "1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "7": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "8": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "9": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})
})

/*
const keys = Object.keys(createGrid)
        const prop = keys[Math.floor(Math.random() * keys.length)]
        const keys2 = Object.keys(createGrid[prop])
        const prop2 = keys2[Math.floor(Math.random() * keys2.length)]
        createGrid[prop][prop2] = '2'
        return createGrid
*/

    /*
let gameboardTest = gameboard()
let placeShipTest = gameboardTest.placeShip()
document.addEventListener('keyup', () => {

///
//Select random space on grid
///
const keys = Object.keys(placeShipTest)
const prop = keys[Math.floor(Math.random() * keys.length)]
console.log(placeShipTest[prop]);

const keys2 = Object.keys(placeShipTest[prop])
const prop2 = keys2[Math.floor(Math.random() * keys2.length)]
placeShipTest[prop][prop2] = 'X'
console.log(placeShipTest)
    */