/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*window.addEventListener('load', (event) => {
})*/

//const { container } = require("webpack")

//const { ContextExclusionPlugin } = require("webpack")

const selectRandomGridCooridnates = () => {
    let row = (Math.floor(Math.random() * 10))
    let col = (Math.floor(Math.random() * 10))
    return {
        row, col
    }
}

const randomCooridnates = selectRandomGridCooridnates()

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
                if ((10 - column) < newShip.length){
                    let newColumn = column - i
                    if (gridSelection[row][newColumn] === 2){
                        console.log('problems')
                    }
                    gridSelection[row][newColumn] = 2
                    shipLocator(`${player}${row}, ${newColumn}`, shipName, i)
                }else{
                    let newColumn = column + i
                    gridSelection[row][newColumn] = 2
                    shipLocator(`${player}${row}, ${newColumn}`, shipName, i)
                }
            }
        }else{
            for (let i = 0; i < newShip.length; i++){
                if ((10 - row) < newShip.length){
                    let newRow = row - i
                    if (gridSelection[newRow][column] === 2){
                        reselectCoordinates(player, shipName, gridSelection)
                        return
                    }
                    gridSelection[newRow][column] = 2
                    shipLocator(`${player}${newRow}, ${column}`, shipName, i)
                }else{
                    let newRow = row + i
                    if (gridSelection[newRow][column] === 2){
                        reselectCoordinates(player, shipName, gridSelection)
                        return
                    }
                    gridSelection[newRow][column] = 2
                    shipLocator(`${player}${newRow}, ${column}`, shipName, i)
                }
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

const reselectCoordinates = (player, ship, grid) => {
    if (player === "playerOne"){
        prompt('Please Enter New Coordinates')
    }else if (player === 'playerTwo'){
        game.placeShip(ship, randomCooridnates.row, randomCooridnates.col, grid, player)
        return
    }
    return
}

const gameOver = (playerName) => {
    if (playerName === 'playerTwo'){
        alert (`Game Over. Player One Wins!`)
        location.reload()
    }else if (playerName === 'playerOne'){
        alert ('Game Over. Player Two Wins!')
        location.reload()
    }
}

const getShipArray = (shipName, player) => {
    let index = shipName.slice(-1)
    //console.log(createGrid2)
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
    shipName = item.getAttribute('data-shipname')
    item.innerText = 'X'
    if (result == 'Hit'){
        item.style.backgroundColor = 'red'
    } else {
        item.style.backgroundColor = 'blue'
    }
}

const game = gameboard()

//const playerOneCoordinatesRow = prompt('Aircraft Carrier coordinates? (Row)')
//const playerOneCoordinatesCol = prompt('Aircraft Carrier coordinates? (Column)')

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50KSA9PiB7XG59KSovXG5cbi8vY29uc3QgeyBjb250YWluZXIgfSA9IHJlcXVpcmUoXCJ3ZWJwYWNrXCIpXG5cbi8vY29uc3QgeyBDb250ZXh0RXhjbHVzaW9uUGx1Z2luIH0gPSByZXF1aXJlKFwid2VicGFja1wiKVxuXG5jb25zdCBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMgPSAoKSA9PiB7XG4gICAgbGV0IHJvdyA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkpXG4gICAgbGV0IGNvbCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcm93LCBjb2xcbiAgICB9XG59XG5cbmNvbnN0IHJhbmRvbUNvb3JpZG5hdGVzID0gc2VsZWN0UmFuZG9tR3JpZENvb3JpZG5hdGVzKClcblxuZnVuY3Rpb24gc2hpcChuYW1lLCBsZW5ndGgpe1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGxlbmd0aEFycmF5OiBjYWxjdWxhdGVTaGlwTGVuZ3RoKGxlbmd0aCksXG4gICAgICAgIGhpdChudW1iZXIsIHBsYXllck5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoQXJyYXlbbnVtYmVyXSA9IDFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlbmd0aEFycmF5XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuaygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aEFycmF5LmluY2x1ZGVzKDApID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1lbHNlIGlmICh0aGlzLmxlbmd0aEFycmF5LmluY2x1ZGVzKDApID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpIHtcbiAgICBsZXQgYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKXtcbiAgICAgICAgYXJyLnB1c2goMClcbiAgICB9XG4gICAgcmV0dXJuIGFyclxufVxuXG5sZXQgY3JlYXRlR3JpZCA9IHtcbiAgICAwOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA2OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA5OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG59XG5cbmxldCBjcmVhdGVHcmlkMiA9IHtcbiAgICAwOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA2OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA5OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG59XG5cbmNvbnN0IGNhcnJpZXIwID0gc2hpcCgnY2FycmllcjAnLCA1KVxuY29uc3QgYmF0dGxlc2hpcDEgPSBzaGlwKCdiYXR0bGVzaGlwMScsIDQpXG5jb25zdCBzdWJtYXJpbmUyID0gc2hpcCgnc3VibWFyaW5lMicsIDMpXG5jb25zdCBjcnVpc2VyMyA9IHNoaXAoJ2NydWlzZXIzJywgMylcbmNvbnN0IGRlc3Ryb3llcjQgPSBzaGlwKCdkZXN0cm95ZXI0JywgMilcblxuY29uc3QgcGxheWVyT25lU2hpcHMgPSBbXG4gICAge1wibmFtZVwiOiBjYXJyaWVyMH0sXG4gICAge1wibmFtZVwiOiBiYXR0bGVzaGlwMX0sXG4gICAge1wibmFtZVwiOiBzdWJtYXJpbmUyfSxcbiAgICB7XCJuYW1lXCI6IGNydWlzZXIzfSxcbiAgICB7XCJuYW1lXCI6IGRlc3Ryb3llcjR9LFxuICAgICdwbGF5ZXJPbmUnXG5dXG5cbmNvbnN0IHBsYXllclR3b0NhcnJpZXIwID0gc2hpcCgncGxheWVyVHdvQ2FycmllcjAnLCA1KVxuY29uc3QgcGxheWVyVHdvQmF0dGxlc2hpcDEgPSBzaGlwKCdwbGF5ZXJUd29CYXR0bGVzaGlwMScsIDQpXG5jb25zdCBwbGF5ZXJUd29TdWJtYXJpbmUyID0gc2hpcCgncGxheWVyVHdvU3VibWFyaW5lMicsIDMpXG5jb25zdCBwbGF5ZXJUd29DcnVpc2VyMyA9IHNoaXAoJ3BsYXllclR3b0NydXNpZXIzJywgMylcbmNvbnN0IHBsYXllclR3b0Rlc3Ryb3llcjQgPSBzaGlwKCdwbGF5ZXJUd29EZXN0cm95ZXI0JywgMilcblxuY29uc3QgcGxheWVyVHdvU2hpcHMgPSBbXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29DYXJyaWVyMH0sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29CYXR0bGVzaGlwMX0sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29TdWJtYXJpbmUyfSxcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b0NydWlzZXIzfSxcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b0Rlc3Ryb3llcjR9LFxuICAgICdwbGF5ZXJUd28nXG5dXG5cbmZ1bmN0aW9uIGdhbWVib2FyZCgpIHtcbiAgICBsZXQgc2hpcExvY2F0aW9uID0gMlxuICAgIGxldCBlbXB0eVNwYWNlID0gMFxuICAgIGxldCBtaXNzID0gM1xuICAgIGxldCBoaXQgPSAxXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBOYW1lLCByb3csIGNvbHVtbiwgZ3JpZFNlbGVjdGlvbiwgcGxheWVyLCBvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCcpID0+IHtcbiAgICAgICAgbGV0IG5ld1NoaXAgPSBzaGlwTmFtZS5sZW5ndGhBcnJheVxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoaXAubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGlmICgoMTAgLSBjb2x1bW4pIDwgbmV3U2hpcC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q29sdW1uID0gY29sdW1uIC0gaVxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZFNlbGVjdGlvbltyb3ddW25ld0NvbHVtbl0gPT09IDIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2JsZW1zJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bbmV3Q29sdW1uXSA9IDJcbiAgICAgICAgICAgICAgICAgICAgc2hpcExvY2F0b3IoYCR7cGxheWVyfSR7cm93fSwgJHtuZXdDb2x1bW59YCwgc2hpcE5hbWUsIGkpXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdDb2x1bW4gPSBjb2x1bW4gKyBpXG4gICAgICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bcm93XVtuZXdDb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtyb3d9LCAke25ld0NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZiAoKDEwIC0gcm93KSA8IG5ld1NoaXAubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHJvdyAtIGlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID09PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2VsZWN0Q29vcmRpbmF0ZXMocGxheWVyLCBzaGlwTmFtZSwgZ3JpZFNlbGVjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtuZXdSb3d9LCAke2NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHJvdyArIGlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID09PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2VsZWN0Q29vcmRpbmF0ZXMocGxheWVyLCBzaGlwTmFtZSwgZ3JpZFNlbGVjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtuZXdSb3d9LCAke2NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUdyaWRcbiAgICB9XG4gICAgICAgIC8vbGV0IG5ld0dyaWQgPSBjcmVhdGVHcmlkXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbiwgZ3JpZFNlbGVjdGlvbiwgcGxheWVyKSA9PiB7XG4gICAgICAgIGlmIChncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9PT0gZW1wdHlTcGFjZSl7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IG1pc3NcbiAgICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyWzVdfSR7cm93fSwgJHtjb2x1bW59YClcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnTWlzcycpXG4gICAgICAgICAgICByZXR1cm4gZ3JpZFNlbGVjdGlvblxuICAgICAgICB9ZWxzZSBpZiAoZ3JpZFNlbGVjdGlvbltyb3ddW2NvbHVtbl0gPT09IHNoaXBMb2NhdGlvbil7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IGhpdFxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwbGF5ZXJbNV19JHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgbGV0IHNoaXBOYW1lID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcG5hbWUnKVxuICAgICAgICAgICAgbGV0IHNoaXBBcnJheSA9IGdldFNoaXBBcnJheShzaGlwTmFtZSwgcGxheWVyKSAvL3VwZGF0ZSBwbGF5ZXJcbiAgICAgICAgICAgIGxldCBzaGlwSW5kZXggPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpXG4gICAgICAgICAgICBzaGlwQXJyYXkuaGl0KHNoaXBJbmRleCwgcGxheWVyKSAgLy8vdXBkYXRlcyBwbGF5ZXJcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnSGl0JylcbiAgICAgICAgICAgIHJldHVybiBncmlkU2VsZWN0aW9uXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gKHBsYXllcikgPT4ge1xuICAgICAgICBpZihwbGF5ZXJbMF0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBwbGF5ZXJbMV0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBcbiAgICAgICAgcGxheWVyWzJdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyWzNdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgXG4gICAgICAgIHBsYXllcls0XS5uYW1lLmlzU3VuaygpID09PSB0cnVlKXtcbiAgICAgICAgICAgIGdhbWVPdmVyKHBsYXllcls1XSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNlaXZlQXR0YWNrLCBwbGFjZVNoaXAsIGFsbFNoaXBzU3Vua1xuICAgIH1cbn1cblxuY29uc3QgcmVzZWxlY3RDb29yZGluYXRlcyA9IChwbGF5ZXIsIHNoaXAsIGdyaWQpID0+IHtcbiAgICBpZiAocGxheWVyID09PSBcInBsYXllck9uZVwiKXtcbiAgICAgICAgcHJvbXB0KCdQbGVhc2UgRW50ZXIgTmV3IENvb3JkaW5hdGVzJylcbiAgICB9ZWxzZSBpZiAocGxheWVyID09PSAncGxheWVyVHdvJyl7XG4gICAgICAgIGdhbWUucGxhY2VTaGlwKHNoaXAsIHJhbmRvbUNvb3JpZG5hdGVzLnJvdywgcmFuZG9tQ29vcmlkbmF0ZXMuY29sLCBncmlkLCBwbGF5ZXIpXG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICByZXR1cm5cbn1cblxuY29uc3QgZ2FtZU92ZXIgPSAocGxheWVyTmFtZSkgPT4ge1xuICAgIGlmIChwbGF5ZXJOYW1lID09PSAncGxheWVyVHdvJyl7XG4gICAgICAgIGFsZXJ0IChgR2FtZSBPdmVyLiBQbGF5ZXIgT25lIFdpbnMhYClcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICB9ZWxzZSBpZiAocGxheWVyTmFtZSA9PT0gJ3BsYXllck9uZScpe1xuICAgICAgICBhbGVydCAoJ0dhbWUgT3Zlci4gUGxheWVyIFR3byBXaW5zIScpXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfVxufVxuXG5jb25zdCBnZXRTaGlwQXJyYXkgPSAoc2hpcE5hbWUsIHBsYXllcikgPT4ge1xuICAgIGxldCBpbmRleCA9IHNoaXBOYW1lLnNsaWNlKC0xKVxuICAgIC8vY29uc29sZS5sb2coY3JlYXRlR3JpZDIpXG4gICAgcmV0dXJuIHBsYXllcltpbmRleF0ubmFtZVxufVxuXG5jb25zdCBzaGlwTG9jYXRvciA9IChjb29yZGluYXRlcywgc2hpcE5hbWUsIGluZGV4KSA9PiB7XG4gICAgbGV0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb29yZGluYXRlcylcbiAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1zaGlwTmFtZScsIHNoaXBOYW1lLm5hbWUpXG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleClcbn1cblxubGV0IGNyZWF0ZU5ld0dyaWQgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGA7XG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGBwbGF5ZXJPbmUke2l9LCAke2p9YClcbiAgICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJPbmUnKVxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7MTB9LCAxZnIpYDtcbiAgICB9XG59KSgpXG5cbmxldCBjcmVhdGVOZXdHcmlkMiA9ICgoKSA9PiB7XG4gICAgbGV0IGNvbnRhaW5lcjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lcjIuc2V0QXR0cmlidXRlKCdpZCcsICdjb250YWluZXIyJylcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcjIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGBcbiAgICAgICAgZ3JpZC5zZXRBdHRyaWJ1dGUoJ2lkJywgYHBsYXllclR3byR7aX0sICR7an1gKVxuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ3BsYXllclR3bycpXG4gICAgICAgIGNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcjInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5jb25zdCBwb3B1bGF0ZUdyaWQgPSAoY29vcmRpbmF0ZXMsIHJlc3VsdCkgPT4ge1xuICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29vcmRpbmF0ZXMpXG4gICAgc2hpcE5hbWUgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1zaGlwbmFtZScpXG4gICAgaXRlbS5pbm5lclRleHQgPSAnWCdcbiAgICBpZiAocmVzdWx0ID09ICdIaXQnKXtcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsdWUnXG4gICAgfVxufVxuXG5jb25zdCBnYW1lID0gZ2FtZWJvYXJkKClcblxuLy9jb25zdCBwbGF5ZXJPbmVDb29yZGluYXRlc1JvdyA9IHByb21wdCgnQWlyY3JhZnQgQ2FycmllciBjb29yZGluYXRlcz8gKFJvdyknKVxuLy9jb25zdCBwbGF5ZXJPbmVDb29yZGluYXRlc0NvbCA9IHByb21wdCgnQWlyY3JhZnQgQ2FycmllciBjb29yZGluYXRlcz8gKENvbHVtbiknKVxuXG5nYW1lLnBsYWNlU2hpcChkZXN0cm95ZXI0LCAwLCAwLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJylcbmdhbWUucGxhY2VTaGlwKGJhdHRsZXNoaXAxLCAyLCAyLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJylcbmdhbWUucGxhY2VTaGlwKGNhcnJpZXIwLCAxLCAzLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJylcbmdhbWUucGxhY2VTaGlwKHN1Ym1hcmluZTIsIDcsIDYsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnLCAnaG9yaXpvbnRhbCcpXG5nYW1lLnBsYWNlU2hpcChjcnVpc2VyMywgOSwgMCwgY3JlYXRlR3JpZCwgJ3BsYXllck9uZScsICdob3Jpem9udGFsJylcblxuY29uc3QgY2FycmllckNvb3JkaW5hdGVzID0gc2VsZWN0UmFuZG9tR3JpZENvb3JpZG5hdGVzKClcbmNvbnN0IGJhdHRsZXNoaXBDb29yZGluYXRlcyA9IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcygpXG5jb25zdCBzdWJtYXJpbmVDb29yZGluYXRlcyA9IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcygpXG5jb25zdCBjcnVpc2VyQ29vcmRpbmF0ZXMgPSBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMoKVxuY29uc3QgZGVzdHJveWVyQ29vcmRpbmF0ZXMgPSBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMoKVxuXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29DYXJyaWVyMCwgY2FycmllckNvb3JkaW5hdGVzLnJvdywgY2FycmllckNvb3JkaW5hdGVzLmNvbCwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvQmF0dGxlc2hpcDEsIGJhdHRsZXNoaXBDb29yZGluYXRlcy5yb3csIGJhdHRsZXNoaXBDb29yZGluYXRlcy5jb2wsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b1N1Ym1hcmluZTIsIHN1Ym1hcmluZUNvb3JkaW5hdGVzLnJvdywgc3VibWFyaW5lQ29vcmRpbmF0ZXMuY29sLCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29DcnVpc2VyMywgY3J1aXNlckNvb3JkaW5hdGVzLnJvdywgY3J1aXNlckNvb3JkaW5hdGVzLmNvbCwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvRGVzdHJveWVyNCwgZGVzdHJveWVyQ29vcmRpbmF0ZXMucm93LCBkZXN0cm95ZXJDb29yZGluYXRlcy5jb2wsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcblxuY29uc3QgcGxheWVyVHVybiA9ICgoKSA9PiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxheWVyVHdvJykpe1xuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSBlLnRhcmdldC5pZFxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNSb3cgPSBjb29yZGluYXRlcy5zbGljZSgtNCwgLTMpXG4gICAgICAgIGxldCBjb29yZGluYXRlc0NvbCA9IGNvb3JkaW5hdGVzLnNsaWNlKC0xKVxuICAgICAgICBpZiAoKGNyZWF0ZUdyaWQyW2Nvb3JkaW5hdGVzUm93XVtjb29yZGluYXRlc0NvbF0pID09PSAxIHx8IChjcmVhdGVHcmlkMltjb29yZGluYXRlc1Jvd11bY29vcmRpbmF0ZXNDb2xdKSA9PT0gMyl7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBnYW1lLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXNSb3csIGNvb3JkaW5hdGVzQ29sLCBjcmVhdGVHcmlkMiwgcGxheWVyVHdvU2hpcHMpXG4gICAgICAgICAgICBnYW1lLmFsbFNoaXBzU3VuayhwbGF5ZXJUd29TaGlwcylcbiAgICAgICAgICAgIGNvbXB1dGVyUGxheSgpXG4gICAgICAgIH1cbn1cbn0pKSgpXG5cbmNvbnN0IGNvbXB1dGVyUGxheSA9ICgpID0+IHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMoKVxuICAgIGxldCBncmlkQ29vcmRpbmF0ZXMgPSBjcmVhdGVHcmlkW2Nvb3JkaW5hdGVzLnJvd11bY29vcmRpbmF0ZXMuY29sXVxuICAgIGlmIChncmlkQ29vcmRpbmF0ZXMgPT09IDMgfHwgZ3JpZENvb3JkaW5hdGVzID09PSAxKXtcbiAgICAgICAgY29tcHV0ZXJQbGF5KClcbiAgICB9ZWxzZXtcbiAgICAgICAgZ2FtZS5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzLnJvdywgY29vcmRpbmF0ZXMuY29sLCBjcmVhdGVHcmlkLCBwbGF5ZXJPbmVTaGlwcylcbiAgICAgICAgZ2FtZS5hbGxTaGlwc1N1bmsocGxheWVyT25lU2hpcHMpXG4gICAgfSBcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=