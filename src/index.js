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
    const createGrid = () => {
        let grid = {
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
        return grid
    }
    const receiveAttack = () => {
        return 'attack'
    }
    return {
        receiveAttack, createGrid
    }
}

let newGame = gameboard()
let newGrid = newGame.createGrid()
console.log(newGrid[1][7])

/*let createGrid = (() => {
    let container = document.createElement('div')
    container.setAttribute('id', 'container')
    document.body.appendChild(container)
    for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++){
        let grid = document.createElement('div');
        grid.className = 'grid';
        container.appendChild(grid);
        }
        document.getElementById('container').style.gridTemplateColumns = `repeat(${10}, 1fr)`;
    }
})()*/