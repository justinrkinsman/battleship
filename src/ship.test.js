const ship = require('./ship.js');
const calculateShipLength = require('./calculateShipLength.js');
const gameboard = require('./gameboard.js')

test('Ship Length', () => {
    let shipTest = ship('destroyer', 2)
    let currentShipLength = shipTest.lengthArray
    expect(currentShipLength).toEqual([0, 0]);
});

test('Ship Length II', () => {
    let shipTest = ship('battleship', 4)
    let shipLength = shipTest.lengthArray
    expect(shipLength).toEqual([0, 0, 0, 0]);
});

test('Will return array same length as ship', () => {
    expect(calculateShipLength(5)).toEqual([0, 0, 0, 0, 0])
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

test('Ship hit', () => {
    let testShip = ship('carrier', 5)
    expect(testShip.hit(2)).toEqual([0, 0, 1, 0, 0])
})

test('Ship sunk', () => {
    let testShip = ship('destroyer', 2)
    testShip.hit(0)
    testShip.hit(1)
    expect(testShip.isSunk()).toEqual(true)
})

test('Ship floats', () => {
    let testShip = ship('destroyer', 2)
    expect(testShip.isSunk()).toEqual(false)
})

test('Gameboard places ships vertically', () => {
    const playerOneCarrier = ship('carrier', 5)
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
    function gameboard() {
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
            return createGrid
        }
        return {
            placeShip
        }
    }
    let testGame = gameboard()
    let testShip = testGame.placeShip(playerOneCarrier, 1, 1, 'vertical')
    expect(testShip).toEqual({
        "0": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        "1": [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], 
        "2": [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], 
        "3": [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], 
        "4": [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        "5": [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], 
        "6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        "7": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        "8": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        "9": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})
})

test('Gameboard places ships horizontally', () => {
    const playerOneBattleship = ship('battleship', 4)
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
    function gameboard() {
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
            return createGrid
        }
        return {
            placeShip
        }
    }
    let testGame = gameboard()
    let testShip = testGame.placeShip(playerOneBattleship, 1, 1, 'horizontal')
    expect(testShip).toEqual({
        "0": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        "1": [0, 2, 2, 2, 2, 0, 0, 0, 0, 0], 
        "2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        "3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        "4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        "6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        "7": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        "8": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        "9": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})
})

test('Game over function', () => {
    const playerTwoDestroyer4 = ship('playerTwoDestroyer4', 2)
    playerTwoDestroyer4.hit(0)
    playerTwoDestroyer4.hit(1)
    const playerTwoCruiser3 = ship('playerTwoCruiser3', 3)
    playerTwoCruiser3.hit(0)
    playerTwoCruiser3.hit(1)
    playerTwoCruiser3.hit(2)
    const playerTwoShips = [
        {"name": playerTwoCruiser3},
        {"name": playerTwoDestroyer4},
        'Player Two'
    ]
    const allShipsSunk = (player) => {
        if(player[0].name.isSunk() === true && player[1].name.isSunk() === true){
            return gameOver(player[2])
        }
    }
    const gameOver = (player) => {
        if (player === 'Player Two'){
            return (`Game Over. Player One Wins!`)
        }else if (player === 'Player One'){
            return ('Game Over. Player Two Wins!')
        }
    }
    expect(allShipsSunk(playerTwoShips)).toEqual('Game Over. Player One Wins!')
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