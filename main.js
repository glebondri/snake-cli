const cli = require('./cli.js')
const game = require('./game.js')

const readline = require('readline')
readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true)
}

const gameLoop = () => {
    process.stdin.removeAllListeners('keypress')

    if (game.vars.running) {
        game.moveSnake()
        cli.drawField()

        const hasWon = game.checkWin()
        const hasCollision = game.checkCollision()

        if (hasWon) {
            console.log(`\nВы выиграли! Ваш счет: ${game.vars.count}\nНажмите R чтобы начать заново, Q чтобы выйти:`)
        } else if (hasCollision) {
            console.log(`\nВы проиграли! Ваш счет: ${game.vars.count}\nНажмите R чтобы начать заново, Q чтобы выйти:`)
        } else {
            console.log(`\nТекущий счет: ${game.vars.count}\nДлина змеи: ${game.snake.parts.length}`)
        }

        if (hasWon || hasCollision) {game.vars.running = false}
    }

    const onkeypress = (_, key) => {
        if (key.sequence === '\x03' || key.name === 'q') {
            console.clear()
            process.exit(0)
        } else if (key.name === 'r') {
            game.initGame()
        }
        
        if (game.isValidDirection(key.name)) {
            game.snake.direction = key.name
        }
        if (game.vars.running) {process.stdin.removeAllListeners('keypress')}
    }
    process.stdin.on('keypress', onkeypress)

    setTimeout(gameLoop, 200)
}

game.initGame()
cli.drawField()
gameLoop()