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
                        reselectCoordinates(player, shipName, gridSelection)
                        return
                    }
                    gridSelection[row][newColumn] = 2
                    shipLocator(`${player}${row}, ${newColumn}`, shipName, i)
                }else{
                    let newColumn = column + i
                    if (gridSelection[row][newColumn] === 2){
                        reselectCoordinates(player, shipName, gridSelection)
                        return
                    }
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
        let shipName = ship.name.slice(0, -1)
        document.getElementById(`${shipName}Coordinates`).classList.add('visible')
        document.getElementById(`${shipName}Submit`).addEventListener('click', () => {
            let row = document.getElementById(`new${shipName}Row`).value;
            let col = document.getElementById(`new${shipName}Col`).value;
            /*if (grid[row - 1][col - 1] === 2){
                reselectCoordinates("playerOne", ship, createGrid)
                document.getElementById(`${shipName}Coordinates`).classList.remove('visible')    fixthis
                //console.log(ship)
                return
            }*/
            game.placeShip(ship, row - 1, col - 1, createGrid, 'playerOne')
            document.getElementById(`${shipName}Coordinates`).classList.remove('visible')
        })
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
    game.placeShip(submarine2, submarineRow - 1, submarineCol - 1, createGrid, 'playerOne')
    game.placeShip(cruiser3, cruiserRow - 1, cruiserCol - 1, createGrid, 'playerOne')
    game.placeShip(destroyer4, destroyerRow - 1, destroyerCol - 1, createGrid, 'playerOne')
})
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLLGlCQUFpQjtBQUN0QixLQUFLLG9CQUFvQjtBQUN6QixLQUFLLG1CQUFtQjtBQUN4QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLG1CQUFtQjtBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLLDBCQUEwQjtBQUMvQixLQUFLLDZCQUE2QjtBQUNsQyxLQUFLLDRCQUE0QjtBQUNqQyxLQUFLLDBCQUEwQjtBQUMvQixLQUFLLDRCQUE0QjtBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU8sRUFBRSxJQUFJLElBQUksVUFBVTtBQUM5RCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU8sRUFBRSxJQUFJLElBQUksVUFBVTtBQUM5RDtBQUNBO0FBQ0EsU0FBUztBQUNULDRCQUE0QixvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTyxFQUFFLE9BQU8sSUFBSSxPQUFPO0FBQzlELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTyxFQUFFLE9BQU8sSUFBSSxPQUFPO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxVQUFVLEVBQUUsSUFBSSxJQUFJLE9BQU87QUFDN0U7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGtEQUFrRCxVQUFVLEVBQUUsSUFBSSxJQUFJLE9BQU87QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFNBQVM7QUFDNUMsbUNBQW1DLFNBQVM7QUFDNUMsb0RBQW9ELFNBQVM7QUFDN0Qsb0RBQW9ELFNBQVM7QUFDN0Q7QUFDQTtBQUNBLDJDQUEyQyxTQUFTO0FBQ3BEO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSx1Q0FBdUMsU0FBUztBQUNoRCxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLDRDQUE0QyxFQUFFLElBQUksRUFBRTtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYsR0FBRztBQUN0RjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EsNENBQTRDLEVBQUUsSUFBSSxFQUFFO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixHQUFHO0FBQ3ZGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyp3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudCkgPT4ge1xufSkqL1xuY29uc3Qgc2VsZWN0UmFuZG9tR3JpZENvb3JpZG5hdGVzID0gKCkgPT4ge1xuICAgIGxldCByb3cgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApKVxuICAgIGxldCBjb2wgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApKVxuICAgIHJldHVybiB7XG4gICAgICAgIHJvdywgY29sXG4gICAgfVxufVxuXG5jb25zdCByYW5kb21Db29yaWRuYXRlcyA9IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcygpXG5cbmZ1bmN0aW9uIHNoaXAobmFtZSwgbGVuZ3RoKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBsZW5ndGhBcnJheTogY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpLFxuICAgICAgICBoaXQobnVtYmVyLCBwbGF5ZXJOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aEFycmF5W251bWJlcl0gPSAxXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGhBcnJheVxuICAgICAgICB9LFxuICAgICAgICBpc1N1bmsoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sZW5ndGhBcnJheS5pbmNsdWRlcygwKSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5sZW5ndGhBcnJheS5pbmNsdWRlcygwKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNoaXBMZW5ndGgobGVuZ3RoKSB7XG4gICAgbGV0IGFyciA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XG4gICAgICAgIGFyci5wdXNoKDApXG4gICAgfVxuICAgIHJldHVybiBhcnJcbn1cblxubGV0IGNyZWF0ZUdyaWQgPSB7XG4gICAgMDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDE6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAyOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDQ6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA1OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDc6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA4OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgOTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxufVxuXG5sZXQgY3JlYXRlR3JpZDIgPSB7XG4gICAgMDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDE6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAyOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDQ6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA1OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDc6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA4OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgOTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxufVxuXG5jb25zdCBjYXJyaWVyMCA9IHNoaXAoJ2NhcnJpZXIwJywgNSlcbmNvbnN0IGJhdHRsZXNoaXAxID0gc2hpcCgnYmF0dGxlc2hpcDEnLCA0KVxuY29uc3Qgc3VibWFyaW5lMiA9IHNoaXAoJ3N1Ym1hcmluZTInLCAzKVxuY29uc3QgY3J1aXNlcjMgPSBzaGlwKCdjcnVpc2VyMycsIDMpXG5jb25zdCBkZXN0cm95ZXI0ID0gc2hpcCgnZGVzdHJveWVyNCcsIDIpXG5cbmNvbnN0IHBsYXllck9uZVNoaXBzID0gW1xuICAgIHtcIm5hbWVcIjogY2FycmllcjB9LFxuICAgIHtcIm5hbWVcIjogYmF0dGxlc2hpcDF9LFxuICAgIHtcIm5hbWVcIjogc3VibWFyaW5lMn0sXG4gICAge1wibmFtZVwiOiBjcnVpc2VyM30sXG4gICAge1wibmFtZVwiOiBkZXN0cm95ZXI0fSxcbiAgICAncGxheWVyT25lJ1xuXVxuXG5jb25zdCBwbGF5ZXJUd29DYXJyaWVyMCA9IHNoaXAoJ3BsYXllclR3b0NhcnJpZXIwJywgNSlcbmNvbnN0IHBsYXllclR3b0JhdHRsZXNoaXAxID0gc2hpcCgncGxheWVyVHdvQmF0dGxlc2hpcDEnLCA0KVxuY29uc3QgcGxheWVyVHdvU3VibWFyaW5lMiA9IHNoaXAoJ3BsYXllclR3b1N1Ym1hcmluZTInLCAzKVxuY29uc3QgcGxheWVyVHdvQ3J1aXNlcjMgPSBzaGlwKCdwbGF5ZXJUd29DcnVzaWVyMycsIDMpXG5jb25zdCBwbGF5ZXJUd29EZXN0cm95ZXI0ID0gc2hpcCgncGxheWVyVHdvRGVzdHJveWVyNCcsIDIpXG5cbmNvbnN0IHBsYXllclR3b1NoaXBzID0gW1xuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvQ2FycmllcjB9LFxuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvQmF0dGxlc2hpcDF9LFxuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvU3VibWFyaW5lMn0sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29DcnVpc2VyM30sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29EZXN0cm95ZXI0fSxcbiAgICAncGxheWVyVHdvJ1xuXVxuXG5mdW5jdGlvbiBnYW1lYm9hcmQoKSB7XG4gICAgbGV0IHNoaXBMb2NhdGlvbiA9IDJcbiAgICBsZXQgZW1wdHlTcGFjZSA9IDBcbiAgICBsZXQgbWlzcyA9IDNcbiAgICBsZXQgaGl0ID0gMVxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwTmFtZSwgcm93LCBjb2x1bW4sIGdyaWRTZWxlY3Rpb24sIHBsYXllciwgb3JpZW50YXRpb24gPSAndmVydGljYWwnKSA9PiB7XG4gICAgICAgIGxldCBuZXdTaGlwID0gc2hpcE5hbWUubGVuZ3RoQXJyYXlcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZiAoKDEwIC0gY29sdW1uKSA8IG5ld1NoaXAubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NvbHVtbiA9IGNvbHVtbiAtIGlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWRTZWxlY3Rpb25bcm93XVtuZXdDb2x1bW5dID09PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2VsZWN0Q29vcmRpbmF0ZXMocGxheWVyLCBzaGlwTmFtZSwgZ3JpZFNlbGVjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bcm93XVtuZXdDb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtyb3d9LCAke25ld0NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NvbHVtbiA9IGNvbHVtbiArIGlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWRTZWxlY3Rpb25bcm93XVtuZXdDb2x1bW5dID09PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2VsZWN0Q29vcmRpbmF0ZXMocGxheWVyLCBzaGlwTmFtZSwgZ3JpZFNlbGVjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bcm93XVtuZXdDb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtyb3d9LCAke25ld0NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZiAoKDEwIC0gcm93KSA8IG5ld1NoaXAubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHJvdyAtIGlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID09PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2VsZWN0Q29vcmRpbmF0ZXMocGxheWVyLCBzaGlwTmFtZSwgZ3JpZFNlbGVjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtuZXdSb3d9LCAke2NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHJvdyArIGlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID09PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2VsZWN0Q29vcmRpbmF0ZXMocGxheWVyLCBzaGlwTmFtZSwgZ3JpZFNlbGVjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bbmV3Um93XVtjb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtuZXdSb3d9LCAke2NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUdyaWRcbiAgICB9XG4gICAgICAgIC8vbGV0IG5ld0dyaWQgPSBjcmVhdGVHcmlkXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbiwgZ3JpZFNlbGVjdGlvbiwgcGxheWVyKSA9PiB7XG4gICAgICAgIGlmIChncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9PT0gZW1wdHlTcGFjZSl7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IG1pc3NcbiAgICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyWzVdfSR7cm93fSwgJHtjb2x1bW59YClcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnTWlzcycpXG4gICAgICAgICAgICByZXR1cm4gZ3JpZFNlbGVjdGlvblxuICAgICAgICB9ZWxzZSBpZiAoZ3JpZFNlbGVjdGlvbltyb3ddW2NvbHVtbl0gPT09IHNoaXBMb2NhdGlvbil7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IGhpdFxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwbGF5ZXJbNV19JHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgbGV0IHNoaXBOYW1lID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcG5hbWUnKVxuICAgICAgICAgICAgbGV0IHNoaXBBcnJheSA9IGdldFNoaXBBcnJheShzaGlwTmFtZSwgcGxheWVyKSAvL3VwZGF0ZSBwbGF5ZXJcbiAgICAgICAgICAgIGxldCBzaGlwSW5kZXggPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpXG4gICAgICAgICAgICBzaGlwQXJyYXkuaGl0KHNoaXBJbmRleCwgcGxheWVyKSAgLy8vdXBkYXRlcyBwbGF5ZXJcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnSGl0JylcbiAgICAgICAgICAgIHJldHVybiBncmlkU2VsZWN0aW9uXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gKHBsYXllcikgPT4ge1xuICAgICAgICBpZihwbGF5ZXJbMF0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBwbGF5ZXJbMV0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBcbiAgICAgICAgcGxheWVyWzJdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyWzNdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgXG4gICAgICAgIHBsYXllcls0XS5uYW1lLmlzU3VuaygpID09PSB0cnVlKXtcbiAgICAgICAgICAgIGdhbWVPdmVyKHBsYXllcls1XSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNlaXZlQXR0YWNrLCBwbGFjZVNoaXAsIGFsbFNoaXBzU3Vua1xuICAgIH1cbn1cblxuY29uc3QgcmVzZWxlY3RDb29yZGluYXRlcyA9IChwbGF5ZXIsIHNoaXAsIGdyaWQpID0+IHtcbiAgICBpZiAocGxheWVyID09PSBcInBsYXllck9uZVwiKXtcbiAgICAgICAgbGV0IHNoaXBOYW1lID0gc2hpcC5uYW1lLnNsaWNlKDAsIC0xKVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzaGlwTmFtZX1Db29yZGluYXRlc2ApLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzaGlwTmFtZX1TdWJtaXRgKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmV3JHtzaGlwTmFtZX1Sb3dgKS52YWx1ZTtcbiAgICAgICAgICAgIGxldCBjb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbmV3JHtzaGlwTmFtZX1Db2xgKS52YWx1ZTtcbiAgICAgICAgICAgIC8qaWYgKGdyaWRbcm93IC0gMV1bY29sIC0gMV0gPT09IDIpe1xuICAgICAgICAgICAgICAgIHJlc2VsZWN0Q29vcmRpbmF0ZXMoXCJwbGF5ZXJPbmVcIiwgc2hpcCwgY3JlYXRlR3JpZClcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzaGlwTmFtZX1Db29yZGluYXRlc2ApLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKSAgICBmaXh0aGlzXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzaGlwKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfSovXG4gICAgICAgICAgICBnYW1lLnBsYWNlU2hpcChzaGlwLCByb3cgLSAxLCBjb2wgLSAxLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJylcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NoaXBOYW1lfUNvb3JkaW5hdGVzYCkuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpXG4gICAgICAgIH0pXG4gICAgfWVsc2UgaWYgKHBsYXllciA9PT0gJ3BsYXllclR3bycpe1xuICAgICAgICBnYW1lLnBsYWNlU2hpcChzaGlwLCByYW5kb21Db29yaWRuYXRlcy5yb3csIHJhbmRvbUNvb3JpZG5hdGVzLmNvbCwgZ3JpZCwgcGxheWVyKVxuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgcmV0dXJuXG59XG5cbmNvbnN0IGdhbWVPdmVyID0gKHBsYXllck5hbWUpID0+IHtcbiAgICBpZiAocGxheWVyTmFtZSA9PT0gJ3BsYXllclR3bycpe1xuICAgICAgICBhbGVydCAoYEdhbWUgT3Zlci4gUGxheWVyIE9uZSBXaW5zIWApXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfWVsc2UgaWYgKHBsYXllck5hbWUgPT09ICdwbGF5ZXJPbmUnKXtcbiAgICAgICAgYWxlcnQgKCdHYW1lIE92ZXIuIFBsYXllciBUd28gV2lucyEnKVxuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgIH1cbn1cblxuY29uc3QgZ2V0U2hpcEFycmF5ID0gKHNoaXBOYW1lLCBwbGF5ZXIpID0+IHtcbiAgICBsZXQgaW5kZXggPSBzaGlwTmFtZS5zbGljZSgtMSlcbiAgICAvL2NvbnNvbGUubG9nKGNyZWF0ZUdyaWQyKVxuICAgIHJldHVybiBwbGF5ZXJbaW5kZXhdLm5hbWVcbn1cblxuY29uc3Qgc2hpcExvY2F0b3IgPSAoY29vcmRpbmF0ZXMsIHNoaXBOYW1lLCBpbmRleCkgPT4ge1xuICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29vcmRpbmF0ZXMpXG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcE5hbWUnLCBzaGlwTmFtZS5uYW1lKVxuICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpXG59XG5cbmxldCBjcmVhdGVOZXdHcmlkID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdjb250YWluZXInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgO1xuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgcGxheWVyT25lJHtpfSwgJHtqfWApXG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgncGxheWVyT25lJylcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5sZXQgY3JlYXRlTmV3R3JpZDIgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29udGFpbmVyMicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGBwbGF5ZXJUd28ke2l9LCAke2p9YClcbiAgICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJUd28nKVxuICAgICAgICBjb250YWluZXIyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXIyJykuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHsxMH0sIDFmcilgO1xuICAgIH1cbn0pKClcblxuY29uc3QgcG9wdWxhdGVHcmlkID0gKGNvb3JkaW5hdGVzLCByZXN1bHQpID0+IHtcbiAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvb3JkaW5hdGVzKVxuICAgIHNoaXBOYW1lID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcG5hbWUnKVxuICAgIGl0ZW0uaW5uZXJUZXh0ID0gJ1gnXG4gICAgaWYgKHJlc3VsdCA9PSAnSGl0Jyl7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibHVlJ1xuICAgIH1cbn1cblxuY29uc3QgZ2FtZSA9IGdhbWVib2FyZCgpXG5cbi8vY29uc3QgcGxheWVyT25lQ29vcmRpbmF0ZXNSb3cgPSBwcm9tcHQoJ0FpcmNyYWZ0IENhcnJpZXIgY29vcmRpbmF0ZXM/IChSb3cpJylcbi8vY29uc3QgcGxheWVyT25lQ29vcmRpbmF0ZXNDb2wgPSBwcm9tcHQoJ0FpcmNyYWZ0IENhcnJpZXIgY29vcmRpbmF0ZXM/IChDb2x1bW4pJylcblxuY29uc3QgY2FycmllckNvb3JkaW5hdGVzID0gc2VsZWN0UmFuZG9tR3JpZENvb3JpZG5hdGVzKClcbmNvbnN0IGJhdHRsZXNoaXBDb29yZGluYXRlcyA9IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcygpXG5jb25zdCBzdWJtYXJpbmVDb29yZGluYXRlcyA9IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcygpXG5jb25zdCBjcnVpc2VyQ29vcmRpbmF0ZXMgPSBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMoKVxuY29uc3QgZGVzdHJveWVyQ29vcmRpbmF0ZXMgPSBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMoKVxuXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29DYXJyaWVyMCwgY2FycmllckNvb3JkaW5hdGVzLnJvdywgY2FycmllckNvb3JkaW5hdGVzLmNvbCwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvQmF0dGxlc2hpcDEsIGJhdHRsZXNoaXBDb29yZGluYXRlcy5yb3csIGJhdHRsZXNoaXBDb29yZGluYXRlcy5jb2wsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b1N1Ym1hcmluZTIsIHN1Ym1hcmluZUNvb3JkaW5hdGVzLnJvdywgc3VibWFyaW5lQ29vcmRpbmF0ZXMuY29sLCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29DcnVpc2VyMywgY3J1aXNlckNvb3JkaW5hdGVzLnJvdywgY3J1aXNlckNvb3JkaW5hdGVzLmNvbCwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvRGVzdHJveWVyNCwgZGVzdHJveWVyQ29vcmRpbmF0ZXMucm93LCBkZXN0cm95ZXJDb29yZGluYXRlcy5jb2wsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcblxuY29uc3QgcGxheWVyVHVybiA9ICgoKSA9PiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxheWVyVHdvJykpe1xuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSBlLnRhcmdldC5pZFxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNSb3cgPSBjb29yZGluYXRlcy5zbGljZSgtNCwgLTMpXG4gICAgICAgIGxldCBjb29yZGluYXRlc0NvbCA9IGNvb3JkaW5hdGVzLnNsaWNlKC0xKVxuICAgICAgICBpZiAoKGNyZWF0ZUdyaWQyW2Nvb3JkaW5hdGVzUm93XVtjb29yZGluYXRlc0NvbF0pID09PSAxIHx8IChjcmVhdGVHcmlkMltjb29yZGluYXRlc1Jvd11bY29vcmRpbmF0ZXNDb2xdKSA9PT0gMyl7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBnYW1lLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXNSb3csIGNvb3JkaW5hdGVzQ29sLCBjcmVhdGVHcmlkMiwgcGxheWVyVHdvU2hpcHMpXG4gICAgICAgICAgICBnYW1lLmFsbFNoaXBzU3VuayhwbGF5ZXJUd29TaGlwcylcbiAgICAgICAgICAgIGNvbXB1dGVyUGxheSgpXG4gICAgICAgIH1cbn1cbn0pKSgpXG5cbmNvbnN0IGNvbXB1dGVyUGxheSA9ICgpID0+IHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBzZWxlY3RSYW5kb21HcmlkQ29vcmlkbmF0ZXMoKVxuICAgIGxldCBncmlkQ29vcmRpbmF0ZXMgPSBjcmVhdGVHcmlkW2Nvb3JkaW5hdGVzLnJvd11bY29vcmRpbmF0ZXMuY29sXVxuICAgIGlmIChncmlkQ29vcmRpbmF0ZXMgPT09IDMgfHwgZ3JpZENvb3JkaW5hdGVzID09PSAxKXtcbiAgICAgICAgY29tcHV0ZXJQbGF5KClcbiAgICB9ZWxzZXtcbiAgICAgICAgZ2FtZS5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzLnJvdywgY29vcmRpbmF0ZXMuY29sLCBjcmVhdGVHcmlkLCBwbGF5ZXJPbmVTaGlwcylcbiAgICAgICAgZ2FtZS5hbGxTaGlwc1N1bmsocGxheWVyT25lU2hpcHMpXG4gICAgfSBcbn1cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbnRlckNvb3JkaW5hdGVzJykuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJylcbiAgICBsZXQgY2FycmllclJvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJyaWVyUm93JykudmFsdWU7XG4gICAgbGV0IGNhcnJpZXJDb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FycmllckNvbCcpLnZhbHVlO1xuICAgIGxldCBiYXR0bGVzaGlwUm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhdHRsZXNoaXBSb3cnKS52YWx1ZTtcbiAgICBsZXQgYmF0dGxlc2hpcENvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXR0bGVzaGlwQ29sJykudmFsdWU7XG4gICAgbGV0IHN1Ym1hcmluZVJvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtYXJpbmVSb3cnKS52YWx1ZTtcbiAgICBsZXQgc3VibWFyaW5lQ29sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1hcmluZUNvbCcpLnZhbHVlO1xuICAgIGxldCBjcnVpc2VyUm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NydWlzZXJSb3cnKS52YWx1ZTtcbiAgICBsZXQgY3J1aXNlckNvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcnVpc2VyQ29sJykudmFsdWU7XG4gICAgbGV0IGRlc3Ryb3llclJvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXN0cm95ZXJSb3cnKS52YWx1ZTtcbiAgICBsZXQgZGVzdHJveWVyQ29sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc3Ryb3llckNvbCcpLnZhbHVlO1xuICAgIGdhbWUucGxhY2VTaGlwKGNhcnJpZXIwLCBjYXJyaWVyUm93IC0gMSwgY2FycmllckNvbCAtIDEsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnKVxuICAgIGdhbWUucGxhY2VTaGlwKGJhdHRsZXNoaXAxLCBiYXR0bGVzaGlwUm93IC0gMSwgYmF0dGxlc2hpcENvbCAtIDEsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnKVxuICAgIGdhbWUucGxhY2VTaGlwKHN1Ym1hcmluZTIsIHN1Ym1hcmluZVJvdyAtIDEsIHN1Ym1hcmluZUNvbCAtIDEsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnKVxuICAgIGdhbWUucGxhY2VTaGlwKGNydWlzZXIzLCBjcnVpc2VyUm93IC0gMSwgY3J1aXNlckNvbCAtIDEsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnKVxuICAgIGdhbWUucGxhY2VTaGlwKGRlc3Ryb3llcjQsIGRlc3Ryb3llclJvdyAtIDEsIGRlc3Ryb3llckNvbCAtIDEsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnKVxufSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=