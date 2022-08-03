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

const shipLocator = (coordinates, shipName, index) => {
    let cell = document.getElementById(coordinates)
    cell.setAttribute('data-shipName', shipName.name)
    cell.setAttribute('data-index', index)
    //cell.setAttribute('data-index', )
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxVQUFVLHlCQUF5Qjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssb0JBQW9CO0FBQ3pCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQSwrQkFBK0IsSUFBSSxJQUFJLFVBQVU7QUFDakQ7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0EsK0JBQStCLE9BQU8sSUFBSSxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxJQUFJLElBQUksT0FBTztBQUNqRTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxrREFBa0QsSUFBSSxJQUFJLE9BQU87QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSxtQ0FBbUMsRUFBRSxJQUFJLEVBQUU7QUFDM0M7QUFDQTtBQUNBLG1GQUFtRixHQUFHO0FBQ3RGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSxtQ0FBbUMsRUFBRSxJQUFJLEVBQUU7QUFDM0M7QUFDQTtBQUNBLG9GQUFvRixHQUFHO0FBQ3ZGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50KSA9PiB7XG4gICAgbGV0IGdhbWUgPSBnYW1lYm9hcmQoKVxuICAgIGdhbWUucGxhY2VTaGlwKClcbiAgICBjb25zb2xlLmxvZyhnYW1lLnBsYWNlU2hpcCgpKVxufSkqL1xuXG4vL2NvbnN0IHsgQ29udGV4dEV4Y2x1c2lvblBsdWdpbiB9ID0gcmVxdWlyZShcIndlYnBhY2tcIilcblxuZnVuY3Rpb24gc2hpcChuYW1lLCBsZW5ndGgpe1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGxlbmd0aEFycmF5OiBjYWxjdWxhdGVTaGlwTGVuZ3RoKGxlbmd0aCksXG4gICAgICAgIGhpdChudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoQXJyYXlbbnVtYmVyXSA9IDFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlbmd0aEFycmF5XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuaygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aEFycmF5LmluY2x1ZGVzKDApKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmYWxzZSlcbiAgICAgICAgICAgIH1lbHNlIGlmICghdGhpcy5sZW5ndGhBcnJheS5pbmNsdWRlcygwKSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpIHtcbiAgICBsZXQgYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKXtcbiAgICAgICAgYXJyLnB1c2goMClcbiAgICB9XG4gICAgcmV0dXJuIGFyclxufVxuXG4vKmNvbnN0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IDUsXG4gICAgYmF0dGxlU2hpcDogNCxcbiAgICBjcnVpc2VyOiAzLFxuICAgIHN1Ym1hcmluZTogMyxcbiAgICBkZXN0cm95ZXI6IDJcbn0qL1xuXG5sZXQgY3JlYXRlR3JpZCA9IHtcbiAgICAwOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA2OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA5OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG59XG5cbi8qY29uc3QgcGxheWVyT25lQ2FycmllciA9IHNoaXAoJ2NhcnJpZXInLCA1KVxuY29uc3QgcGxheWVyT25lQmF0dGxlc2hpcCA9IHNoaXAoJ2JhdHRsZXNoaXAnLCA0KVxuY29uc3QgcGxheWVyT25lU3VibWFyaW5lID0gc2hpcCgnc3VibWFyaW5lJywgMylcbmNvbnN0IHBsYXllck9uZUNydWlzZXIgPSBzaGlwKCdjcnVpc2VyJywgMylcbmNvbnN0IHBsYXllck9uZURlc3Ryb3llciA9IHNoaXAoJ2Rlc3Ryb3llcicsIDIpKi9cblxuY29uc3QgY2FycmllcjAgPSBzaGlwKCdjYXJyaWVyMCcsIDUpXG5jb25zdCBiYXR0bGVzaGlwMSA9IHNoaXAoJ2JhdHRsZXNoaXAxJywgNClcbmNvbnN0IHN1Ym1hcmluZTIgPSBzaGlwKCdzdWJtYXJpbmUyJywgMylcbmNvbnN0IGNydWlzZXIzID0gc2hpcCgnY3J1aXNlcjMnLCAzKVxuY29uc3QgZGVzdHJveWVyNCA9IHNoaXAoJ2Rlc3Ryb3llcjQnLCAyKVxuXG5jb25zdCBwbGF5ZXJPbmVTaGlwcyA9IFtcbiAgICB7XCJuYW1lXCI6IGNhcnJpZXIwfSxcbiAgICB7XCJuYW1lXCI6IGJhdHRsZXNoaXAxfSxcbiAgICB7XCJuYW1lXCI6IHN1Ym1hcmluZTJ9LFxuICAgIHtcIm5hbWVcIjogY3J1aXNlcjN9LFxuICAgIHtcIm5hbWVcIjogZGVzdHJveWVyNH1cbl1cblxuLy9sZXQgcmVzdWx0ID0gY2Fycmllci5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSBjYXJyaWVyKVxuLy9jb25zb2xlLmxvZyhjYXJyaWVyKVxuXG5mdW5jdGlvbiBnYW1lYm9hcmQoKSB7XG4gICAgbGV0IHNoaXBMb2NhdGlvbiA9IDJcbiAgICBsZXQgZW1wdHlTcGFjZSA9IDBcbiAgICBsZXQgbWlzcyA9IDNcbiAgICBsZXQgaGl0ID0gMVxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwTmFtZSwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJykgPT4ge1xuICAgICAgICBsZXQgbmV3U2hpcCA9IHNoaXBOYW1lLmxlbmd0aEFycmF5XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3U2hpcC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0NvbHVtbiA9IGNvbHVtbiArIGlcbiAgICAgICAgICAgICAgICBjcmVhdGVHcmlkW3Jvd11bbmV3Q29sdW1uXSA9IDJcbiAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtyb3d9LCAke25ld0NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoaXAubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBuZXdSb3cgPSByb3cgKyBpXG4gICAgICAgICAgICAgICAgY3JlYXRlR3JpZFtuZXdSb3ddW2NvbHVtbl0gPSAyXG4gICAgICAgICAgICAgICAgc2hpcExvY2F0b3IoYCR7bmV3Um93fSwgJHtjb2x1bW59YCwgc2hpcE5hbWUsIGkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9yYW5kb20gcGxhY2VtZW50XG4gICAgICAgIC8qY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNyZWF0ZUdyaWQpXG4gICAgICAgIGNvbnN0IHByb3AgPSBrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV1cbiAgICAgICAgY29uc3Qga2V5czIgPSBPYmplY3Qua2V5cyhjcmVhdGVHcmlkW3Byb3BdKVxuICAgICAgICBjb25zdCBwcm9wMiA9IGtleXMyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMyLmxlbmd0aCldXG4gICAgICAgIGNyZWF0ZUdyaWRbcHJvcF1bcHJvcDJdID0gc2hpcExvY2F0aW9uKi9cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUdyaWRcbiAgICB9XG4gICAgICAgIGxldCBuZXdHcmlkID0gY3JlYXRlR3JpZFxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICAgICAgaWYgKG5ld0dyaWRbcm93XVtjb2x1bW5dID09PSBlbXB0eVNwYWNlKXtcbiAgICAgICAgICAgIG5ld0dyaWRbcm93XVtjb2x1bW5dID0gbWlzc1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhuZXdHcmlkKVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgcG9wdWxhdGVHcmlkKGl0ZW0uaWQsICdNaXNzJylcbiAgICAgICAgICAgIHJldHVybiBuZXdHcmlkXG4gICAgICAgIH1lbHNlIGlmIChuZXdHcmlkW3Jvd11bY29sdW1uXSA9PT0gc2hpcExvY2F0aW9uKXtcbiAgICAgICAgICAgIG5ld0dyaWRbcm93XVtjb2x1bW5dID0gaGl0XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG5ld0dyaWQpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Jvd30sICR7Y29sdW1ufWApXG4gICAgICAgICAgICBsZXQgc2hpcE5hbWUgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1zaGlwbmFtZScpXG4gICAgICAgICAgICBsZXQgc2hpcEFycmF5ID0gZ2V0U2hpcEFycmF5KHNoaXBOYW1lKVxuICAgICAgICAgICAgY29uc29sZS5sb2coc2hpcEFycmF5KVxuICAgICAgICAgICAgcG9wdWxhdGVHcmlkKGl0ZW0uaWQsICdIaXQnKVxuICAgICAgICAgICAgcmV0dXJuIG5ld0dyaWRcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBhbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIC8qaWYocGxheWVyT25lQ2Fycmllci5pc1N1bmsoKSA9PT0gdHJ1ZSAmJiBwbGF5ZXJPbmVCYXR0bGVzaGlwLmlzU3VuaygpID09PSB0cnVlICYmIHBsYXllck9uZUNydWlzZXIuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyT25lU3VibWFyaW5lLmlzU3VuaygpID09PSB0cnVlICYmIHBsYXllck9uZURlc3Ryb3llci5pc1N1bmsoKSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR2FtZSBPdmVyJylcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTmV3IFJvdW5kJylcbiAgICAgICAgfSovXG4gICAgICAgIGNvbnNvbGUubG9nKGNyZWF0ZUdyaWQpXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY2VpdmVBdHRhY2ssIHBsYWNlU2hpcCwgYWxsU2hpcHNTdW5rXG4gICAgfVxufVxuXG5jb25zdCBnZXRTaGlwQXJyYXkgPSAoc2hpcE5hbWUpID0+IHtcbiAgICBsZXQgaW5kZXggPSBzaGlwTmFtZS5zbGljZSgtMSlcbiAgICByZXR1cm4gcGxheWVyT25lU2hpcHNbaW5kZXhdLm5hbWVcbn1cblxuY29uc3Qgc2hpcExvY2F0b3IgPSAoY29vcmRpbmF0ZXMsIHNoaXBOYW1lLCBpbmRleCkgPT4ge1xuICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29vcmRpbmF0ZXMpXG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcE5hbWUnLCBzaGlwTmFtZS5uYW1lKVxuICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpXG4gICAgLy9jZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIClcbn1cblxuLy9cbi8vQ3JlYXRlcyB0aGUgZ3JpZCBpbiB0aGUgRE9NXG4vL1xubGV0IGNyZWF0ZU5ld0dyaWQgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGA7XG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9LCAke2p9YClcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5sZXQgY3JlYXRlTmV3R3JpZDIgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29udGFpbmVyMicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9LCAke2p9YClcbiAgICAgICAgY29udGFpbmVyMi5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyMicpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7MTB9LCAxZnIpYDtcbiAgICB9XG59KSgpXG5cbmNvbnN0IHBvcHVsYXRlR3JpZCA9IChjb29yZGluYXRlcywgcmVzdWx0KSA9PiB7XG4gICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb29yZGluYXRlcylcbiAgICBpdGVtLmlubmVyVGV4dCA9ICdYJ1xuICAgIGlmIChyZXN1bHQgPT0gJ0hpdCcpe1xuICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSdcbiAgICB9XG59XG5cbmNvbnN0IGdhbWUgPSBnYW1lYm9hcmQoKVxuXG4vKmdhbWUucGxhY2VTaGlwKHBsYXllck9uZURlc3Ryb3llciwgMCwgMClcbmdhbWUucGxhY2VTaGlwKHBsYXllck9uZUJhdHRsZXNoaXAsIDIsIDIpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJPbmVDYXJyaWVyLCAxLCAzKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyT25lU3VibWFyaW5lLCA3LCA2LCAnaG9yaXpvbnRhbCcpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJPbmVDcnVpc2VyLCA5LCAwLCAnaG9yaXpvbnRhbCcpKi9cblxuZ2FtZS5wbGFjZVNoaXAoZGVzdHJveWVyNCwgMCwgMClcbmdhbWUucGxhY2VTaGlwKGJhdHRsZXNoaXAxLCAyLCAyKVxuZ2FtZS5wbGFjZVNoaXAoY2FycmllcjAsIDEsIDMpXG5nYW1lLnBsYWNlU2hpcChzdWJtYXJpbmUyLCA3LCA2LCAnaG9yaXpvbnRhbCcpXG5nYW1lLnBsYWNlU2hpcChjcnVpc2VyMywgOSwgMCwgJ2hvcml6b250YWwnKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dyaWQnKXtcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0gZS50YXJnZXQuaWRcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzUm93ID0gY29vcmRpbmF0ZXMuY2hhckF0KDApXG4gICAgICAgIGxldCBjb29yZGluYXRlc0NvbCA9IGNvb3JkaW5hdGVzLnNsaWNlKC0xKVxuICAgICAgICBnYW1lLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXNSb3csIGNvb3JkaW5hdGVzQ29sKVxuICAgICAgICBnYW1lLmFsbFNoaXBzU3VuaygpXG4gICAgICAgIC8vY29uc29sZS5sb2cocGxheWVyT25lQ2Fycmllci5sZW5ndGhBcnJheSlcbiAgICAgICAgLy9wbGF5ZXJPbmVDYXJyaWVyLmlzU3VuaygpXG59XG59KVxuXG4vKlxuMDogWydhMScsICdhMicsICdhMycsICdhNCcsICdhNScsICdhNicsICdhNycsICdhOCcsICdhOScsICdhMTAnXSxcbjE6IFsnYjEnLCAnYjInLCAnYjMnLCAnYjQnLCAnYjUnLCAnYjYnLCAnYjcnLCAnYjgnLCAnYjknLCAnYjEwJ10sXG4yOiBbJ2MxJywgJ2MyJywgJ2MzJywgJ2M0JywgJ2M1JywgJ2M2JywgJ2M3JywgJ2M4JywgJ2M5JywgJ2MxMCddLFxuMzogWydkMScsICdkMicsICdkMycsICdkNCcsICdkNScsICdkNicsICdkNycsICdkOCcsICdkOScsICdkMTAnXSxcbjQ6IFsnZTEnLCAnZTInLCAnZTMnLCAnZTQnLCAnZTUnLCAnZTYnLCAnZTcnLCAnZTgnLCAnZTknLCAnZTEwJ10sXG41OiBbJ2YxJywgJ2YyJywgJ2YzJywgJ2Y0JywgJ2Y1JywgJ2Y2JywgJ2Y3JywgJ2Y4JywgJ2Y5JywgJ2YxMCddLFxuNjogWydnMScsICdnMicsICdnMycsICdnNCcsICdnNScsICdnNicsICdnNycsICdnOCcsICdnOScsICdnMTAnXSxcbjc6IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaDcnLCAnaDgnLCAnaDknLCAnaDEwJ10sXG44OiBbJ2kxJywgJ2kyJywgJ2kzJywgJ2k0JywgJ2k1JywgJ2k2JywgJ2k3JywgJ2k4JywgJ2k5JywgJ2kxMCddLFxuOTogWydqMScsICdqMicsICdqMycsICdqNCcsICdqNScsICdqNicsICdqNycsICdqOCcsICdqOScsICdqMTAnXSxcbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9