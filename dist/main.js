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
        //random placement
        /*const keys = Object.keys(createGrid)
        const prop = keys[Math.floor(Math.random() * keys.length)]
        const keys2 = Object.keys(createGrid[prop])
        const prop2 = keys2[Math.floor(Math.random() * keys2.length)]
        createGrid[prop][prop2] = shipLocation*/
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

game.placeShip(playerTwoCarrier0, 0, 0, createGrid2, 'playerTwo')
game.placeShip(playerTwoBattleship1, 1, 1, createGrid2, 'playerTwo')
game.placeShip(playerTwoSubmarine2, 2, 2, createGrid2, 'playerTwo')
game.placeShip(playerTwoCruiser3, 3, 3, createGrid2, 'playerTwo')
game.placeShip(playerTwoDestroyer4, 4, 4, createGrid2, 'playerTwo')

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

const selectRandomGridCooridnates = () => {
    let row = (Math.floor(Math.random() * 10))
    let col = (Math.floor(Math.random() * 10))
    return {
        row, col
    }
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZXNDb250ZW50IjpbIi8qd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZlbnQpID0+IHtcbiAgICBsZXQgZ2FtZSA9IGdhbWVib2FyZCgpXG4gICAgZ2FtZS5wbGFjZVNoaXAoKVxuICAgIGNvbnNvbGUubG9nKGdhbWUucGxhY2VTaGlwKCkpXG59KSovXG5cbi8vY29uc3QgeyBDb250ZXh0RXhjbHVzaW9uUGx1Z2luIH0gPSByZXF1aXJlKFwid2VicGFja1wiKVxuXG5mdW5jdGlvbiBzaGlwKG5hbWUsIGxlbmd0aCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbGVuZ3RoQXJyYXk6IGNhbGN1bGF0ZVNoaXBMZW5ndGgobGVuZ3RoKSxcbiAgICAgICAgaGl0KG51bWJlciwgcGxheWVyTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhBcnJheVtudW1iZXJdID0gMVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoQXJyYXlcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoQXJyYXkuaW5jbHVkZXMoMCkgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMubGVuZ3RoQXJyYXkuaW5jbHVkZXMoMCkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTaGlwTGVuZ3RoKGxlbmd0aCkge1xuICAgIGxldCBhcnIgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgICAgICBhcnIucHVzaCgwKVxuICAgIH1cbiAgICByZXR1cm4gYXJyXG59XG5cbmxldCBjcmVhdGVHcmlkID0ge1xuICAgIDA6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAxOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDM6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA0OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDY6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA3OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgODogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDk6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbn1cblxubGV0IGNyZWF0ZUdyaWQyID0ge1xuICAgIDA6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAxOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDM6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA0OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDY6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA3OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgODogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDk6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbn1cblxuY29uc3QgY2FycmllcjAgPSBzaGlwKCdjYXJyaWVyMCcsIDUpXG5jb25zdCBiYXR0bGVzaGlwMSA9IHNoaXAoJ2JhdHRsZXNoaXAxJywgNClcbmNvbnN0IHN1Ym1hcmluZTIgPSBzaGlwKCdzdWJtYXJpbmUyJywgMylcbmNvbnN0IGNydWlzZXIzID0gc2hpcCgnY3J1aXNlcjMnLCAzKVxuY29uc3QgZGVzdHJveWVyNCA9IHNoaXAoJ2Rlc3Ryb3llcjQnLCAyKVxuXG5jb25zdCBwbGF5ZXJPbmVTaGlwcyA9IFtcbiAgICB7XCJuYW1lXCI6IGNhcnJpZXIwfSxcbiAgICB7XCJuYW1lXCI6IGJhdHRsZXNoaXAxfSxcbiAgICB7XCJuYW1lXCI6IHN1Ym1hcmluZTJ9LFxuICAgIHtcIm5hbWVcIjogY3J1aXNlcjN9LFxuICAgIHtcIm5hbWVcIjogZGVzdHJveWVyNH0sXG4gICAgJ3BsYXllck9uZSdcbl1cblxuY29uc3QgcGxheWVyVHdvQ2FycmllcjAgPSBzaGlwKCdwbGF5ZXJUd29DYXJyaWVyMCcsIDUpXG5jb25zdCBwbGF5ZXJUd29CYXR0bGVzaGlwMSA9IHNoaXAoJ3BsYXllclR3b0JhdHRsZXNoaXAxJywgNClcbmNvbnN0IHBsYXllclR3b1N1Ym1hcmluZTIgPSBzaGlwKCdwbGF5ZXJUd29TdWJtYXJpbmUyJywgMylcbmNvbnN0IHBsYXllclR3b0NydWlzZXIzID0gc2hpcCgncGxheWVyVHdvQ3J1c2llcjMnLCAzKVxuY29uc3QgcGxheWVyVHdvRGVzdHJveWVyNCA9IHNoaXAoJ3BsYXllclR3b0Rlc3Ryb3llcjQnLCAyKVxuXG5jb25zdCBwbGF5ZXJUd29TaGlwcyA9IFtcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b0NhcnJpZXIwfSxcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b0JhdHRsZXNoaXAxfSxcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b1N1Ym1hcmluZTJ9LFxuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvQ3J1aXNlcjN9LFxuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvRGVzdHJveWVyNH0sXG4gICAgJ3BsYXllclR3bydcbl1cblxuZnVuY3Rpb24gZ2FtZWJvYXJkKCkge1xuICAgIGxldCBzaGlwTG9jYXRpb24gPSAyXG4gICAgbGV0IGVtcHR5U3BhY2UgPSAwXG4gICAgbGV0IG1pc3MgPSAzXG4gICAgbGV0IGhpdCA9IDFcbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcE5hbWUsIHJvdywgY29sdW1uLCBncmlkU2VsZWN0aW9uLCBwbGF5ZXIsIG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJykgPT4ge1xuICAgICAgICBsZXQgbmV3U2hpcCA9IHNoaXBOYW1lLmxlbmd0aEFycmF5XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3U2hpcC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0NvbHVtbiA9IGNvbHVtbiArIGlcbiAgICAgICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bbmV3Q29sdW1uXSA9IDJcbiAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtyb3d9LCAke25ld0NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoaXAubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBuZXdSb3cgPSByb3cgKyBpXG4gICAgICAgICAgICAgICAgZ3JpZFNlbGVjdGlvbltuZXdSb3ddW2NvbHVtbl0gPSAyXG4gICAgICAgICAgICAgICAgc2hpcExvY2F0b3IoYCR7cGxheWVyfSR7bmV3Um93fSwgJHtjb2x1bW59YCwgc2hpcE5hbWUsIGkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9yYW5kb20gcGxhY2VtZW50XG4gICAgICAgIC8qY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNyZWF0ZUdyaWQpXG4gICAgICAgIGNvbnN0IHByb3AgPSBrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV1cbiAgICAgICAgY29uc3Qga2V5czIgPSBPYmplY3Qua2V5cyhjcmVhdGVHcmlkW3Byb3BdKVxuICAgICAgICBjb25zdCBwcm9wMiA9IGtleXMyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMyLmxlbmd0aCldXG4gICAgICAgIGNyZWF0ZUdyaWRbcHJvcF1bcHJvcDJdID0gc2hpcExvY2F0aW9uKi9cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUdyaWRcbiAgICB9XG4gICAgICAgIC8vbGV0IG5ld0dyaWQgPSBjcmVhdGVHcmlkXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbiwgZ3JpZFNlbGVjdGlvbiwgcGxheWVyKSA9PiB7XG4gICAgICAgIGlmIChncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9PT0gZW1wdHlTcGFjZSl7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IG1pc3NcbiAgICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyWzVdfSR7cm93fSwgJHtjb2x1bW59YClcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnTWlzcycpXG4gICAgICAgICAgICByZXR1cm4gZ3JpZFNlbGVjdGlvblxuICAgICAgICB9ZWxzZSBpZiAoZ3JpZFNlbGVjdGlvbltyb3ddW2NvbHVtbl0gPT09IHNoaXBMb2NhdGlvbil7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IGhpdFxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwbGF5ZXJbNV19JHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgbGV0IHNoaXBOYW1lID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcG5hbWUnKVxuICAgICAgICAgICAgbGV0IHNoaXBBcnJheSA9IGdldFNoaXBBcnJheShzaGlwTmFtZSwgcGxheWVyKSAvL3VwZGF0ZSBwbGF5ZXJcbiAgICAgICAgICAgIGxldCBzaGlwSW5kZXggPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpXG4gICAgICAgICAgICBzaGlwQXJyYXkuaGl0KHNoaXBJbmRleCwgcGxheWVyKSAgLy8vdXBkYXRlcyBwbGF5ZXJcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnSGl0JylcbiAgICAgICAgICAgIHJldHVybiBncmlkU2VsZWN0aW9uXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gKHBsYXllcikgPT4ge1xuICAgICAgICBpZihwbGF5ZXJbMF0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBwbGF5ZXJbMV0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBcbiAgICAgICAgcGxheWVyWzJdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyWzNdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgXG4gICAgICAgIHBsYXllcls0XS5uYW1lLmlzU3VuaygpID09PSB0cnVlKXtcbiAgICAgICAgICAgIGdhbWVPdmVyKHBsYXllcls1XSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNlaXZlQXR0YWNrLCBwbGFjZVNoaXAsIGFsbFNoaXBzU3Vua1xuICAgIH1cbn1cblxuY29uc3QgZ2FtZU92ZXIgPSAocGxheWVyTmFtZSkgPT4ge1xuICAgIGlmIChwbGF5ZXJOYW1lID09PSAncGxheWVyVHdvJyl7XG4gICAgICAgIGFsZXJ0IChgR2FtZSBPdmVyLiBQbGF5ZXIgT25lIFdpbnMhYClcbiAgICB9ZWxzZSBpZiAocGxheWVyTmFtZSA9PT0gJ3BsYXllck9uZScpe1xuICAgICAgICBhbGVydCAoJ0dhbWUgT3Zlci4gUGxheWVyIFR3byBXaW5zIScpXG4gICAgfVxufVxuXG5jb25zdCBnZXRTaGlwQXJyYXkgPSAoc2hpcE5hbWUsIHBsYXllcikgPT4ge1xuICAgIGxldCBpbmRleCA9IHNoaXBOYW1lLnNsaWNlKC0xKVxuICAgIHJldHVybiBwbGF5ZXJbaW5kZXhdLm5hbWVcbn1cblxuY29uc3Qgc2hpcExvY2F0b3IgPSAoY29vcmRpbmF0ZXMsIHNoaXBOYW1lLCBpbmRleCkgPT4ge1xuICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29vcmRpbmF0ZXMpXG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcE5hbWUnLCBzaGlwTmFtZS5uYW1lKVxuICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpXG59XG5cbmxldCBjcmVhdGVOZXdHcmlkID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdjb250YWluZXInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgO1xuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgcGxheWVyT25lJHtpfSwgJHtqfWApXG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgncGxheWVyT25lJylcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5sZXQgY3JlYXRlTmV3R3JpZDIgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29udGFpbmVyMicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGBwbGF5ZXJUd28ke2l9LCAke2p9YClcbiAgICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJUd28nKVxuICAgICAgICBjb250YWluZXIyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXIyJykuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHsxMH0sIDFmcilgO1xuICAgIH1cbn0pKClcblxuY29uc3QgcG9wdWxhdGVHcmlkID0gKGNvb3JkaW5hdGVzLCByZXN1bHQpID0+IHtcbiAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvb3JkaW5hdGVzKVxuICAgIGl0ZW0uaW5uZXJUZXh0ID0gJ1gnXG4gICAgaWYgKHJlc3VsdCA9PSAnSGl0Jyl7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibHVlJ1xuICAgIH1cbn1cblxuY29uc3QgZ2FtZSA9IGdhbWVib2FyZCgpXG5cbmdhbWUucGxhY2VTaGlwKGRlc3Ryb3llcjQsIDAsIDAsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnKVxuZ2FtZS5wbGFjZVNoaXAoYmF0dGxlc2hpcDEsIDIsIDIsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnKVxuZ2FtZS5wbGFjZVNoaXAoY2FycmllcjAsIDEsIDMsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnKVxuZ2FtZS5wbGFjZVNoaXAoc3VibWFyaW5lMiwgNywgNiwgY3JlYXRlR3JpZCwgJ3BsYXllck9uZScsICdob3Jpem9udGFsJylcbmdhbWUucGxhY2VTaGlwKGNydWlzZXIzLCA5LCAwLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJywgJ2hvcml6b250YWwnKVxuXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29DYXJyaWVyMCwgMCwgMCwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvQmF0dGxlc2hpcDEsIDEsIDEsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b1N1Ym1hcmluZTIsIDIsIDIsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b0NydWlzZXIzLCAzLCAzLCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29EZXN0cm95ZXI0LCA0LCA0LCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5cbmNvbnN0IHBsYXllclR1cm4gPSAoKCkgPT4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYXllclR3bycpKXtcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0gZS50YXJnZXQuaWRcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzUm93ID0gY29vcmRpbmF0ZXMuc2xpY2UoLTQsIC0zKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNDb2wgPSBjb29yZGluYXRlcy5zbGljZSgtMSlcbiAgICAgICAgaWYgKChjcmVhdGVHcmlkMltjb29yZGluYXRlc1Jvd11bY29vcmRpbmF0ZXNDb2xdKSA9PT0gMSB8fCAoY3JlYXRlR3JpZDJbY29vcmRpbmF0ZXNSb3ddW2Nvb3JkaW5hdGVzQ29sXSkgPT09IDMpe1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZ2FtZS5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzUm93LCBjb29yZGluYXRlc0NvbCwgY3JlYXRlR3JpZDIsIHBsYXllclR3b1NoaXBzKVxuICAgICAgICAgICAgZ2FtZS5hbGxTaGlwc1N1bmsocGxheWVyVHdvU2hpcHMpXG4gICAgICAgICAgICBjb21wdXRlclBsYXkoKVxuICAgICAgICB9XG59XG59KSkoKVxuXG5jb25zdCBjb21wdXRlclBsYXkgPSAoKSA9PiB7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gc2VsZWN0UmFuZG9tR3JpZENvb3JpZG5hdGVzKClcbiAgICBsZXQgZ3JpZENvb3JkaW5hdGVzID0gY3JlYXRlR3JpZFtjb29yZGluYXRlcy5yb3ddW2Nvb3JkaW5hdGVzLmNvbF1cbiAgICBpZiAoZ3JpZENvb3JkaW5hdGVzID09PSAzIHx8IGdyaWRDb29yZGluYXRlcyA9PT0gMSl7XG4gICAgICAgIGNvbXB1dGVyUGxheSgpXG4gICAgfWVsc2V7XG4gICAgICAgIGdhbWUucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcy5yb3csIGNvb3JkaW5hdGVzLmNvbCwgY3JlYXRlR3JpZCwgcGxheWVyT25lU2hpcHMpXG4gICAgICAgIGdhbWUuYWxsU2hpcHNTdW5rKHBsYXllck9uZVNoaXBzKVxuICAgIH0gXG59XG5cbmNvbnN0IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcyA9ICgpID0+IHtcbiAgICBsZXQgcm93ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcbiAgICBsZXQgY29sID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcbiAgICByZXR1cm4ge1xuICAgICAgICByb3csIGNvbFxuICAgIH1cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=