/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function ship(length){
    let shipLength = calculateShipLength(length)
    return {
        shipLength,
        hit(number) {
            shipLength[number] = 1
            return shipLength 
        },
        isSunk() {
            if (shipLength.includes('0')){
                return false
            }
            if (!shipLength.includes('0')){
                return true
            }
        }
    }
}

function calculateShipLength(array) {
    let arr = []
    for (let i = 0; i < array; i++){
        arr.push(0)
    }
    return arr
}

function shipNames() {
    return {
    carrier: 5,
    battleShip: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
    }
}

function gameboard(length) {
    let currentShip = ship(length)
    let shipLocation = 2
    let emptySpace = 0
    let miss = 3
    let hit = 1
    const createGrid = {
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
    const receiveAttack = (row, column) => {
        let location = placeShip()
        let newGrid = createGrid
        if (newGrid[row][column] === emptySpace){
            newGrid[row][column] = miss
            console.log(newGrid)
            return "Miss"
        }else if (newGrid[row][column] === shipLocation){
            newGrid[row][column] = hit
            console.log(newGrid)
            return "Direct Hit"
        }
    }
    const placeShip = () => {
        const keys = Object.keys(createGrid)
        const prop = keys[Math.floor(Math.random() * keys.length)]
        const keys2 = Object.keys(createGrid[prop])
        const prop2 = keys2[Math.floor(Math.random() * keys2.length)]
        createGrid[prop][prop2] = shipLocation
        createGrid[prop][prop2 + 1] = shipLocation
        return createGrid
    }
    return {
        receiveAttack, createGrid, placeShip
    }
}


//
//Determines coordinates. This might be usuable in the hit() function
//

/*document.addEventListener('keypress', () => {
    let play = gameboard()
    console.log(play.receiveAttack(0, 0))
})*/

/*let newGame = gameboard()
let newGrid = newGame.createGrid()
console.log(newGrid[1][7])*/

//
//Creates the grid in the DOM
//
let createGrid = (() => {
    let container = document.createElement('div')
    container.setAttribute('id', 'container')
    document.body.appendChild(container)
    for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++){
        let grid = document.createElement('div');
        grid.className = 'grid';
        container.appendChild(grid);
        }
        document.getElementById('container').style.gridTemplateColumns = `repeat(${10}, 1fr)`;
    }
})()

let createGrid2 = (() => {
    let container2 = document.createElement('div')
    container2.setAttribute('id', 'container2')
    document.body.appendChild(container2)
    for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++){
        let grid = document.createElement('div');
        grid.className = 'grid';
        container2.appendChild(grid);
        }
        document.getElementById('container2').style.gridTemplateColumns = `repeat(${10}, 1fr)`;
    }
})()

document.addEventListener('click', function(e){
    if(e.target && e.target.className === 'grid'){
        console.log(e.target)
}
})


/*
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
*/

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1GQUFtRixHQUFHO0FBQ3RGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLEdBQUc7QUFDdkY7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzaGlwKGxlbmd0aCl7XG4gICAgbGV0IHNoaXBMZW5ndGggPSBjYWxjdWxhdGVTaGlwTGVuZ3RoKGxlbmd0aClcbiAgICByZXR1cm4ge1xuICAgICAgICBzaGlwTGVuZ3RoLFxuICAgICAgICBoaXQobnVtYmVyKSB7XG4gICAgICAgICAgICBzaGlwTGVuZ3RoW251bWJlcl0gPSAxXG4gICAgICAgICAgICByZXR1cm4gc2hpcExlbmd0aCBcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rKCkge1xuICAgICAgICAgICAgaWYgKHNoaXBMZW5ndGguaW5jbHVkZXMoJzAnKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXNoaXBMZW5ndGguaW5jbHVkZXMoJzAnKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlU2hpcExlbmd0aChhcnJheSkge1xuICAgIGxldCBhcnIgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXk7IGkrKyl7XG4gICAgICAgIGFyci5wdXNoKDApXG4gICAgfVxuICAgIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gc2hpcE5hbWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgY2FycmllcjogNSxcbiAgICBiYXR0bGVTaGlwOiA0LFxuICAgIGNydWlzZXI6IDMsXG4gICAgc3VibWFyaW5lOiAzLFxuICAgIGRlc3Ryb3llcjogMlxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2FtZWJvYXJkKGxlbmd0aCkge1xuICAgIGxldCBjdXJyZW50U2hpcCA9IHNoaXAobGVuZ3RoKVxuICAgIGxldCBzaGlwTG9jYXRpb24gPSAyXG4gICAgbGV0IGVtcHR5U3BhY2UgPSAwXG4gICAgbGV0IG1pc3MgPSAzXG4gICAgbGV0IGhpdCA9IDFcbiAgICBjb25zdCBjcmVhdGVHcmlkID0ge1xuICAgICAgICAgICAgMDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgMjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgMzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgODogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgOTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICB9XG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgICAgICBsZXQgbG9jYXRpb24gPSBwbGFjZVNoaXAoKVxuICAgICAgICBsZXQgbmV3R3JpZCA9IGNyZWF0ZUdyaWRcbiAgICAgICAgaWYgKG5ld0dyaWRbcm93XVtjb2x1bW5dID09PSBlbXB0eVNwYWNlKXtcbiAgICAgICAgICAgIG5ld0dyaWRbcm93XVtjb2x1bW5dID0gbWlzc1xuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3R3JpZClcbiAgICAgICAgICAgIHJldHVybiBcIk1pc3NcIlxuICAgICAgICB9ZWxzZSBpZiAobmV3R3JpZFtyb3ddW2NvbHVtbl0gPT09IHNoaXBMb2NhdGlvbil7XG4gICAgICAgICAgICBuZXdHcmlkW3Jvd11bY29sdW1uXSA9IGhpdFxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3R3JpZClcbiAgICAgICAgICAgIHJldHVybiBcIkRpcmVjdCBIaXRcIlxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHBsYWNlU2hpcCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNyZWF0ZUdyaWQpXG4gICAgICAgIGNvbnN0IHByb3AgPSBrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV1cbiAgICAgICAgY29uc3Qga2V5czIgPSBPYmplY3Qua2V5cyhjcmVhdGVHcmlkW3Byb3BdKVxuICAgICAgICBjb25zdCBwcm9wMiA9IGtleXMyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMyLmxlbmd0aCldXG4gICAgICAgIGNyZWF0ZUdyaWRbcHJvcF1bcHJvcDJdID0gc2hpcExvY2F0aW9uXG4gICAgICAgIGNyZWF0ZUdyaWRbcHJvcF1bcHJvcDIgKyAxXSA9IHNoaXBMb2NhdGlvblxuICAgICAgICByZXR1cm4gY3JlYXRlR3JpZFxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNlaXZlQXR0YWNrLCBjcmVhdGVHcmlkLCBwbGFjZVNoaXBcbiAgICB9XG59XG5cblxuLy9cbi8vRGV0ZXJtaW5lcyBjb29yZGluYXRlcy4gVGhpcyBtaWdodCBiZSB1c3VhYmxlIGluIHRoZSBoaXQoKSBmdW5jdGlvblxuLy9cblxuLypkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsICgpID0+IHtcbiAgICBsZXQgcGxheSA9IGdhbWVib2FyZCgpXG4gICAgY29uc29sZS5sb2cocGxheS5yZWNlaXZlQXR0YWNrKDAsIDApKVxufSkqL1xuXG4vKmxldCBuZXdHYW1lID0gZ2FtZWJvYXJkKClcbmxldCBuZXdHcmlkID0gbmV3R2FtZS5jcmVhdGVHcmlkKClcbmNvbnNvbGUubG9nKG5ld0dyaWRbMV1bN10pKi9cblxuLy9cbi8vQ3JlYXRlcyB0aGUgZ3JpZCBpbiB0aGUgRE9NXG4vL1xubGV0IGNyZWF0ZUdyaWQgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSAnZ3JpZCc7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHsxMH0sIDFmcilgO1xuICAgIH1cbn0pKClcblxubGV0IGNyZWF0ZUdyaWQyID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGFpbmVyMi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcjInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyMilcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspe1xuICAgICAgICBsZXQgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmlkLmNsYXNzTmFtZSA9ICdncmlkJztcbiAgICAgICAgY29udGFpbmVyMi5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyMicpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7MTB9LCAxZnIpYDtcbiAgICB9XG59KSgpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQuY2xhc3NOYW1lID09PSAnZ3JpZCcpe1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldClcbn1cbn0pXG5cblxuLypcbjA6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDE6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDM6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDQ6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDY6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDc6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDk6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiovXG5cbi8qXG4wOiBbJ2ExJywgJ2EyJywgJ2EzJywgJ2E0JywgJ2E1JywgJ2E2JywgJ2E3JywgJ2E4JywgJ2E5JywgJ2ExMCddLFxuICAgICAgICAgICAgMTogWydiMScsICdiMicsICdiMycsICdiNCcsICdiNScsICdiNicsICdiNycsICdiOCcsICdiOScsICdiMTAnXSxcbiAgICAgICAgICAgIDI6IFsnYzEnLCAnYzInLCAnYzMnLCAnYzQnLCAnYzUnLCAnYzYnLCAnYzcnLCAnYzgnLCAnYzknLCAnYzEwJ10sXG4gICAgICAgICAgICAzOiBbJ2QxJywgJ2QyJywgJ2QzJywgJ2Q0JywgJ2Q1JywgJ2Q2JywgJ2Q3JywgJ2Q4JywgJ2Q5JywgJ2QxMCddLFxuICAgICAgICAgICAgNDogWydlMScsICdlMicsICdlMycsICdlNCcsICdlNScsICdlNicsICdlNycsICdlOCcsICdlOScsICdlMTAnXSxcbiAgICAgICAgICAgIDU6IFsnZjEnLCAnZjInLCAnZjMnLCAnZjQnLCAnZjUnLCAnZjYnLCAnZjcnLCAnZjgnLCAnZjknLCAnZjEwJ10sXG4gICAgICAgICAgICA2OiBbJ2cxJywgJ2cyJywgJ2czJywgJ2c0JywgJ2c1JywgJ2c2JywgJ2c3JywgJ2c4JywgJ2c5JywgJ2cxMCddLFxuICAgICAgICAgICAgNzogWydoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdoNycsICdoOCcsICdoOScsICdoMTAnXSxcbiAgICAgICAgICAgIDg6IFsnaTEnLCAnaTInLCAnaTMnLCAnaTQnLCAnaTUnLCAnaTYnLCAnaTcnLCAnaTgnLCAnaTknLCAnaTEwJ10sXG4gICAgICAgICAgICA5OiBbJ2oxJywgJ2oyJywgJ2ozJywgJ2o0JywgJ2o1JywgJ2o2JywgJ2o3JywgJ2o4JywgJ2o5JywgJ2oxMCddLFxuKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=