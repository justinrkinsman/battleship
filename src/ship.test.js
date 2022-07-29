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

test('Gameboard Attack', () => {
    let attack = gameboard(5)
    let attackTest = attack.receiveAttack()
    expect(attackTest).toEqual('attack')
})

test('Create Gameboard Grid', () => {
    let newGame = gameboard()
    let newGrid = newGame.createGrid()
    expect(newGrid).toEqual({"0": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "7": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "8": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "9": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})
})