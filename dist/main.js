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

/*const playerOneCarrier = ship('carrier', 5)
const playerOneBattleship = ship('battleship', 4)
const playerOneSubmarine = ship('submarine', 3)
const playerOneCruiser = ship('cruiser', 3)
const playerOneDestroyer = ship('destroyer', 2)*/

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
    {"name": destroyer4}
]

//let result = carrier.find(item => item.name === carrier)
//console.log(carrier)

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
            let shipName = item.getAttribute('data-shipname')
            let shipArray = getShipArray(shipName)
            console.log(shipArray)
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

const getShipArray = (shipName) => {
    let index = shipName.slice(-1)
    return playerOneShips[index].name
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

/*game.placeShip(playerOneDestroyer, 0, 0)
game.placeShip(playerOneBattleship, 2, 2)
game.placeShip(playerOneCarrier, 1, 3)
game.placeShip(playerOneSubmarine, 7, 6, 'horizontal')
game.placeShip(playerOneCruiser, 9, 0, 'horizontal')*/

game.placeShip(destroyer4, 0, 0)
game.placeShip(battleship1, 2, 2)
game.placeShip(carrier0, 1, 3)
game.placeShip(submarine2, 7, 6, 'horizontal')
game.placeShip(cruiser3, 9, 0, 'horizontal')

document.addEventListener('click', function(e){
    if(e.target && e.target.className === 'grid'){
        let coordinates = e.target.id
        let coordinatesRow = coordinates.charAt(0)
        let coordinatesCol = coordinates.slice(-1)
        game.receiveAttack(coordinatesRow, coordinatesCol)
        game.allShipsSunk()
        //console.log(playerOneCarrier.lengthArray)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxVQUFVLHlCQUF5Qjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssb0JBQW9CO0FBQ3pCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQSwrQkFBK0IsSUFBSSxJQUFJLFVBQVU7QUFDakQ7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0EsK0JBQStCLE9BQU8sSUFBSSxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxJQUFJLElBQUksT0FBTztBQUNqRTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxrREFBa0QsSUFBSSxJQUFJLE9BQU87QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLG1DQUFtQyxFQUFFLElBQUksRUFBRTtBQUMzQztBQUNBO0FBQ0EsbUZBQW1GLEdBQUc7QUFDdEY7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLG1DQUFtQyxFQUFFLElBQUksRUFBRTtBQUMzQztBQUNBO0FBQ0Esb0ZBQW9GLEdBQUc7QUFDdkY7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZlbnQpID0+IHtcbiAgICBsZXQgZ2FtZSA9IGdhbWVib2FyZCgpXG4gICAgZ2FtZS5wbGFjZVNoaXAoKVxuICAgIGNvbnNvbGUubG9nKGdhbWUucGxhY2VTaGlwKCkpXG59KSovXG5cbi8vY29uc3QgeyBDb250ZXh0RXhjbHVzaW9uUGx1Z2luIH0gPSByZXF1aXJlKFwid2VicGFja1wiKVxuXG5mdW5jdGlvbiBzaGlwKG5hbWUsIGxlbmd0aCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbGVuZ3RoQXJyYXk6IGNhbGN1bGF0ZVNoaXBMZW5ndGgobGVuZ3RoKSxcbiAgICAgICAgaGl0KG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhBcnJheVtudW1iZXJdID0gMVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoQXJyYXlcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoQXJyYXkuaW5jbHVkZXMoMCkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZhbHNlKVxuICAgICAgICAgICAgfWVsc2UgaWYgKCF0aGlzLmxlbmd0aEFycmF5LmluY2x1ZGVzKDApKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTaGlwTGVuZ3RoKGxlbmd0aCkge1xuICAgIGxldCBhcnIgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgICAgICBhcnIucHVzaCgwKVxuICAgIH1cbiAgICByZXR1cm4gYXJyXG59XG5cbi8qY29uc3Qgc2hpcHMgPSB7XG4gICAgY2FycmllcjogNSxcbiAgICBiYXR0bGVTaGlwOiA0LFxuICAgIGNydWlzZXI6IDMsXG4gICAgc3VibWFyaW5lOiAzLFxuICAgIGRlc3Ryb3llcjogMlxufSovXG5cbmxldCBjcmVhdGVHcmlkID0ge1xuICAgIDA6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAxOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDM6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA0OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDY6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA3OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgODogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDk6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbn1cblxuLypjb25zdCBwbGF5ZXJPbmVDYXJyaWVyID0gc2hpcCgnY2FycmllcicsIDUpXG5jb25zdCBwbGF5ZXJPbmVCYXR0bGVzaGlwID0gc2hpcCgnYmF0dGxlc2hpcCcsIDQpXG5jb25zdCBwbGF5ZXJPbmVTdWJtYXJpbmUgPSBzaGlwKCdzdWJtYXJpbmUnLCAzKVxuY29uc3QgcGxheWVyT25lQ3J1aXNlciA9IHNoaXAoJ2NydWlzZXInLCAzKVxuY29uc3QgcGxheWVyT25lRGVzdHJveWVyID0gc2hpcCgnZGVzdHJveWVyJywgMikqL1xuXG5jb25zdCBjYXJyaWVyMCA9IHNoaXAoJ2NhcnJpZXIwJywgNSlcbmNvbnN0IGJhdHRsZXNoaXAxID0gc2hpcCgnYmF0dGxlc2hpcDEnLCA0KVxuY29uc3Qgc3VibWFyaW5lMiA9IHNoaXAoJ3N1Ym1hcmluZTInLCAzKVxuY29uc3QgY3J1aXNlcjMgPSBzaGlwKCdjcnVpc2VyMycsIDMpXG5jb25zdCBkZXN0cm95ZXI0ID0gc2hpcCgnZGVzdHJveWVyNCcsIDIpXG5cbmNvbnN0IHBsYXllck9uZVNoaXBzID0gW1xuICAgIHtcIm5hbWVcIjogY2FycmllcjB9LFxuICAgIHtcIm5hbWVcIjogYmF0dGxlc2hpcDF9LFxuICAgIHtcIm5hbWVcIjogc3VibWFyaW5lMn0sXG4gICAge1wibmFtZVwiOiBjcnVpc2VyM30sXG4gICAge1wibmFtZVwiOiBkZXN0cm95ZXI0fVxuXVxuXG4vL2xldCByZXN1bHQgPSBjYXJyaWVyLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGNhcnJpZXIpXG4vL2NvbnNvbGUubG9nKGNhcnJpZXIpXG5cbmZ1bmN0aW9uIGdhbWVib2FyZCgpIHtcbiAgICBsZXQgc2hpcExvY2F0aW9uID0gMlxuICAgIGxldCBlbXB0eVNwYWNlID0gMFxuICAgIGxldCBtaXNzID0gM1xuICAgIGxldCBoaXQgPSAxXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBOYW1lLCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24gPSAndmVydGljYWwnKSA9PiB7XG4gICAgICAgIGxldCBuZXdTaGlwID0gc2hpcE5hbWUubGVuZ3RoQXJyYXlcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q29sdW1uID0gY29sdW1uICsgaVxuICAgICAgICAgICAgICAgIGNyZWF0ZUdyaWRbcm93XVtuZXdDb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgIHNoaXBMb2NhdG9yKGAke3Jvd30sICR7bmV3Q29sdW1ufWAsIHNoaXBOYW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3U2hpcC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHJvdyArIGlcbiAgICAgICAgICAgICAgICBjcmVhdGVHcmlkW25ld1Jvd11bY29sdW1uXSA9IDJcbiAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtuZXdSb3d9LCAke2NvbHVtbn1gLCBzaGlwTmFtZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL3JhbmRvbSBwbGFjZW1lbnRcbiAgICAgICAgLypjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY3JlYXRlR3JpZClcbiAgICAgICAgY29uc3QgcHJvcCA9IGtleXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5cy5sZW5ndGgpXVxuICAgICAgICBjb25zdCBrZXlzMiA9IE9iamVjdC5rZXlzKGNyZWF0ZUdyaWRbcHJvcF0pXG4gICAgICAgIGNvbnN0IHByb3AyID0ga2V5czJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5czIubGVuZ3RoKV1cbiAgICAgICAgY3JlYXRlR3JpZFtwcm9wXVtwcm9wMl0gPSBzaGlwTG9jYXRpb24qL1xuICAgICAgICByZXR1cm4gY3JlYXRlR3JpZFxuICAgIH1cbiAgICAgICAgbGV0IG5ld0dyaWQgPSBjcmVhdGVHcmlkXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgICAgICBpZiAobmV3R3JpZFtyb3ddW2NvbHVtbl0gPT09IGVtcHR5U3BhY2Upe1xuICAgICAgICAgICAgbmV3R3JpZFtyb3ddW2NvbHVtbl0gPSBtaXNzXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG5ld0dyaWQpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Jvd30sICR7Y29sdW1ufWApXG4gICAgICAgICAgICBwb3B1bGF0ZUdyaWQoaXRlbS5pZCwgJ01pc3MnKVxuICAgICAgICAgICAgcmV0dXJuIG5ld0dyaWRcbiAgICAgICAgfWVsc2UgaWYgKG5ld0dyaWRbcm93XVtjb2x1bW5dID09PSBzaGlwTG9jYXRpb24pe1xuICAgICAgICAgICAgbmV3R3JpZFtyb3ddW2NvbHVtbl0gPSBoaXRcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobmV3R3JpZClcbiAgICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cm93fSwgJHtjb2x1bW59YClcbiAgICAgICAgICAgIGxldCBzaGlwTmFtZSA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXNoaXBuYW1lJylcbiAgICAgICAgICAgIGxldCBzaGlwQXJyYXkgPSBnZXRTaGlwQXJyYXkoc2hpcE5hbWUpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwQXJyYXkpXG4gICAgICAgICAgICBwb3B1bGF0ZUdyaWQoaXRlbS5pZCwgJ0hpdCcpXG4gICAgICAgICAgICByZXR1cm4gbmV3R3JpZFxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICAgICAgLyppZihwbGF5ZXJPbmVDYXJyaWVyLmlzU3VuaygpID09PSB0cnVlICYmIHBsYXllck9uZUJhdHRsZXNoaXAuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyT25lQ3J1aXNlci5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBwbGF5ZXJPbmVTdWJtYXJpbmUuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyT25lRGVzdHJveWVyLmlzU3VuaygpID09PSB0cnVlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHYW1lIE92ZXInKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOZXcgUm91bmQnKVxuICAgICAgICB9Ki9cbiAgICAgICAgY29uc29sZS5sb2coY3JlYXRlR3JpZClcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjZWl2ZUF0dGFjaywgcGxhY2VTaGlwLCBhbGxTaGlwc1N1bmtcbiAgICB9XG59XG5cbmNvbnN0IGdldFNoaXBBcnJheSA9IChzaGlwTmFtZSkgPT4ge1xuICAgIGxldCBpbmRleCA9IHNoaXBOYW1lLnNsaWNlKC0xKVxuICAgIHJldHVybiBwbGF5ZXJPbmVTaGlwc1tpbmRleF0ubmFtZVxufVxuXG5jb25zdCBzaGlwTG9jYXRvciA9IChjb29yZGluYXRlcywgc2hpcE5hbWUpID0+IHtcbiAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvb3JkaW5hdGVzKVxuICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLXNoaXBOYW1lJywgc2hpcE5hbWUubmFtZSlcbn1cblxuLy9cbi8vQ3JlYXRlcyB0aGUgZ3JpZCBpbiB0aGUgRE9NXG4vL1xubGV0IGNyZWF0ZU5ld0dyaWQgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGA7XG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9LCAke2p9YClcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5sZXQgY3JlYXRlTmV3R3JpZDIgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29udGFpbmVyMicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9LCAke2p9YClcbiAgICAgICAgY29udGFpbmVyMi5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyMicpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7MTB9LCAxZnIpYDtcbiAgICB9XG59KSgpXG5cbmNvbnN0IHBvcHVsYXRlR3JpZCA9IChjb29yZGluYXRlcywgcmVzdWx0KSA9PiB7XG4gICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb29yZGluYXRlcylcbiAgICBpdGVtLmlubmVyVGV4dCA9ICdYJ1xuICAgIGlmIChyZXN1bHQgPT0gJ0hpdCcpe1xuICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSdcbiAgICB9XG59XG5cbmNvbnN0IGdhbWUgPSBnYW1lYm9hcmQoKVxuXG4vKmdhbWUucGxhY2VTaGlwKHBsYXllck9uZURlc3Ryb3llciwgMCwgMClcbmdhbWUucGxhY2VTaGlwKHBsYXllck9uZUJhdHRsZXNoaXAsIDIsIDIpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJPbmVDYXJyaWVyLCAxLCAzKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyT25lU3VibWFyaW5lLCA3LCA2LCAnaG9yaXpvbnRhbCcpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJPbmVDcnVpc2VyLCA5LCAwLCAnaG9yaXpvbnRhbCcpKi9cblxuZ2FtZS5wbGFjZVNoaXAoZGVzdHJveWVyNCwgMCwgMClcbmdhbWUucGxhY2VTaGlwKGJhdHRsZXNoaXAxLCAyLCAyKVxuZ2FtZS5wbGFjZVNoaXAoY2FycmllcjAsIDEsIDMpXG5nYW1lLnBsYWNlU2hpcChzdWJtYXJpbmUyLCA3LCA2LCAnaG9yaXpvbnRhbCcpXG5nYW1lLnBsYWNlU2hpcChjcnVpc2VyMywgOSwgMCwgJ2hvcml6b250YWwnKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dyaWQnKXtcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0gZS50YXJnZXQuaWRcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzUm93ID0gY29vcmRpbmF0ZXMuY2hhckF0KDApXG4gICAgICAgIGxldCBjb29yZGluYXRlc0NvbCA9IGNvb3JkaW5hdGVzLnNsaWNlKC0xKVxuICAgICAgICBnYW1lLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXNSb3csIGNvb3JkaW5hdGVzQ29sKVxuICAgICAgICBnYW1lLmFsbFNoaXBzU3VuaygpXG4gICAgICAgIC8vY29uc29sZS5sb2cocGxheWVyT25lQ2Fycmllci5sZW5ndGhBcnJheSlcbiAgICAgICAgLy9wbGF5ZXJPbmVDYXJyaWVyLmlzU3VuaygpXG59XG59KVxuXG4vKlxuMDogWydhMScsICdhMicsICdhMycsICdhNCcsICdhNScsICdhNicsICdhNycsICdhOCcsICdhOScsICdhMTAnXSxcbjE6IFsnYjEnLCAnYjInLCAnYjMnLCAnYjQnLCAnYjUnLCAnYjYnLCAnYjcnLCAnYjgnLCAnYjknLCAnYjEwJ10sXG4yOiBbJ2MxJywgJ2MyJywgJ2MzJywgJ2M0JywgJ2M1JywgJ2M2JywgJ2M3JywgJ2M4JywgJ2M5JywgJ2MxMCddLFxuMzogWydkMScsICdkMicsICdkMycsICdkNCcsICdkNScsICdkNicsICdkNycsICdkOCcsICdkOScsICdkMTAnXSxcbjQ6IFsnZTEnLCAnZTInLCAnZTMnLCAnZTQnLCAnZTUnLCAnZTYnLCAnZTcnLCAnZTgnLCAnZTknLCAnZTEwJ10sXG41OiBbJ2YxJywgJ2YyJywgJ2YzJywgJ2Y0JywgJ2Y1JywgJ2Y2JywgJ2Y3JywgJ2Y4JywgJ2Y5JywgJ2YxMCddLFxuNjogWydnMScsICdnMicsICdnMycsICdnNCcsICdnNScsICdnNicsICdnNycsICdnOCcsICdnOScsICdnMTAnXSxcbjc6IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaDcnLCAnaDgnLCAnaDknLCAnaDEwJ10sXG44OiBbJ2kxJywgJ2kyJywgJ2kzJywgJ2k0JywgJ2k1JywgJ2k2JywgJ2k3JywgJ2k4JywgJ2k5JywgJ2kxMCddLFxuOTogWydqMScsICdqMicsICdqMycsICdqNCcsICdqNScsICdqNicsICdqNycsICdqOCcsICdqOScsICdqMTAnXSxcbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9