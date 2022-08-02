/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
window.addEventListener('load', (event) => {
    let game = gameboard()
    game.placeShip()
    console.log(game.placeShip())
})

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
    
        const placeShip = () => {
        const keys = Object.keys(createGrid)
        const prop = keys[Math.floor(Math.random() * keys.length)]
        const keys2 = Object.keys(createGrid[prop])
        const prop2 = keys2[Math.floor(Math.random() * keys2.length)]
        //let newGrid = createGrid
        createGrid[prop][prop2] = shipLocation
        //createGrid[prop][prop2 + 1] = shipLocation
        return createGrid
        }
        let newGrid = createGrid
        const receiveAttack = (row, column) => {
        if (newGrid[row][column] === emptySpace){
            newGrid[row][column] = miss
            console.log('miss')
            console.log(newGrid)
            let item = document.getElementById(`${row}, ${column}`)
            populateGrid(item.id, 'Miss')
            return newGrid
        }else if (newGrid[row][column] === shipLocation){
            newGrid[row][column] = hit
            console.log('direct hit')
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
    item.innerText = result
}

const game = gameboard()
game.placeShip()

document.addEventListener('click', function(e){
    //let game = gameboard()
    if(e.target && e.target.className === 'grid'){
        //game.placeShip()
        //let hit = game.placeShip()
        let coordinates = e.target.id
        let coordinatesRow = coordinates.charAt(0)
        let coordinatesCol = coordinates.slice(-1)
        game.receiveAttack(coordinatesRow, coordinatesCol)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFdBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELElBQUksSUFBSSxPQUFPO0FBQ2pFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELElBQUksSUFBSSxPQUFPO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EsbUNBQW1DLEVBQUUsSUFBSSxFQUFFO0FBQzNDO0FBQ0E7QUFDQSxtRkFBbUYsR0FBRztBQUN0RjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EsbUNBQW1DLEVBQUUsSUFBSSxFQUFFO0FBQzNDO0FBQ0E7QUFDQSxvRkFBb0YsR0FBRztBQUN2RjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudCkgPT4ge1xuICAgIGxldCBnYW1lID0gZ2FtZWJvYXJkKClcbiAgICBnYW1lLnBsYWNlU2hpcCgpXG4gICAgY29uc29sZS5sb2coZ2FtZS5wbGFjZVNoaXAoKSlcbn0pXG5cbmZ1bmN0aW9uIHNoaXAobGVuZ3RoKXtcbiAgICBsZXQgc2hpcExlbmd0aCA9IGNhbGN1bGF0ZVNoaXBMZW5ndGgobGVuZ3RoKVxuICAgIHJldHVybiB7XG4gICAgICAgIHNoaXBMZW5ndGgsXG4gICAgICAgIGhpdChudW1iZXIpIHtcbiAgICAgICAgICAgIHNoaXBMZW5ndGhbbnVtYmVyXSA9IDFcbiAgICAgICAgICAgIHJldHVybiBzaGlwTGVuZ3RoIFxuICAgICAgICB9LFxuICAgICAgICBpc1N1bmsoKSB7XG4gICAgICAgICAgICBpZiAoc2hpcExlbmd0aC5pbmNsdWRlcygnMCcpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2hpcExlbmd0aC5pbmNsdWRlcygnMCcpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTaGlwTGVuZ3RoKGFycmF5KSB7XG4gICAgbGV0IGFyciA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheTsgaSsrKXtcbiAgICAgICAgYXJyLnB1c2goMClcbiAgICB9XG4gICAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBzaGlwTmFtZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICBjYXJyaWVyOiA1LFxuICAgIGJhdHRsZVNoaXA6IDQsXG4gICAgY3J1aXNlcjogMyxcbiAgICBzdWJtYXJpbmU6IDMsXG4gICAgZGVzdHJveWVyOiAyXG4gICAgfVxufVxuXG5sZXQgY3JlYXRlR3JpZCA9IHtcbiAgICAwOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA2OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICA5OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG59XG5cbmZ1bmN0aW9uIGdhbWVib2FyZChsZW5ndGgpIHtcbiAgICAvL2xldCBjdXJyZW50U2hpcCA9IHNoaXAobGVuZ3RoKVxuICAgIGxldCBzaGlwTG9jYXRpb24gPSAyXG4gICAgbGV0IGVtcHR5U3BhY2UgPSAwXG4gICAgbGV0IG1pc3MgPSAzXG4gICAgbGV0IGhpdCA9IDFcbiAgICBcbiAgICAgICAgY29uc3QgcGxhY2VTaGlwID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY3JlYXRlR3JpZClcbiAgICAgICAgY29uc3QgcHJvcCA9IGtleXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5cy5sZW5ndGgpXVxuICAgICAgICBjb25zdCBrZXlzMiA9IE9iamVjdC5rZXlzKGNyZWF0ZUdyaWRbcHJvcF0pXG4gICAgICAgIGNvbnN0IHByb3AyID0ga2V5czJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5czIubGVuZ3RoKV1cbiAgICAgICAgLy9sZXQgbmV3R3JpZCA9IGNyZWF0ZUdyaWRcbiAgICAgICAgY3JlYXRlR3JpZFtwcm9wXVtwcm9wMl0gPSBzaGlwTG9jYXRpb25cbiAgICAgICAgLy9jcmVhdGVHcmlkW3Byb3BdW3Byb3AyICsgMV0gPSBzaGlwTG9jYXRpb25cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUdyaWRcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3R3JpZCA9IGNyZWF0ZUdyaWRcbiAgICAgICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgICAgICBpZiAobmV3R3JpZFtyb3ddW2NvbHVtbl0gPT09IGVtcHR5U3BhY2Upe1xuICAgICAgICAgICAgbmV3R3JpZFtyb3ddW2NvbHVtbl0gPSBtaXNzXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWlzcycpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdHcmlkKVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgcG9wdWxhdGVHcmlkKGl0ZW0uaWQsICdNaXNzJylcbiAgICAgICAgICAgIHJldHVybiBuZXdHcmlkXG4gICAgICAgIH1lbHNlIGlmIChuZXdHcmlkW3Jvd11bY29sdW1uXSA9PT0gc2hpcExvY2F0aW9uKXtcbiAgICAgICAgICAgIG5ld0dyaWRbcm93XVtjb2x1bW5dID0gaGl0XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGlyZWN0IGhpdCcpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdHcmlkKVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtyb3d9LCAke2NvbHVtbn1gKVxuICAgICAgICAgICAgcG9wdWxhdGVHcmlkKGl0ZW0uaWQsICdIaXQnKVxuICAgICAgICAgICAgcmV0dXJuIG5ld0dyaWRcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNlaXZlQXR0YWNrLCBjcmVhdGVHcmlkLCBwbGFjZVNoaXBcbiAgICB9XG59XG5cbi8vXG4vL0NyZWF0ZXMgdGhlIGdyaWQgaW4gdGhlIERPTVxuLy9cbmxldCBjcmVhdGVOZXdHcmlkID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdjb250YWluZXInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgO1xuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSwgJHtqfWApXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHsxMH0sIDFmcilgO1xuICAgIH1cbn0pKClcblxubGV0IGNyZWF0ZU5ld0dyaWQyID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGFpbmVyMi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcjInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyMilcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspe1xuICAgICAgICBsZXQgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmlkLmNsYXNzTmFtZSA9IGBncmlkYFxuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSwgJHtqfWApXG4gICAgICAgIGNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcjInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5jb25zdCBwb3B1bGF0ZUdyaWQgPSAoY29vcmRpbmF0ZXMsIHJlc3VsdCkgPT4ge1xuICAgIGxldCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29vcmRpbmF0ZXMpXG4gICAgaXRlbS5pbm5lclRleHQgPSByZXN1bHRcbn1cblxuY29uc3QgZ2FtZSA9IGdhbWVib2FyZCgpXG5nYW1lLnBsYWNlU2hpcCgpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgLy9sZXQgZ2FtZSA9IGdhbWVib2FyZCgpXG4gICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQuY2xhc3NOYW1lID09PSAnZ3JpZCcpe1xuICAgICAgICAvL2dhbWUucGxhY2VTaGlwKClcbiAgICAgICAgLy9sZXQgaGl0ID0gZ2FtZS5wbGFjZVNoaXAoKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSBlLnRhcmdldC5pZFxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNSb3cgPSBjb29yZGluYXRlcy5jaGFyQXQoMClcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzQ29sID0gY29vcmRpbmF0ZXMuc2xpY2UoLTEpXG4gICAgICAgIGdhbWUucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlc1JvdywgY29vcmRpbmF0ZXNDb2wpXG59XG59KVxuXG4vKlxuMDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgMjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgMzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgODogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgOTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuKi9cblxuLypcbjA6IFsnYTEnLCAnYTInLCAnYTMnLCAnYTQnLCAnYTUnLCAnYTYnLCAnYTcnLCAnYTgnLCAnYTknLCAnYTEwJ10sXG4gICAgICAgICAgICAxOiBbJ2IxJywgJ2IyJywgJ2IzJywgJ2I0JywgJ2I1JywgJ2I2JywgJ2I3JywgJ2I4JywgJ2I5JywgJ2IxMCddLFxuICAgICAgICAgICAgMjogWydjMScsICdjMicsICdjMycsICdjNCcsICdjNScsICdjNicsICdjNycsICdjOCcsICdjOScsICdjMTAnXSxcbiAgICAgICAgICAgIDM6IFsnZDEnLCAnZDInLCAnZDMnLCAnZDQnLCAnZDUnLCAnZDYnLCAnZDcnLCAnZDgnLCAnZDknLCAnZDEwJ10sXG4gICAgICAgICAgICA0OiBbJ2UxJywgJ2UyJywgJ2UzJywgJ2U0JywgJ2U1JywgJ2U2JywgJ2U3JywgJ2U4JywgJ2U5JywgJ2UxMCddLFxuICAgICAgICAgICAgNTogWydmMScsICdmMicsICdmMycsICdmNCcsICdmNScsICdmNicsICdmNycsICdmOCcsICdmOScsICdmMTAnXSxcbiAgICAgICAgICAgIDY6IFsnZzEnLCAnZzInLCAnZzMnLCAnZzQnLCAnZzUnLCAnZzYnLCAnZzcnLCAnZzgnLCAnZzknLCAnZzEwJ10sXG4gICAgICAgICAgICA3OiBbJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2g3JywgJ2g4JywgJ2g5JywgJ2gxMCddLFxuICAgICAgICAgICAgODogWydpMScsICdpMicsICdpMycsICdpNCcsICdpNScsICdpNicsICdpNycsICdpOCcsICdpOScsICdpMTAnXSxcbiAgICAgICAgICAgIDk6IFsnajEnLCAnajInLCAnajMnLCAnajQnLCAnajUnLCAnajYnLCAnajcnLCAnajgnLCAnajknLCAnajEwJ10sXG4qLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==