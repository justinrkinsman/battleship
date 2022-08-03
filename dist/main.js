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
            console.log(this.lengthArray)       ///The proper ship length is not being used in these functions
        },
        isSunk() {
            if (shipLength.includes('1')){
                console.log('Float')
            }
            console.log('Sunk')
        }
    }
}

let playerOneCarrier = ship('carrier', 5)
console.log(playerOneCarrier.lengthArray)
playerOneCarrier.hit(3)
console.log(playerOneCarrier.lengthArray)
playerOneCarrier.hit(1)
console.log(playerOneCarrier.lengthArray)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxVQUFVLHlCQUF5Qjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGFBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLDRCQUE0QixhQUFhO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsYUFBYTtBQUN2QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELElBQUksSUFBSSxPQUFPO0FBQ2pFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGtEQUFrRCxJQUFJLElBQUksT0FBTztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLG1DQUFtQyxFQUFFLElBQUksRUFBRTtBQUMzQztBQUNBO0FBQ0EsbUZBQW1GLEdBQUc7QUFDdEY7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLG1DQUFtQyxFQUFFLElBQUksRUFBRTtBQUMzQztBQUNBO0FBQ0Esb0ZBQW9GLEdBQUc7QUFDdkY7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyp3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudCkgPT4ge1xuICAgIGxldCBnYW1lID0gZ2FtZWJvYXJkKClcbiAgICBnYW1lLnBsYWNlU2hpcCgpXG4gICAgY29uc29sZS5sb2coZ2FtZS5wbGFjZVNoaXAoKSlcbn0pKi9cblxuLy9jb25zdCB7IENvbnRleHRFeGNsdXNpb25QbHVnaW4gfSA9IHJlcXVpcmUoXCJ3ZWJwYWNrXCIpXG5cbmZ1bmN0aW9uIHNoaXAobmFtZSwgbGVuZ3RoKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBsZW5ndGhBcnJheTogY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpLFxuICAgICAgICBoaXQobnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aEFycmF5W251bWJlcl0gPSAxXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxlbmd0aEFycmF5KSAgICAgICAvLy9UaGUgcHJvcGVyIHNoaXAgbGVuZ3RoIGlzIG5vdCBiZWluZyB1c2VkIGluIHRoZXNlIGZ1bmN0aW9uc1xuICAgICAgICB9LFxuICAgICAgICBpc1N1bmsoKSB7XG4gICAgICAgICAgICBpZiAoc2hpcExlbmd0aC5pbmNsdWRlcygnMScpKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRmxvYXQnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1bmsnKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5sZXQgcGxheWVyT25lQ2FycmllciA9IHNoaXAoJ2NhcnJpZXInLCA1KVxuY29uc29sZS5sb2cocGxheWVyT25lQ2Fycmllci5sZW5ndGhBcnJheSlcbnBsYXllck9uZUNhcnJpZXIuaGl0KDMpXG5jb25zb2xlLmxvZyhwbGF5ZXJPbmVDYXJyaWVyLmxlbmd0aEFycmF5KVxucGxheWVyT25lQ2Fycmllci5oaXQoMSlcbmNvbnNvbGUubG9nKHBsYXllck9uZUNhcnJpZXIubGVuZ3RoQXJyYXkpXG5cbi8qbGV0IGNhcnJpZXJPbmUgPSBzaGlwKDUpXG5sZXQgYmF0dGxlU2hpcE9uZSA9IHNoaXAoNClcbmxldCBzdWJtYXJpbmVPbmUgPSBzaGlwKDMpXG5sZXQgY3J1aXNlck9uZSA9IHNoaXAoMylcbmxldCBkZXN0cm95ZXJPbmUgPSBzaGlwKDIpXG5jb25zb2xlLmxvZyhkZXN0cm95ZXJPbmUuc2hpcExlbmd0aClcbmNvbnNvbGUubG9nKGNhcnJpZXJPbmUpXG5jb25zb2xlLmxvZyhiYXR0bGVTaGlwT25lKVxuY29uc29sZS5sb2coc3VibWFyaW5lT25lKVxuY29uc29sZS5sb2coY3J1aXNlck9uZSlcbmNvbnNvbGUubG9nKGRlc3Ryb3llck9uZSkqL1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVTaGlwTGVuZ3RoKGxlbmd0aCkge1xuICAgIGxldCBhcnIgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgICAgICBhcnIucHVzaCgwKVxuICAgIH1cbiAgICByZXR1cm4gYXJyXG59XG5cbmNvbnN0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IDUsXG4gICAgYmF0dGxlU2hpcDogNCxcbiAgICBjcnVpc2VyOiAzLFxuICAgIHN1Ym1hcmluZTogMyxcbiAgICBkZXN0cm95ZXI6IDJcbn1cblxubGV0IGNyZWF0ZUdyaWQgPSB7XG4gICAgMDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDE6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAyOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDQ6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA1OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDc6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA4OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgOTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxufVxuXG5mdW5jdGlvbiBnYW1lYm9hcmQobGVuZ3RoKSB7XG4gICAgLy9sZXQgY3VycmVudFNoaXAgPSBzaGlwKGxlbmd0aClcbiAgICBsZXQgc2hpcExvY2F0aW9uID0gMlxuICAgIGxldCBlbXB0eVNwYWNlID0gMFxuICAgIGxldCBtaXNzID0gM1xuICAgIGxldCBoaXQgPSAxXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBOYW1lLCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24gPSAndmVydGljYWwnKSA9PiB7XG4gICAgICAgIGxldCBuZXdTaGlwID0gc2hpcHNbc2hpcE5hbWVdXG4gICAgICAgIC8vdmVydGljYWwgcGxhY2VtZW50XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3U2hpcDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q29sdW1uID0gY29sdW1uICsgaVxuICAgICAgICAgICAgICAgIGNyZWF0ZUdyaWRbcm93XVtuZXdDb2x1bW5dID0gMlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoaXA7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHJvdyArIGlcbiAgICAgICAgICAgICAgICBjcmVhdGVHcmlkW25ld1Jvd11bY29sdW1uXSA9IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgLy9ob3Jpem9udGFsIHBsYWNlbWVudFxuICAgICAgICAvKmZvciAobGV0IGkgPSAwOyBpIDwgbmV3U2hpcDsgaSsrKXtcbiAgICAgICAgICAgIGxldCBuZXdDb2x1bW4gPSBjb2x1bW4gKyBpXG4gICAgICAgICAgICBjcmVhdGVHcmlkW3Jvd11bbmV3Q29sdW1uXSA9IDJcbiAgICAgICAgfSovXG4gICAgICAgIC8vcmFuZG9tIHBsYWNlbWVudFxuICAgICAgICAvKmNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjcmVhdGVHcmlkKVxuICAgICAgICBjb25zdCBwcm9wID0ga2V5c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBrZXlzLmxlbmd0aCldXG4gICAgICAgIGNvbnN0IGtleXMyID0gT2JqZWN0LmtleXMoY3JlYXRlR3JpZFtwcm9wXSlcbiAgICAgICAgY29uc3QgcHJvcDIgPSBrZXlzMltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBrZXlzMi5sZW5ndGgpXVxuICAgICAgICBjcmVhdGVHcmlkW3Byb3BdW3Byb3AyXSA9IHNoaXBMb2NhdGlvbiovXG4gICAgICAgIHJldHVybiBjcmVhdGVHcmlkXG4gICAgfVxuICAgICAgICBsZXQgbmV3R3JpZCA9IGNyZWF0ZUdyaWRcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgICAgIGlmIChuZXdHcmlkW3Jvd11bY29sdW1uXSA9PT0gZW1wdHlTcGFjZSl7XG4gICAgICAgICAgICBuZXdHcmlkW3Jvd11bY29sdW1uXSA9IG1pc3NcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0dyaWQpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Jvd30sICR7Y29sdW1ufWApXG4gICAgICAgICAgICBwb3B1bGF0ZUdyaWQoaXRlbS5pZCwgJ01pc3MnKVxuICAgICAgICAgICAgcmV0dXJuIG5ld0dyaWRcbiAgICAgICAgfWVsc2UgaWYgKG5ld0dyaWRbcm93XVtjb2x1bW5dID09PSBzaGlwTG9jYXRpb24pe1xuICAgICAgICAgICAgbmV3R3JpZFtyb3ddW2NvbHVtbl0gPSBoaXRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0dyaWQpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Jvd30sICR7Y29sdW1ufWApXG4gICAgICAgICAgICBwb3B1bGF0ZUdyaWQoaXRlbS5pZCwgJ0hpdCcpXG4gICAgICAgICAgICByZXR1cm4gbmV3R3JpZFxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY2VpdmVBdHRhY2ssIGNyZWF0ZUdyaWQsIHBsYWNlU2hpcFxuICAgIH1cbn1cblxuLy9cbi8vQ3JlYXRlcyB0aGUgZ3JpZCBpbiB0aGUgRE9NXG4vL1xubGV0IGNyZWF0ZU5ld0dyaWQgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGA7XG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9LCAke2p9YClcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5sZXQgY3JlYXRlTmV3R3JpZDIgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29udGFpbmVyMicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9LCAke2p9YClcbiAgICAgICAgY29udGFpbmVyMi5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyMicpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7MTB9LCAxZnIpYDtcbiAgICB9XG59KSgpXG5cbmNvbnN0IHBvcHVsYXRlR3JpZCA9IChjb29yZGluYXRlcywgcmVzdWx0KSA9PiB7XG4gICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb29yZGluYXRlcylcbiAgICBpdGVtLmlubmVyVGV4dCA9ICdYJ1xuICAgIGlmIChyZXN1bHQgPT0gJ0hpdCcpe1xuICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSdcbiAgICB9XG59XG5cbmNvbnN0IGdhbWUgPSBnYW1lYm9hcmQoKVxuXG5cbmdhbWUucGxhY2VTaGlwKCdkZXN0cm95ZXInLCAwLCAwKVxuZ2FtZS5wbGFjZVNoaXAoJ2JhdHRsZVNoaXAnLCAyLCAyKVxuZ2FtZS5wbGFjZVNoaXAoJ2NhcnJpZXInLCAxLCAzKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dyaWQnKXtcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0gZS50YXJnZXQuaWRcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzUm93ID0gY29vcmRpbmF0ZXMuY2hhckF0KDApXG4gICAgICAgIGxldCBjb29yZGluYXRlc0NvbCA9IGNvb3JkaW5hdGVzLnNsaWNlKC0xKVxuICAgICAgICBnYW1lLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXNSb3csIGNvb3JkaW5hdGVzQ29sKVxuICAgICAgICAvL3BsYXllci5oaXQoMilcbiAgICAgICAgLy9jb25zb2xlLmxvZyhwbGF5ZXIuaXNTdW5rKCkpXG59XG59KVxuXG4vKlxuMDogWydhMScsICdhMicsICdhMycsICdhNCcsICdhNScsICdhNicsICdhNycsICdhOCcsICdhOScsICdhMTAnXSxcbiAgICAgICAgICAgIDE6IFsnYjEnLCAnYjInLCAnYjMnLCAnYjQnLCAnYjUnLCAnYjYnLCAnYjcnLCAnYjgnLCAnYjknLCAnYjEwJ10sXG4gICAgICAgICAgICAyOiBbJ2MxJywgJ2MyJywgJ2MzJywgJ2M0JywgJ2M1JywgJ2M2JywgJ2M3JywgJ2M4JywgJ2M5JywgJ2MxMCddLFxuICAgICAgICAgICAgMzogWydkMScsICdkMicsICdkMycsICdkNCcsICdkNScsICdkNicsICdkNycsICdkOCcsICdkOScsICdkMTAnXSxcbiAgICAgICAgICAgIDQ6IFsnZTEnLCAnZTInLCAnZTMnLCAnZTQnLCAnZTUnLCAnZTYnLCAnZTcnLCAnZTgnLCAnZTknLCAnZTEwJ10sXG4gICAgICAgICAgICA1OiBbJ2YxJywgJ2YyJywgJ2YzJywgJ2Y0JywgJ2Y1JywgJ2Y2JywgJ2Y3JywgJ2Y4JywgJ2Y5JywgJ2YxMCddLFxuICAgICAgICAgICAgNjogWydnMScsICdnMicsICdnMycsICdnNCcsICdnNScsICdnNicsICdnNycsICdnOCcsICdnOScsICdnMTAnXSxcbiAgICAgICAgICAgIDc6IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaDcnLCAnaDgnLCAnaDknLCAnaDEwJ10sXG4gICAgICAgICAgICA4OiBbJ2kxJywgJ2kyJywgJ2kzJywgJ2k0JywgJ2k1JywgJ2k2JywgJ2k3JywgJ2k4JywgJ2k5JywgJ2kxMCddLFxuICAgICAgICAgICAgOTogWydqMScsICdqMicsICdqMycsICdqNCcsICdqNScsICdqNicsICdqNycsICdqOCcsICdqOScsICdqMTAnXSxcbiovXG5cbi8qbGV0IGNhcnJpZXJPbmUgPSBzaGlwKDUpXG5sZXQgYmF0dGxlU2hpcE9uZSA9IHNoaXAoNClcbmxldCBzdWJtYXJpbmVPbmUgPSBzaGlwKDMpXG5sZXQgY3J1aXNlck9uZSA9IHNoaXAoMylcbmxldCBkZXN0cm95ZXJPbmUgPSBzaGlwKDIpXG5kZXN0cm95ZXJPbmUuaXNTdW5rKClcbmNvbnNvbGUubG9nKGNhcnJpZXJPbmUpXG5jb25zb2xlLmxvZyhiYXR0bGVTaGlwT25lKVxuY29uc29sZS5sb2coc3VibWFyaW5lT25lKVxuY29uc29sZS5sb2coY3J1aXNlck9uZSlcbmNvbnNvbGUubG9nKGRlc3Ryb3llck9uZSkqL1xuXG4vKmxldCBjYXJyaWVyVHdvID0gc2hpcCg1KVxubGV0IGJhdHRsZVNoaXBUd28gPSBzaGlwKDQpXG5sZXQgc3VibWFyaW5lVHdvID0gc2hpcCgzKVxubGV0IGNydWlzZXJUd28gPSBzaGlwKDMpXG5sZXQgZGVzdHJveWVyVHdvID0gc2hpcCgyKVxuY29uc29sZS5sb2coY2FycmllclR3bylcbmNvbnNvbGUubG9nKGJhdHRsZVNoaXBUd28pXG5jb25zb2xlLmxvZyhzdWJtYXJpbmVUd28pXG5jb25zb2xlLmxvZyhjcnVpc2VyVHdvKVxuY29uc29sZS5sb2coZGVzdHJveWVyVHdvKSovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9