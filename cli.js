import * as game from './game.js'

export const drawField = () => {
    const size = game.fieldSize
    const food = game.food
    const snake = game.snake

    const width = size * 2 - 1
    let output = '┌' + '─'.repeat(width) + '┐\n'
    
    for (let y = 0; y < size; y++) {
        output += '│'
        for (let x = 0; x < width; x++) {
            let symbol = ' '

            if (x % 2 === 0) {
                if (food.x === Math.round(x / 2) && food.y === y) {
                    symbol = '*'
                } else {
                    for (let [i, part] of snake.parts.entries()) {
                        if (part.x === Math.round(x / 2) && part.y === y) {
                            const isHead = i === snake.parts.length - 1
                            symbol = isHead ? '@' : 'o'
                        }
                    }
                    // const part = field.snake.parts.filter((p) => {
                    //     return p.x === Math.round(x / 2) && p.y === y
                    // })
                    
                    // output += part ? part : ' '
                }
            }
            output += symbol 
        }
        output += '│\n'
    }
    output += '└' + '─'.repeat(width) + '┘'

    console.clear()
    console.log(output)
}