import fs = require('fs');

const input = fs
    .readFileSync(`${__dirname}/input.txt`)
    .toString()
    .trim();

module.exports = input.split(`,`).map((num: string) => Number(num));

// thanks to jgierer12 on github for this handy solution
