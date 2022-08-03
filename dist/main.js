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
                console.log('Float')
            }else if (!this.lengthArray.includes(0)){
                console.log('Sunk')
            }
        }
    }
}

let playerOneCarrier = ship('carrier', 5)
console.log(playerOneCarrier.lengthArray)
playerOneCarrier.isSunk()
playerOneCarrier.hit(0)
console.log(playerOneCarrier.lengthArray)
playerOneCarrier.isSunk()
playerOneCarrier.hit(1)
console.log(playerOneCarrier.lengthArray)
playerOneCarrier.isSunk()
playerOneCarrier.hit(2)
console.log(playerOneCarrier.lengthArray)
playerOneCarrier.isSunk()
playerOneCarrier.hit(3)
console.log(playerOneCarrier.lengthArray)
playerOneCarrier.isSunk()
playerOneCarrier.hit(4)
console.log(playerOneCarrier.lengthArray)
playerOneCarrier.isSunk()

/*let carrierOne = ship(5)
let battleShipOne = ship(4)
let submarineOne = ship(3)
let cruiserOne = ship(3)
let destroyerOne = ship(2)
console.log(destroyerOne.shipLength)
console.log(carrierOne)
console.log(battleShipOne)
console.log(submarineOne)
console.log(cruiserOne)
console.log(destroyerOne)*/

function calculateShipLength(length) {
    let arr = []
    for (let i = 0; i < length; i++){
        arr.push(0)
    }
    return arr
}

const ships = {
    carrier: 5,
    battleShip: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
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

function gameboard(length) {
    //let currentShip = ship(length)
    let shipLocation = 2
    let emptySpace = 0
    let miss = 3
    let hit = 1
    const placeShip = (shipName, row, column, orientation = 'vertical') => {
        let newShip = ships[shipName]
        //vertical placement
        if (orientation === "horizontal") {
            for (let i = 0; i < newShip; i++){
                let newColumn = column + i
                createGrid[row][newColumn] = 2
            }
            }else{
            for (let i = 0; i < newShip; i++){
                let newRow = row + i
                createGrid[newRow][column] = 2
            }
            }
        //horizontal placement
        /*for (let i = 0; i < newShip; i++){
            let newColumn = column + i
            createGrid[row][newColumn] = 2
        }*/
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
            console.log(newGrid)
            let item = document.getElementById(`${row}, ${column}`)
            populateGrid(item.id, 'Miss')
            return newGrid
        }else if (newGrid[row][column] === shipLocation){
            newGrid[row][column] = hit
            console.log(newGrid)
            let item = document.getElementById(`${row}, ${column}`)
            populateGrid(item.id, 'Hit')
            return newGrid
        }
    }
    return {
        receiveAttack, createGrid, placeShip
    }
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


game.placeShip('destroyer', 0, 0)
game.placeShip('battleShip', 2, 2)
game.placeShip('carrier', 1, 3)

document.addEventListener('click', function(e){
    if(e.target && e.target.className === 'grid'){
        let coordinates = e.target.id
        let coordinatesRow = coordinates.charAt(0)
        let coordinatesCol = coordinates.slice(-1)
        game.receiveAttack(coordinatesRow, coordinatesCol)
        //player.hit(2)
        //console.log(player.isSunk())
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

/*let carrierOne = ship(5)
let battleShipOne = ship(4)
let submarineOne = ship(3)
let cruiserOne = ship(3)
let destroyerOne = ship(2)
destroyerOne.isSunk()
console.log(carrierOne)
console.log(battleShipOne)
console.log(submarineOne)
console.log(cruiserOne)
console.log(destroyerOne)*/

/*let carrierTwo = ship(5)
let battleShipTwo = ship(4)
let submarineTwo = ship(3)
let cruiserTwo = ship(3)
let destroyerTwo = ship(2)
console.log(carrierTwo)
console.log(battleShipTwo)
console.log(submarineTwo)
console.log(cruiserTwo)
console.log(destroyerTwo)*/
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxVQUFVLHlCQUF5Qjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixhQUFhO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYiw0QkFBNEIsYUFBYTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGFBQWE7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxJQUFJLElBQUksT0FBTztBQUNqRTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxrREFBa0QsSUFBSSxJQUFJLE9BQU87QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSxtQ0FBbUMsRUFBRSxJQUFJLEVBQUU7QUFDM0M7QUFDQTtBQUNBLG1GQUFtRixHQUFHO0FBQ3RGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSxtQ0FBbUMsRUFBRSxJQUFJLEVBQUU7QUFDM0M7QUFDQTtBQUNBLG9GQUFvRixHQUFHO0FBQ3ZGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZlbnQpID0+IHtcbiAgICBsZXQgZ2FtZSA9IGdhbWVib2FyZCgpXG4gICAgZ2FtZS5wbGFjZVNoaXAoKVxuICAgIGNvbnNvbGUubG9nKGdhbWUucGxhY2VTaGlwKCkpXG59KSovXG5cbi8vY29uc3QgeyBDb250ZXh0RXhjbHVzaW9uUGx1Z2luIH0gPSByZXF1aXJlKFwid2VicGFja1wiKVxuXG5mdW5jdGlvbiBzaGlwKG5hbWUsIGxlbmd0aCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbGVuZ3RoQXJyYXk6IGNhbGN1bGF0ZVNoaXBMZW5ndGgobGVuZ3RoKSxcbiAgICAgICAgaGl0KG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhBcnJheVtudW1iZXJdID0gMVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoQXJyYXlcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoQXJyYXkuaW5jbHVkZXMoMCkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGbG9hdCcpXG4gICAgICAgICAgICB9ZWxzZSBpZiAoIXRoaXMubGVuZ3RoQXJyYXkuaW5jbHVkZXMoMCkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdW5rJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxubGV0IHBsYXllck9uZUNhcnJpZXIgPSBzaGlwKCdjYXJyaWVyJywgNSlcbmNvbnNvbGUubG9nKHBsYXllck9uZUNhcnJpZXIubGVuZ3RoQXJyYXkpXG5wbGF5ZXJPbmVDYXJyaWVyLmlzU3VuaygpXG5wbGF5ZXJPbmVDYXJyaWVyLmhpdCgwKVxuY29uc29sZS5sb2cocGxheWVyT25lQ2Fycmllci5sZW5ndGhBcnJheSlcbnBsYXllck9uZUNhcnJpZXIuaXNTdW5rKClcbnBsYXllck9uZUNhcnJpZXIuaGl0KDEpXG5jb25zb2xlLmxvZyhwbGF5ZXJPbmVDYXJyaWVyLmxlbmd0aEFycmF5KVxucGxheWVyT25lQ2Fycmllci5pc1N1bmsoKVxucGxheWVyT25lQ2Fycmllci5oaXQoMilcbmNvbnNvbGUubG9nKHBsYXllck9uZUNhcnJpZXIubGVuZ3RoQXJyYXkpXG5wbGF5ZXJPbmVDYXJyaWVyLmlzU3VuaygpXG5wbGF5ZXJPbmVDYXJyaWVyLmhpdCgzKVxuY29uc29sZS5sb2cocGxheWVyT25lQ2Fycmllci5sZW5ndGhBcnJheSlcbnBsYXllck9uZUNhcnJpZXIuaXNTdW5rKClcbnBsYXllck9uZUNhcnJpZXIuaGl0KDQpXG5jb25zb2xlLmxvZyhwbGF5ZXJPbmVDYXJyaWVyLmxlbmd0aEFycmF5KVxucGxheWVyT25lQ2Fycmllci5pc1N1bmsoKVxuXG4vKmxldCBjYXJyaWVyT25lID0gc2hpcCg1KVxubGV0IGJhdHRsZVNoaXBPbmUgPSBzaGlwKDQpXG5sZXQgc3VibWFyaW5lT25lID0gc2hpcCgzKVxubGV0IGNydWlzZXJPbmUgPSBzaGlwKDMpXG5sZXQgZGVzdHJveWVyT25lID0gc2hpcCgyKVxuY29uc29sZS5sb2coZGVzdHJveWVyT25lLnNoaXBMZW5ndGgpXG5jb25zb2xlLmxvZyhjYXJyaWVyT25lKVxuY29uc29sZS5sb2coYmF0dGxlU2hpcE9uZSlcbmNvbnNvbGUubG9nKHN1Ym1hcmluZU9uZSlcbmNvbnNvbGUubG9nKGNydWlzZXJPbmUpXG5jb25zb2xlLmxvZyhkZXN0cm95ZXJPbmUpKi9cblxuZnVuY3Rpb24gY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpIHtcbiAgICBsZXQgYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKXtcbiAgICAgICAgYXJyLnB1c2goMClcbiAgICB9XG4gICAgcmV0dXJuIGFyclxufVxuXG5jb25zdCBzaGlwcyA9IHtcbiAgICBjYXJyaWVyOiA1LFxuICAgIGJhdHRsZVNoaXA6IDQsXG4gICAgY3J1aXNlcjogMyxcbiAgICBzdWJtYXJpbmU6IDMsXG4gICAgZGVzdHJveWVyOiAyXG59XG5cbmxldCBjcmVhdGVHcmlkID0ge1xuICAgIDA6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAxOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDM6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA0OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDY6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA3OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgODogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDk6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbn1cblxuZnVuY3Rpb24gZ2FtZWJvYXJkKGxlbmd0aCkge1xuICAgIC8vbGV0IGN1cnJlbnRTaGlwID0gc2hpcChsZW5ndGgpXG4gICAgbGV0IHNoaXBMb2NhdGlvbiA9IDJcbiAgICBsZXQgZW1wdHlTcGFjZSA9IDBcbiAgICBsZXQgbWlzcyA9IDNcbiAgICBsZXQgaGl0ID0gMVxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwTmFtZSwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJykgPT4ge1xuICAgICAgICBsZXQgbmV3U2hpcCA9IHNoaXBzW3NoaXBOYW1lXVxuICAgICAgICAvL3ZlcnRpY2FsIHBsYWNlbWVudFxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoaXA7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0NvbHVtbiA9IGNvbHVtbiArIGlcbiAgICAgICAgICAgICAgICBjcmVhdGVHcmlkW3Jvd11bbmV3Q29sdW1uXSA9IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTaGlwOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBuZXdSb3cgPSByb3cgKyBpXG4gICAgICAgICAgICAgICAgY3JlYXRlR3JpZFtuZXdSb3ddW2NvbHVtbl0gPSAyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIC8vaG9yaXpvbnRhbCBwbGFjZW1lbnRcbiAgICAgICAgLypmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoaXA7IGkrKyl7XG4gICAgICAgICAgICBsZXQgbmV3Q29sdW1uID0gY29sdW1uICsgaVxuICAgICAgICAgICAgY3JlYXRlR3JpZFtyb3ddW25ld0NvbHVtbl0gPSAyXG4gICAgICAgIH0qL1xuICAgICAgICAvL3JhbmRvbSBwbGFjZW1lbnRcbiAgICAgICAgLypjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY3JlYXRlR3JpZClcbiAgICAgICAgY29uc3QgcHJvcCA9IGtleXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5cy5sZW5ndGgpXVxuICAgICAgICBjb25zdCBrZXlzMiA9IE9iamVjdC5rZXlzKGNyZWF0ZUdyaWRbcHJvcF0pXG4gICAgICAgIGNvbnN0IHByb3AyID0ga2V5czJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5czIubGVuZ3RoKV1cbiAgICAgICAgY3JlYXRlR3JpZFtwcm9wXVtwcm9wMl0gPSBzaGlwTG9jYXRpb24qL1xuICAgICAgICByZXR1cm4gY3JlYXRlR3JpZFxuICAgIH1cbiAgICAgICAgbGV0IG5ld0dyaWQgPSBjcmVhdGVHcmlkXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgICAgICBpZiAobmV3R3JpZFtyb3ddW2NvbHVtbl0gPT09IGVtcHR5U3BhY2Upe1xuICAgICAgICAgICAgbmV3R3JpZFtyb3ddW2NvbHVtbl0gPSBtaXNzXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdHcmlkKVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgcG9wdWxhdGVHcmlkKGl0ZW0uaWQsICdNaXNzJylcbiAgICAgICAgICAgIHJldHVybiBuZXdHcmlkXG4gICAgICAgIH1lbHNlIGlmIChuZXdHcmlkW3Jvd11bY29sdW1uXSA9PT0gc2hpcExvY2F0aW9uKXtcbiAgICAgICAgICAgIG5ld0dyaWRbcm93XVtjb2x1bW5dID0gaGl0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdHcmlkKVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgcG9wdWxhdGVHcmlkKGl0ZW0uaWQsICdIaXQnKVxuICAgICAgICAgICAgcmV0dXJuIG5ld0dyaWRcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNlaXZlQXR0YWNrLCBjcmVhdGVHcmlkLCBwbGFjZVNoaXBcbiAgICB9XG59XG5cbi8vXG4vL0NyZWF0ZXMgdGhlIGdyaWQgaW4gdGhlIERPTVxuLy9cbmxldCBjcmVhdGVOZXdHcmlkID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdjb250YWluZXInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgO1xuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSwgJHtqfWApXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHsxMH0sIDFmcilgO1xuICAgIH1cbn0pKClcblxubGV0IGNyZWF0ZU5ld0dyaWQyID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGFpbmVyMi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcjInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyMilcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspe1xuICAgICAgICBsZXQgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmlkLmNsYXNzTmFtZSA9IGBncmlkYFxuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSwgJHtqfWApXG4gICAgICAgIGNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcjInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5jb25zdCBwb3B1bGF0ZUdyaWQgPSAoY29vcmRpbmF0ZXMsIHJlc3VsdCkgPT4ge1xuICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29vcmRpbmF0ZXMpXG4gICAgaXRlbS5pbm5lclRleHQgPSAnWCdcbiAgICBpZiAocmVzdWx0ID09ICdIaXQnKXtcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsdWUnXG4gICAgfVxufVxuXG5jb25zdCBnYW1lID0gZ2FtZWJvYXJkKClcblxuXG5nYW1lLnBsYWNlU2hpcCgnZGVzdHJveWVyJywgMCwgMClcbmdhbWUucGxhY2VTaGlwKCdiYXR0bGVTaGlwJywgMiwgMilcbmdhbWUucGxhY2VTaGlwKCdjYXJyaWVyJywgMSwgMylcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5jbGFzc05hbWUgPT09ICdncmlkJyl7XG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IGUudGFyZ2V0LmlkXG4gICAgICAgIGxldCBjb29yZGluYXRlc1JvdyA9IGNvb3JkaW5hdGVzLmNoYXJBdCgwKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNDb2wgPSBjb29yZGluYXRlcy5zbGljZSgtMSlcbiAgICAgICAgZ2FtZS5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzUm93LCBjb29yZGluYXRlc0NvbClcbiAgICAgICAgLy9wbGF5ZXIuaGl0KDIpXG4gICAgICAgIC8vY29uc29sZS5sb2cocGxheWVyLmlzU3VuaygpKVxufVxufSlcblxuLypcbjA6IFsnYTEnLCAnYTInLCAnYTMnLCAnYTQnLCAnYTUnLCAnYTYnLCAnYTcnLCAnYTgnLCAnYTknLCAnYTEwJ10sXG4gICAgICAgICAgICAxOiBbJ2IxJywgJ2IyJywgJ2IzJywgJ2I0JywgJ2I1JywgJ2I2JywgJ2I3JywgJ2I4JywgJ2I5JywgJ2IxMCddLFxuICAgICAgICAgICAgMjogWydjMScsICdjMicsICdjMycsICdjNCcsICdjNScsICdjNicsICdjNycsICdjOCcsICdjOScsICdjMTAnXSxcbiAgICAgICAgICAgIDM6IFsnZDEnLCAnZDInLCAnZDMnLCAnZDQnLCAnZDUnLCAnZDYnLCAnZDcnLCAnZDgnLCAnZDknLCAnZDEwJ10sXG4gICAgICAgICAgICA0OiBbJ2UxJywgJ2UyJywgJ2UzJywgJ2U0JywgJ2U1JywgJ2U2JywgJ2U3JywgJ2U4JywgJ2U5JywgJ2UxMCddLFxuICAgICAgICAgICAgNTogWydmMScsICdmMicsICdmMycsICdmNCcsICdmNScsICdmNicsICdmNycsICdmOCcsICdmOScsICdmMTAnXSxcbiAgICAgICAgICAgIDY6IFsnZzEnLCAnZzInLCAnZzMnLCAnZzQnLCAnZzUnLCAnZzYnLCAnZzcnLCAnZzgnLCAnZzknLCAnZzEwJ10sXG4gICAgICAgICAgICA3OiBbJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2g3JywgJ2g4JywgJ2g5JywgJ2gxMCddLFxuICAgICAgICAgICAgODogWydpMScsICdpMicsICdpMycsICdpNCcsICdpNScsICdpNicsICdpNycsICdpOCcsICdpOScsICdpMTAnXSxcbiAgICAgICAgICAgIDk6IFsnajEnLCAnajInLCAnajMnLCAnajQnLCAnajUnLCAnajYnLCAnajcnLCAnajgnLCAnajknLCAnajEwJ10sXG4qL1xuXG4vKmxldCBjYXJyaWVyT25lID0gc2hpcCg1KVxubGV0IGJhdHRsZVNoaXBPbmUgPSBzaGlwKDQpXG5sZXQgc3VibWFyaW5lT25lID0gc2hpcCgzKVxubGV0IGNydWlzZXJPbmUgPSBzaGlwKDMpXG5sZXQgZGVzdHJveWVyT25lID0gc2hpcCgyKVxuZGVzdHJveWVyT25lLmlzU3VuaygpXG5jb25zb2xlLmxvZyhjYXJyaWVyT25lKVxuY29uc29sZS5sb2coYmF0dGxlU2hpcE9uZSlcbmNvbnNvbGUubG9nKHN1Ym1hcmluZU9uZSlcbmNvbnNvbGUubG9nKGNydWlzZXJPbmUpXG5jb25zb2xlLmxvZyhkZXN0cm95ZXJPbmUpKi9cblxuLypsZXQgY2FycmllclR3byA9IHNoaXAoNSlcbmxldCBiYXR0bGVTaGlwVHdvID0gc2hpcCg0KVxubGV0IHN1Ym1hcmluZVR3byA9IHNoaXAoMylcbmxldCBjcnVpc2VyVHdvID0gc2hpcCgzKVxubGV0IGRlc3Ryb3llclR3byA9IHNoaXAoMilcbmNvbnNvbGUubG9nKGNhcnJpZXJUd28pXG5jb25zb2xlLmxvZyhiYXR0bGVTaGlwVHdvKVxuY29uc29sZS5sb2coc3VibWFyaW5lVHdvKVxuY29uc29sZS5sb2coY3J1aXNlclR3bylcbmNvbnNvbGUubG9nKGRlc3Ryb3llclR3bykqLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==