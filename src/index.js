window.addEventListener('load', (event) => {
    console.log('It wotks')
})

//const { container } = require("webpack")

//const { ContextExclusionPlugin } = require("webpack")

const selectRandomGridCooridnates = () => {
    let row = (Math.floor(Math.random() * 10))
    let col = (Math.floor(Math.random() * 10))
    return {
        row, col
    }
}

const randomCooridnates = selectRandomGridCooridnates()

function ship(name, length){
    return {
        name: name,
        lengthArray: calculateShipLength(length),
        hit(number, playerName) {
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
    {"name": destroyer4},
    'playerOne'
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
    {"name": playerTwoDestroyer4},
    'playerTwo'
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
                if ((10 - column) < newShip.length){
                    let newColumn = column - i
                    if (gridSelection[row][newColumn] === 2){
                        console.log('problems')
                    }
                    gridSelection[row][newColumn] = 2
                    shipLocator(`${player}${row}, ${newColumn}`, shipName, i)
                }else{
                    let newColumn = column + i
                    gridSelection[row][newColumn] = 2
                    shipLocator(`${player}${row}, ${newColumn}`, shipName, i)
                }
            }
        }else{
            for (let i = 0; i < newShip.length; i++){
                if ((10 - row) < newShip.length){
                    let newRow = row - i
                    if (gridSelection[newRow][column] === 2){
                        reselectCoordinates(player, shipName, gridSelection)
                        return
                    }
                    gridSelection[newRow][column] = 2
                    shipLocator(`${player}${newRow}, ${column}`, shipName, i)
                }else{
                    let newRow = row + i
                    if (gridSelection[newRow][column] === 2){
                        reselectCoordinates(player, shipName, gridSelection)
                        return
                    }
                    gridSelection[newRow][column] = 2
                    shipLocator(`${player}${newRow}, ${column}`, shipName, i)
                }
            }
        }
        return createGrid
    }
        //let newGrid = createGrid
    const receiveAttack = (row, column, gridSelection, player) => {
        if (gridSelection[row][column] === emptySpace){
            gridSelection[row][column] = miss
            let item = document.getElementById(`${player[5]}${row}, ${column}`)
            populateGrid(item.id, 'Miss')
            return gridSelection
        }else if (gridSelection[row][column] === shipLocation){
            gridSelection[row][column] = hit
            let item = document.getElementById(`${player[5]}${row}, ${column}`)
            let shipName = item.getAttribute('data-shipname')
            let shipArray = getShipArray(shipName, player) //update player
            let shipIndex = item.getAttribute('data-index')
            shipArray.hit(shipIndex, player)  ///updates player
            populateGrid(item.id, 'Hit')
            return gridSelection
        }
    }
    const allShipsSunk = (player) => {
        if(player[0].name.isSunk() === true && player[1].name.isSunk() === true && 
        player[2].name.isSunk() === true && player[3].name.isSunk() === true && 
        player[4].name.isSunk() === true){
            gameOver(player[5])
        }
    }
    return {
        receiveAttack, placeShip, allShipsSunk
    }
}

const reselectCoordinates = (player, ship, grid) => {
    if (player === "playerOne"){
        prompt('Please Enter New Coordinates')
    }else if (player === 'playerTwo'){
        game.placeShip(ship, randomCooridnates.row, randomCooridnates.col, grid, player)
        return
    }
    return
}

const gameOver = (playerName) => {
    if (playerName === 'playerTwo'){
        alert (`Game Over. Player One Wins!`)
        location.reload()
    }else if (playerName === 'playerOne'){
        alert ('Game Over. Player Two Wins!')
        location.reload()
    }
}

const getShipArray = (shipName, player) => {
    let index = shipName.slice(-1)
    //console.log(createGrid2)
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
    shipName = item.getAttribute('data-shipname')
    item.innerText = 'X'
    if (result == 'Hit'){
        item.style.backgroundColor = 'red'
    } else {
        item.style.backgroundColor = 'blue'
    }
}

const game = gameboard()

//const playerOneCoordinatesRow = prompt('Aircraft Carrier coordinates? (Row)')
//const playerOneCoordinatesCol = prompt('Aircraft Carrier coordinates? (Column)')

game.placeShip(destroyer4, 0, 0, createGrid, 'playerOne')
game.placeShip(battleship1, 2, 2, createGrid, 'playerOne')
game.placeShip(carrier0, 1, 3, createGrid, 'playerOne')
game.placeShip(submarine2, 7, 6, createGrid, 'playerOne', 'horizontal')
game.placeShip(cruiser3, 9, 0, createGrid, 'playerOne', 'horizontal')

const carrierCoordinates = selectRandomGridCooridnates()
const battleshipCoordinates = selectRandomGridCooridnates()
const submarineCoordinates = selectRandomGridCooridnates()
const cruiserCoordinates = selectRandomGridCooridnates()
const destroyerCoordinates = selectRandomGridCooridnates()

game.placeShip(playerTwoCarrier0, carrierCoordinates.row, carrierCoordinates.col, createGrid2, 'playerTwo')
game.placeShip(playerTwoBattleship1, battleshipCoordinates.row, battleshipCoordinates.col, createGrid2, 'playerTwo')
game.placeShip(playerTwoSubmarine2, submarineCoordinates.row, submarineCoordinates.col, createGrid2, 'playerTwo')
game.placeShip(playerTwoCruiser3, cruiserCoordinates.row, cruiserCoordinates.col, createGrid2, 'playerTwo')
game.placeShip(playerTwoDestroyer4, destroyerCoordinates.row, destroyerCoordinates.col, createGrid2, 'playerTwo')

const playerTurn = (() => document.addEventListener('click', function(e){
    if(e.target && e.target.classList.contains('playerTwo')){
        let coordinates = e.target.id
        let coordinatesRow = coordinates.slice(-4, -3)
        let coordinatesCol = coordinates.slice(-1)
        if ((createGrid2[coordinatesRow][coordinatesCol]) === 1 || (createGrid2[coordinatesRow][coordinatesCol]) === 3){
            return
        }else{
            game.receiveAttack(coordinatesRow, coordinatesCol, createGrid2, playerTwoShips)
            game.allShipsSunk(playerTwoShips)
            computerPlay()
        }
}
}))()

const computerPlay = () => {
    let coordinates = selectRandomGridCooridnates()
    let gridCoordinates = createGrid[coordinates.row][coordinates.col]
    if (gridCoordinates === 3 || gridCoordinates === 1){
        computerPlay()
    }else{
        game.receiveAttack(coordinates.row, coordinates.col, createGrid, playerOneShips)
        game.allShipsSunk(playerOneShips)
    } 
}