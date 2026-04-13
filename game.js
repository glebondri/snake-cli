export const fieldSize = 15
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
export let food = {x: Math.round(fieldSize - fieldSize / 4), y: Math.round(fieldSize / 2)}

export const moveSnake = () => {
    const directions = {
        up: {x: 0, y: -1},
        down: {x: 0, y: 1},
        left: {x: -1, y: 0},
        right: {x: 1, y: 0}
    }

    const x = snake.parts.at(-1).x + directions[snake.direction].x
    const y = snake.parts.at(-1).y + directions[snake.direction].y
    snake.parts.push({x: x, y: y})
    if (checkFoodCollision()) {
        vars.count += 1
        generateFood()
    } else {snake.parts.shift()}
}

export const checkCollision = () => {
    const head = snake.parts.at(-1)
    const bodyCollision = snake.parts.slice(0, -1).some((part) => {return part.x === head.x && part.y === head.y})
    return (
        (head.x < 0 || head.x > fieldSize - 1) 
        || (head.y < 0 || head.y > fieldSize - 1) 
        || bodyCollision
    )
}

export const checkFoodCollision = () => {
    const head = snake.parts.at(-1)
    return head.x === food.x && head.y === food.y
}

const getRandomCoord = () => {
    return Math.max(0, Math.round(Math.random() * fieldSize - 1))
}

export const generateFood = () => {
    let x = getRandomCoord(1)
    let y = getRandomCoord(1)

    const hasCollision = snake.parts.some((part) => {
        return part.x === x && part.y === y
    })
    
    if (hasCollision) {generateFood()} else {food = {x: x, y: y}}
}

export const initGame = () => {
    snake.init(3)
    food = {x: Math.round(fieldSize - fieldSize / 4), y: Math.round(fieldSize / 2)}
    vars.count = 0
    vars.running = true
}