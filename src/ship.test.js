const ship = require('./ship.js');
const calculateShipLength = require('./calculateShipLength.js');

test('Ship Length', () => {
    let shipTest = ship(1)
    let shipLength = shipTest.length
    expect(shipLength).toEqual(1);
});

test('Ship Length 2', () => {
    let shipTest = ship(2)
    let shipLength = shipTest.length
    expect(shipLength).toEqual(2);
});

test('Ship hit', () => {
    let shipTest = ship()
    let shipHit = shipTest.hit()
    expect(shipHit).toEqual('took a hit');
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

