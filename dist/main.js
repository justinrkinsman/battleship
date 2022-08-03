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
            if (this.lengthArray.includes(0)){
                console.log(false)
            }else if (!this.lengthArray.includes(0)){
                console.log(true)
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

/*const ships = {
    carrier: 5,
    battleShip: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
}*/

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

const playerOneCarrier = ship('carrier', 5)
const playerOneBattleship = ship('battleship', 4)
const playerOneSubmarine = ship('submarine', 3)
const playerOneCruiser = ship('cruiser', 3)
const playerOneDestroyer = ship('destroyer', 2)

function gameboard() {
    let shipLocation = 2
    let emptySpace = 0
    let miss = 3
    let hit = 1
    const placeShip = (shipName, row, column, orientation = 'vertical') => {
        let newShip = shipName.lengthArray
        if (orientation === "horizontal") {
            for (let i = 0; i < newShip.length; i++){
                let newColumn = column + i
                createGrid[row][newColumn] = 2
                shipLocator(`${row}, ${newColumn}`, shipName)
            }
        }else{
            for (let i = 0; i < newShip.length; i++){
                let newRow = row + i
                createGrid[newRow][column] = 2
                shipLocator(`${newRow}, ${column}`, shipName)
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
        let newGrid = createGrid
    const receiveAttack = (row, column) => {
        if (newGrid[row][column] === emptySpace){
            newGrid[row][column] = miss
            //console.log(newGrid)
            let item = document.getElementById(`${row}, ${column}`)
            populateGrid(item.id, 'Miss')
            return newGrid
        }else if (newGrid[row][column] === shipLocation){
            newGrid[row][column] = hit
            //console.log(newGrid)
            let item = document.getElementById(`${row}, ${column}`)
            populateGrid(item.id, 'Hit')
            return newGrid
        }
    }
    const allShipsSunk = () => {
        /*if(playerOneCarrier.isSunk() === true && playerOneBattleship.isSunk() === true && playerOneCruiser.isSunk() === true && playerOneSubmarine.isSunk() === true && playerOneDestroyer.isSunk() === true){
            console.log('Game Over')
        }else{
            console.log('New Round')
        }*/
        console.log(createGrid)
    }
    return {
        receiveAttack, placeShip, allShipsSunk
    }
}

const shipLocator = (coordinates, shipName) => {
    let cell = document.getElementById(coordinates)
    cell.setAttribute('data-shipName', shipName.name)
}

//
//Creates the grid in the DOM
//
let createNewGrid = (() => {
    let container = document.createElement('div')
    container.setAttribute('id', 'container')
    document.body.appendChild(container)
    for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++){
        let grid = document.createElement('div');
        grid.className = `grid`;
        grid.setAttribute('id', `${i}, ${j}`)
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
        grid.setAttribute('id', `${i}, ${j}`)
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

game.placeShip(playerOneDestroyer, 0, 0)
game.placeShip(playerOneBattleship, 2, 2)
game.placeShip(playerOneCarrier, 1, 3)
game.placeShip(playerOneSubmarine, 7, 6, 'horizontal')
game.placeShip(playerOneCruiser, 9, 0, 'horizontal')

document.addEventListener('click', function(e){
    if(e.target && e.target.className === 'grid'){
        let coordinates = e.target.id
        let coordinatesRow = coordinates.charAt(0)
        let coordinatesCol = coordinates.slice(-1)
        game.receiveAttack(coordinatesRow, coordinatesCol)
        game.allShipsSunk()
        console.log(playerOneCarrier.lengthArray)
        //playerOneCarrier.isSunk()
}
})

/*
0: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10'],
1: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'],
2: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'],
3: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10'],
4: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10'],
5: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10'],
6: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10'],
7: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10'],
8: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9', 'i10'],
9: ['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10'],
*/
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxVQUFVLHlCQUF5Qjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBLCtCQUErQixJQUFJLElBQUksVUFBVTtBQUNqRDtBQUNBLFNBQVM7QUFDVCw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTyxJQUFJLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELElBQUksSUFBSSxPQUFPO0FBQ2pFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGtEQUFrRCxJQUFJLElBQUksT0FBTztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EsbUNBQW1DLEVBQUUsSUFBSSxFQUFFO0FBQzNDO0FBQ0E7QUFDQSxtRkFBbUYsR0FBRztBQUN0RjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EsbUNBQW1DLEVBQUUsSUFBSSxFQUFFO0FBQzNDO0FBQ0E7QUFDQSxvRkFBb0YsR0FBRztBQUN2RjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZlbnQpID0+IHtcbiAgICBsZXQgZ2FtZSA9IGdhbWVib2FyZCgpXG4gICAgZ2FtZS5wbGFjZVNoaXAoKVxuICAgIGNvbnNvbGUubG9nKGdhbWUucGxhY2VTaGlwKCkpXG59KSovXG5cbi8vY29uc3QgeyBDb250ZXh0RXhjbHVzaW9uUGx1Z2luIH0gPSByZXF1aXJlKFwid2VicGFja1wiKVxuXG5mdW5jdGlvbiBzaGlwKG5hbWUsIGxlbmd0aCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbGVuZ3RoQXJyYXk6IGNhbGN1bGF0ZVNoaXBMZW5ndGgobGVuZ3RoKSxcbiAgICAgICAgaGl0KG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhBcnJheVtudW1iZXJdID0gMVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoQXJyYXlcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoQXJyYXkuaW5jbHVkZXMoMCkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZhbHNlKVxuICAgICAgICAgICAgfWVsc2UgaWYgKCF0aGlzLmxlbmd0aEFycmF5LmluY2x1ZGVzKDApKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTaGlwTGVuZ3RoKGxlbmd0aCkge1xuICAgIGxldCBhcnIgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgICAgICBhcnIucHVzaCgwKVxuICAgIH1cbiAgICByZXR1cm4gYXJyXG59XG5cbi8qY29uc3Qgc2hpcHMgPSB7XG4gICAgY2FycmllcjogNSxcbiAgICBiYXR0bGVTaGlwOiA0LFxuICAgIGNydWlzZXI6IDMsXG4gICAgc3VibWFyaW5lOiAzLFxuICAgIGRlc3Ryb3llcjogMlxufSovXG5cbmxldCBjcmVhdGVHcmlkID0ge1xuICAgIDA6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAxOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDM6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA0OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDY6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA3OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgODogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDk6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbn1cblxuY29uc3QgcGxheWVyT25lQ2FycmllciA9IHNoaXAoJ2NhcnJpZXInLCA1KVxuY29uc3QgcGxheWVyT25lQmF0dGxlc2hpcCA9IHNoaXAoJ2JhdHRsZXNoaXAnLCA0KVxuY29uc3QgcGxheWVyT25lU3VibWFyaW5lID0gc2hpcCgnc3VibWFyaW5lJywgMylcbmNvbnN0IHBsYXllck9uZUNydWlzZXIgPSBzaGlwKCdjcnVpc2VyJywgMylcbmNvbnN0IHBsYXllck9uZURlc3Ryb3llciA9IHNoaXAoJ2Rlc3Ryb3llcicsIDIpXG5cbmZ1bmN0aW9uIGdhbWVib2FyZCgpIHtcbiAgICBsZXQgc2hpcExvY2F0aW9uID0gMlxuICAgIGxldCBlbXB0eVNwYWNlID0gMFxuICAgIGxldCBtaXNzID0gM1xuICAgIGxldCBoaXQgPSAxXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBOYW1lLCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24gPSAndmVydGljYWwnKSA9PiB7XG4gICAgICAgIGxldCBuZXdTaGlwID0gc2hpcE5hbWUubGVuZ3RoQXJyYXlcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q29sdW1uID0gY29sdW1uICsgaVxuICAgICAgICAgICAgICAgIGNyZWF0ZUdyaWRbcm93XVtuZXdDb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgIHNoaXBMb2NhdG9yKGAke3Jvd30sICR7bmV3Q29sdW1ufWAsIHNoaXBOYW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3U2hpcC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHJvdyArIGlcbiAgICAgICAgICAgICAgICBjcmVhdGVHcmlkW25ld1Jvd11bY29sdW1uXSA9IDJcbiAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtuZXdSb3d9LCAke2NvbHVtbn1gLCBzaGlwTmFtZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL3JhbmRvbSBwbGFjZW1lbnRcbiAgICAgICAgLypjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY3JlYXRlR3JpZClcbiAgICAgICAgY29uc3QgcHJvcCA9IGtleXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5cy5sZW5ndGgpXVxuICAgICAgICBjb25zdCBrZXlzMiA9IE9iamVjdC5rZXlzKGNyZWF0ZUdyaWRbcHJvcF0pXG4gICAgICAgIGNvbnN0IHByb3AyID0ga2V5czJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5czIubGVuZ3RoKV1cbiAgICAgICAgY3JlYXRlR3JpZFtwcm9wXVtwcm9wMl0gPSBzaGlwTG9jYXRpb24qL1xuICAgICAgICByZXR1cm4gY3JlYXRlR3JpZFxuICAgIH1cbiAgICAgICAgbGV0IG5ld0dyaWQgPSBjcmVhdGVHcmlkXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgICAgICBpZiAobmV3R3JpZFtyb3ddW2NvbHVtbl0gPT09IGVtcHR5U3BhY2Upe1xuICAgICAgICAgICAgbmV3R3JpZFtyb3ddW2NvbHVtbl0gPSBtaXNzXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG5ld0dyaWQpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Jvd30sICR7Y29sdW1ufWApXG4gICAgICAgICAgICBwb3B1bGF0ZUdyaWQoaXRlbS5pZCwgJ01pc3MnKVxuICAgICAgICAgICAgcmV0dXJuIG5ld0dyaWRcbiAgICAgICAgfWVsc2UgaWYgKG5ld0dyaWRbcm93XVtjb2x1bW5dID09PSBzaGlwTG9jYXRpb24pe1xuICAgICAgICAgICAgbmV3R3JpZFtyb3ddW2NvbHVtbl0gPSBoaXRcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobmV3R3JpZClcbiAgICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cm93fSwgJHtjb2x1bW59YClcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnSGl0JylcbiAgICAgICAgICAgIHJldHVybiBuZXdHcmlkXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgICAgICAvKmlmKHBsYXllck9uZUNhcnJpZXIuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyT25lQmF0dGxlc2hpcC5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBwbGF5ZXJPbmVDcnVpc2VyLmlzU3VuaygpID09PSB0cnVlICYmIHBsYXllck9uZVN1Ym1hcmluZS5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBwbGF5ZXJPbmVEZXN0cm95ZXIuaXNTdW5rKCkgPT09IHRydWUpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dhbWUgT3ZlcicpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05ldyBSb3VuZCcpXG4gICAgICAgIH0qL1xuICAgICAgICBjb25zb2xlLmxvZyhjcmVhdGVHcmlkKVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNlaXZlQXR0YWNrLCBwbGFjZVNoaXAsIGFsbFNoaXBzU3Vua1xuICAgIH1cbn1cblxuY29uc3Qgc2hpcExvY2F0b3IgPSAoY29vcmRpbmF0ZXMsIHNoaXBOYW1lKSA9PiB7XG4gICAgbGV0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb29yZGluYXRlcylcbiAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1zaGlwTmFtZScsIHNoaXBOYW1lLm5hbWUpXG59XG5cbi8vXG4vL0NyZWF0ZXMgdGhlIGdyaWQgaW4gdGhlIERPTVxuLy9cbmxldCBjcmVhdGVOZXdHcmlkID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdjb250YWluZXInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgO1xuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSwgJHtqfWApXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHsxMH0sIDFmcilgO1xuICAgIH1cbn0pKClcblxubGV0IGNyZWF0ZU5ld0dyaWQyID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGFpbmVyMi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcjInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyMilcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspe1xuICAgICAgICBsZXQgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmlkLmNsYXNzTmFtZSA9IGBncmlkYFxuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSwgJHtqfWApXG4gICAgICAgIGNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcjInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5jb25zdCBwb3B1bGF0ZUdyaWQgPSAoY29vcmRpbmF0ZXMsIHJlc3VsdCkgPT4ge1xuICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29vcmRpbmF0ZXMpXG4gICAgaXRlbS5pbm5lclRleHQgPSAnWCdcbiAgICBpZiAocmVzdWx0ID09ICdIaXQnKXtcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsdWUnXG4gICAgfVxufVxuXG5jb25zdCBnYW1lID0gZ2FtZWJvYXJkKClcblxuZ2FtZS5wbGFjZVNoaXAocGxheWVyT25lRGVzdHJveWVyLCAwLCAwKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyT25lQmF0dGxlc2hpcCwgMiwgMilcbmdhbWUucGxhY2VTaGlwKHBsYXllck9uZUNhcnJpZXIsIDEsIDMpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJPbmVTdWJtYXJpbmUsIDcsIDYsICdob3Jpem9udGFsJylcbmdhbWUucGxhY2VTaGlwKHBsYXllck9uZUNydWlzZXIsIDksIDAsICdob3Jpem9udGFsJylcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5jbGFzc05hbWUgPT09ICdncmlkJyl7XG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IGUudGFyZ2V0LmlkXG4gICAgICAgIGxldCBjb29yZGluYXRlc1JvdyA9IGNvb3JkaW5hdGVzLmNoYXJBdCgwKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNDb2wgPSBjb29yZGluYXRlcy5zbGljZSgtMSlcbiAgICAgICAgZ2FtZS5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzUm93LCBjb29yZGluYXRlc0NvbClcbiAgICAgICAgZ2FtZS5hbGxTaGlwc1N1bmsoKVxuICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXJPbmVDYXJyaWVyLmxlbmd0aEFycmF5KVxuICAgICAgICAvL3BsYXllck9uZUNhcnJpZXIuaXNTdW5rKClcbn1cbn0pXG5cbi8qXG4wOiBbJ2ExJywgJ2EyJywgJ2EzJywgJ2E0JywgJ2E1JywgJ2E2JywgJ2E3JywgJ2E4JywgJ2E5JywgJ2ExMCddLFxuMTogWydiMScsICdiMicsICdiMycsICdiNCcsICdiNScsICdiNicsICdiNycsICdiOCcsICdiOScsICdiMTAnXSxcbjI6IFsnYzEnLCAnYzInLCAnYzMnLCAnYzQnLCAnYzUnLCAnYzYnLCAnYzcnLCAnYzgnLCAnYzknLCAnYzEwJ10sXG4zOiBbJ2QxJywgJ2QyJywgJ2QzJywgJ2Q0JywgJ2Q1JywgJ2Q2JywgJ2Q3JywgJ2Q4JywgJ2Q5JywgJ2QxMCddLFxuNDogWydlMScsICdlMicsICdlMycsICdlNCcsICdlNScsICdlNicsICdlNycsICdlOCcsICdlOScsICdlMTAnXSxcbjU6IFsnZjEnLCAnZjInLCAnZjMnLCAnZjQnLCAnZjUnLCAnZjYnLCAnZjcnLCAnZjgnLCAnZjknLCAnZjEwJ10sXG42OiBbJ2cxJywgJ2cyJywgJ2czJywgJ2c0JywgJ2c1JywgJ2c2JywgJ2c3JywgJ2c4JywgJ2c5JywgJ2cxMCddLFxuNzogWydoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdoNycsICdoOCcsICdoOScsICdoMTAnXSxcbjg6IFsnaTEnLCAnaTInLCAnaTMnLCAnaTQnLCAnaTUnLCAnaTYnLCAnaTcnLCAnaTgnLCAnaTknLCAnaTEwJ10sXG45OiBbJ2oxJywgJ2oyJywgJ2ozJywgJ2o0JywgJ2o1JywgJ2o2JywgJ2o3JywgJ2o4JywgJ2o5JywgJ2oxMCddLFxuKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=