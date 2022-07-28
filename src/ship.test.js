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

test('Gameboard Create Grid', () => {
    let grid = gameboard(5)
    let newGrid = grid.createGameboard(10, 10)
    expect(newGrid).toEqual(100)
})
