const fs = require('fs')

const input = fs.readFileSync('BJ1181_input.txt').toString().trim().split('\n')
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const N = Number(input[0])
const wordList = [
  ... new Set(input.splice(1).sort((a, b) => {
    if (a.length === b.length) return a < b? -1 : 1
    return a.length - b.length
  })
)].join("\n")

console.log(wordList)
