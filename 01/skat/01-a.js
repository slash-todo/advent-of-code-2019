const inputs = require('./input.js');

const answer = inputs
    .map(num => Math.floor(num / 3) - 2)
    .reduce((acc, val) => acc + val);

console.log(answer);
