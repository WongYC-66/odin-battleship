import { Player } from './factory.js'
import * as DOM from './dom.js'
import * as DRAG_MODULE from './drag.js'

function Game() {
    this.player1 = new Player({ name: 'player', isAi: false })
    this.player2 = new Player({ name: 'computer', isAi: false })
    this.round = this.player1
    this.switchRound = () => {
        this.round = this.round === this.player1 ? this.player2 : this.player1
        console.log('switch to', this.round.name)
    }
    this.checkGameEnd = () => {
        if (this.player1.gameboard.allSunk()) {
            DOM.updateMsg(`Winner : ${this.player2.name}`)
            this.round = null // game stop.No more click
            console.log('game end. winner is', this.player2.name)
            return
        }
        if (this.player2.gameboard.allSunk()) {
            DOM.updateMsg(`Winner : ${this.player1.name}`)
            this.round = null // game stop.No more click
            console.log('game end. winner is', this.player1.name)
            return
        }
    }
    this.render = () => DOM.render(this)
    this.addEvent = () => {
        // add click event to simulate attack target
        const nodeList = document.querySelectorAll('.enemyCell')
        nodeList.forEach(node => {
            node.addEventListener('click', () => {
                console.log('player 1 click on player 2"s board')

                let x = parseInt(node.getAttribute('colidx'))
                let y = parseInt(node.getAttribute('rowidx'))
                if (this.round === this.player1) {
                    let isValidAttack = this.player2.gameboard.receiveAttack([x, y])
                    if (isValidAttack) {
                        this.switchRound()
                        this.render()
                        this.addEvent()
                        this.checkGameEnd()
                        this.checkIfAI() // check n activate AI
                    }
                }
            })
        })
        // add click event to simulate attack target
        const nodeList2 = document.querySelectorAll('.myCell')
        nodeList2.forEach(node => {
            node.addEventListener('click', () => {
                console.log('player 2 click on player 1"s board')
                let x = parseInt(node.getAttribute('colidx'))
                let y = parseInt(node.getAttribute('rowidx'))
                if (this.round === this.player2) {
                    let isValidAttack = this.player1.gameboard.receiveAttack([x, y])
                    if (isValidAttack) {
                        this.switchRound()
                        this.render()
                        this.addEvent()
                        this.checkGameEnd()
                        this.checkIfAI() // check n activate AI
                    }
                }
            })
        })
    }
    this.checkIfAI = async () => {
        if (this.round === null) return
        if (!this.round.isAi) return
        // is Ai, get coordinate and simulate click
        let opponent = this.round === this.player1 ? this.player2 : this.player1
        let coord = this.round.generateAIMove(opponent)
        let [rowIdx, colIdx] = coordToBoard(coord)
        let cellName = this.round === this.player1 ? 'enemyCell' : 'myCell'
        let cell = document.querySelector(`.${cellName}[rowidx='${rowIdx}'][colidx='${colIdx}']`)
        // cell.click()
        await setTimeout(() => cell.click(), 100);
    }

    // this.player1.gameboard.placeShip([1, 1], 'horizontal', 3)
    // this.player1.gameboard.placeShip([3, 8], 'horizontal', 4)

    // this.player2.gameboard.placeShip([1, 1], 'horizontal', 3)
    // this.player2.gameboard.placeShip([3, 8], 'horizontal', 4)

    this.render()
    this.addEvent()
    DRAG_MODULE.initialise(this)
}

function coordToBoard(coord) {
    return [coord[1], coord[0]]
}

export { Game }