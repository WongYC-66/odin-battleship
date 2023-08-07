const MAX_ROW = 9
const MAX_COL = 9

export function Ship(length = 0, hit = 0, sunk = false){
    this.length = length
    this.hitCount = hit
    this.sunk = sunk
    this.hit = () => {
        this.hitCount++
        this.isSunk()
    }
    this.isSunk = () => {
        if(this.length && this.length === this.hitCount) this.sunk = true
        return this.sunk
    }
    this.isSunk()
}

export function GameBoard(){
    this.board = [...Array(10)].map(x => new Array(10).fill(' ')) 
    this.allShip = []
    this.missedAttack = []
    this.correctAttack = []
    this.placeShip = (coord, dir, size) => {
        let [rowIdx, colIdx] = coordToBoard(coord)
        const newShip = new Ship(size, 0, false)
        if(dir == 'horizontal'){
            // console.log('placing horizontally')
            if(colIdx + size - 1 > MAX_COL) return // console.log('Cannot place here, boundary')
            let rowCell = this.board[rowIdx].slice(colIdx, colIdx + size)
            let isEmpty = rowCell.every(cell => cell === ' ')
            if(! isEmpty) return console.log('Cannot. Other ship is here.')
            for(let j = colIdx ; j < colIdx + size; j++){
                this.board[rowIdx][j] = newShip   // assign ship obj to board
            }
        } else if(dir == 'vertical'){
            // console.log('placing vertically')
            if(rowIdx + size - 1 > MAX_ROW) return // console.log('Cannot place here, boundary')
            let colCell = []
            for(let i = rowIdx ; i < rowIdx + size; i++){
                colCell.push(this.board[i][colIdx])
            }
            let isEmpty = colCell.every(cell => cell === ' ')
            if(! isEmpty) return console.log('Cannot. Other ship is here.')
            for(let i = rowIdx ; i < rowIdx + size ; i++){
                this.board[i][colIdx] = newShip   // assign ship obj to board
            }
        }
        this.allShip.push(newShip)
        
    }
    this.receiveAttack = (coord) => {
        let [rowIdx, colIdx] = coordToBoard(coord)
        let isHit = this.board[rowIdx][colIdx] !== ' '
        if(! isHit){
            this.missedAttack.push(coord)
            return
        } 
        let foundShip = this.board[rowIdx][colIdx]
        foundShip.hit()
        this.correctAttack.push(coord)
        // console.log(foundShip)
        // console.log(this.correctAttack)
        // console.log(this.missedAttack)
    }
    this.allSunk = () => {
        return this.allShip.every(ship => ship.sunk)
    }

}

export function Player(name){
    this.name = name
    this.gameboard = new GameBoard()
}

function coordToBoard(coord){
    return [coord[1], coord[0]]
}
