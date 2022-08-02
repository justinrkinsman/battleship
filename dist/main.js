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

function gameboard(length) {
    //let currentShip = ship(length)
    let shipLocation = 2
    let emptySpace = 0
    let miss = 3
    let hit = 1
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
        const placeShip = () => {
        const keys = Object.keys(createGrid)
        const prop = keys[Math.floor(Math.random() * keys.length)]
        const keys2 = Object.keys(createGrid[prop])
        const prop2 = keys2[Math.floor(Math.random() * keys2.length)]
        let newGrid = createGrid
        newGrid[prop][prop2] = shipLocation
        //createGrid[prop][prop2 + 1] = shipLocation
        return newGrid
        }
        let newGrid = createGrid
        const receiveAttack = (row, column) => {
        if (newGrid[row][column] === emptySpace){
            newGrid[row][column] = miss
            console.log('miss')
            console.log(newGrid)
            return newGrid
        }else if (newGrid[row][column] === shipLocation){
            newGrid[row][column] = hit
            console.log('direct hit')
            console.log(newGrid)
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
        grid.setAttribute('dataset', `${i}, ${j}`)
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
        grid.setAttribute('data', `${i}, ${j}`)
        container2.appendChild(grid);
        }
        document.getElementById('container2').style.gridTemplateColumns = `repeat(${10}, 1fr)`;
    }
})()

let game = gameboard()

document.addEventListener('click', function(e){
    //let game = gameboard()
    if(e.target && e.target.className === 'grid'){
        //game.placeShip()
        //let hit = game.placeShip()
        let coordinates = e.target.getAttribute('dataset')
        let coordinatesRow = coordinates.charAt(0)
        let coordinatesCol = coordinates.slice(-1)
        game.receiveAttack(coordinatesRow, coordinatesCol)
        
        //console.log(hit)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFdBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0Esd0NBQXdDLEVBQUUsSUFBSSxFQUFFO0FBQ2hEO0FBQ0E7QUFDQSxtRkFBbUYsR0FBRztBQUN0RjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EscUNBQXFDLEVBQUUsSUFBSSxFQUFFO0FBQzdDO0FBQ0E7QUFDQSxvRkFBb0YsR0FBRztBQUN2RjtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50KSA9PiB7XG4gICAgbGV0IGdhbWUgPSBnYW1lYm9hcmQoKVxuICAgIGdhbWUucGxhY2VTaGlwKClcbiAgICBjb25zb2xlLmxvZyhnYW1lLnBsYWNlU2hpcCgpKVxufSlcblxuZnVuY3Rpb24gc2hpcChsZW5ndGgpe1xuICAgIGxldCBzaGlwTGVuZ3RoID0gY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hpcExlbmd0aCxcbiAgICAgICAgaGl0KG51bWJlcikge1xuICAgICAgICAgICAgc2hpcExlbmd0aFtudW1iZXJdID0gMVxuICAgICAgICAgICAgcmV0dXJuIHNoaXBMZW5ndGggXG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuaygpIHtcbiAgICAgICAgICAgIGlmIChzaGlwTGVuZ3RoLmluY2x1ZGVzKCcwJykpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzaGlwTGVuZ3RoLmluY2x1ZGVzKCcwJykpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNoaXBMZW5ndGgoYXJyYXkpIHtcbiAgICBsZXQgYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5OyBpKyspe1xuICAgICAgICBhcnIucHVzaCgwKVxuICAgIH1cbiAgICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHNoaXBOYW1lcygpIHtcbiAgICByZXR1cm4ge1xuICAgIGNhcnJpZXI6IDUsXG4gICAgYmF0dGxlU2hpcDogNCxcbiAgICBjcnVpc2VyOiAzLFxuICAgIHN1Ym1hcmluZTogMyxcbiAgICBkZXN0cm95ZXI6IDJcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdhbWVib2FyZChsZW5ndGgpIHtcbiAgICAvL2xldCBjdXJyZW50U2hpcCA9IHNoaXAobGVuZ3RoKVxuICAgIGxldCBzaGlwTG9jYXRpb24gPSAyXG4gICAgbGV0IGVtcHR5U3BhY2UgPSAwXG4gICAgbGV0IG1pc3MgPSAzXG4gICAgbGV0IGhpdCA9IDFcbiAgICBsZXQgY3JlYXRlR3JpZCA9IHtcbiAgICAgICAgICAgIDA6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDE6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDM6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDQ6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDY6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDc6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDk6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwbGFjZVNoaXAgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjcmVhdGVHcmlkKVxuICAgICAgICBjb25zdCBwcm9wID0ga2V5c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBrZXlzLmxlbmd0aCldXG4gICAgICAgIGNvbnN0IGtleXMyID0gT2JqZWN0LmtleXMoY3JlYXRlR3JpZFtwcm9wXSlcbiAgICAgICAgY29uc3QgcHJvcDIgPSBrZXlzMltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBrZXlzMi5sZW5ndGgpXVxuICAgICAgICBsZXQgbmV3R3JpZCA9IGNyZWF0ZUdyaWRcbiAgICAgICAgbmV3R3JpZFtwcm9wXVtwcm9wMl0gPSBzaGlwTG9jYXRpb25cbiAgICAgICAgLy9jcmVhdGVHcmlkW3Byb3BdW3Byb3AyICsgMV0gPSBzaGlwTG9jYXRpb25cbiAgICAgICAgcmV0dXJuIG5ld0dyaWRcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3R3JpZCA9IGNyZWF0ZUdyaWRcbiAgICAgICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgICAgICBpZiAobmV3R3JpZFtyb3ddW2NvbHVtbl0gPT09IGVtcHR5U3BhY2Upe1xuICAgICAgICAgICAgbmV3R3JpZFtyb3ddW2NvbHVtbl0gPSBtaXNzXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWlzcycpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdHcmlkKVxuICAgICAgICAgICAgcmV0dXJuIG5ld0dyaWRcbiAgICAgICAgfWVsc2UgaWYgKG5ld0dyaWRbcm93XVtjb2x1bW5dID09PSBzaGlwTG9jYXRpb24pe1xuICAgICAgICAgICAgbmV3R3JpZFtyb3ddW2NvbHVtbl0gPSBoaXRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaXJlY3QgaGl0JylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0dyaWQpXG4gICAgICAgICAgICByZXR1cm4gbmV3R3JpZFxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY2VpdmVBdHRhY2ssIGNyZWF0ZUdyaWQsIHBsYWNlU2hpcFxuICAgIH1cbn1cblxuLy9cbi8vQ3JlYXRlcyB0aGUgZ3JpZCBpbiB0aGUgRE9NXG4vL1xubGV0IGNyZWF0ZU5ld0dyaWQgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbnRhaW5lcicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGA7XG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdkYXRhc2V0JywgYCR7aX0sICR7an1gKVxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7MTB9LCAxZnIpYDtcbiAgICB9XG59KSgpXG5cbmxldCBjcmVhdGVOZXdHcmlkMiA9ICgoKSA9PiB7XG4gICAgbGV0IGNvbnRhaW5lcjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lcjIuc2V0QXR0cmlidXRlKCdpZCcsICdjb250YWluZXIyJylcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcjIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZC5jbGFzc05hbWUgPSBgZ3JpZGBcbiAgICAgICAgZ3JpZC5zZXRBdHRyaWJ1dGUoJ2RhdGEnLCBgJHtpfSwgJHtqfWApXG4gICAgICAgIGNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQoZ3JpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcjInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5sZXQgZ2FtZSA9IGdhbWVib2FyZCgpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgLy9sZXQgZ2FtZSA9IGdhbWVib2FyZCgpXG4gICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQuY2xhc3NOYW1lID09PSAnZ3JpZCcpe1xuICAgICAgICAvL2dhbWUucGxhY2VTaGlwKClcbiAgICAgICAgLy9sZXQgaGl0ID0gZ2FtZS5wbGFjZVNoaXAoKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGFzZXQnKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNSb3cgPSBjb29yZGluYXRlcy5jaGFyQXQoMClcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzQ29sID0gY29vcmRpbmF0ZXMuc2xpY2UoLTEpXG4gICAgICAgIGdhbWUucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlc1JvdywgY29vcmRpbmF0ZXNDb2wpXG4gICAgICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nKGhpdClcbn1cbn0pXG5cbi8qXG4wOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICAxOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICAyOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICAzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICA0OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICA1OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICA2OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICA3OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICA4OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICA5OiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4qL1xuXG4vKlxuMDogWydhMScsICdhMicsICdhMycsICdhNCcsICdhNScsICdhNicsICdhNycsICdhOCcsICdhOScsICdhMTAnXSxcbiAgICAgICAgICAgIDE6IFsnYjEnLCAnYjInLCAnYjMnLCAnYjQnLCAnYjUnLCAnYjYnLCAnYjcnLCAnYjgnLCAnYjknLCAnYjEwJ10sXG4gICAgICAgICAgICAyOiBbJ2MxJywgJ2MyJywgJ2MzJywgJ2M0JywgJ2M1JywgJ2M2JywgJ2M3JywgJ2M4JywgJ2M5JywgJ2MxMCddLFxuICAgICAgICAgICAgMzogWydkMScsICdkMicsICdkMycsICdkNCcsICdkNScsICdkNicsICdkNycsICdkOCcsICdkOScsICdkMTAnXSxcbiAgICAgICAgICAgIDQ6IFsnZTEnLCAnZTInLCAnZTMnLCAnZTQnLCAnZTUnLCAnZTYnLCAnZTcnLCAnZTgnLCAnZTknLCAnZTEwJ10sXG4gICAgICAgICAgICA1OiBbJ2YxJywgJ2YyJywgJ2YzJywgJ2Y0JywgJ2Y1JywgJ2Y2JywgJ2Y3JywgJ2Y4JywgJ2Y5JywgJ2YxMCddLFxuICAgICAgICAgICAgNjogWydnMScsICdnMicsICdnMycsICdnNCcsICdnNScsICdnNicsICdnNycsICdnOCcsICdnOScsICdnMTAnXSxcbiAgICAgICAgICAgIDc6IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaDcnLCAnaDgnLCAnaDknLCAnaDEwJ10sXG4gICAgICAgICAgICA4OiBbJ2kxJywgJ2kyJywgJ2kzJywgJ2k0JywgJ2k1JywgJ2k2JywgJ2k3JywgJ2k4JywgJ2k5JywgJ2kxMCddLFxuICAgICAgICAgICAgOTogWydqMScsICdqMicsICdqMycsICdqNCcsICdqNScsICdqNicsICdqNycsICdqOCcsICdqOScsICdqMTAnXSxcbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9