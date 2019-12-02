import fs = require('fs');

const input: string = fs
    .readFileSync(`${__dirname}/input.txt`)
    .toString()
    .trim();

export = input.split(`,`).map((str: string): number => Number(str));

// thanks to jgierer12 on github for this handy solution
