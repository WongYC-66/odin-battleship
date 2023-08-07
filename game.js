import { Player } from './factory.js'
import * as DOM from './dom.js'

function Game(){
    this.player1 = new Player('player')
    this.player2 = new Player('computer')
    this.round = this.player1
    this.switchRound = () => {
        this.round = this.round === this.player1 ? this.player2 : this.player1
        console.log('switch to', this.round.name)
    }
    this.checkGameEnd = () => {
        if(this.player1.gameboard.allSunk()){
            DOM.updateMsg(`Winner : ${this.player2.name}`)
            this.round = null // game stop.No more click
        }
        if(this.player2.gameboard.allSunk()){
            DOM.updateMsg(`Winner : ${this.player1.name}`)
            this.round = null // game stop.No more click
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
                if(this.round === this.player1){
                    let isValidAttack = this.player2.gameboard.receiveAttack([x, y])
                    if(isValidAttack){
                        this.switchRound()
                        this.render()
                        this.addEvent()
                        this.checkGameEnd()
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
                if(this.round === this.player2){
                    let isValidAttack = this.player1.gameboard.receiveAttack([x, y])
                    if(isValidAttack){
                        this.switchRound()
                        this.render()
                        this.addEvent()
                        this.checkGameEnd()
                    }
                }
            })
        })
    }

    
    this.player1.gameboard.placeShip([1, 1], 'horizontal', 3)
    this.player1.gameboard.placeShip([3, 8], 'horizontal', 4)
    // this.player1.gameboard.placeShip([8, 6], 'horizontal', 2)
    // this.player1.gameboard.placeShip([7, 1], 'vertical', 5)
    // this.player1.gameboard.placeShip([1, 3], 'vertical', 2)
    // this.player1.gameboard.placeShip([1, 6], 'vertical', 3)
    
    this.player2.gameboard.placeShip([1, 1], 'horizontal', 3)
    this.player2.gameboard.placeShip([3, 8], 'horizontal', 4)
    // this.player2.gameboard.placeShip([8, 6], 'horizontal', 2)
    // this.player2.gameboard.placeShip([7, 1], 'vertical', 5)
    // this.player2.gameboard.placeShip([1, 3], 'vertical', 2)
    // this.player2.gameboard.placeShip([1, 6], 'vertical', 3)
    
    // player1.gameboard.missedAttack.push([0, 1])
    // player1.gameboard.missedAttack.push([0, 2])
    // player1.gameboard.missedAttack.push([0, 3])
    // player1.gameboard.correctAttack.push([1, 1])
    // player1.gameboard.correctAttack.push([2, 1])
    // player1.gameboard.correctAttack.push([3, 1])
    
    // player2.gameboard.missedAttack.push([0, 1])
    // player2.gameboard.missedAttack.push([0, 2])
    // player2.gameboard.missedAttack.push([0, 3])
    // player2.gameboard.correctAttack.push([1, 1])
    // player2.gameboard.correctAttack.push([2, 1])
    // player2.gameboard.correctAttack.push([3, 1])
    this.render()
    this.addEvent()
}

export { Game }