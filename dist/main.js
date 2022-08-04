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

document.addEventListener('click', function(e){
    if(e.target && e.target.classList.contains('playerTwo')){
        let coordinates = e.target.id
        let coordinatesRow = coordinates.slice(-4, -3)
        let coordinatesCol = coordinates.slice(-1)
        game.receiveAttack(coordinatesRow, coordinatesCol, createGrid2, playerTwoShips)
        game.allShipsSunk(playerTwoShips)
        /*setTimeout(*/computerPlay()/*, 1250)*/
}
})

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxVQUFVLHlCQUF5Qjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssb0JBQW9CO0FBQ3pCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssbUJBQW1CO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssMEJBQTBCO0FBQy9CLEtBQUssNkJBQTZCO0FBQ2xDLEtBQUssNEJBQTRCO0FBQ2pDLEtBQUssMEJBQTBCO0FBQy9CLEtBQUssNEJBQTRCO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBLCtCQUErQixPQUFPLEVBQUUsSUFBSSxJQUFJLFVBQVU7QUFDMUQ7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0EsK0JBQStCLE9BQU8sRUFBRSxPQUFPLElBQUksT0FBTztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFVBQVUsRUFBRSxJQUFJLElBQUksT0FBTztBQUM3RTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esa0RBQWtELFVBQVUsRUFBRSxJQUFJLElBQUksT0FBTztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EsNENBQTRDLEVBQUUsSUFBSSxFQUFFO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLG1GQUFtRixHQUFHO0FBQ3RGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSw0Q0FBNEMsRUFBRSxJQUFJLEVBQUU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLEdBQUc7QUFDdkY7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyp3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudCkgPT4ge1xuICAgIGxldCBnYW1lID0gZ2FtZWJvYXJkKClcbiAgICBnYW1lLnBsYWNlU2hpcCgpXG4gICAgY29uc29sZS5sb2coZ2FtZS5wbGFjZVNoaXAoKSlcbn0pKi9cblxuLy9jb25zdCB7IENvbnRleHRFeGNsdXNpb25QbHVnaW4gfSA9IHJlcXVpcmUoXCJ3ZWJwYWNrXCIpXG5cbmZ1bmN0aW9uIHNoaXAobmFtZSwgbGVuZ3RoKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBsZW5ndGhBcnJheTogY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpLFxuICAgICAgICBoaXQobnVtYmVyLCBwbGF5ZXJOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aEFycmF5W251bWJlcl0gPSAxXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGhBcnJheVxuICAgICAgICB9LFxuICAgICAgICBpc1N1bmsoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sZW5ndGhBcnJheS5pbmNsdWRlcygwKSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5sZW5ndGhBcnJheS5pbmNsdWRlcygwKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNoaXBMZW5ndGgobGVuZ3RoKSB7XG4gICAgbGV0IGFyciA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XG4gICAgICAgIGFyci5wdXNoKDApXG4gICAgfVxuICAgIHJldHVybiBhcnJcbn1cblxubGV0IGNyZWF0ZUdyaWQgPSB7XG4gICAgMDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDE6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAyOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDQ6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA1OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDc6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA4OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgOTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxufVxuXG5sZXQgY3JlYXRlR3JpZDIgPSB7XG4gICAgMDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDE6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAyOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDQ6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA1OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDc6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA4OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgOTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxufVxuXG5jb25zdCBjYXJyaWVyMCA9IHNoaXAoJ2NhcnJpZXIwJywgNSlcbmNvbnN0IGJhdHRsZXNoaXAxID0gc2hpcCgnYmF0dGxlc2hpcDEnLCA0KVxuY29uc3Qgc3VibWFyaW5lMiA9IHNoaXAoJ3N1Ym1hcmluZTInLCAzKVxuY29uc3QgY3J1aXNlcjMgPSBzaGlwKCdjcnVpc2VyMycsIDMpXG5jb25zdCBkZXN0cm95ZXI0ID0gc2hpcCgnZGVzdHJveWVyNCcsIDIpXG5cbmNvbnN0IHBsYXllck9uZVNoaXBzID0gW1xuICAgIHtcIm5hbWVcIjogY2FycmllcjB9LFxuICAgIHtcIm5hbWVcIjogYmF0dGxlc2hpcDF9LFxuICAgIHtcIm5hbWVcIjogc3VibWFyaW5lMn0sXG4gICAge1wibmFtZVwiOiBjcnVpc2VyM30sXG4gICAge1wibmFtZVwiOiBkZXN0cm95ZXI0fSxcbiAgICAncGxheWVyT25lJ1xuXVxuXG5jb25zdCBwbGF5ZXJUd29DYXJyaWVyMCA9IHNoaXAoJ3BsYXllclR3b0NhcnJpZXIwJywgNSlcbmNvbnN0IHBsYXllclR3b0JhdHRsZXNoaXAxID0gc2hpcCgncGxheWVyVHdvQmF0dGxlc2hpcDEnLCA0KVxuY29uc3QgcGxheWVyVHdvU3VibWFyaW5lMiA9IHNoaXAoJ3BsYXllclR3b1N1Ym1hcmluZTInLCAzKVxuY29uc3QgcGxheWVyVHdvQ3J1aXNlcjMgPSBzaGlwKCdwbGF5ZXJUd29DcnVzaWVyMycsIDMpXG5jb25zdCBwbGF5ZXJUd29EZXN0cm95ZXI0ID0gc2hpcCgncGxheWVyVHdvRGVzdHJveWVyNCcsIDIpXG5cbmNvbnN0IHBsYXllclR3b1NoaXBzID0gW1xuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvQ2FycmllcjB9LFxuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvQmF0dGxlc2hpcDF9LFxuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvU3VibWFyaW5lMn0sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29DcnVpc2VyM30sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29EZXN0cm95ZXI0fSxcbiAgICAncGxheWVyVHdvJ1xuXVxuXG5mdW5jdGlvbiBnYW1lYm9hcmQoKSB7XG4gICAgbGV0IHNoaXBMb2NhdGlvbiA9IDJcbiAgICBsZXQgZW1wdHlTcGFjZSA9IDBcbiAgICBsZXQgbWlzcyA9IDNcbiAgICBsZXQgaGl0ID0gMVxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwTmFtZSwgcm93LCBjb2x1bW4sIGdyaWRTZWxlY3Rpb24sIHBsYXllciwgb3JpZW50YXRpb24gPSAndmVydGljYWwnKSA9PiB7XG4gICAgICAgIGxldCBuZXdTaGlwID0gc2hpcE5hbWUubGVuZ3RoQXJyYXlcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q29sdW1uID0gY29sdW1uICsgaVxuICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bcm93XVtuZXdDb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgIHNoaXBMb2NhdG9yKGAke3BsYXllcn0ke3Jvd30sICR7bmV3Q29sdW1ufWAsIHNoaXBOYW1lLCBpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3U2hpcC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHJvdyArIGlcbiAgICAgICAgICAgICAgICBncmlkU2VsZWN0aW9uW25ld1Jvd11bY29sdW1uXSA9IDJcbiAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtuZXdSb3d9LCAke2NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL3JhbmRvbSBwbGFjZW1lbnRcbiAgICAgICAgLypjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY3JlYXRlR3JpZClcbiAgICAgICAgY29uc3QgcHJvcCA9IGtleXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5cy5sZW5ndGgpXVxuICAgICAgICBjb25zdCBrZXlzMiA9IE9iamVjdC5rZXlzKGNyZWF0ZUdyaWRbcHJvcF0pXG4gICAgICAgIGNvbnN0IHByb3AyID0ga2V5czJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5czIubGVuZ3RoKV1cbiAgICAgICAgY3JlYXRlR3JpZFtwcm9wXVtwcm9wMl0gPSBzaGlwTG9jYXRpb24qL1xuICAgICAgICByZXR1cm4gY3JlYXRlR3JpZFxuICAgIH1cbiAgICAgICAgLy9sZXQgbmV3R3JpZCA9IGNyZWF0ZUdyaWRcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uLCBncmlkU2VsZWN0aW9uLCBwbGF5ZXIpID0+IHtcbiAgICAgICAgaWYgKGdyaWRTZWxlY3Rpb25bcm93XVtjb2x1bW5dID09PSBlbXB0eVNwYWNlKXtcbiAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bcm93XVtjb2x1bW5dID0gbWlzc1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwbGF5ZXJbNV19JHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgcG9wdWxhdGVHcmlkKGl0ZW0uaWQsICdNaXNzJylcbiAgICAgICAgICAgIHJldHVybiBncmlkU2VsZWN0aW9uXG4gICAgICAgIH1lbHNlIGlmIChncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9PT0gc2hpcExvY2F0aW9uKXtcbiAgICAgICAgICAgIGdyaWRTZWxlY3Rpb25bcm93XVtjb2x1bW5dID0gaGl0XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3BsYXllcls1XX0ke3Jvd30sICR7Y29sdW1ufWApXG4gICAgICAgICAgICBsZXQgc2hpcE5hbWUgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1zaGlwbmFtZScpXG4gICAgICAgICAgICBsZXQgc2hpcEFycmF5ID0gZ2V0U2hpcEFycmF5KHNoaXBOYW1lLCBwbGF5ZXIpIC8vdXBkYXRlIHBsYXllclxuICAgICAgICAgICAgbGV0IHNoaXBJbmRleCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JylcbiAgICAgICAgICAgIHNoaXBBcnJheS5oaXQoc2hpcEluZGV4LCBwbGF5ZXIpICAvLy91cGRhdGVzIHBsYXllclxuICAgICAgICAgICAgcG9wdWxhdGVHcmlkKGl0ZW0uaWQsICdIaXQnKVxuICAgICAgICAgICAgcmV0dXJuIGdyaWRTZWxlY3Rpb25cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBhbGxTaGlwc1N1bmsgPSAocGxheWVyKSA9PiB7XG4gICAgICAgIGlmKHBsYXllclswXS5uYW1lLmlzU3VuaygpID09PSB0cnVlICYmIHBsYXllclsxXS5uYW1lLmlzU3VuaygpID09PSB0cnVlICYmIFxuICAgICAgICBwbGF5ZXJbMl0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBwbGF5ZXJbM10ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBcbiAgICAgICAgcGxheWVyWzRdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUpe1xuICAgICAgICAgICAgZ2FtZU92ZXIocGxheWVyWzVdKVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY2VpdmVBdHRhY2ssIHBsYWNlU2hpcCwgYWxsU2hpcHNTdW5rXG4gICAgfVxufVxuXG5jb25zdCBnYW1lT3ZlciA9IChwbGF5ZXJOYW1lKSA9PiB7XG4gICAgaWYgKHBsYXllck5hbWUgPT09ICdwbGF5ZXJUd28nKXtcbiAgICAgICAgYWxlcnQgKGBHYW1lIE92ZXIuIFBsYXllciBPbmUgV2lucyFgKVxuICAgIH1lbHNlIGlmIChwbGF5ZXJOYW1lID09PSAncGxheWVyT25lJyl7XG4gICAgICAgIGFsZXJ0ICgnR2FtZSBPdmVyLiBQbGF5ZXIgVHdvIFdpbnMhJylcbiAgICB9XG59XG5cbmNvbnN0IGdldFNoaXBBcnJheSA9IChzaGlwTmFtZSwgcGxheWVyKSA9PiB7XG4gICAgbGV0IGluZGV4ID0gc2hpcE5hbWUuc2xpY2UoLTEpXG4gICAgcmV0dXJuIHBsYXllcltpbmRleF0ubmFtZVxufVxuXG5jb25zdCBzaGlwTG9jYXRvciA9IChjb29yZGluYXRlcywgc2hpcE5hbWUsIGluZGV4KSA9PiB7XG4gICAgbGV0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb29yZGluYXRlcylcbiAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1zaGlwTmFtZScsIHNoaXBOYW1lLm5hbWUpXG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleClcbn1cblxubGV0IGNyZWF0ZU5ld0dyaWQgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGA7XG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGBwbGF5ZXJPbmUke2l9LCAke2p9YClcbiAgICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJPbmUnKVxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7MTB9LCAxZnIpYDtcbiAgICB9XG59KSgpXG5cbmxldCBjcmVhdGVOZXdHcmlkMiA9ICgoKSA9PiB7XG4gICAgbGV0IGNvbnRhaW5lcjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lcjIuc2V0QXR0cmlidXRlKCdpZCcsICdjb250YWluZXIyJylcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcjIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGBcbiAgICAgICAgZ3JpZC5zZXRBdHRyaWJ1dGUoJ2lkJywgYHBsYXllclR3byR7aX0sICR7an1gKVxuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ3BsYXllclR3bycpXG4gICAgICAgIGNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcjInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5jb25zdCBwb3B1bGF0ZUdyaWQgPSAoY29vcmRpbmF0ZXMsIHJlc3VsdCkgPT4ge1xuICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29vcmRpbmF0ZXMpXG4gICAgaXRlbS5pbm5lclRleHQgPSAnWCdcbiAgICBpZiAocmVzdWx0ID09ICdIaXQnKXtcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsdWUnXG4gICAgfVxufVxuXG5jb25zdCBnYW1lID0gZ2FtZWJvYXJkKClcblxuZ2FtZS5wbGFjZVNoaXAoZGVzdHJveWVyNCwgMCwgMCwgY3JlYXRlR3JpZCwgJ3BsYXllck9uZScpXG5nYW1lLnBsYWNlU2hpcChiYXR0bGVzaGlwMSwgMiwgMiwgY3JlYXRlR3JpZCwgJ3BsYXllck9uZScpXG5nYW1lLnBsYWNlU2hpcChjYXJyaWVyMCwgMSwgMywgY3JlYXRlR3JpZCwgJ3BsYXllck9uZScpXG5nYW1lLnBsYWNlU2hpcChzdWJtYXJpbmUyLCA3LCA2LCBjcmVhdGVHcmlkLCAncGxheWVyT25lJywgJ2hvcml6b250YWwnKVxuZ2FtZS5wbGFjZVNoaXAoY3J1aXNlcjMsIDksIDAsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnLCAnaG9yaXpvbnRhbCcpXG5cbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b0NhcnJpZXIwLCAwLCAwLCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29CYXR0bGVzaGlwMSwgMSwgMSwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvU3VibWFyaW5lMiwgMiwgMiwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvQ3J1aXNlcjMsIDMsIDMsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b0Rlc3Ryb3llcjQsIDQsIDQsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYXllclR3bycpKXtcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0gZS50YXJnZXQuaWRcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzUm93ID0gY29vcmRpbmF0ZXMuc2xpY2UoLTQsIC0zKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNDb2wgPSBjb29yZGluYXRlcy5zbGljZSgtMSlcbiAgICAgICAgZ2FtZS5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzUm93LCBjb29yZGluYXRlc0NvbCwgY3JlYXRlR3JpZDIsIHBsYXllclR3b1NoaXBzKVxuICAgICAgICBnYW1lLmFsbFNoaXBzU3VuayhwbGF5ZXJUd29TaGlwcylcbiAgICAgICAgLypzZXRUaW1lb3V0KCovY29tcHV0ZXJQbGF5KCkvKiwgMTI1MCkqL1xufVxufSlcblxuY29uc3QgY29tcHV0ZXJQbGF5ID0gKCkgPT4ge1xuICAgIGxldCBjb29yZGluYXRlcyA9IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcygpXG4gICAgbGV0IGdyaWRDb29yZGluYXRlcyA9IGNyZWF0ZUdyaWRbY29vcmRpbmF0ZXMucm93XVtjb29yZGluYXRlcy5jb2xdXG4gICAgaWYgKGdyaWRDb29yZGluYXRlcyA9PT0gMyB8fCBncmlkQ29vcmRpbmF0ZXMgPT09IDEpe1xuICAgICAgICBjb21wdXRlclBsYXkoKVxuICAgIH1lbHNle1xuICAgICAgICBnYW1lLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMucm93LCBjb29yZGluYXRlcy5jb2wsIGNyZWF0ZUdyaWQsIHBsYXllck9uZVNoaXBzKVxuICAgICAgICBnYW1lLmFsbFNoaXBzU3VuayhwbGF5ZXJPbmVTaGlwcylcbiAgICB9XG59XG5cbmNvbnN0IHNlbGVjdFJhbmRvbUdyaWRDb29yaWRuYXRlcyA9ICgpID0+IHtcbiAgICBsZXQgcm93ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcbiAgICBsZXQgY29sID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSlcbiAgICByZXR1cm4ge1xuICAgICAgICByb3csIGNvbFxuICAgIH1cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=