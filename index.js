import { Game } from './game.js'

let newGame = new Game()

document.addEventListener('DOMContentLoaded', () => {
    startBtnEvent()
    document.querySelector('#resetBtn').addEventListener('click', function () {
        // reset needs to re-create start button to reset eventlistener
        let parent = this.parentNode
        let startBtn = this.previousElementSibling
        startBtn.remove()
        startBtn = document.createElement('button')
        startBtn.id = 'startBtn'
        startBtn.textContent = 'Start'
        parent.insertBefore(startBtn, this)
        startBtnEvent()
        if (newGame.gameStatus === 'before-start') newGame = new Game()
    })
})

function startBtnEvent() {
    document.querySelector('#startBtn').addEventListener('click', function () {
        if (newGame.gameStatus === 'end') newGame = new Game()
    })
}