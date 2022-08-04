/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*window.addEventListener('load', (event) => {
    let game = gameboard()
    game.placeShip()
    console.log(game.placeShip())
})*/

//const { ContextExclusionPlugin } = require("webpack")

const selectRandomGridCooridnates = () => {
    let row = (Math.floor(Math.random() * 10))
    let col = (Math.floor(Math.random() * 10))
    return {
        row, col
    }
}

function ship(name, length){
    return {
        name: name,
        lengthArray: calculateShipLength(length),
        hit(number, playerName) {
            this.lengthArray[number] = 1
            return this.lengthArray
        },
        isSunk() {
            if (this.lengthArray.includes(0) === true){
                return false
            }else if (this.lengthArray.includes(0) === false){
                return true
            }
        }
    }
}

function calculateShipLength(length) {
    let arr = []
    for (let i = 0; i < length; i++){
        arr.push(0)
    }
    return arr
}

let createGrid = {
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

let createGrid2 = {
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

const carrier0 = ship('carrier0', 5)
const battleship1 = ship('battleship1', 4)
const submarine2 = ship('submarine2', 3)
const cruiser3 = ship('cruiser3', 3)
const destroyer4 = ship('destroyer4', 2)

const playerOneShips = [
    {"name": carrier0},
    {"name": battleship1},
    {"name": submarine2},
    {"name": cruiser3},
    {"name": destroyer4},
    'playerOne'
]

const playerTwoCarrier0 = ship('playerTwoCarrier0', 5)
const playerTwoBattleship1 = ship('playerTwoBattleship1', 4)
const playerTwoSubmarine2 = ship('playerTwoSubmarine2', 3)
const playerTwoCruiser3 = ship('playerTwoCrusier3', 3)
const playerTwoDestroyer4 = ship('playerTwoDestroyer4', 2)

const playerTwoShips = [
    {"name": playerTwoCarrier0},
    {"name": playerTwoBattleship1},
    {"name": playerTwoSubmarine2},
    {"name": playerTwoCruiser3},
    {"name": playerTwoDestroyer4},
    'playerTwo'
]

function gameboard() {
    let shipLocation = 2
    let emptySpace = 0
    let miss = 3
    let hit = 1
    const placeShip = (shipName, row, column, gridSelection, player, orientation = 'vertical') => {
        let newShip = shipName.lengthArray
        if (orientation === "horizontal") {
            for (let i = 0; i < newShip.length; i++){
                let newColumn = column + i
                gridSelection[row][newColumn] = 2
                shipLocator(`${player}${row}, ${newColumn}`, shipName, i)
            }
        }else{
            for (let i = 0; i < newShip.length; i++){
                let newRow = row + i
                gridSelection[newRow][column] = 2
                shipLocator(`${player}${newRow}, ${column}`, shipName, i)
            }
        }
        return createGrid
    }
        //let newGrid = createGrid
    const receiveAttack = (row, column, gridSelection, player) => {
        if (gridSelection[row][column] === emptySpace){
            gridSelection[row][column] = miss
            let item = document.getElementById(`${player[5]}${row}, ${column}`)
            populateGrid(item.id, 'Miss')
            return gridSelection
        }else if (gridSelection[row][column] === shipLocation){
            gridSelection[row][column] = hit
            let item = document.getElementById(`${player[5]}${row}, ${column}`)
            let shipName = item.getAttribute('data-shipname')
            let shipArray = getShipArray(shipName, player) //update player
            let shipIndex = item.getAttribute('data-index')
            shipArray.hit(shipIndex, player)  ///updates player
            populateGrid(item.id, 'Hit')
            return gridSelection
        }
    }
    const allShipsSunk = (player) => {
        if(player[0].name.isSunk() === true && player[1].name.isSunk() === true && 
        player[2].name.isSunk() === true && player[3].name.isSunk() === true && 
        player[4].name.isSunk() === true){
            gameOver(player[5])
        }
    }
    return {
        receiveAttack, placeShip, allShipsSunk
    }
}

const gameOver = (playerName) => {
    if (playerName === 'playerTwo'){
        alert (`Game Over. Player One Wins!`)
    }else if (playerName === 'playerOne'){
        alert ('Game Over. Player Two Wins!')
    }
}

const getShipArray = (shipName, player) => {
    let index = shipName.slice(-1)
    return player[index].name
}

const shipLocator = (coordinates, shipName, index) => {
    let cell = document.getElementById(coordinates)
    cell.setAttribute('data-shipName', shipName.name)
    cell.setAttribute('data-index', index)
}

let createNewGrid = (() => {
    let container = document.createElement('div')
    container.setAttribute('id', 'container')
    document.body.appendChild(container)
    for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++){
        let grid = document.createElement('div');
        grid.className = `grid`;
        grid.setAttribute('id', `playerOne${i}, ${j}`)
        grid.classList.add('playerOne')
        container.appendChild(grid);
        }
        document.getElementById('container').style.gridTemplateColumns = `repeat(${10}, 1fr)`;
    }
})()

let createNewGrid2 = (() => {
    let container2 = document.createElement('div')
    container2.setAttribute('id', 'container2')
    document.body.appendChild(container2)
    for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++){
        let grid = document.createElement('div');
        grid.className = `grid`
        grid.setAttribute('id', `playerTwo${i}, ${j}`)
        grid.classList.add('playerTwo')
        container2.appendChild(grid);
        }
        document.getElementById('container2').style.gridTemplateColumns = `repeat(${10}, 1fr)`;
    }
})()

const populateGrid = (coordinates, result) => {
    let item = document.getElementById(coordinates)
    item.innerText = 'X'
    if (result == 'Hit'){
        item.style.backgroundColor = 'red'
    } else {
        item.style.backgroundColor = 'blue'
    }
}

const game = gameboard()

game.placeShip(destroyer4, 0, 0, createGrid, 'playerOne')
game.placeShip(battleship1, 2, 2, createGrid, 'playerOne')
game.placeShip(carrier0, 1, 3, createGrid, 'playerOne')
game.placeShip(submarine2, 7, 6, createGrid, 'playerOne', 'horizontal')
game.placeShip(cruiser3, 9, 0, createGrid, 'playerOne', 'horizontal')

const carrierCoordinates = selectRandomGridCooridnates()
const battleshipCoordinates = selectRandomGridCooridnates()
const submarineCoordinates = selectRandomGridCooridnates()
const cruiserCoordinates = selectRandomGridCooridnates()
const destroyerCoordinates = selectRandomGridCooridnates()

game.placeShip(playerTwoCarrier0, carrierCoordinates.row, carrierCoordinates.col, createGrid2, 'playerTwo')
game.placeShip(playerTwoBattleship1, battleshipCoordinates.row, battleshipCoordinates.col, createGrid2, 'playerTwo')
game.placeShip(playerTwoSubmarine2, submarineCoordinates.row, submarineCoordinates.col, createGrid2, 'playerTwo')
game.placeShip(playerTwoCruiser3, cruiserCoordinates.row, cruiserCoordinates.col, createGrid2, 'playerTwo')
game.placeShip(playerTwoDestroyer4, destroyerCoordinates.row, destroyerCoordinates.col, createGrid2, 'playerTwo')

const playerTurn = (() => document.addEventListener('click', function(e){
    if(e.target && e.target.classList.contains('playerTwo')){
        let coordinates = e.target.id
        let coordinatesRow = coordinates.slice(-4, -3)
        let coordinatesCol = coordinates.slice(-1)
        if ((createGrid2[coordinatesRow][coordinatesCol]) === 1 || (createGrid2[coordinatesRow][coordinatesCol]) === 3){
            return
        }else{
            game.receiveAttack(coordinatesRow, coordinatesCol, createGrid2, playerTwoShips)
            game.allShipsSunk(playerTwoShips)
            computerPlay()
        }
}
}))()

const computerPlay = () => {
    let coordinates = selectRandomGridCooridnates()
    let gridCoordinates = createGrid[coordinates.row][coordinates.col]
    if (gridCoordinates === 3 || gridCoordinates === 1){
        computerPlay()
    }else{
        game.receiveAttack(coordinates.row, coordinates.col, createGrid, playerOneShips)
        game.allShipsSunk(playerOneShips)
    } 
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bnRlbnQiOlsiLyp3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudCkgPT4ge1xuICAgIGxldCBnYW1lID0gZ2FtZWJvYXJkKClcbiAgICBnYW1lLnBsYWNlU2hpcCgpXG4gICAgY29uc29sZS5sb2coZ2FtZS5wbGFjZVNoaXAoKSlcbn0pKi9cblxuLy9jb25zdCB7IENvbnRleHRFeGNsdXNpb25QbHVnaW4gfSA9IHJlcXVpcmUoXCJ3ZWJwYWNrXCIpXG5cbmNvbnN0IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcyA9ICgpID0+IHtcbiAgICBsZXQgcm93ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcbiAgICBsZXQgY29sID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcbiAgICByZXR1cm4ge1xuICAgICAgICByb3csIGNvbFxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2hpcChuYW1lLCBsZW5ndGgpe1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGxlbmd0aEFycmF5OiBjYWxjdWxhdGVTaGlwTGVuZ3RoKGxlbmd0aCksXG4gICAgICAgIGhpdChudW1iZXIsIHBsYXllck5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoQXJyYXlbbnVtYmVyXSA9IDFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlbmd0aEFycmF5XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuaygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aEFycmF5LmluY2x1ZGVzKDApID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1lbHNlIGlmICh0aGlzLmxlbmd0aEFycmF5LmluY2x1ZGVzKDApID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpIHtcbiAgICBsZXQgYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKXtcbiAgICAgICAgYXJyLnB1c2goMClcbiAgICB9XG4gICAgcmV0dXJuIGFyclxufVxuXG5sZXQgY3JlYXRlR3JpZCA9IHtcbiAgICAwOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA2OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA5OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG59XG5cbmxldCBjcmVhdGVHcmlkMiA9IHtcbiAgICAwOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA2OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA5OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG59XG5cbmNvbnN0IGNhcnJpZXIwID0gc2hpcCgnY2FycmllcjAnLCA1KVxuY29uc3QgYmF0dGxlc2hpcDEgPSBzaGlwKCdiYXR0bGVzaGlwMScsIDQpXG5jb25zdCBzdWJtYXJpbmUyID0gc2hpcCgnc3VibWFyaW5lMicsIDMpXG5jb25zdCBjcnVpc2VyMyA9IHNoaXAoJ2NydWlzZXIzJywgMylcbmNvbnN0IGRlc3Ryb3llcjQgPSBzaGlwKCdkZXN0cm95ZXI0JywgMilcblxuY29uc3QgcGxheWVyT25lU2hpcHMgPSBbXG4gICAge1wibmFtZVwiOiBjYXJyaWVyMH0sXG4gICAge1wibmFtZVwiOiBiYXR0bGVzaGlwMX0sXG4gICAge1wibmFtZVwiOiBzdWJtYXJpbmUyfSxcbiAgICB7XCJuYW1lXCI6IGNydWlzZXIzfSxcbiAgICB7XCJuYW1lXCI6IGRlc3Ryb3llcjR9LFxuICAgICdwbGF5ZXJPbmUnXG5dXG5cbmNvbnN0IHBsYXllclR3b0NhcnJpZXIwID0gc2hpcCgncGxheWVyVHdvQ2FycmllcjAnLCA1KVxuY29uc3QgcGxheWVyVHdvQmF0dGxlc2hpcDEgPSBzaGlwKCdwbGF5ZXJUd29CYXR0bGVzaGlwMScsIDQpXG5jb25zdCBwbGF5ZXJUd29TdWJtYXJpbmUyID0gc2hpcCgncGxheWVyVHdvU3VibWFyaW5lMicsIDMpXG5jb25zdCBwbGF5ZXJUd29DcnVpc2VyMyA9IHNoaXAoJ3BsYXllclR3b0NydXNpZXIzJywgMylcbmNvbnN0IHBsYXllclR3b0Rlc3Ryb3llcjQgPSBzaGlwKCdwbGF5ZXJUd29EZXN0cm95ZXI0JywgMilcblxuY29uc3QgcGxheWVyVHdvU2hpcHMgPSBbXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29DYXJyaWVyMH0sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29CYXR0bGVzaGlwMX0sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29TdWJtYXJpbmUyfSxcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b0NydWlzZXIzfSxcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b0Rlc3Ryb3llcjR9LFxuICAgICdwbGF5ZXJUd28nXG5dXG5cbmZ1bmN0aW9uIGdhbWVib2FyZCgpIHtcbiAgICBsZXQgc2hpcExvY2F0aW9uID0gMlxuICAgIGxldCBlbXB0eVNwYWNlID0gMFxuICAgIGxldCBtaXNzID0gM1xuICAgIGxldCBoaXQgPSAxXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBOYW1lLCByb3csIGNvbHVtbiwgZ3JpZFNlbGVjdGlvbiwgcGxheWVyLCBvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCcpID0+IHtcbiAgICAgICAgbGV0IG5ld1NoaXAgPSBzaGlwTmFtZS5sZW5ndGhBcnJheVxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoaXAubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBuZXdDb2x1bW4gPSBjb2x1bW4gKyBpXG4gICAgICAgICAgICAgICAgZ3JpZFNlbGVjdGlvbltyb3ddW25ld0NvbHVtbl0gPSAyXG4gICAgICAgICAgICAgICAgc2hpcExvY2F0b3IoYCR7cGxheWVyfSR7cm93fSwgJHtuZXdDb2x1bW59YCwgc2hpcE5hbWUsIGkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Um93ID0gcm93ICsgaVxuICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgIHNoaXBMb2NhdG9yKGAke3BsYXllcn0ke25ld1Jvd30sICR7Y29sdW1ufWAsIHNoaXBOYW1lLCBpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGVHcmlkXG4gICAgfVxuICAgICAgICAvL2xldCBuZXdHcmlkID0gY3JlYXRlR3JpZFxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4sIGdyaWRTZWxlY3Rpb24sIHBsYXllcikgPT4ge1xuICAgICAgICBpZiAoZ3JpZFNlbGVjdGlvbltyb3ddW2NvbHVtbl0gPT09IGVtcHR5U3BhY2Upe1xuICAgICAgICAgICAgZ3JpZFNlbGVjdGlvbltyb3ddW2NvbHVtbl0gPSBtaXNzXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3BsYXllcls1XX0ke3Jvd30sICR7Y29sdW1ufWApXG4gICAgICAgICAgICBwb3B1bGF0ZUdyaWQoaXRlbS5pZCwgJ01pc3MnKVxuICAgICAgICAgICAgcmV0dXJuIGdyaWRTZWxlY3Rpb25cbiAgICAgICAgfWVsc2UgaWYgKGdyaWRTZWxlY3Rpb25bcm93XVtjb2x1bW5dID09PSBzaGlwTG9jYXRpb24pe1xuICAgICAgICAgICAgZ3JpZFNlbGVjdGlvbltyb3ddW2NvbHVtbl0gPSBoaXRcbiAgICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyWzVdfSR7cm93fSwgJHtjb2x1bW59YClcbiAgICAgICAgICAgIGxldCBzaGlwTmFtZSA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXNoaXBuYW1lJylcbiAgICAgICAgICAgIGxldCBzaGlwQXJyYXkgPSBnZXRTaGlwQXJyYXkoc2hpcE5hbWUsIHBsYXllcikgLy91cGRhdGUgcGxheWVyXG4gICAgICAgICAgICBsZXQgc2hpcEluZGV4ID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKVxuICAgICAgICAgICAgc2hpcEFycmF5LmhpdChzaGlwSW5kZXgsIHBsYXllcikgIC8vL3VwZGF0ZXMgcGxheWVyXG4gICAgICAgICAgICBwb3B1bGF0ZUdyaWQoaXRlbS5pZCwgJ0hpdCcpXG4gICAgICAgICAgICByZXR1cm4gZ3JpZFNlbGVjdGlvblxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9IChwbGF5ZXIpID0+IHtcbiAgICAgICAgaWYocGxheWVyWzBdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyWzFdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgXG4gICAgICAgIHBsYXllclsyXS5uYW1lLmlzU3VuaygpID09PSB0cnVlICYmIHBsYXllclszXS5uYW1lLmlzU3VuaygpID09PSB0cnVlICYmIFxuICAgICAgICBwbGF5ZXJbNF0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICBnYW1lT3ZlcihwbGF5ZXJbNV0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjZWl2ZUF0dGFjaywgcGxhY2VTaGlwLCBhbGxTaGlwc1N1bmtcbiAgICB9XG59XG5cbmNvbnN0IGdhbWVPdmVyID0gKHBsYXllck5hbWUpID0+IHtcbiAgICBpZiAocGxheWVyTmFtZSA9PT0gJ3BsYXllclR3bycpe1xuICAgICAgICBhbGVydCAoYEdhbWUgT3Zlci4gUGxheWVyIE9uZSBXaW5zIWApXG4gICAgfWVsc2UgaWYgKHBsYXllck5hbWUgPT09ICdwbGF5ZXJPbmUnKXtcbiAgICAgICAgYWxlcnQgKCdHYW1lIE92ZXIuIFBsYXllciBUd28gV2lucyEnKVxuICAgIH1cbn1cblxuY29uc3QgZ2V0U2hpcEFycmF5ID0gKHNoaXBOYW1lLCBwbGF5ZXIpID0+IHtcbiAgICBsZXQgaW5kZXggPSBzaGlwTmFtZS5zbGljZSgtMSlcbiAgICByZXR1cm4gcGxheWVyW2luZGV4XS5uYW1lXG59XG5cbmNvbnN0IHNoaXBMb2NhdG9yID0gKGNvb3JkaW5hdGVzLCBzaGlwTmFtZSwgaW5kZXgpID0+IHtcbiAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvb3JkaW5hdGVzKVxuICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLXNoaXBOYW1lJywgc2hpcE5hbWUubmFtZSlcbiAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KVxufVxuXG5sZXQgY3JlYXRlTmV3R3JpZCA9ICgoKSA9PiB7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29udGFpbmVyJylcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspe1xuICAgICAgICBsZXQgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmlkLmNsYXNzTmFtZSA9IGBncmlkYDtcbiAgICAgICAgZ3JpZC5zZXRBdHRyaWJ1dGUoJ2lkJywgYHBsYXllck9uZSR7aX0sICR7an1gKVxuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ3BsYXllck9uZScpXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHsxMH0sIDFmcilgO1xuICAgIH1cbn0pKClcblxubGV0IGNyZWF0ZU5ld0dyaWQyID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGFpbmVyMi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcjInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyMilcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspe1xuICAgICAgICBsZXQgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmlkLmNsYXNzTmFtZSA9IGBncmlkYFxuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgcGxheWVyVHdvJHtpfSwgJHtqfWApXG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgncGxheWVyVHdvJylcbiAgICAgICAgY29udGFpbmVyMi5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyMicpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7MTB9LCAxZnIpYDtcbiAgICB9XG59KSgpXG5cbmNvbnN0IHBvcHVsYXRlR3JpZCA9IChjb29yZGluYXRlcywgcmVzdWx0KSA9PiB7XG4gICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb29yZGluYXRlcylcbiAgICBpdGVtLmlubmVyVGV4dCA9ICdYJ1xuICAgIGlmIChyZXN1bHQgPT0gJ0hpdCcpe1xuICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSdcbiAgICB9XG59XG5cbmNvbnN0IGdhbWUgPSBnYW1lYm9hcmQoKVxuXG5nYW1lLnBsYWNlU2hpcChkZXN0cm95ZXI0LCAwLCAwLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJylcbmdhbWUucGxhY2VTaGlwKGJhdHRsZXNoaXAxLCAyLCAyLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJylcbmdhbWUucGxhY2VTaGlwKGNhcnJpZXIwLCAxLCAzLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJylcbmdhbWUucGxhY2VTaGlwKHN1Ym1hcmluZTIsIDcsIDYsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnLCAnaG9yaXpvbnRhbCcpXG5nYW1lLnBsYWNlU2hpcChjcnVpc2VyMywgOSwgMCwgY3JlYXRlR3JpZCwgJ3BsYXllck9uZScsICdob3Jpem9udGFsJylcblxuY29uc3QgY2FycmllckNvb3JkaW5hdGVzID0gc2VsZWN0UmFuZG9tR3JpZENvb3JpZG5hdGVzKClcbmNvbnN0IGJhdHRsZXNoaXBDb29yZGluYXRlcyA9IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcygpXG5jb25zdCBzdWJtYXJpbmVDb29yZGluYXRlcyA9IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcygpXG5jb25zdCBjcnVpc2VyQ29vcmRpbmF0ZXMgPSBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMoKVxuY29uc3QgZGVzdHJveWVyQ29vcmRpbmF0ZXMgPSBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMoKVxuXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29DYXJyaWVyMCwgY2FycmllckNvb3JkaW5hdGVzLnJvdywgY2FycmllckNvb3JkaW5hdGVzLmNvbCwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvQmF0dGxlc2hpcDEsIGJhdHRsZXNoaXBDb29yZGluYXRlcy5yb3csIGJhdHRsZXNoaXBDb29yZGluYXRlcy5jb2wsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b1N1Ym1hcmluZTIsIHN1Ym1hcmluZUNvb3JkaW5hdGVzLnJvdywgc3VibWFyaW5lQ29vcmRpbmF0ZXMuY29sLCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29DcnVpc2VyMywgY3J1aXNlckNvb3JkaW5hdGVzLnJvdywgY3J1aXNlckNvb3JkaW5hdGVzLmNvbCwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvRGVzdHJveWVyNCwgZGVzdHJveWVyQ29vcmRpbmF0ZXMucm93LCBkZXN0cm95ZXJDb29yZGluYXRlcy5jb2wsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcblxuY29uc3QgcGxheWVyVHVybiA9ICgoKSA9PiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxheWVyVHdvJykpe1xuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSBlLnRhcmdldC5pZFxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNSb3cgPSBjb29yZGluYXRlcy5zbGljZSgtNCwgLTMpXG4gICAgICAgIGxldCBjb29yZGluYXRlc0NvbCA9IGNvb3JkaW5hdGVzLnNsaWNlKC0xKVxuICAgICAgICBpZiAoKGNyZWF0ZUdyaWQyW2Nvb3JkaW5hdGVzUm93XVtjb29yZGluYXRlc0NvbF0pID09PSAxIHx8IChjcmVhdGVHcmlkMltjb29yZGluYXRlc1Jvd11bY29vcmRpbmF0ZXNDb2xdKSA9PT0gMyl7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBnYW1lLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXNSb3csIGNvb3JkaW5hdGVzQ29sLCBjcmVhdGVHcmlkMiwgcGxheWVyVHdvU2hpcHMpXG4gICAgICAgICAgICBnYW1lLmFsbFNoaXBzU3VuayhwbGF5ZXJUd29TaGlwcylcbiAgICAgICAgICAgIGNvbXB1dGVyUGxheSgpXG4gICAgICAgIH1cbn1cbn0pKSgpXG5cbmNvbnN0IGNvbXB1dGVyUGxheSA9ICgpID0+IHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMoKVxuICAgIGxldCBncmlkQ29vcmRpbmF0ZXMgPSBjcmVhdGVHcmlkW2Nvb3JkaW5hdGVzLnJvd11bY29vcmRpbmF0ZXMuY29sXVxuICAgIGlmIChncmlkQ29vcmRpbmF0ZXMgPT09IDMgfHwgZ3JpZENvb3JkaW5hdGVzID09PSAxKXtcbiAgICAgICAgY29tcHV0ZXJQbGF5KClcbiAgICB9ZWxzZXtcbiAgICAgICAgZ2FtZS5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzLnJvdywgY29vcmRpbmF0ZXMuY29sLCBjcmVhdGVHcmlkLCBwbGF5ZXJPbmVTaGlwcylcbiAgICAgICAgZ2FtZS5hbGxTaGlwc1N1bmsocGxheWVyT25lU2hpcHMpXG4gICAgfSBcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=