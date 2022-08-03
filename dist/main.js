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
                shipLocator(`${row}, ${newColumn}`, shipName, i)
            }
        }else{
            for (let i = 0; i < newShip.length; i++){
                let newRow = row + i
                createGrid[newRow][column] = 2
                shipLocator(`${newRow}, ${column}`, shipName, i)
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
            let shipIndex = item.getAttribute('data-index')
            //shipArray.lengthArray.splice(shipIndex, 1, 1)
            shipArray.hit(shipIndex)
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

const shipLocator = (coordinates, shipName, index) => {
    let cell = document.getElementById(coordinates)
    cell.setAttribute('data-shipName', shipName.name)
    cell.setAttribute('data-index', index)
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
        console.log(playerOneShips)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxVQUFVLHlCQUF5Qjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssb0JBQW9CO0FBQ3pCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQSwrQkFBK0IsSUFBSSxJQUFJLFVBQVU7QUFDakQ7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0EsK0JBQStCLE9BQU8sSUFBSSxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxJQUFJLElBQUksT0FBTztBQUNqRTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxrREFBa0QsSUFBSSxJQUFJLE9BQU87QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLG1DQUFtQyxFQUFFLElBQUksRUFBRTtBQUMzQztBQUNBO0FBQ0EsbUZBQW1GLEdBQUc7QUFDdEY7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLG1DQUFtQyxFQUFFLElBQUksRUFBRTtBQUMzQztBQUNBO0FBQ0Esb0ZBQW9GLEdBQUc7QUFDdkY7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyp3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudCkgPT4ge1xuICAgIGxldCBnYW1lID0gZ2FtZWJvYXJkKClcbiAgICBnYW1lLnBsYWNlU2hpcCgpXG4gICAgY29uc29sZS5sb2coZ2FtZS5wbGFjZVNoaXAoKSlcbn0pKi9cblxuLy9jb25zdCB7IENvbnRleHRFeGNsdXNpb25QbHVnaW4gfSA9IHJlcXVpcmUoXCJ3ZWJwYWNrXCIpXG5cbmZ1bmN0aW9uIHNoaXAobmFtZSwgbGVuZ3RoKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBsZW5ndGhBcnJheTogY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpLFxuICAgICAgICBoaXQobnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aEFycmF5W251bWJlcl0gPSAxXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGhBcnJheVxuICAgICAgICB9LFxuICAgICAgICBpc1N1bmsoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sZW5ndGhBcnJheS5pbmNsdWRlcygwKSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmFsc2UpXG4gICAgICAgICAgICB9ZWxzZSBpZiAoIXRoaXMubGVuZ3RoQXJyYXkuaW5jbHVkZXMoMCkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNoaXBMZW5ndGgobGVuZ3RoKSB7XG4gICAgbGV0IGFyciA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XG4gICAgICAgIGFyci5wdXNoKDApXG4gICAgfVxuICAgIHJldHVybiBhcnJcbn1cblxuLypjb25zdCBzaGlwcyA9IHtcbiAgICBjYXJyaWVyOiA1LFxuICAgIGJhdHRsZVNoaXA6IDQsXG4gICAgY3J1aXNlcjogMyxcbiAgICBzdWJtYXJpbmU6IDMsXG4gICAgZGVzdHJveWVyOiAyXG59Ki9cblxubGV0IGNyZWF0ZUdyaWQgPSB7XG4gICAgMDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDE6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAyOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDQ6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA1OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDc6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA4OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgOTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxufVxuXG4vKmNvbnN0IHBsYXllck9uZUNhcnJpZXIgPSBzaGlwKCdjYXJyaWVyJywgNSlcbmNvbnN0IHBsYXllck9uZUJhdHRsZXNoaXAgPSBzaGlwKCdiYXR0bGVzaGlwJywgNClcbmNvbnN0IHBsYXllck9uZVN1Ym1hcmluZSA9IHNoaXAoJ3N1Ym1hcmluZScsIDMpXG5jb25zdCBwbGF5ZXJPbmVDcnVpc2VyID0gc2hpcCgnY3J1aXNlcicsIDMpXG5jb25zdCBwbGF5ZXJPbmVEZXN0cm95ZXIgPSBzaGlwKCdkZXN0cm95ZXInLCAyKSovXG5cbmNvbnN0IGNhcnJpZXIwID0gc2hpcCgnY2FycmllcjAnLCA1KVxuY29uc3QgYmF0dGxlc2hpcDEgPSBzaGlwKCdiYXR0bGVzaGlwMScsIDQpXG5jb25zdCBzdWJtYXJpbmUyID0gc2hpcCgnc3VibWFyaW5lMicsIDMpXG5jb25zdCBjcnVpc2VyMyA9IHNoaXAoJ2NydWlzZXIzJywgMylcbmNvbnN0IGRlc3Ryb3llcjQgPSBzaGlwKCdkZXN0cm95ZXI0JywgMilcblxuY29uc3QgcGxheWVyT25lU2hpcHMgPSBbXG4gICAge1wibmFtZVwiOiBjYXJyaWVyMH0sXG4gICAge1wibmFtZVwiOiBiYXR0bGVzaGlwMX0sXG4gICAge1wibmFtZVwiOiBzdWJtYXJpbmUyfSxcbiAgICB7XCJuYW1lXCI6IGNydWlzZXIzfSxcbiAgICB7XCJuYW1lXCI6IGRlc3Ryb3llcjR9XG5dXG5cbi8vbGV0IHJlc3VsdCA9IGNhcnJpZXIuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gY2Fycmllcilcbi8vY29uc29sZS5sb2coY2FycmllcilcblxuZnVuY3Rpb24gZ2FtZWJvYXJkKCkge1xuICAgIGxldCBzaGlwTG9jYXRpb24gPSAyXG4gICAgbGV0IGVtcHR5U3BhY2UgPSAwXG4gICAgbGV0IG1pc3MgPSAzXG4gICAgbGV0IGhpdCA9IDFcbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcE5hbWUsIHJvdywgY29sdW1uLCBvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCcpID0+IHtcbiAgICAgICAgbGV0IG5ld1NoaXAgPSBzaGlwTmFtZS5sZW5ndGhBcnJheVxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoaXAubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBuZXdDb2x1bW4gPSBjb2x1bW4gKyBpXG4gICAgICAgICAgICAgICAgY3JlYXRlR3JpZFtyb3ddW25ld0NvbHVtbl0gPSAyXG4gICAgICAgICAgICAgICAgc2hpcExvY2F0b3IoYCR7cm93fSwgJHtuZXdDb2x1bW59YCwgc2hpcE5hbWUsIGkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Um93ID0gcm93ICsgaVxuICAgICAgICAgICAgICAgIGNyZWF0ZUdyaWRbbmV3Um93XVtjb2x1bW5dID0gMlxuICAgICAgICAgICAgICAgIHNoaXBMb2NhdG9yKGAke25ld1Jvd30sICR7Y29sdW1ufWAsIHNoaXBOYW1lLCBpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vcmFuZG9tIHBsYWNlbWVudFxuICAgICAgICAvKmNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjcmVhdGVHcmlkKVxuICAgICAgICBjb25zdCBwcm9wID0ga2V5c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBrZXlzLmxlbmd0aCldXG4gICAgICAgIGNvbnN0IGtleXMyID0gT2JqZWN0LmtleXMoY3JlYXRlR3JpZFtwcm9wXSlcbiAgICAgICAgY29uc3QgcHJvcDIgPSBrZXlzMltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBrZXlzMi5sZW5ndGgpXVxuICAgICAgICBjcmVhdGVHcmlkW3Byb3BdW3Byb3AyXSA9IHNoaXBMb2NhdGlvbiovXG4gICAgICAgIHJldHVybiBjcmVhdGVHcmlkXG4gICAgfVxuICAgICAgICBsZXQgbmV3R3JpZCA9IGNyZWF0ZUdyaWRcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgICAgIGlmIChuZXdHcmlkW3Jvd11bY29sdW1uXSA9PT0gZW1wdHlTcGFjZSl7XG4gICAgICAgICAgICBuZXdHcmlkW3Jvd11bY29sdW1uXSA9IG1pc3NcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobmV3R3JpZClcbiAgICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cm93fSwgJHtjb2x1bW59YClcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnTWlzcycpXG4gICAgICAgICAgICByZXR1cm4gbmV3R3JpZFxuICAgICAgICB9ZWxzZSBpZiAobmV3R3JpZFtyb3ddW2NvbHVtbl0gPT09IHNoaXBMb2NhdGlvbil7XG4gICAgICAgICAgICBuZXdHcmlkW3Jvd11bY29sdW1uXSA9IGhpdFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhuZXdHcmlkKVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgbGV0IHNoaXBOYW1lID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcG5hbWUnKVxuICAgICAgICAgICAgbGV0IHNoaXBBcnJheSA9IGdldFNoaXBBcnJheShzaGlwTmFtZSlcbiAgICAgICAgICAgIGxldCBzaGlwSW5kZXggPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpXG4gICAgICAgICAgICAvL3NoaXBBcnJheS5sZW5ndGhBcnJheS5zcGxpY2Uoc2hpcEluZGV4LCAxLCAxKVxuICAgICAgICAgICAgc2hpcEFycmF5LmhpdChzaGlwSW5kZXgpXG4gICAgICAgICAgICBwb3B1bGF0ZUdyaWQoaXRlbS5pZCwgJ0hpdCcpXG4gICAgICAgICAgICByZXR1cm4gbmV3R3JpZFxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICAgICAgLyppZihwbGF5ZXJPbmVDYXJyaWVyLmlzU3VuaygpID09PSB0cnVlICYmIHBsYXllck9uZUJhdHRsZXNoaXAuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyT25lQ3J1aXNlci5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBwbGF5ZXJPbmVTdWJtYXJpbmUuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyT25lRGVzdHJveWVyLmlzU3VuaygpID09PSB0cnVlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHYW1lIE92ZXInKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOZXcgUm91bmQnKVxuICAgICAgICB9Ki9cbiAgICAgICAgY29uc29sZS5sb2coY3JlYXRlR3JpZClcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjZWl2ZUF0dGFjaywgcGxhY2VTaGlwLCBhbGxTaGlwc1N1bmtcbiAgICB9XG59XG5cbmNvbnN0IGdldFNoaXBBcnJheSA9IChzaGlwTmFtZSkgPT4ge1xuICAgIGxldCBpbmRleCA9IHNoaXBOYW1lLnNsaWNlKC0xKVxuICAgIHJldHVybiBwbGF5ZXJPbmVTaGlwc1tpbmRleF0ubmFtZVxufVxuXG5jb25zdCBzaGlwTG9jYXRvciA9IChjb29yZGluYXRlcywgc2hpcE5hbWUsIGluZGV4KSA9PiB7XG4gICAgbGV0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb29yZGluYXRlcylcbiAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1zaGlwTmFtZScsIHNoaXBOYW1lLm5hbWUpXG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleClcbn1cblxuLy9cbi8vQ3JlYXRlcyB0aGUgZ3JpZCBpbiB0aGUgRE9NXG4vL1xubGV0IGNyZWF0ZU5ld0dyaWQgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGA7XG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9LCAke2p9YClcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5sZXQgY3JlYXRlTmV3R3JpZDIgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29udGFpbmVyMicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9LCAke2p9YClcbiAgICAgICAgY29udGFpbmVyMi5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyMicpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7MTB9LCAxZnIpYDtcbiAgICB9XG59KSgpXG5cbmNvbnN0IHBvcHVsYXRlR3JpZCA9IChjb29yZGluYXRlcywgcmVzdWx0KSA9PiB7XG4gICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb29yZGluYXRlcylcbiAgICBpdGVtLmlubmVyVGV4dCA9ICdYJ1xuICAgIGlmIChyZXN1bHQgPT0gJ0hpdCcpe1xuICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSdcbiAgICB9XG59XG5cbmNvbnN0IGdhbWUgPSBnYW1lYm9hcmQoKVxuXG4vKmdhbWUucGxhY2VTaGlwKHBsYXllck9uZURlc3Ryb3llciwgMCwgMClcbmdhbWUucGxhY2VTaGlwKHBsYXllck9uZUJhdHRsZXNoaXAsIDIsIDIpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJPbmVDYXJyaWVyLCAxLCAzKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyT25lU3VibWFyaW5lLCA3LCA2LCAnaG9yaXpvbnRhbCcpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJPbmVDcnVpc2VyLCA5LCAwLCAnaG9yaXpvbnRhbCcpKi9cblxuZ2FtZS5wbGFjZVNoaXAoZGVzdHJveWVyNCwgMCwgMClcbmdhbWUucGxhY2VTaGlwKGJhdHRsZXNoaXAxLCAyLCAyKVxuZ2FtZS5wbGFjZVNoaXAoY2FycmllcjAsIDEsIDMpXG5nYW1lLnBsYWNlU2hpcChzdWJtYXJpbmUyLCA3LCA2LCAnaG9yaXpvbnRhbCcpXG5nYW1lLnBsYWNlU2hpcChjcnVpc2VyMywgOSwgMCwgJ2hvcml6b250YWwnKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dyaWQnKXtcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0gZS50YXJnZXQuaWRcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzUm93ID0gY29vcmRpbmF0ZXMuY2hhckF0KDApXG4gICAgICAgIGxldCBjb29yZGluYXRlc0NvbCA9IGNvb3JkaW5hdGVzLnNsaWNlKC0xKVxuICAgICAgICBnYW1lLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXNSb3csIGNvb3JkaW5hdGVzQ29sKVxuICAgICAgICBnYW1lLmFsbFNoaXBzU3VuaygpXG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllck9uZVNoaXBzKVxuICAgICAgICAvL2NvbnNvbGUubG9nKHBsYXllck9uZUNhcnJpZXIubGVuZ3RoQXJyYXkpXG4gICAgICAgIC8vcGxheWVyT25lQ2Fycmllci5pc1N1bmsoKVxufVxufSlcblxuLypcbjA6IFsnYTEnLCAnYTInLCAnYTMnLCAnYTQnLCAnYTUnLCAnYTYnLCAnYTcnLCAnYTgnLCAnYTknLCAnYTEwJ10sXG4xOiBbJ2IxJywgJ2IyJywgJ2IzJywgJ2I0JywgJ2I1JywgJ2I2JywgJ2I3JywgJ2I4JywgJ2I5JywgJ2IxMCddLFxuMjogWydjMScsICdjMicsICdjMycsICdjNCcsICdjNScsICdjNicsICdjNycsICdjOCcsICdjOScsICdjMTAnXSxcbjM6IFsnZDEnLCAnZDInLCAnZDMnLCAnZDQnLCAnZDUnLCAnZDYnLCAnZDcnLCAnZDgnLCAnZDknLCAnZDEwJ10sXG40OiBbJ2UxJywgJ2UyJywgJ2UzJywgJ2U0JywgJ2U1JywgJ2U2JywgJ2U3JywgJ2U4JywgJ2U5JywgJ2UxMCddLFxuNTogWydmMScsICdmMicsICdmMycsICdmNCcsICdmNScsICdmNicsICdmNycsICdmOCcsICdmOScsICdmMTAnXSxcbjY6IFsnZzEnLCAnZzInLCAnZzMnLCAnZzQnLCAnZzUnLCAnZzYnLCAnZzcnLCAnZzgnLCAnZzknLCAnZzEwJ10sXG43OiBbJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2g3JywgJ2g4JywgJ2g5JywgJ2gxMCddLFxuODogWydpMScsICdpMicsICdpMycsICdpNCcsICdpNScsICdpNicsICdpNycsICdpOCcsICdpOScsICdpMTAnXSxcbjk6IFsnajEnLCAnajInLCAnajMnLCAnajQnLCAnajUnLCAnajYnLCAnajcnLCAnajgnLCAnajknLCAnajEwJ10sXG4qLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==