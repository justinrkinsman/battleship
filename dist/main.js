/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*window.addEventListener('load', (event) => {
})*/
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

document.getElementById('submit').addEventListener('click', () => {
    document.getElementById('enterCoordinates').classList.add('invisible')
    let carrierRow = document.getElementById('carrierRow').value;
    let carrierCol = document.getElementById('carrierCol').value;
    let battleshipRow = document.getElementById('battleshipRow').value;
    let battleshipCol = document.getElementById('battleshipCol').value;
    let submarineRow = document.getElementById('submarineRow').value;
    let submarineCol = document.getElementById('submarineCol').value;
    let cruiserRow = document.getElementById('cruiserRow').value;
    let cruiserCol = document.getElementById('cruiserCol').value;
    let destroyerRow = document.getElementById('destroyerRow').value;
    let destroyerCol = document.getElementById('destroyerCol').value;
    game.placeShip(carrier0, carrierRow - 1, carrierCol - 1, createGrid, 'playerOne')
    game.placeShip(battleship1, battleshipRow - 1, battleshipCol - 1, createGrid, 'playerOne')
    game.placeShip(submarine2, submarineRow - 1, submarineCol - 1, createGrid, 'playerOne', 'horizontal')
    game.placeShip(cruiser3, cruiserRow - 1, cruiserCol - 1, createGrid, 'playerOne', 'horizontal')
    game.placeShip(destroyer4, destroyerRow - 1, destroyerCol - 1, createGrid, 'playerOne', 'horizontal')
})
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50KSA9PiB7XG59KSovXG5jb25zdCBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMgPSAoKSA9PiB7XG4gICAgbGV0IHJvdyA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkpXG4gICAgbGV0IGNvbCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcm93LCBjb2xcbiAgICB9XG59XG5cbmNvbnN0IHJhbmRvbUNvb3JpZG5hdGVzID0gc2VsZWN0UmFuZG9tR3JpZENvb3JpZG5hdGVzKClcblxuZnVuY3Rpb24gc2hpcChuYW1lLCBsZW5ndGgpe1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGxlbmd0aEFycmF5OiBjYWxjdWxhdGVTaGlwTGVuZ3RoKGxlbmd0aCksXG4gICAgICAgIGhpdChudW1iZXIsIHBsYXllck5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoQXJyYXlbbnVtYmVyXSA9IDFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlbmd0aEFycmF5XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuaygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aEFycmF5LmluY2x1ZGVzKDApID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1lbHNlIGlmICh0aGlzLmxlbmd0aEFycmF5LmluY2x1ZGVzKDApID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpIHtcbiAgICBsZXQgYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKXtcbiAgICAgICAgYXJyLnB1c2goMClcbiAgICB9XG4gICAgcmV0dXJuIGFyclxufVxuXG5sZXQgY3JlYXRlR3JpZCA9IHtcbiAgICAwOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA2OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA5OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG59XG5cbmxldCBjcmVhdGVHcmlkMiA9IHtcbiAgICAwOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA2OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA5OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG59XG5cbmNvbnN0IGNhcnJpZXIwID0gc2hpcCgnY2FycmllcjAnLCA1KVxuY29uc3QgYmF0dGxlc2hpcDEgPSBzaGlwKCdiYXR0bGVzaGlwMScsIDQpXG5jb25zdCBzdWJtYXJpbmUyID0gc2hpcCgnc3VibWFyaW5lMicsIDMpXG5jb25zdCBjcnVpc2VyMyA9IHNoaXAoJ2NydWlzZXIzJywgMylcbmNvbnN0IGRlc3Ryb3llcjQgPSBzaGlwKCdkZXN0cm95ZXI0JywgMilcblxuY29uc3QgcGxheWVyT25lU2hpcHMgPSBbXG4gICAge1wibmFtZVwiOiBjYXJyaWVyMH0sXG4gICAge1wibmFtZVwiOiBiYXR0bGVzaGlwMX0sXG4gICAge1wibmFtZVwiOiBzdWJtYXJpbmUyfSxcbiAgICB7XCJuYW1lXCI6IGNydWlzZXIzfSxcbiAgICB7XCJuYW1lXCI6IGRlc3Ryb3llcjR9LFxuICAgICdwbGF5ZXJPbmUnXG5dXG5cbmNvbnN0IHBsYXllclR3b0NhcnJpZXIwID0gc2hpcCgncGxheWVyVHdvQ2FycmllcjAnLCA1KVxuY29uc3QgcGxheWVyVHdvQmF0dGxlc2hpcDEgPSBzaGlwKCdwbGF5ZXJUd29CYXR0bGVzaGlwMScsIDQpXG5jb25zdCBwbGF5ZXJUd29TdWJtYXJpbmUyID0gc2hpcCgncGxheWVyVHdvU3VibWFyaW5lMicsIDMpXG5jb25zdCBwbGF5ZXJUd29DcnVpc2VyMyA9IHNoaXAoJ3BsYXllclR3b0NydXNpZXIzJywgMylcbmNvbnN0IHBsYXllclR3b0Rlc3Ryb3llcjQgPSBzaGlwKCdwbGF5ZXJUd29EZXN0cm95ZXI0JywgMilcblxuY29uc3QgcGxheWVyVHdvU2hpcHMgPSBbXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29DYXJyaWVyMH0sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29CYXR0bGVzaGlwMX0sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29TdWJtYXJpbmUyfSxcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b0NydWlzZXIzfSxcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b0Rlc3Ryb3llcjR9LFxuICAgICdwbGF5ZXJUd28nXG5dXG5cbmZ1bmN0aW9uIGdhbWVib2FyZCgpIHtcbiAgICBsZXQgc2hpcExvY2F0aW9uID0gMlxuICAgIGxldCBlbXB0eVNwYWNlID0gMFxuICAgIGxldCBtaXNzID0gM1xuICAgIGxldCBoaXQgPSAxXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBOYW1lLCByb3csIGNvbHVtbiwgZ3JpZFNlbGVjdGlvbiwgcGxheWVyLCBvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCcpID0+IHtcbiAgICAgICAgbGV0IG5ld1NoaXAgPSBzaGlwTmFtZS5sZW5ndGhBcnJheVxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoaXAubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGlmICgoMTAgLSBjb2x1bW4pIDwgbmV3U2hpcC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q29sdW1uID0gY29sdW1uIC0gaVxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZFNlbGVjdGlvbltyb3ddW25ld0NvbHVtbl0gPT09IDIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2JsZW1zJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bbmV3Q29sdW1uXSA9IDJcbiAgICAgICAgICAgICAgICAgICAgc2hpcExvY2F0b3IoYCR7cGxheWVyfSR7cm93fSwgJHtuZXdDb2x1bW59YCwgc2hpcE5hbWUsIGkpXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdDb2x1bW4gPSBjb2x1bW4gKyBpXG4gICAgICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bcm93XVtuZXdDb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtyb3d9LCAke25ld0NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZiAoKDEwIC0gcm93KSA8IG5ld1NoaXAubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHJvdyAtIGlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID09PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2VsZWN0Q29vcmRpbmF0ZXMocGxheWVyLCBzaGlwTmFtZSwgZ3JpZFNlbGVjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtuZXdSb3d9LCAke2NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHJvdyArIGlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID09PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2VsZWN0Q29vcmRpbmF0ZXMocGxheWVyLCBzaGlwTmFtZSwgZ3JpZFNlbGVjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtuZXdSb3d9LCAke2NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUdyaWRcbiAgICB9XG4gICAgICAgIC8vbGV0IG5ld0dyaWQgPSBjcmVhdGVHcmlkXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbiwgZ3JpZFNlbGVjdGlvbiwgcGxheWVyKSA9PiB7XG4gICAgICAgIGlmIChncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9PT0gZW1wdHlTcGFjZSl7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IG1pc3NcbiAgICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyWzVdfSR7cm93fSwgJHtjb2x1bW59YClcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnTWlzcycpXG4gICAgICAgICAgICByZXR1cm4gZ3JpZFNlbGVjdGlvblxuICAgICAgICB9ZWxzZSBpZiAoZ3JpZFNlbGVjdGlvbltyb3ddW2NvbHVtbl0gPT09IHNoaXBMb2NhdGlvbil7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IGhpdFxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwbGF5ZXJbNV19JHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgbGV0IHNoaXBOYW1lID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcG5hbWUnKVxuICAgICAgICAgICAgbGV0IHNoaXBBcnJheSA9IGdldFNoaXBBcnJheShzaGlwTmFtZSwgcGxheWVyKSAvL3VwZGF0ZSBwbGF5ZXJcbiAgICAgICAgICAgIGxldCBzaGlwSW5kZXggPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpXG4gICAgICAgICAgICBzaGlwQXJyYXkuaGl0KHNoaXBJbmRleCwgcGxheWVyKSAgLy8vdXBkYXRlcyBwbGF5ZXJcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnSGl0JylcbiAgICAgICAgICAgIHJldHVybiBncmlkU2VsZWN0aW9uXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gKHBsYXllcikgPT4ge1xuICAgICAgICBpZihwbGF5ZXJbMF0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBwbGF5ZXJbMV0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBcbiAgICAgICAgcGxheWVyWzJdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyWzNdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgXG4gICAgICAgIHBsYXllcls0XS5uYW1lLmlzU3VuaygpID09PSB0cnVlKXtcbiAgICAgICAgICAgIGdhbWVPdmVyKHBsYXllcls1XSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNlaXZlQXR0YWNrLCBwbGFjZVNoaXAsIGFsbFNoaXBzU3Vua1xuICAgIH1cbn1cblxuY29uc3QgcmVzZWxlY3RDb29yZGluYXRlcyA9IChwbGF5ZXIsIHNoaXAsIGdyaWQpID0+IHtcbiAgICBpZiAocGxheWVyID09PSBcInBsYXllck9uZVwiKXtcbiAgICAgICAgcHJvbXB0KCdQbGVhc2UgRW50ZXIgTmV3IENvb3JkaW5hdGVzJylcbiAgICB9ZWxzZSBpZiAocGxheWVyID09PSAncGxheWVyVHdvJyl7XG4gICAgICAgIGdhbWUucGxhY2VTaGlwKHNoaXAsIHJhbmRvbUNvb3JpZG5hdGVzLnJvdywgcmFuZG9tQ29vcmlkbmF0ZXMuY29sLCBncmlkLCBwbGF5ZXIpXG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICByZXR1cm5cbn1cblxuY29uc3QgZ2FtZU92ZXIgPSAocGxheWVyTmFtZSkgPT4ge1xuICAgIGlmIChwbGF5ZXJOYW1lID09PSAncGxheWVyVHdvJyl7XG4gICAgICAgIGFsZXJ0IChgR2FtZSBPdmVyLiBQbGF5ZXIgT25lIFdpbnMhYClcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICB9ZWxzZSBpZiAocGxheWVyTmFtZSA9PT0gJ3BsYXllck9uZScpe1xuICAgICAgICBhbGVydCAoJ0dhbWUgT3Zlci4gUGxheWVyIFR3byBXaW5zIScpXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfVxufVxuXG5jb25zdCBnZXRTaGlwQXJyYXkgPSAoc2hpcE5hbWUsIHBsYXllcikgPT4ge1xuICAgIGxldCBpbmRleCA9IHNoaXBOYW1lLnNsaWNlKC0xKVxuICAgIC8vY29uc29sZS5sb2coY3JlYXRlR3JpZDIpXG4gICAgcmV0dXJuIHBsYXllcltpbmRleF0ubmFtZVxufVxuXG5jb25zdCBzaGlwTG9jYXRvciA9IChjb29yZGluYXRlcywgc2hpcE5hbWUsIGluZGV4KSA9PiB7XG4gICAgbGV0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb29yZGluYXRlcylcbiAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1zaGlwTmFtZScsIHNoaXBOYW1lLm5hbWUpXG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleClcbn1cblxubGV0IGNyZWF0ZU5ld0dyaWQgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGA7XG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGBwbGF5ZXJPbmUke2l9LCAke2p9YClcbiAgICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJPbmUnKVxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7MTB9LCAxZnIpYDtcbiAgICB9XG59KSgpXG5cbmxldCBjcmVhdGVOZXdHcmlkMiA9ICgoKSA9PiB7XG4gICAgbGV0IGNvbnRhaW5lcjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lcjIuc2V0QXR0cmlidXRlKCdpZCcsICdjb250YWluZXIyJylcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcjIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGBcbiAgICAgICAgZ3JpZC5zZXRBdHRyaWJ1dGUoJ2lkJywgYHBsYXllclR3byR7aX0sICR7an1gKVxuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ3BsYXllclR3bycpXG4gICAgICAgIGNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcjInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5jb25zdCBwb3B1bGF0ZUdyaWQgPSAoY29vcmRpbmF0ZXMsIHJlc3VsdCkgPT4ge1xuICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29vcmRpbmF0ZXMpXG4gICAgc2hpcE5hbWUgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1zaGlwbmFtZScpXG4gICAgaXRlbS5pbm5lclRleHQgPSAnWCdcbiAgICBpZiAocmVzdWx0ID09ICdIaXQnKXtcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsdWUnXG4gICAgfVxufVxuXG5jb25zdCBnYW1lID0gZ2FtZWJvYXJkKClcblxuLy9jb25zdCBwbGF5ZXJPbmVDb29yZGluYXRlc1JvdyA9IHByb21wdCgnQWlyY3JhZnQgQ2FycmllciBjb29yZGluYXRlcz8gKFJvdyknKVxuLy9jb25zdCBwbGF5ZXJPbmVDb29yZGluYXRlc0NvbCA9IHByb21wdCgnQWlyY3JhZnQgQ2FycmllciBjb29yZGluYXRlcz8gKENvbHVtbiknKVxuXG5jb25zdCBjYXJyaWVyQ29vcmRpbmF0ZXMgPSBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMoKVxuY29uc3QgYmF0dGxlc2hpcENvb3JkaW5hdGVzID0gc2VsZWN0UmFuZG9tR3JpZENvb3JpZG5hdGVzKClcbmNvbnN0IHN1Ym1hcmluZUNvb3JkaW5hdGVzID0gc2VsZWN0UmFuZG9tR3JpZENvb3JpZG5hdGVzKClcbmNvbnN0IGNydWlzZXJDb29yZGluYXRlcyA9IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcygpXG5jb25zdCBkZXN0cm95ZXJDb29yZGluYXRlcyA9IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcygpXG5cbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b0NhcnJpZXIwLCBjYXJyaWVyQ29vcmRpbmF0ZXMucm93LCBjYXJyaWVyQ29vcmRpbmF0ZXMuY29sLCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29CYXR0bGVzaGlwMSwgYmF0dGxlc2hpcENvb3JkaW5hdGVzLnJvdywgYmF0dGxlc2hpcENvb3JkaW5hdGVzLmNvbCwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvU3VibWFyaW5lMiwgc3VibWFyaW5lQ29vcmRpbmF0ZXMucm93LCBzdWJtYXJpbmVDb29yZGluYXRlcy5jb2wsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b0NydWlzZXIzLCBjcnVpc2VyQ29vcmRpbmF0ZXMucm93LCBjcnVpc2VyQ29vcmRpbmF0ZXMuY29sLCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29EZXN0cm95ZXI0LCBkZXN0cm95ZXJDb29yZGluYXRlcy5yb3csIGRlc3Ryb3llckNvb3JkaW5hdGVzLmNvbCwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuXG5jb25zdCBwbGF5ZXJUdXJuID0gKCgpID0+IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGF5ZXJUd28nKSl7XG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IGUudGFyZ2V0LmlkXG4gICAgICAgIGxldCBjb29yZGluYXRlc1JvdyA9IGNvb3JkaW5hdGVzLnNsaWNlKC00LCAtMylcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzQ29sID0gY29vcmRpbmF0ZXMuc2xpY2UoLTEpXG4gICAgICAgIGlmICgoY3JlYXRlR3JpZDJbY29vcmRpbmF0ZXNSb3ddW2Nvb3JkaW5hdGVzQ29sXSkgPT09IDEgfHwgKGNyZWF0ZUdyaWQyW2Nvb3JkaW5hdGVzUm93XVtjb29yZGluYXRlc0NvbF0pID09PSAzKXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGdhbWUucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlc1JvdywgY29vcmRpbmF0ZXNDb2wsIGNyZWF0ZUdyaWQyLCBwbGF5ZXJUd29TaGlwcylcbiAgICAgICAgICAgIGdhbWUuYWxsU2hpcHNTdW5rKHBsYXllclR3b1NoaXBzKVxuICAgICAgICAgICAgY29tcHV0ZXJQbGF5KClcbiAgICAgICAgfVxufVxufSkpKClcblxuY29uc3QgY29tcHV0ZXJQbGF5ID0gKCkgPT4ge1xuICAgIGxldCBjb29yZGluYXRlcyA9IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcygpXG4gICAgbGV0IGdyaWRDb29yZGluYXRlcyA9IGNyZWF0ZUdyaWRbY29vcmRpbmF0ZXMucm93XVtjb29yZGluYXRlcy5jb2xdXG4gICAgaWYgKGdyaWRDb29yZGluYXRlcyA9PT0gMyB8fCBncmlkQ29vcmRpbmF0ZXMgPT09IDEpe1xuICAgICAgICBjb21wdXRlclBsYXkoKVxuICAgIH1lbHNle1xuICAgICAgICBnYW1lLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMucm93LCBjb29yZGluYXRlcy5jb2wsIGNyZWF0ZUdyaWQsIHBsYXllck9uZVNoaXBzKVxuICAgICAgICBnYW1lLmFsbFNoaXBzU3VuayhwbGF5ZXJPbmVTaGlwcylcbiAgICB9IFxufVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VudGVyQ29vcmRpbmF0ZXMnKS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICAgIGxldCBjYXJyaWVyUm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcnJpZXJSb3cnKS52YWx1ZTtcbiAgICBsZXQgY2FycmllckNvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJyaWVyQ29sJykudmFsdWU7XG4gICAgbGV0IGJhdHRsZXNoaXBSb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmF0dGxlc2hpcFJvdycpLnZhbHVlO1xuICAgIGxldCBiYXR0bGVzaGlwQ29sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhdHRsZXNoaXBDb2wnKS52YWx1ZTtcbiAgICBsZXQgc3VibWFyaW5lUm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1hcmluZVJvdycpLnZhbHVlO1xuICAgIGxldCBzdWJtYXJpbmVDb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWFyaW5lQ29sJykudmFsdWU7XG4gICAgbGV0IGNydWlzZXJSb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3J1aXNlclJvdycpLnZhbHVlO1xuICAgIGxldCBjcnVpc2VyQ29sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NydWlzZXJDb2wnKS52YWx1ZTtcbiAgICBsZXQgZGVzdHJveWVyUm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc3Ryb3llclJvdycpLnZhbHVlO1xuICAgIGxldCBkZXN0cm95ZXJDb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzdHJveWVyQ29sJykudmFsdWU7XG4gICAgZ2FtZS5wbGFjZVNoaXAoY2FycmllcjAsIGNhcnJpZXJSb3cgLSAxLCBjYXJyaWVyQ29sIC0gMSwgY3JlYXRlR3JpZCwgJ3BsYXllck9uZScpXG4gICAgZ2FtZS5wbGFjZVNoaXAoYmF0dGxlc2hpcDEsIGJhdHRsZXNoaXBSb3cgLSAxLCBiYXR0bGVzaGlwQ29sIC0gMSwgY3JlYXRlR3JpZCwgJ3BsYXllck9uZScpXG4gICAgZ2FtZS5wbGFjZVNoaXAoc3VibWFyaW5lMiwgc3VibWFyaW5lUm93IC0gMSwgc3VibWFyaW5lQ29sIC0gMSwgY3JlYXRlR3JpZCwgJ3BsYXllck9uZScsICdob3Jpem9udGFsJylcbiAgICBnYW1lLnBsYWNlU2hpcChjcnVpc2VyMywgY3J1aXNlclJvdyAtIDEsIGNydWlzZXJDb2wgLSAxLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJywgJ2hvcml6b250YWwnKVxuICAgIGdhbWUucGxhY2VTaGlwKGRlc3Ryb3llcjQsIGRlc3Ryb3llclJvdyAtIDEsIGRlc3Ryb3llckNvbCAtIDEsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnLCAnaG9yaXpvbnRhbCcpXG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==