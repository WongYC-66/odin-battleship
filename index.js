import { Game } from './game.js'

let newGame = new Game()

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#startBtn').addEventListener('click', () => {
        if(newGame.gameStatus === 'end') newGame = new Game()
    })
})