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
        hit(number) {
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
    'Player One'
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
    'Player Two'
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
            let item = document.getElementById(`${player}${row}, ${column}`)
            populateGrid(item.id, 'Miss')
            return gridSelection
        }else if (gridSelection[row][column] === shipLocation){
            gridSelection[row][column] = hit
            let item = document.getElementById(`${player}${row}, ${column}`)
            let shipName = item.getAttribute('data-shipname')
            let shipArray = getShipArray(shipName, playerTwoShips)
            let shipIndex = item.getAttribute('data-index')
            shipArray.hit(shipIndex)
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
    if (playerName === 'Player Two'){
        alert (`Game Over. Player One Wins!`)
    }else if (playerName === 'Player One'){
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
        game.receiveAttack(coordinatesRow, coordinatesCol, createGrid2, 'playerTwo')
        game.allShipsSunk(playerTwoShips)
        setTimeout(computerPlay, 1250)
}
})

const computerPlay = () => {
    console.log('my turn@')
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxVQUFVLHlCQUF5Qjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssb0JBQW9CO0FBQ3pCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssbUJBQW1CO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssMEJBQTBCO0FBQy9CLEtBQUssNkJBQTZCO0FBQ2xDLEtBQUssNEJBQTRCO0FBQ2pDLEtBQUssMEJBQTBCO0FBQy9CLEtBQUssNEJBQTRCO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBLCtCQUErQixPQUFPLEVBQUUsSUFBSSxJQUFJLFVBQVU7QUFDMUQ7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0EsK0JBQStCLE9BQU8sRUFBRSxPQUFPLElBQUksT0FBTztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELE9BQU8sRUFBRSxJQUFJLElBQUksT0FBTztBQUMxRTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esa0RBQWtELE9BQU8sRUFBRSxJQUFJLElBQUksT0FBTztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EsNENBQTRDLEVBQUUsSUFBSSxFQUFFO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLG1GQUFtRixHQUFHO0FBQ3RGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSw0Q0FBNEMsRUFBRSxJQUFJLEVBQUU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLEdBQUc7QUFDdkY7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50KSA9PiB7XG4gICAgbGV0IGdhbWUgPSBnYW1lYm9hcmQoKVxuICAgIGdhbWUucGxhY2VTaGlwKClcbiAgICBjb25zb2xlLmxvZyhnYW1lLnBsYWNlU2hpcCgpKVxufSkqL1xuXG4vL2NvbnN0IHsgQ29udGV4dEV4Y2x1c2lvblBsdWdpbiB9ID0gcmVxdWlyZShcIndlYnBhY2tcIilcblxuZnVuY3Rpb24gc2hpcChuYW1lLCBsZW5ndGgpe1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGxlbmd0aEFycmF5OiBjYWxjdWxhdGVTaGlwTGVuZ3RoKGxlbmd0aCksXG4gICAgICAgIGhpdChudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoQXJyYXlbbnVtYmVyXSA9IDFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlbmd0aEFycmF5XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuaygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aEFycmF5LmluY2x1ZGVzKDApID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1lbHNlIGlmICh0aGlzLmxlbmd0aEFycmF5LmluY2x1ZGVzKDApID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpIHtcbiAgICBsZXQgYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKXtcbiAgICAgICAgYXJyLnB1c2goMClcbiAgICB9XG4gICAgcmV0dXJuIGFyclxufVxuXG5sZXQgY3JlYXRlR3JpZCA9IHtcbiAgICAwOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA2OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA5OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG59XG5cbmxldCBjcmVhdGVHcmlkMiA9IHtcbiAgICAwOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA2OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA5OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG59XG5cbmNvbnN0IGNhcnJpZXIwID0gc2hpcCgnY2FycmllcjAnLCA1KVxuY29uc3QgYmF0dGxlc2hpcDEgPSBzaGlwKCdiYXR0bGVzaGlwMScsIDQpXG5jb25zdCBzdWJtYXJpbmUyID0gc2hpcCgnc3VibWFyaW5lMicsIDMpXG5jb25zdCBjcnVpc2VyMyA9IHNoaXAoJ2NydWlzZXIzJywgMylcbmNvbnN0IGRlc3Ryb3llcjQgPSBzaGlwKCdkZXN0cm95ZXI0JywgMilcblxuY29uc3QgcGxheWVyT25lU2hpcHMgPSBbXG4gICAge1wibmFtZVwiOiBjYXJyaWVyMH0sXG4gICAge1wibmFtZVwiOiBiYXR0bGVzaGlwMX0sXG4gICAge1wibmFtZVwiOiBzdWJtYXJpbmUyfSxcbiAgICB7XCJuYW1lXCI6IGNydWlzZXIzfSxcbiAgICB7XCJuYW1lXCI6IGRlc3Ryb3llcjR9LFxuICAgICdQbGF5ZXIgT25lJ1xuXVxuXG5jb25zdCBwbGF5ZXJUd29DYXJyaWVyMCA9IHNoaXAoJ3BsYXllclR3b0NhcnJpZXIwJywgNSlcbmNvbnN0IHBsYXllclR3b0JhdHRsZXNoaXAxID0gc2hpcCgncGxheWVyVHdvQmF0dGxlc2hpcDEnLCA0KVxuY29uc3QgcGxheWVyVHdvU3VibWFyaW5lMiA9IHNoaXAoJ3BsYXllclR3b1N1Ym1hcmluZTInLCAzKVxuY29uc3QgcGxheWVyVHdvQ3J1aXNlcjMgPSBzaGlwKCdwbGF5ZXJUd29DcnVzaWVyMycsIDMpXG5jb25zdCBwbGF5ZXJUd29EZXN0cm95ZXI0ID0gc2hpcCgncGxheWVyVHdvRGVzdHJveWVyNCcsIDIpXG5cbmNvbnN0IHBsYXllclR3b1NoaXBzID0gW1xuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvQ2FycmllcjB9LFxuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvQmF0dGxlc2hpcDF9LFxuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvU3VibWFyaW5lMn0sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29DcnVpc2VyM30sXG4gICAge1wibmFtZVwiOiBwbGF5ZXJUd29EZXN0cm95ZXI0fSxcbiAgICAnUGxheWVyIFR3bydcbl1cblxuZnVuY3Rpb24gZ2FtZWJvYXJkKCkge1xuICAgIGxldCBzaGlwTG9jYXRpb24gPSAyXG4gICAgbGV0IGVtcHR5U3BhY2UgPSAwXG4gICAgbGV0IG1pc3MgPSAzXG4gICAgbGV0IGhpdCA9IDFcbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcE5hbWUsIHJvdywgY29sdW1uLCBncmlkU2VsZWN0aW9uLCBwbGF5ZXIsIG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJykgPT4ge1xuICAgICAgICBsZXQgbmV3U2hpcCA9IHNoaXBOYW1lLmxlbmd0aEFycmF5XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3U2hpcC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0NvbHVtbiA9IGNvbHVtbiArIGlcbiAgICAgICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bbmV3Q29sdW1uXSA9IDJcbiAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtyb3d9LCAke25ld0NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoaXAubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBuZXdSb3cgPSByb3cgKyBpXG4gICAgICAgICAgICAgICAgZ3JpZFNlbGVjdGlvbltuZXdSb3ddW2NvbHVtbl0gPSAyXG4gICAgICAgICAgICAgICAgc2hpcExvY2F0b3IoYCR7cGxheWVyfSR7bmV3Um93fSwgJHtjb2x1bW59YCwgc2hpcE5hbWUsIGkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9yYW5kb20gcGxhY2VtZW50XG4gICAgICAgIC8qY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNyZWF0ZUdyaWQpXG4gICAgICAgIGNvbnN0IHByb3AgPSBrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV1cbiAgICAgICAgY29uc3Qga2V5czIgPSBPYmplY3Qua2V5cyhjcmVhdGVHcmlkW3Byb3BdKVxuICAgICAgICBjb25zdCBwcm9wMiA9IGtleXMyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMyLmxlbmd0aCldXG4gICAgICAgIGNyZWF0ZUdyaWRbcHJvcF1bcHJvcDJdID0gc2hpcExvY2F0aW9uKi9cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUdyaWRcbiAgICB9XG4gICAgICAgIC8vbGV0IG5ld0dyaWQgPSBjcmVhdGVHcmlkXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbiwgZ3JpZFNlbGVjdGlvbiwgcGxheWVyKSA9PiB7XG4gICAgICAgIGlmIChncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9PT0gZW1wdHlTcGFjZSl7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IG1pc3NcbiAgICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyfSR7cm93fSwgJHtjb2x1bW59YClcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnTWlzcycpXG4gICAgICAgICAgICByZXR1cm4gZ3JpZFNlbGVjdGlvblxuICAgICAgICB9ZWxzZSBpZiAoZ3JpZFNlbGVjdGlvbltyb3ddW2NvbHVtbl0gPT09IHNoaXBMb2NhdGlvbil7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IGhpdFxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwbGF5ZXJ9JHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgbGV0IHNoaXBOYW1lID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcG5hbWUnKVxuICAgICAgICAgICAgbGV0IHNoaXBBcnJheSA9IGdldFNoaXBBcnJheShzaGlwTmFtZSwgcGxheWVyVHdvU2hpcHMpXG4gICAgICAgICAgICBsZXQgc2hpcEluZGV4ID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKVxuICAgICAgICAgICAgc2hpcEFycmF5LmhpdChzaGlwSW5kZXgpXG4gICAgICAgICAgICBwb3B1bGF0ZUdyaWQoaXRlbS5pZCwgJ0hpdCcpXG4gICAgICAgICAgICByZXR1cm4gZ3JpZFNlbGVjdGlvblxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9IChwbGF5ZXIpID0+IHtcbiAgICAgICAgaWYocGxheWVyWzBdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyWzFdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgXG4gICAgICAgIHBsYXllclsyXS5uYW1lLmlzU3VuaygpID09PSB0cnVlICYmIHBsYXllclszXS5uYW1lLmlzU3VuaygpID09PSB0cnVlICYmIFxuICAgICAgICBwbGF5ZXJbNF0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICBnYW1lT3ZlcihwbGF5ZXJbNV0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjZWl2ZUF0dGFjaywgcGxhY2VTaGlwLCBhbGxTaGlwc1N1bmtcbiAgICB9XG59XG5cbmNvbnN0IGdhbWVPdmVyID0gKHBsYXllck5hbWUpID0+IHtcbiAgICBpZiAocGxheWVyTmFtZSA9PT0gJ1BsYXllciBUd28nKXtcbiAgICAgICAgYWxlcnQgKGBHYW1lIE92ZXIuIFBsYXllciBPbmUgV2lucyFgKVxuICAgIH1lbHNlIGlmIChwbGF5ZXJOYW1lID09PSAnUGxheWVyIE9uZScpe1xuICAgICAgICBhbGVydCAoJ0dhbWUgT3Zlci4gUGxheWVyIFR3byBXaW5zIScpXG4gICAgfVxufVxuXG5jb25zdCBnZXRTaGlwQXJyYXkgPSAoc2hpcE5hbWUsIHBsYXllcikgPT4ge1xuICAgIGxldCBpbmRleCA9IHNoaXBOYW1lLnNsaWNlKC0xKVxuICAgIHJldHVybiBwbGF5ZXJbaW5kZXhdLm5hbWVcbn1cblxuY29uc3Qgc2hpcExvY2F0b3IgPSAoY29vcmRpbmF0ZXMsIHNoaXBOYW1lLCBpbmRleCkgPT4ge1xuICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29vcmRpbmF0ZXMpXG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcE5hbWUnLCBzaGlwTmFtZS5uYW1lKVxuICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpXG59XG5cbmxldCBjcmVhdGVOZXdHcmlkID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdjb250YWluZXInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgO1xuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgcGxheWVyT25lJHtpfSwgJHtqfWApXG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgncGxheWVyT25lJylcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5sZXQgY3JlYXRlTmV3R3JpZDIgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29udGFpbmVyMicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGBwbGF5ZXJUd28ke2l9LCAke2p9YClcbiAgICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJUd28nKVxuICAgICAgICBjb250YWluZXIyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXIyJykuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHsxMH0sIDFmcilgO1xuICAgIH1cbn0pKClcblxuY29uc3QgcG9wdWxhdGVHcmlkID0gKGNvb3JkaW5hdGVzLCByZXN1bHQpID0+IHtcbiAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvb3JkaW5hdGVzKVxuICAgIGl0ZW0uaW5uZXJUZXh0ID0gJ1gnXG4gICAgaWYgKHJlc3VsdCA9PSAnSGl0Jyl7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibHVlJ1xuICAgIH1cbn1cblxuY29uc3QgZ2FtZSA9IGdhbWVib2FyZCgpXG5cbmdhbWUucGxhY2VTaGlwKGRlc3Ryb3llcjQsIDAsIDAsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnKVxuZ2FtZS5wbGFjZVNoaXAoYmF0dGxlc2hpcDEsIDIsIDIsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnKVxuZ2FtZS5wbGFjZVNoaXAoY2FycmllcjAsIDEsIDMsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnKVxuZ2FtZS5wbGFjZVNoaXAoc3VibWFyaW5lMiwgNywgNiwgY3JlYXRlR3JpZCwgJ3BsYXllck9uZScsICdob3Jpem9udGFsJylcbmdhbWUucGxhY2VTaGlwKGNydWlzZXIzLCA5LCAwLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJywgJ2hvcml6b250YWwnKVxuXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29DYXJyaWVyMCwgMCwgMCwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvQmF0dGxlc2hpcDEsIDEsIDEsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b1N1Ym1hcmluZTIsIDIsIDIsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b0NydWlzZXIzLCAzLCAzLCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29EZXN0cm95ZXI0LCA0LCA0LCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGF5ZXJUd28nKSl7XG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IGUudGFyZ2V0LmlkXG4gICAgICAgIGxldCBjb29yZGluYXRlc1JvdyA9IGNvb3JkaW5hdGVzLnNsaWNlKC00LCAtMylcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzQ29sID0gY29vcmRpbmF0ZXMuc2xpY2UoLTEpXG4gICAgICAgIGdhbWUucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlc1JvdywgY29vcmRpbmF0ZXNDb2wsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcbiAgICAgICAgZ2FtZS5hbGxTaGlwc1N1bmsocGxheWVyVHdvU2hpcHMpXG4gICAgICAgIHNldFRpbWVvdXQoY29tcHV0ZXJQbGF5LCAxMjUwKVxufVxufSlcblxuY29uc3QgY29tcHV0ZXJQbGF5ID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdteSB0dXJuQCcpXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9