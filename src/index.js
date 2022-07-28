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
    let currentShip = calculateShipLength(length)
    let alsoCurrentShip = ship(length)
    let canvas = document.getElementById('canvas')
    const createGameboard = () => {
        console.log(canvas)
    }
    const receiveAttack = () => {
        return currentShip.shipLength
    }
    return {
        receiveAttack, createGameboard
    }
}

let newShip = ship(5)
console.log(newShip)
let shipSunk = newShip.isSunk()
console.log(shipSunk)

function drawGrid(row, col) {
    var even = "",
        odd = "",
        grid = "",
        black = "█",
        white = " ",
        i = 0;
    
    for (i = 0; i < col; i++) {
      even += i % 2 ? white : black;
      odd += i % 2 ? black : white;
    }
  
    for (i = 0; i < row; i++) {
      grid += i % 2 ? even : odd;
      grid += "\n";
    }
  
    console.log(grid);
  }
  
  drawGrid(8, 8);