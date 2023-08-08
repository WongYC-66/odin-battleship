function render(game) {
    const p1 = game.player1
    const p2 = game.player2
    const p1Div = document.querySelector('.playerDiv')
    const p2Div = document.querySelector('.enemyDiv')
    // re-render
    p1Div.innerHTML = ''
    p2Div.innerHTML = ''

    p1.gameboard.board.forEach((row, i) => {
        row.forEach((cell, j) => {
            const newNode = document.createElement('div')
            newNode.classList.add('cell', 'myCell')
            newNode.setAttribute('rowIdx', i)
            newNode.setAttribute('colIdx', j)
            if (cell !== ' ') newNode.classList.add('ship-area')
            p1Div.appendChild(newNode)
        })
    })
    p2.gameboard.board.forEach((row, i) => {
        row.forEach((cell, j) => {
            const newNode = document.createElement('div')
            newNode.classList.add('cell', 'enemyCell')
            newNode.setAttribute('rowIdx', i)
            newNode.setAttribute('colIdx', j)
            if (cell !== ' ') newNode.classList.add('ship-area')
            p2Div.appendChild(newNode)
        })
    })
    // render previous select, but missed
    p1.gameboard.missedAttack.forEach(coord => {
        let [rowIdx, colIdx] = coordToBoard(coord)
        let el = document.querySelector(`.myCell[rowidx="${rowIdx}"][colidx="${colIdx}"]`)
        el.classList.add('miss-attacked')
    })
    p2.gameboard.missedAttack.forEach(coord => {
        let [rowIdx, colIdx] = coordToBoard(coord)
        let el = document.querySelector(`.enemyCell[rowidx="${rowIdx}"][colidx="${colIdx}"]`)
        el.classList.add('miss-attacked')
    })
    // render correctly-attack cell
    p1.gameboard.correctAttack.forEach(coord => {
        let [rowIdx, colIdx] = coordToBoard(coord)
        let el = document.querySelector(`.myCell[rowidx="${rowIdx}"][colidx="${colIdx}"]`)
        el.classList.add('correct-attacked')
    })
    p2.gameboard.correctAttack.forEach(coord => {
        let [rowIdx, colIdx] = coordToBoard(coord)
        let el = document.querySelector(`.enemyCell[rowidx="${rowIdx}"][colidx="${colIdx}"]`)
        el.classList.add('correct-attacked')
    })
    // mask player2 at beginning
    if (game.gameStatus == 'before-start') toggleEnemyMask()
}

function toggleEnemyMask() {
    document.querySelectorAll('.enemyCell').forEach(cell => cell.classList.toggle('mask'))
}

function updateMsg(str) {
    document.querySelector('.messageDiv').textContent = str
}

function coordToBoard(coord) {
    return [coord[1], coord[0]]
}

export { render, updateMsg, toggleEnemyMask }