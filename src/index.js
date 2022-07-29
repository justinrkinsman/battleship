function ship(length){
    let shipLength = calculateShipLength(length)
    return {
        shipLength,
        hit(number) {
            shipLength[number] = 1
            return shipLength 
        },
        isSunk() {
            if (shipLength.includes('0')){
                return false
            }
            if (!shipLength.includes('0')){
                return true
            }
        }
    }
}

function calculateShipLength(array) {
    let arr = []
    for (let i = 0; i < array; i++){
        arr.push(0)
    }
    return arr
}

function shipNames() {
    return {
    carrier: 5,
    battleShip: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
    }
}

function gameboard(length) {
    let currentShip = ship(length)
    let rows = []
    let cols = []
    const createGameboard = (row = 10, col = 10) => {
        for (let i = 0; i < row; i++){
            rows.push('x')
        }
        for (let i = 0; i < col; i++){
            cols.push('x')
        }
        return {rows, cols}
    }
    const receiveAttack = () => {
        return 'attack'
    }
    return {
        receiveAttack, createGameboard
    }
}

let newShip = ship(5)
console.log(newShip)
let shipSunk = newShip.isSunk()
console.log(shipSunk)

let newGame = gameboard(5)
console.log(newGame.createGameboard())

let container = document.createElement('div')
container.setAttribute('id', 'container')
document.body.appendChild(container)

( () => {for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++){
        let grid = document.createElement('div');
        grid.className = 'grid';
        container.appendChild(grid);
        }
        document.getElementById('container').style.gridTemplateColumns = `repeat(${10}, 1fr)`;
    }
})()