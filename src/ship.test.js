const ship = require('./ship.js');
const calculateShipLength = require('./calculateShipLength.js');
const gameboard = require('./gameboard.js')

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

test('Ship placement', () => {
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
    let ship = gameboard()
    let attack = ship.receiveAttack(1, 1)
    expect(attack).toEqual('Miss')
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