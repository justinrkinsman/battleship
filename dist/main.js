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
    {"name": destroyer4}
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
    {"name": playerTwoDestroyer4}
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
            let shipArray = getShipArray(shipName, playerTwoShips)                                ///Start Here
            let shipIndex = item.getAttribute('data-index')
            shipArray.hit(shipIndex)                                                ///Then Here
            populateGrid(item.id, 'Hit')
            return gridSelection
        }
    }
    const allShipsSunk = (player) => {
        if(player[0].name.isSunk() === true && player[1].name.isSunk() === true && 
        player[2].name.isSunk() === true && player[3].name.isSunk() === true && 
        player[4].name.isSunk() === true){
            console.log('Game Over')
        }else{
            console.log('New Round')
        }
    }
    return {
        receiveAttack, placeShip, allShipsSunk
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
}
})
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxVQUFVLHlCQUF5Qjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssb0JBQW9CO0FBQ3pCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSywwQkFBMEI7QUFDL0IsS0FBSyw2QkFBNkI7QUFDbEMsS0FBSyw0QkFBNEI7QUFDakMsS0FBSywwQkFBMEI7QUFDL0IsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTyxFQUFFLElBQUksSUFBSSxVQUFVO0FBQzFEO0FBQ0EsU0FBUztBQUNULDRCQUE0QixvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBLCtCQUErQixPQUFPLEVBQUUsT0FBTyxJQUFJLE9BQU87QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxPQUFPLEVBQUUsSUFBSSxJQUFJLE9BQU87QUFDMUU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGtEQUFrRCxPQUFPLEVBQUUsSUFBSSxJQUFJLE9BQU87QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSw0Q0FBNEMsRUFBRSxJQUFJLEVBQUU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsbUZBQW1GLEdBQUc7QUFDdEY7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLDRDQUE0QyxFQUFFLElBQUksRUFBRTtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxvRkFBb0YsR0FBRztBQUN2RjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZlbnQpID0+IHtcbiAgICBsZXQgZ2FtZSA9IGdhbWVib2FyZCgpXG4gICAgZ2FtZS5wbGFjZVNoaXAoKVxuICAgIGNvbnNvbGUubG9nKGdhbWUucGxhY2VTaGlwKCkpXG59KSovXG5cbi8vY29uc3QgeyBDb250ZXh0RXhjbHVzaW9uUGx1Z2luIH0gPSByZXF1aXJlKFwid2VicGFja1wiKVxuXG5mdW5jdGlvbiBzaGlwKG5hbWUsIGxlbmd0aCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbGVuZ3RoQXJyYXk6IGNhbGN1bGF0ZVNoaXBMZW5ndGgobGVuZ3RoKSxcbiAgICAgICAgaGl0KG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhBcnJheVtudW1iZXJdID0gMVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoQXJyYXlcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoQXJyYXkuaW5jbHVkZXMoMCkgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMubGVuZ3RoQXJyYXkuaW5jbHVkZXMoMCkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTaGlwTGVuZ3RoKGxlbmd0aCkge1xuICAgIGxldCBhcnIgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgICAgICBhcnIucHVzaCgwKVxuICAgIH1cbiAgICByZXR1cm4gYXJyXG59XG5cbmxldCBjcmVhdGVHcmlkID0ge1xuICAgIDA6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAxOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDM6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA0OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDY6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA3OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgODogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDk6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbn1cblxubGV0IGNyZWF0ZUdyaWQyID0ge1xuICAgIDA6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAxOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDM6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA0OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDY6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA3OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgODogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDk6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbn1cblxuY29uc3QgY2FycmllcjAgPSBzaGlwKCdjYXJyaWVyMCcsIDUpXG5jb25zdCBiYXR0bGVzaGlwMSA9IHNoaXAoJ2JhdHRsZXNoaXAxJywgNClcbmNvbnN0IHN1Ym1hcmluZTIgPSBzaGlwKCdzdWJtYXJpbmUyJywgMylcbmNvbnN0IGNydWlzZXIzID0gc2hpcCgnY3J1aXNlcjMnLCAzKVxuY29uc3QgZGVzdHJveWVyNCA9IHNoaXAoJ2Rlc3Ryb3llcjQnLCAyKVxuXG5jb25zdCBwbGF5ZXJPbmVTaGlwcyA9IFtcbiAgICB7XCJuYW1lXCI6IGNhcnJpZXIwfSxcbiAgICB7XCJuYW1lXCI6IGJhdHRsZXNoaXAxfSxcbiAgICB7XCJuYW1lXCI6IHN1Ym1hcmluZTJ9LFxuICAgIHtcIm5hbWVcIjogY3J1aXNlcjN9LFxuICAgIHtcIm5hbWVcIjogZGVzdHJveWVyNH1cbl1cblxuY29uc3QgcGxheWVyVHdvQ2FycmllcjAgPSBzaGlwKCdwbGF5ZXJUd29DYXJyaWVyMCcsIDUpXG5jb25zdCBwbGF5ZXJUd29CYXR0bGVzaGlwMSA9IHNoaXAoJ3BsYXllclR3b0JhdHRsZXNoaXAxJywgNClcbmNvbnN0IHBsYXllclR3b1N1Ym1hcmluZTIgPSBzaGlwKCdwbGF5ZXJUd29TdWJtYXJpbmUyJywgMylcbmNvbnN0IHBsYXllclR3b0NydWlzZXIzID0gc2hpcCgncGxheWVyVHdvQ3J1c2llcjMnLCAzKVxuY29uc3QgcGxheWVyVHdvRGVzdHJveWVyNCA9IHNoaXAoJ3BsYXllclR3b0Rlc3Ryb3llcjQnLCAyKVxuXG5jb25zdCBwbGF5ZXJUd29TaGlwcyA9IFtcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b0NhcnJpZXIwfSxcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b0JhdHRsZXNoaXAxfSxcbiAgICB7XCJuYW1lXCI6IHBsYXllclR3b1N1Ym1hcmluZTJ9LFxuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvQ3J1aXNlcjN9LFxuICAgIHtcIm5hbWVcIjogcGxheWVyVHdvRGVzdHJveWVyNH1cbl1cblxuZnVuY3Rpb24gZ2FtZWJvYXJkKCkge1xuICAgIGxldCBzaGlwTG9jYXRpb24gPSAyXG4gICAgbGV0IGVtcHR5U3BhY2UgPSAwXG4gICAgbGV0IG1pc3MgPSAzXG4gICAgbGV0IGhpdCA9IDFcbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcE5hbWUsIHJvdywgY29sdW1uLCBncmlkU2VsZWN0aW9uLCBwbGF5ZXIsIG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJykgPT4ge1xuICAgICAgICBsZXQgbmV3U2hpcCA9IHNoaXBOYW1lLmxlbmd0aEFycmF5XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3U2hpcC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0NvbHVtbiA9IGNvbHVtbiArIGlcbiAgICAgICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bbmV3Q29sdW1uXSA9IDJcbiAgICAgICAgICAgICAgICBzaGlwTG9jYXRvcihgJHtwbGF5ZXJ9JHtyb3d9LCAke25ld0NvbHVtbn1gLCBzaGlwTmFtZSwgaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoaXAubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBuZXdSb3cgPSByb3cgKyBpXG4gICAgICAgICAgICAgICAgZ3JpZFNlbGVjdGlvbltuZXdSb3ddW2NvbHVtbl0gPSAyXG4gICAgICAgICAgICAgICAgc2hpcExvY2F0b3IoYCR7cGxheWVyfSR7bmV3Um93fSwgJHtjb2x1bW59YCwgc2hpcE5hbWUsIGkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9yYW5kb20gcGxhY2VtZW50XG4gICAgICAgIC8qY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNyZWF0ZUdyaWQpXG4gICAgICAgIGNvbnN0IHByb3AgPSBrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV1cbiAgICAgICAgY29uc3Qga2V5czIgPSBPYmplY3Qua2V5cyhjcmVhdGVHcmlkW3Byb3BdKVxuICAgICAgICBjb25zdCBwcm9wMiA9IGtleXMyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMyLmxlbmd0aCldXG4gICAgICAgIGNyZWF0ZUdyaWRbcHJvcF1bcHJvcDJdID0gc2hpcExvY2F0aW9uKi9cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUdyaWRcbiAgICB9XG4gICAgICAgIC8vbGV0IG5ld0dyaWQgPSBjcmVhdGVHcmlkXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbiwgZ3JpZFNlbGVjdGlvbiwgcGxheWVyKSA9PiB7XG4gICAgICAgIGlmIChncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9PT0gZW1wdHlTcGFjZSl7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IG1pc3NcbiAgICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyfSR7cm93fSwgJHtjb2x1bW59YClcbiAgICAgICAgICAgIHBvcHVsYXRlR3JpZChpdGVtLmlkLCAnTWlzcycpXG4gICAgICAgICAgICByZXR1cm4gZ3JpZFNlbGVjdGlvblxuICAgICAgICB9ZWxzZSBpZiAoZ3JpZFNlbGVjdGlvbltyb3ddW2NvbHVtbl0gPT09IHNoaXBMb2NhdGlvbil7XG4gICAgICAgICAgICBncmlkU2VsZWN0aW9uW3Jvd11bY29sdW1uXSA9IGhpdFxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwbGF5ZXJ9JHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgbGV0IHNoaXBOYW1lID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hpcG5hbWUnKVxuICAgICAgICAgICAgbGV0IHNoaXBBcnJheSA9IGdldFNoaXBBcnJheShzaGlwTmFtZSwgcGxheWVyVHdvU2hpcHMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy9TdGFydCBIZXJlXG4gICAgICAgICAgICBsZXQgc2hpcEluZGV4ID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKVxuICAgICAgICAgICAgc2hpcEFycmF5LmhpdChzaGlwSW5kZXgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vVGhlbiBIZXJlXG4gICAgICAgICAgICBwb3B1bGF0ZUdyaWQoaXRlbS5pZCwgJ0hpdCcpXG4gICAgICAgICAgICByZXR1cm4gZ3JpZFNlbGVjdGlvblxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9IChwbGF5ZXIpID0+IHtcbiAgICAgICAgaWYocGxheWVyWzBdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgcGxheWVyWzFdLm5hbWUuaXNTdW5rKCkgPT09IHRydWUgJiYgXG4gICAgICAgIHBsYXllclsyXS5uYW1lLmlzU3VuaygpID09PSB0cnVlICYmIHBsYXllclszXS5uYW1lLmlzU3VuaygpID09PSB0cnVlICYmIFxuICAgICAgICBwbGF5ZXJbNF0ubmFtZS5pc1N1bmsoKSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR2FtZSBPdmVyJylcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTmV3IFJvdW5kJylcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNlaXZlQXR0YWNrLCBwbGFjZVNoaXAsIGFsbFNoaXBzU3Vua1xuICAgIH1cbn1cblxuY29uc3QgZ2V0U2hpcEFycmF5ID0gKHNoaXBOYW1lLCBwbGF5ZXIpID0+IHtcbiAgICBsZXQgaW5kZXggPSBzaGlwTmFtZS5zbGljZSgtMSlcbiAgICByZXR1cm4gcGxheWVyW2luZGV4XS5uYW1lXG59XG5cbmNvbnN0IHNoaXBMb2NhdG9yID0gKGNvb3JkaW5hdGVzLCBzaGlwTmFtZSwgaW5kZXgpID0+IHtcbiAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvb3JkaW5hdGVzKVxuICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLXNoaXBOYW1lJywgc2hpcE5hbWUubmFtZSlcbiAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KVxufVxuXG5sZXQgY3JlYXRlTmV3R3JpZCA9ICgoKSA9PiB7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29udGFpbmVyJylcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspe1xuICAgICAgICBsZXQgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmlkLmNsYXNzTmFtZSA9IGBncmlkYDtcbiAgICAgICAgZ3JpZC5zZXRBdHRyaWJ1dGUoJ2lkJywgYHBsYXllck9uZSR7aX0sICR7an1gKVxuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ3BsYXllck9uZScpXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHsxMH0sIDFmcilgO1xuICAgIH1cbn0pKClcblxubGV0IGNyZWF0ZU5ld0dyaWQyID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGFpbmVyMi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcjInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyMilcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspe1xuICAgICAgICBsZXQgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmlkLmNsYXNzTmFtZSA9IGBncmlkYFxuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgcGxheWVyVHdvJHtpfSwgJHtqfWApXG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgncGxheWVyVHdvJylcbiAgICAgICAgY29udGFpbmVyMi5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyMicpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7MTB9LCAxZnIpYDtcbiAgICB9XG59KSgpXG5cbmNvbnN0IHBvcHVsYXRlR3JpZCA9IChjb29yZGluYXRlcywgcmVzdWx0KSA9PiB7XG4gICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb29yZGluYXRlcylcbiAgICBpdGVtLmlubmVyVGV4dCA9ICdYJ1xuICAgIGlmIChyZXN1bHQgPT0gJ0hpdCcpe1xuICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSdcbiAgICB9XG59XG5cbmNvbnN0IGdhbWUgPSBnYW1lYm9hcmQoKVxuXG5nYW1lLnBsYWNlU2hpcChkZXN0cm95ZXI0LCAwLCAwLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJylcbmdhbWUucGxhY2VTaGlwKGJhdHRsZXNoaXAxLCAyLCAyLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJylcbmdhbWUucGxhY2VTaGlwKGNhcnJpZXIwLCAxLCAzLCBjcmVhdGVHcmlkLCAncGxheWVyT25lJylcbmdhbWUucGxhY2VTaGlwKHN1Ym1hcmluZTIsIDcsIDYsIGNyZWF0ZUdyaWQsICdwbGF5ZXJPbmUnLCAnaG9yaXpvbnRhbCcpXG5nYW1lLnBsYWNlU2hpcChjcnVpc2VyMywgOSwgMCwgY3JlYXRlR3JpZCwgJ3BsYXllck9uZScsICdob3Jpem9udGFsJylcblxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvQ2FycmllcjAsIDAsIDAsIGNyZWF0ZUdyaWQyLCAncGxheWVyVHdvJylcbmdhbWUucGxhY2VTaGlwKHBsYXllclR3b0JhdHRsZXNoaXAxLCAxLCAxLCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29TdWJtYXJpbmUyLCAyLCAyLCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG5nYW1lLnBsYWNlU2hpcChwbGF5ZXJUd29DcnVpc2VyMywgMywgMywgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuZ2FtZS5wbGFjZVNoaXAocGxheWVyVHdvRGVzdHJveWVyNCwgNCwgNCwgY3JlYXRlR3JpZDIsICdwbGF5ZXJUd28nKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxheWVyVHdvJykpe1xuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSBlLnRhcmdldC5pZFxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNSb3cgPSBjb29yZGluYXRlcy5zbGljZSgtNCwgLTMpXG4gICAgICAgIGxldCBjb29yZGluYXRlc0NvbCA9IGNvb3JkaW5hdGVzLnNsaWNlKC0xKVxuICAgICAgICBnYW1lLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXNSb3csIGNvb3JkaW5hdGVzQ29sLCBjcmVhdGVHcmlkMiwgJ3BsYXllclR3bycpXG4gICAgICAgIGdhbWUuYWxsU2hpcHNTdW5rKHBsYXllclR3b1NoaXBzKVxufVxufSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=