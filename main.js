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

        if (game.checkCollision()) {
            game.vars.running = false
            console.log(`\nВы проиграли! Ваш счет: ${game.vars.count}\nНажмите R чтобы начать заново, Q чтобы выйти:`)
        } else {
            console.log(`\nТекущий счет: ${game.vars.count}\nДлина змеи: ${game.snake.parts.length}`)
        }
    }

    const onkeypress = (_, key) => {
        if (key.sequence === '\x03' || key.name === 'q') {
            console.clear()
            process.exit(0)
        } else if (key.name === 'r') {
            game.initGame()
        }
        
        const keys = ['left', 'up', 'right', 'down']
        if (keys.includes(key.name)) {
            if (keys.indexOf(key.name) % 2 !== keys.indexOf(game.snake.direction) % 2) {
                game.snake.direction = key.name
            }
        }
        if (game.vars.running) {process.stdin.removeAllListeners('keypress')}
    }
    process.stdin.on('keypress', onkeypress)

    setTimeout(gameLoop, 200)
}

game.initGame()
gameLoop()