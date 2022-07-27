const ship = require('./index.js');



test('Ship Object', () => {
    expect(ship(1)).toEqual({"length": 1});
});