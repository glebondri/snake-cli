export const fieldSize = 10
export let vars = {
    running: true,
    count: 0
}

export let snake = {
    parts: [],
    direction: 'right',
    init: (length) => {
        snake.direction = 'right'
        const y = Math.round(fieldSize / 2)
        snake.parts = Array.from(Array(length)).map((_, i) => {return {x: i, y: y}})
    }
}
export let food = {}

export const moveSnake = () => {
    const directions = {
        up: {x: 0, y: -1},
        down: {x: 0, y: 1},
        left: {x: -1, y: 0},
        right: {x: 1, y: 0}
    }

    const [x, y] = [snake.parts.at(-1).x + directions[snake.direction].x,
                    snake.parts.at(-1).y + directions[snake.direction].y]
    snake.parts.push({x: x, y: y})

    if (checkFoodCollision()) {
        vars.count += 1
        food = generateFoodPos()
    } else {snake.parts.shift()}
}


export const checkWin = () => {
    return snake.parts.length === fieldSize ** 2
}

export const checkCollision = () => {
    const head = snake.parts.at(-1)
    const bodyCollision = snake.parts.slice(0, -1).some((part) => {return part.x === head.x && part.y === head.y})
    return (
        (head.x < 0 || head.x > fieldSize - 1) || 
        (head.y < 0 || head.y > fieldSize - 1) || 
        bodyCollision
    )
}

export const checkFoodCollision = () => {
    const head = snake.parts.at(-1)
    return head.x === food.x && head.y === food.y
}

export const generateFoodPos = () => {
    const emptyCells = []
    for (let y = 0; y < fieldSize; y++) {
        for (let x = 0; x < fieldSize; x++) {
            const hasSnakePart = snake.parts.some((part) => {return part.x === x && part.y === y})
            if (!hasSnakePart) {emptyCells.push({x: x, y: y})}
        }
    }

    if (emptyCells.length) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        return randomCell
    }
}

export const initGame = () => {
    snake.init(3)
    food = generateFoodPos()
    vars.count = 0
    vars.running = true
}