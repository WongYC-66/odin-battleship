const MAX_ROW = 9
const MAX_COL = 9

function Ship(length = 0, hit = 0, sunk = false) {
    this.length = length
    this.hitCount = hit
    this.sunk = sunk
    this.hit = () => {
        this.hitCount++
        this.isSunk()
    }
    this.isSunk = () => {
        if (this.length && this.length === this.hitCount) this.sunk = true
        return this.sunk
    }
    this.isSunk()
}

function GameBoard() {
    this.board = [...Array(10)].map(x => new Array(10).fill(' '))
    this.allShip = []
    this.missedAttack = []
    this.correctAttack = []
    this.placeShip = (coord, dir, size) => {
        // console.log(coord, dir, size)
        let [rowIdx, colIdx] = coordToBoard(coord)
        const newShip = new Ship(size, 0, false)
        if (dir == 'horizontal') {
            // console.log('placing horizontally')
            if (colIdx + size - 1 > MAX_COL) return false// console.log('Cannot place here, boundary')
            let rowCell = this.board[rowIdx].slice(colIdx, colIdx + size)
            let isEmpty = rowCell.every(cell => cell === ' ')
            if (!isEmpty) return console.log('Cannot. Other ship is here.')
            for (let j = colIdx; j < colIdx + size; j++) {
                this.board[rowIdx][j] = newShip   // assign ship obj to board
            }
        } else if (dir == 'vertical') {
            // console.log('placing vertically')
            if (rowIdx + size - 1 > MAX_ROW) return false // console.log('Cannot place here, boundary')
            let colCell = []
            for (let i = rowIdx; i < rowIdx + size; i++) {
                colCell.push(this.board[i][colIdx])
            }
            let isEmpty = colCell.every(cell => cell === ' ')
            if (!isEmpty) return console.log('Cannot. Other ship is here.')
            for (let i = rowIdx; i < rowIdx + size; i++) {
                this.board[i][colIdx] = newShip   // assign ship obj to board
            }
        }
        this.allShip.push(newShip)
        return true

    }
    this.receiveAttack = (coord) => {
        // reject if history exist
        let history = [...this.correctAttack, ...this.missedAttack]
        let isRepeated = history.some(his => coord[0] === his[0] && coord[1] === his[1])
        if (isRepeated) {
            console.log('history exists. click')
            return false
        }
        //
        let [rowIdx, colIdx] = coordToBoard(coord)
        let isHit = this.board[rowIdx][colIdx] !== ' '
        if (!isHit) {
            this.missedAttack.push(coord)
            return true
        }
        let foundShip = this.board[rowIdx][colIdx]
        foundShip.hit()
        this.correctAttack.push(coord)
        return true
    }
    this.allSunk = () => {
        return this.allShip.every(ship => ship.sunk)
    }

}

function Player({ name, isAi }) {
    this.name = name
    this.gameboard = new GameBoard()
    // this.attackingIndex = []
    this.isAi = isAi
    this.generateAIMove = (opponent) => {
        if (!this.isAi) return
        let x, y,
            history = [...opponent.gameboard.correctAttack, ...opponent.gameboard.missedAttack],
            nextPossible = []
        // use previous success attack to generate next posible move
        opponent.gameboard.correctAttack.forEach(coord => {
            nextPossible.push([coord[0], coord[1] - 1]) // up
            nextPossible.push([coord[0], coord[1] + 1]) // down
            nextPossible.push([coord[0] - 1, coord[1]]) // left
            nextPossible.push([coord[0] + 1, coord[1]]) // right
        })
        nextPossible = nextPossible.filter(coord => {
            return (coord[0] >= 0 && coord[0] <= 9) && (coord[1] >= 0 && coord[1] <= 9)
        })
        while (true) {
            console.log(nextPossible.length)
            if (nextPossible.length > 0) {
                let coord = nextPossible.pop()
                x = coord[0]
                y = coord[1]
            } else {
                x = Math.floor(Math.random() * 10)
                y = Math.floor(Math.random() * 10)
            }
            let isRepeated = history.some(his => his[0] === x && his[1] === y)
            if (!isRepeated) break
            // console.log(x, y, 'is repeated')
        }
        // console.log(history)
        // console.log(x, y, 'not repeated')
        return [x, y]
    }
    this.placeRandomShips = (arr) => {
        arr.forEach(size => {
            while (true) {
                let x = Math.floor(Math.random() * 10)
                let y = Math.floor(Math.random() * 10)
                let dir = Math.random() >= 0.5 ? 'horizontal' : 'vertical'
                let result = this.gameboard.placeShip([x, y], dir, size)
                if (result) break;
            }
        })
    }
}

function coordToBoard(coord) {
    return [coord[1], coord[0]]
}

export { Ship, GameBoard, Player }