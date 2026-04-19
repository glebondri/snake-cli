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
                const isFood = food.x === Math.round(x / 2) && food.y === y
                symbol = isFood ? '*' : symbol
                
                for (let [i, part] of snake.parts.entries()) {
                    if (part.x === Math.round(x / 2) && part.y === y) {
                        const isHead = i === snake.parts.length - 1
                        symbol = isHead ? '@' : 'o'
                    }
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