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
        grid.className = `grid`;
        grid.setAttribute('dataset', `${i}, ${j}`)
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
        grid.className = `grid`
        grid.setAttribute('data', `${i}, ${j}`)
        container2.appendChild(grid);
        }
        document.getElementById('container2').style.gridTemplateColumns = `repeat(${10}, 1fr)`;
    }
})()

document.addEventListener('click', function(e){
    if(e.target && e.target.className === 'grid'){
        let game = gameboard()
        game.placeShip()
        let hit = game.createGrid
        let coordinates = e.target.getAttribute('dataset')
        let coordinatesRow = coordinates.charAt(0)
        let coordinatesCol = coordinates.slice(-1)
        game.receiveAttack(coordinatesRow, coordinatesCol)
        console.log(hit)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0Esd0NBQXdDLEVBQUUsSUFBSSxFQUFFO0FBQ2hEO0FBQ0E7QUFDQSxtRkFBbUYsR0FBRztBQUN0RjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EscUNBQXFDLEVBQUUsSUFBSSxFQUFFO0FBQzdDO0FBQ0E7QUFDQSxvRkFBb0YsR0FBRztBQUN2RjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2hpcChsZW5ndGgpe1xuICAgIGxldCBzaGlwTGVuZ3RoID0gY2FsY3VsYXRlU2hpcExlbmd0aChsZW5ndGgpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hpcExlbmd0aCxcbiAgICAgICAgaGl0KG51bWJlcikge1xuICAgICAgICAgICAgc2hpcExlbmd0aFtudW1iZXJdID0gMVxuICAgICAgICAgICAgcmV0dXJuIHNoaXBMZW5ndGggXG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuaygpIHtcbiAgICAgICAgICAgIGlmIChzaGlwTGVuZ3RoLmluY2x1ZGVzKCcwJykpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzaGlwTGVuZ3RoLmluY2x1ZGVzKCcwJykpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNoaXBMZW5ndGgoYXJyYXkpIHtcbiAgICBsZXQgYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5OyBpKyspe1xuICAgICAgICBhcnIucHVzaCgwKVxuICAgIH1cbiAgICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHNoaXBOYW1lcygpIHtcbiAgICByZXR1cm4ge1xuICAgIGNhcnJpZXI6IDUsXG4gICAgYmF0dGxlU2hpcDogNCxcbiAgICBjcnVpc2VyOiAzLFxuICAgIHN1Ym1hcmluZTogMyxcbiAgICBkZXN0cm95ZXI6IDJcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdhbWVib2FyZChsZW5ndGgpIHtcbiAgICBsZXQgY3VycmVudFNoaXAgPSBzaGlwKGxlbmd0aClcbiAgICBsZXQgc2hpcExvY2F0aW9uID0gMlxuICAgIGxldCBlbXB0eVNwYWNlID0gMFxuICAgIGxldCBtaXNzID0gM1xuICAgIGxldCBoaXQgPSAxXG4gICAgY29uc3QgY3JlYXRlR3JpZCA9IHtcbiAgICAgICAgICAgIDA6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDE6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDM6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDQ6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDU6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDY6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDc6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDg6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIDk6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgfVxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gcGxhY2VTaGlwKClcbiAgICAgICAgbGV0IG5ld0dyaWQgPSBjcmVhdGVHcmlkXG4gICAgICAgIGlmIChuZXdHcmlkW3Jvd11bY29sdW1uXSA9PT0gZW1wdHlTcGFjZSl7XG4gICAgICAgICAgICBuZXdHcmlkW3Jvd11bY29sdW1uXSA9IG1pc3NcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0dyaWQpXG4gICAgICAgICAgICByZXR1cm4gXCJNaXNzXCJcbiAgICAgICAgfWVsc2UgaWYgKG5ld0dyaWRbcm93XVtjb2x1bW5dID09PSBzaGlwTG9jYXRpb24pe1xuICAgICAgICAgICAgbmV3R3JpZFtyb3ddW2NvbHVtbl0gPSBoaXRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0dyaWQpXG4gICAgICAgICAgICByZXR1cm4gXCJEaXJlY3QgSGl0XCJcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjcmVhdGVHcmlkKVxuICAgICAgICBjb25zdCBwcm9wID0ga2V5c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBrZXlzLmxlbmd0aCldXG4gICAgICAgIGNvbnN0IGtleXMyID0gT2JqZWN0LmtleXMoY3JlYXRlR3JpZFtwcm9wXSlcbiAgICAgICAgY29uc3QgcHJvcDIgPSBrZXlzMltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBrZXlzMi5sZW5ndGgpXVxuICAgICAgICBjcmVhdGVHcmlkW3Byb3BdW3Byb3AyXSA9IHNoaXBMb2NhdGlvblxuICAgICAgICBjcmVhdGVHcmlkW3Byb3BdW3Byb3AyICsgMV0gPSBzaGlwTG9jYXRpb25cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUdyaWRcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjZWl2ZUF0dGFjaywgY3JlYXRlR3JpZCwgcGxhY2VTaGlwXG4gICAgfVxufVxuXG5cbi8vXG4vL0RldGVybWluZXMgY29vcmRpbmF0ZXMuIFRoaXMgbWlnaHQgYmUgdXN1YWJsZSBpbiB0aGUgaGl0KCkgZnVuY3Rpb25cbi8vXG5cbi8qZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoKSA9PiB7XG4gICAgbGV0IHBsYXkgPSBnYW1lYm9hcmQoKVxuICAgIGNvbnNvbGUubG9nKHBsYXkucmVjZWl2ZUF0dGFjaygwLCAwKSlcbn0pKi9cblxuLypsZXQgbmV3R2FtZSA9IGdhbWVib2FyZCgpXG5sZXQgbmV3R3JpZCA9IG5ld0dhbWUuY3JlYXRlR3JpZCgpXG5jb25zb2xlLmxvZyhuZXdHcmlkWzFdWzddKSovXG5cbi8vXG4vL0NyZWF0ZXMgdGhlIGdyaWQgaW4gdGhlIERPTVxuLy9cbmxldCBjcmVhdGVHcmlkID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdjb250YWluZXInKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgO1xuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnZGF0YXNldCcsIGAke2l9LCAke2p9YClcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgkezEwfSwgMWZyKWA7XG4gICAgfVxufSkoKVxuXG5sZXQgY3JlYXRlR3JpZDIgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29udGFpbmVyMicpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIyKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWQuY2xhc3NOYW1lID0gYGdyaWRgXG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdkYXRhJywgYCR7aX0sICR7an1gKVxuICAgICAgICBjb250YWluZXIyLmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXIyJykuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHsxMH0sIDFmcilgO1xuICAgIH1cbn0pKClcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5jbGFzc05hbWUgPT09ICdncmlkJyl7XG4gICAgICAgIGxldCBnYW1lID0gZ2FtZWJvYXJkKClcbiAgICAgICAgZ2FtZS5wbGFjZVNoaXAoKVxuICAgICAgICBsZXQgaGl0ID0gZ2FtZS5jcmVhdGVHcmlkXG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YXNldCcpXG4gICAgICAgIGxldCBjb29yZGluYXRlc1JvdyA9IGNvb3JkaW5hdGVzLmNoYXJBdCgwKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNDb2wgPSBjb29yZGluYXRlcy5zbGljZSgtMSlcbiAgICAgICAgZ2FtZS5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzUm93LCBjb29yZGluYXRlc0NvbClcbiAgICAgICAgY29uc29sZS5sb2coaGl0KVxufVxufSlcblxuXG4vKlxuMDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgMTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgMjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgMzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNDogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgNzogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgODogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgOTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuKi9cblxuLypcbjA6IFsnYTEnLCAnYTInLCAnYTMnLCAnYTQnLCAnYTUnLCAnYTYnLCAnYTcnLCAnYTgnLCAnYTknLCAnYTEwJ10sXG4gICAgICAgICAgICAxOiBbJ2IxJywgJ2IyJywgJ2IzJywgJ2I0JywgJ2I1JywgJ2I2JywgJ2I3JywgJ2I4JywgJ2I5JywgJ2IxMCddLFxuICAgICAgICAgICAgMjogWydjMScsICdjMicsICdjMycsICdjNCcsICdjNScsICdjNicsICdjNycsICdjOCcsICdjOScsICdjMTAnXSxcbiAgICAgICAgICAgIDM6IFsnZDEnLCAnZDInLCAnZDMnLCAnZDQnLCAnZDUnLCAnZDYnLCAnZDcnLCAnZDgnLCAnZDknLCAnZDEwJ10sXG4gICAgICAgICAgICA0OiBbJ2UxJywgJ2UyJywgJ2UzJywgJ2U0JywgJ2U1JywgJ2U2JywgJ2U3JywgJ2U4JywgJ2U5JywgJ2UxMCddLFxuICAgICAgICAgICAgNTogWydmMScsICdmMicsICdmMycsICdmNCcsICdmNScsICdmNicsICdmNycsICdmOCcsICdmOScsICdmMTAnXSxcbiAgICAgICAgICAgIDY6IFsnZzEnLCAnZzInLCAnZzMnLCAnZzQnLCAnZzUnLCAnZzYnLCAnZzcnLCAnZzgnLCAnZzknLCAnZzEwJ10sXG4gICAgICAgICAgICA3OiBbJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2g3JywgJ2g4JywgJ2g5JywgJ2gxMCddLFxuICAgICAgICAgICAgODogWydpMScsICdpMicsICdpMycsICdpNCcsICdpNScsICdpNicsICdpNycsICdpOCcsICdpOScsICdpMTAnXSxcbiAgICAgICAgICAgIDk6IFsnajEnLCAnajInLCAnajMnLCAnajQnLCAnajUnLCAnajYnLCAnajcnLCAnajgnLCAnajknLCAnajEwJ10sXG4qLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==