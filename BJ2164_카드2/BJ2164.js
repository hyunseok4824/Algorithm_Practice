const fs = require('fs');
// const input = fs,.readFileSync('/dev/stdin').toString()
const input = fs.readFileSync('BJ2164_input.txt').toString()

const N = Number(input);

if (N === 1) {
  console.log(1);
  return;
}

let cards = [];
for (let i = 2; i <= N; i += 2) {
  cards.push(i);
}

let flag = N % 2 === 0 ? 1 : 0;

while (cards.length > 1) {
  const newCards = [];

  for (let i = flag; i < cards.length; i += 2) {
    newCards.push(cards[i]);
  }

  flag = (cards[cards.length - 1] === newCards[newCards.length - 1]) ? 1 : 0;

  cards = newCards;
}

console.log(cards[0]);