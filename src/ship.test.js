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
    let shipTest = ship()
    let shipIsSunk = shipTest.isSunk()
    expect(shipIsSunk).toEqual(false);
});

test('Change ship sunk status', () => {
    let shipTest = ship()
    let shipIsSunk = shipTest.isSunk()
    shipIsSunk = true
    expect(shipIsSunk).toEqual(true)
})

test('Will return array same length as ship', () => {
    expect(calculateShipLength(5)).toEqual([0, 0, 0, 0, 0])
})

test('Says Hello', () => {
    let attack = gameboard()
    let attackTest = attack.receiveAttack()
    expect(attackTest).toEqual('attack')
})