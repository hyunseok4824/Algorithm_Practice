const fs = require('fs')
const input = fs.readFileSync('BJ1920_input.txt').toString().trim().split('\n')

const N = Number(input[0])
const A = new Set(input[1].split(" "))
const M = Number(input[2])

const num_lst = input[3].split(" ")

const result = new Array(M);

for (let i = 0; i < M; i++) {
  result[i] = A.has(num_lst[i]) ? 1 : 0;
}

console.log(result.join("\n"));
