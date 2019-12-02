const inputs: Array<number> = require('./input.ts');

const answer = inputs
    .map((num: number) => Math.floor(num / 3) - 2)
    .reduce((acc: number, val: number) => acc + val);

console.log(answer);

export {};
