const readline = require('readline')
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (_, key) => {
    if (key.sequence === '\x03') {
        process.exit(0)
    }
    console.log(key)
})